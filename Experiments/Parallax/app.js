/* Parallax 0.2.0 — browser controller. No GPS data crosses the worker boundary. */
import {ObjectClues} from './objects.js';
import {RoadSimulator} from './simulator.js';
import {locationSample, summary, makeCSV} from './benchmark.js';
const $=id=>document.getElementById(id), video=$('video'), camera=$('camera');
const mobile=!!navigator.userAgentData?.mobile||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent));
const state={source:null,stream:null,worker:null,ready:false,busy:false,runId:0,requestId:0,raf:0,rvfc:0,watch:null,gpsToken:0,wake:null,width:0,height:0,lastSent:-Infinity,lastResultAt:0,lastReply:0,lastDetection:-Infinity,detectionBusy:false,result:null,latestGPS:null,settings:null,units:'kmh',frameNo:0,origin:0,sim:null,gpsMessage:'Off'};
const log={version:'0.2.0',created:new Date().toISOString(),estimates:[],locations:[],events:[],dropped:{estimates:0,locations:0,events:0}};
const capture=document.createElement('canvas'), detectorCanvas=document.createElement('canvas');
const ctx=capture.getContext('2d',{willReadFrequently:true}), detectorCtx=detectorCanvas.getContext('2d');
let consentAccepted=false;try{consentAccepted=sessionStorage.getItem('parallax-consent-v2')==='yes';}catch{}
const objects=new ObjectClues(text=>{$('modelStatus').textContent=text;});
$('gpsToggle').checked=$('consentGPS').checked=mobile;
function append(kind,value){const a=log[kind];a.push(value);if(a.length>10000){a.shift();log.dropped[kind]++;}}
function event(type,data={}){append('events',{type,epoch:Date.now(),runId:state.runId,...data});}
function factor(){return state.units==='mph'?2.2369362921:3.6;}
function number(v,digits=0){return Number.isFinite(v)?(v*factor()).toFixed(digits):'—';}
function status(message){$('liveStatus').textContent=message;$('estimateReason').textContent=message;}
function openAnalysis(){if(!$('analysis').open){$('analysis').showModal();$('closeAnalysis').focus({preventScroll:true});requestAnimationFrame(()=>{$('analysis').scrollTop=0;drawCharts();});}}
function closeAnalysis(){$('analysis').close();}
function clearReading(reason='Waiting for camera motion'){
 state.result=null;$('speed').textContent=$('detailSpeed').textContent=$('low').textContent=$('high').textContent='—';
 $('trackingStatus').textContent=state.source?'Acquiring':'Not started';$('trackingStatus').classList.remove('good');
 $('viewStatus').textContent='Unresolved';$('scaleStatus').textContent='Not established';$('scaleCount').textContent='No current estimate';
 $('featureCount').textContent='—';$('frameCost').textContent='—';status(reason);drawOverlay();
}
function renderResult(r){
 state.result=r;state.lastResultAt=performance.now();
 const ok=r.ok&&Number.isFinite(r.median);
 $('speed').textContent=$('detailSpeed').textContent=ok?number(r.median):'—';
 $('low').textContent=ok?number(r.low):'—';$('high').textContent=ok?number(r.high):'—';
 $('trackingStatus').textContent=ok?(r.status==='acquiring'?'Acquiring':'Consistent'):r.status==='unresolved'?'Below resolution':'Unresolved';
 $('trackingStatus').classList.toggle('good',ok);
 $('viewStatus').textContent=ok?r.view:'Unresolved';
 $('scaleStatus').textContent=ok?(r.scaleMode==='object-priors'?'Tentative object sizes':'Assumed height'):'Not established';
 $('scaleCount').textContent=ok?`${r.references||0} tracked scale clues`:'No estimate';
 $('featureCount').textContent=r.inliers??r.tracks??'—';$('frameCost').textContent=Number.isFinite(r.computeMs)?r.computeMs.toFixed(0):'—';
 $('priorNote').textContent=ok?`Inferred camera height: ${r.heightMedian.toFixed(1)} m, model interval ${r.heightLow.toFixed(1)}–${r.heightHigh.toFixed(1)} m. ${r.scaleMode==='object-priors'?'Object sizes are uncertain assumptions, not measured rulers.':'No object scale lock: the speed depends on a broad height prior.'}`:'Scale starts with a broad height assumption. Recognized objects may add tentative size evidence. This is not automatic knowledge of metres.';
 status(r.reason||'Waiting for scene motion');drawOverlay();if($('analysis').open)drawCharts();
}
function terminateWorker(){state.worker?.terminate();state.worker=null;state.ready=false;state.busy=false;}
function configure(width,height){
 terminateWorker();state.width=width;state.height=height;capture.width=width;capture.height=height;detectorCanvas.width=width;detectorCanvas.height=height;
 state.runId++;state.lastSent=-Infinity;state.lastDetection=-Infinity;state.lastReply=performance.now();objects.reset();
 const id=state.runId,w=new Worker(new URL('./vision-worker.js',import.meta.url));state.worker=w;
 w.onmessage=e=>{const r=e.data;if(id!==state.runId||r.runId!==id)return;state.lastReply=performance.now();
  if(r.type==='ready'){state.ready=true;return;}state.busy=false;
  if(r.type==='error'){event('worker-error',{message:r.message});clearReading('Image processing failed; trying the next frame');return;}
  if(r.type!=='result')return;
  const item={...r,source:state.source,runId:id};delete item.vectors;
  append('estimates',item);renderResult(r);
 };
 w.onerror=e=>{if(id!==state.runId)return;state.busy=false;state.ready=false;event('worker-error',{message:e.message});clearReading('Processing could not start. Open Analysis to retry.');};
 w.postMessage({type:'configure',width,height,runId:id});event('configure',{width,height,source:state.source});clearReading('Looking for ground motion automatically');
}
function submitFrame(source,time,epoch){
 if(!state.worker||!state.ready||state.busy||time-state.lastSent<.035)return;
 if(!Number.isFinite(time)||!Number.isFinite(epoch))return;
 ctx.drawImage(source,0,0,state.width,state.height);const image=ctx.getImageData(0,0,state.width,state.height);state.busy=true;state.lastSent=time;
 // Strict boundary: pixels, dimensions, timestamps, run identifier — never location.
 state.worker.postMessage({type:'frame',buffer:image.data.buffer,width:state.width,height:state.height,time,epoch,runId:state.runId},[image.data.buffer]);
 if(state.source==='camera'&&objects.model&&objects.enabled&&!state.detectionBusy&&time-state.lastDetection>.8){
  detectorCtx.drawImage(source,0,0,state.width,state.height);state.lastDetection=time;state.detectionBusy=true;const id=state.runId;
  objects.detect(detectorCanvas,time).then(found=>{if(id===state.runId&&state.source==='camera'&&objects.enabled)state.worker?.postMessage({type:'objects',runId:id,time,objects:found});}).catch(e=>{$('modelStatus').textContent=`Object inference unavailable: ${e.message}`;}).finally(()=>{state.detectionBusy=false;});
 }
}
function dimensions(w,h){const scale=Math.min(1,384/Math.max(w,h));return [Math.max(96,Math.round(w*scale)),Math.max(96,Math.round(h*scale))];}
function cameraLoop(){
 if(state.source!=='camera')return;
 if(typeof video.requestVideoFrameCallback==='function'){
  state.rvfc=video.requestVideoFrameCallback((now,meta)=>{
   if(state.source!=='camera')return;const [w,h]=dimensions(video.videoWidth,video.videoHeight);if(w!==state.width||h!==state.height)configure(w,h);
   // Browser presentation time is not a calibrated hardware exposure timestamp.
   submitFrame(video,meta.mediaTime,performance.timeOrigin+(meta.captureTime??meta.expectedDisplayTime??now));cameraLoop();
  });
 }else{
  state.raf=requestAnimationFrame(now=>{if(state.source!=='camera')return;if(video.readyState>=2)submitFrame(video,video.currentTime,performance.timeOrigin+now);cameraLoop();});
 }
}
function stopGPS(message='Off'){
 state.gpsToken++;if(state.watch!==null){navigator.geolocation?.clearWatch(state.watch);state.watch=null;}state.latestGPS=null;state.gpsMessage=message;$('gpsValue').textContent=message;
}
function startGPS(){
 stopGPS();if(state.source!=='camera'||!$('gpsToggle').checked)return;
 if(!navigator.geolocation){state.gpsMessage='Unavailable';$('gpsValue').textContent='Unavailable';return;}
 const token=state.gpsToken;state.gpsMessage='Requesting…';$('gpsValue').textContent=state.gpsMessage;
 state.watch=navigator.geolocation.watchPosition(position=>{
  if(token!==state.gpsToken||state.source!=='camera'||!$('gpsToggle').checked)return;
  // Discard latitude/longitude immediately. Do not derive speed from coordinates.
  const sample=locationSample(position,`${state.runId}-${log.locations.length+log.dropped.locations}`);sample.runId=state.runId;
  state.latestGPS=sample;append('locations',sample);state.gpsMessage=sample.speedMps===null?'Speed unavailable':`${number(sample.speedMps)} ${state.units==='mph'?'mph':'km/h'}`;
  $('gpsValue').textContent=state.gpsMessage;updateBenchmark();
 },error=>{if(token!==state.gpsToken)return;state.gpsMessage=error.code===1?'Permission denied':error.code===3?'Waiting for fix':'No location fix';$('gpsValue').textContent=state.gpsMessage;event('location-error',{code:error.code});},{enableHighAccuracy:true,maximumAge:0,timeout:12000});
}
async function releaseWake(){const lock=state.wake;state.wake=null;try{await lock?.release();}catch{}}
async function requestWake(id){try{const lock=await navigator.wakeLock?.request('screen');if(id===state.requestId&&state.source)state.wake=lock;else await lock?.release();}catch{}}
function stop(reason='Sensors stopped'){
 state.requestId++;state.source=null;if(state.rvfc&&video.cancelVideoFrameCallback)video.cancelVideoFrameCallback(state.rvfc);cancelAnimationFrame(state.raf);
 state.rvfc=0;state.raf=0;terminateWorker();stopGPS();state.stream?.getTracks().forEach(t=>t.stop());state.stream=null;video.pause();video.srcObject=null;
 releaseWake();camera.classList.remove('live');$('simulation').hidden=true;$('demoBadge').hidden=true;$('startButton').hidden=false;$('startButton').disabled=false;$('startButton').classList.remove('pending');
 clearReading(reason);event('stop',{reason});updateBenchmark();
}
function cameraRequest(){
 closeAnalysis();if(consentAccepted){startCamera();return;}$('consentGPS').checked=$('gpsToggle').checked;if(!$('onboarding').open)$('onboarding').showModal();
}
async function startCamera(){
 stop('Requesting camera permission');const request=state.requestId;$('startButton').disabled=true;$('startButton').classList.add('pending');
 try{
  if(!window.isSecureContext)throw new Error('Open this page over HTTPS, not a local file or ordinary HTTP.');
  if(!navigator.mediaDevices?.getUserMedia)throw new Error('This browser does not expose camera access. Open directly in Safari or Chrome.');
  const stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:640},height:{ideal:480},frameRate:{ideal:30,max:30}}});
  if(request!==state.requestId||document.hidden){stream.getTracks().forEach(t=>t.stop());return;}
  state.stream=stream;video.srcObject=stream;await video.play();
  if(request!==state.requestId||document.hidden){stream.getTracks().forEach(t=>t.stop());return;}
  if(!video.videoWidth||!video.videoHeight)throw new Error('Camera has not supplied video frames. Tap the camera to retry.');
  state.source='camera';state.settings=stream.getVideoTracks()[0]?.getSettings()||{};
  state.settings={width:state.settings.width,height:state.settings.height,frameRate:state.settings.frameRate,facingMode:state.settings.facingMode,resizeMode:state.settings.resizeMode};
  configure(...dimensions(video.videoWidth,video.videoHeight));camera.classList.add('live');$('startButton').hidden=true;$('startButton').classList.remove('pending');
  event('camera-start',{settings:state.settings,timestampSource:video.requestVideoFrameCallback?'mediaTime / browser frame timestamp':'currentTime / callback time'});cameraLoop();startGPS();requestWake(request);
  stream.getVideoTracks()[0]?.addEventListener('ended',()=>{if(stream===state.stream)stop('Camera stream ended');});
  if(objects.enabled)objects.load().catch(()=>{});
 }catch(error){if(request!==state.requestId)return;stop();const message=error.name==='NotAllowedError'?'Camera permission denied. Allow it in your browser’s site settings and retry.':error.name==='NotFoundError'?'No camera was found on this device.':error.name==='NotReadableError'?'Camera is busy or unavailable. Close other camera apps and retry.':error.message;status(message);event('camera-error',{message});openAnalysis();}
}
function startDemo(){
 const scenario=$('demoSelect').value;stop();state.source='synthetic';const id=state.requestId;
 state.sim=new RoadSimulator(384,288);state.sim.scenario=scenario;state.origin=performance.now();state.frameNo=0;
 const cv=$('simulation');cv.width=384;cv.height=288;cv.hidden=false;$('startButton').hidden=true;$('demoBadge').hidden=false;configure(384,288);
 $('demoTruth').textContent=`Synthetic scene: ${scenario==='rotation'?'stationary, rotating camera':scenario==='side'?'side-window motion at 36 km/h':'forward motion at 36 km/h'}. Truth is NOT passed to the estimator.`;
 $('gpsValue').textContent='Off in simulation';event('simulation-start',{scenario});closeAnalysis();
 let last=0;const context=cv.getContext('2d');
 function tick(now){if(state.source!=='synthetic'||id!==state.requestId)return;
  if(now-last>=65&&state.ready&&!state.busy){last=now;const t=state.frameNo++/25;const frame=state.sim.render(t);context.putImageData(frame.image,0,0);submitFrame(cv,t,performance.timeOrigin+state.origin+t*1000);}
  state.raf=requestAnimationFrame(tick);
 }state.raf=requestAnimationFrame(tick);
}
function updateBenchmark(){const m=summary(log.estimates,log.locations);$('pairError').textContent=m.maeMps===null?'—':number(m.maeMps,1);$('benchmarkNote').textContent=m.pairedFixes?`${m.pairedFixes} paired location fixes · mean signed error ${number(m.biasMps,1)} ${state.units==='mph'?'mph':'km/h'}. Browser agreement is not ground-truth accuracy.`:'GPS never calibrates the camera. Browser speed can be missing or inaccurate.';}
function plotCanvas(el){const rect=el.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=rect.width||340,h=rect.height||150;if(el.width!==Math.round(w*dpr)||el.height!==Math.round(h*dpr)){el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);}const c=el.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);return {c,w,h};}
function drawCharts(){
 if(!$('analysis').open)return;
 const {c,w,h}=plotCanvas($('historyPlot')),all=log.estimates,source=state.source||all.at(-1)?.source||'camera',last=all.filter(e=>e.source===source).at(-1),end=last?.epoch||Date.now(),start=end-60000;
 const es=all.filter(e=>e.source===source&&e.epoch>=start&&e.epoch<=end),gs=source==='camera'?log.locations.filter(g=>g.epoch>=start&&g.epoch<=end&&g.speedMps!==null):[];
 const ymax=Math.max(15,...es.filter(e=>e.ok).map(e=>e.high*factor()),...gs.map(g=>g.speedMps*factor()));
 const L=32,R=w-4,T=12,B=h-23,x=t=>L+(t-start)/60000*(R-L),y=v=>B-v*factor()/ymax*(B-T);
 c.font='10px system-ui';c.fillStyle='#abb2b1';c.lineWidth=1;
 for(let i=0;i<3;i++){const v=i*ymax/2,Y=B-i*(B-T)/2;c.strokeStyle='rgba(255,255,255,.09)';c.beginPath();c.moveTo(L,Y);c.lineTo(R,Y);c.stroke();c.fillText(v.toFixed(0),1,Y+3);}
 c.fillText('60s ago',L,h-5);c.fillText('now',R-22,h-5);
 c.fillStyle='rgba(132,222,199,.16)';let prev=null;
 for(const e of es){if(!e.ok){prev=null;continue;}if(prev&&e.epoch-prev.epoch<1200&&e.runId===prev.runId){c.beginPath();c.moveTo(x(prev.epoch),y(prev.high));c.lineTo(x(e.epoch),y(e.high));c.lineTo(x(e.epoch),y(e.low));c.lineTo(x(prev.epoch),y(prev.low));c.closePath();c.fill();}prev=e;}
 c.strokeStyle='#84dec7';c.lineWidth=2;c.beginPath();prev=null;
 for(const e of es){if(!e.ok){prev=null;continue;}if(prev&&e.epoch-prev.epoch<1200&&e.runId===prev.runId)c.lineTo(x(e.epoch),y(e.median));else c.moveTo(x(e.epoch),y(e.median));prev=e;}c.stroke();
 c.fillStyle='#d4d9df';for(const g of gs){c.beginPath();c.arc(x(g.epoch),y(g.speedMps),2.2,0,Math.PI*2);c.fill();}
 const d=plotCanvas($('densityPlot')),samples=state.result?.ok?state.result.samples:[];if(samples?.length){const max=Math.max(...samples)*1.07,bins=Array(28).fill(0);for(const v of samples)bins[Math.min(27,Math.floor(v/max*28))]++;const peak=Math.max(...bins);d.c.fillStyle='#84dec7';bins.forEach((v,i)=>{const bh=v/peak*(d.h-25);d.c.fillRect(i*d.w/28+1,d.h-18-bh,d.w/28-2,bh);});d.c.fillStyle='#abb2b1';d.c.font='10px system-ui';d.c.fillText('0',0,d.h-3);d.c.fillText(`${number(max)} ${state.units==='mph'?'mph':'km/h'}`,d.w-63,d.h-3);}
}
function drawOverlay(){const cv=$('overlay'),rect=camera.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);if(cv.width!==Math.round(rect.width*dpr)||cv.height!==Math.round(rect.height*dpr)){cv.width=Math.round(rect.width*dpr);cv.height=Math.round(rect.height*dpr);}const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,rect.width,rect.height);if(!$('tracksToggle').checked||!state.result?.ok)return;const s=Math.max(rect.width/state.width,rect.height/state.height),ox=(rect.width-state.width*s)/2,oy=(rect.height-state.height*s)/2;c.lineWidth=1;c.strokeStyle='rgba(132,222,199,.9)';c.fillStyle='#bdf7e9';for(const p of state.result.vectors||[]){c.beginPath();c.moveTo(ox+p.x*s,oy+p.y*s);c.lineTo(ox+p.u*s,oy+p.v*s);c.stroke();c.fillRect(ox+p.u*s-1,oy+p.v*s-1,2,2);}}
function download(text,type,extension){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=`parallax-${new Date().toISOString().replace(/[:.]/g,'-')}.${extension}`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);$('exportStatus').textContent=`Exported ${log.estimates.length} vision windows and ${log.locations.length} location fixes.`;}
function exportJSON(){const data={...log,exported:new Date().toISOString(),assumptions:{diagonalFovDeg:76,diagonalFovSD:12,heightMedianM:1.5,heightLogSD:.55,geometry:'automatic planar homography hypotheses',interval:'uncalibrated conditional model interval',scale:'engineering priors; no proven population calibration',gpsUsedForEstimation:false},device:{userAgent:navigator.userAgent,camera:state.settings},benchmark:summary(log.estimates,log.locations)};download(JSON.stringify(data,null,2),'application/json','json');}
$('startButton').addEventListener('click',cameraRequest);$('resumeCamera').addEventListener('click',cameraRequest);
$('acceptCamera').addEventListener('click',()=>{consentAccepted=true;try{sessionStorage.setItem('parallax-consent-v2','yes');}catch{}$('gpsToggle').checked=$('consentGPS').checked;$('onboarding').close();startCamera();});
$('cancelConsent').addEventListener('click',()=>$('onboarding').close());$('moreButton').addEventListener('click',openAnalysis);$('closeAnalysis').addEventListener('click',closeAnalysis);
$('stopButton').addEventListener('click',()=>stop());$('demoButton').addEventListener('click',startDemo);
$('gpsToggle').addEventListener('change',()=>{if($('gpsToggle').checked)startGPS();else stopGPS();});
$('objectsToggle').addEventListener('change',()=>{objects.enabled=$('objectsToggle').checked;if(objects.enabled&&state.source==='camera')objects.load().catch(()=>{});else {objects.reset();state.worker?.postMessage({type:'clear-objects',runId:state.runId});}});
$('tracksToggle').addEventListener('change',drawOverlay);
$('unitsSelect').addEventListener('change',()=>{state.units=$('unitsSelect').value;document.querySelectorAll('.unit-label').forEach(el=>el.textContent=state.units==='mph'?'mph':'km/h');$('unit').textContent=state.units==='mph'?'mph':'km/h';if(state.result)renderResult(state.result);if(state.latestGPS?.speedMps!==null&&state.latestGPS)$('gpsValue').textContent=`${number(state.latestGPS.speedMps)} ${$('unit').textContent}`;updateBenchmark();drawCharts();});
$('exportJSON').addEventListener('click',exportJSON);$('exportCSV').addEventListener('click',()=>download(makeCSV(log.estimates,log.locations),'text/csv','csv'));
let touchStart=null;camera.addEventListener('touchstart',e=>{touchStart=e.touches[0]?.clientY;},{passive:true});camera.addEventListener('touchend',e=>{if(touchStart!==null&&touchStart-(e.changedTouches[0]?.clientY??touchStart)>50)openAnalysis();touchStart=null;},{passive:true});
camera.addEventListener('wheel',e=>{if(e.deltaY>20)openAnalysis();},{passive:true});
for(const el of [$('analysis'),$('onboarding')])el.addEventListener('click',e=>{if(e.target!==el)return;const r=el.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)el.close();});
window.addEventListener('resize',()=>{drawOverlay();drawCharts();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&(state.source||state.stream||$('startButton').disabled))stop('Stopped when the page was hidden. Tap the camera to restart.');});
window.addEventListener('pagehide',()=>stop());
setInterval(()=>{
 if(state.source&&state.result&&performance.now()-state.lastResultAt>1200)clearReading('Waiting for fresh visual evidence');
 if(state.latestGPS&&Date.now()-state.latestGPS.epoch>7000)$('gpsValue').textContent='Stale fix';
 if(state.source&&state.worker&&performance.now()-state.lastReply>7000){event('worker-stall');configure(state.width,state.height);}
 if($('analysis').open){updateBenchmark();drawCharts();}
},500);
$('runtimeInfo').textContent=`Parallax 0.2.0 · ${mobile?'phone/tablet':'desktop'} browser · ${window.isSecureContext?'secure context':'HTTPS required'}`;
clearReading('Tap the camera to begin. No geometry setup.');
