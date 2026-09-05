/* Benchmark-only module. Never imported by core.js or vision-worker.js.
 * Position coordinates are deliberately discarded at the API boundary. */
export function locationSample(position, id) {
  const speed=position.coords.speed;
  return {id,epoch:position.timestamp,receivedEpoch:Date.now(),speedMps:typeof speed==='number'&&Number.isFinite(speed)&&speed>=0?speed:null,positionAccuracyM:typeof position.coords.accuracy==='number'&&Number.isFinite(position.coords.accuracy)?position.coords.accuracy:null,source:'browser_geolocation',speedAccuracyMps:null};
}
export function pairSamples(estimates, locations, toleranceMs=1000) {
  const pairs=[];
  const valid=estimates.filter(e=>e.source==='camera'&&e.ok&&e.metric&&Number.isFinite(e.midEpoch)).sort((a,b)=>a.midEpoch-b.midEpoch);
  const fixes=locations.filter(g=>g.speedMps!==null&&Number.isFinite(g.speedMps)&&g.source==='browser_geolocation'&&g.positionAccuracyM!==null&&g.positionAccuracyM<=30).sort((a,b)=>a.epoch-b.epoch);
  let cursor=0;
  for(const g of fixes){
    if(!valid.length)break;
    while(cursor+1<valid.length&&valid[cursor+1].midEpoch<=g.epoch)cursor++;
    const candidates=[valid[cursor],valid[cursor+1]].filter(Boolean);
    let best=null,delta=toleranceMs;
    for(const e of candidates){const d=Math.abs(e.midEpoch-g.epoch);if(d<delta){best=e;delta=d;}}
    if(best)pairs.push({gpsId:g.id,cameraEpoch:best.epoch,gpsEpoch:g.epoch,offsetMs:best.midEpoch-g.epoch,estimateMps:best.median,gpsMps:g.speedMps,errorMps:best.median-g.speedMps,lowMps:best.low,highMps:best.high,inside:g.speedMps>=best.low&&g.speedMps<=best.high});
  }
  return pairs;
}
export function summary(estimates,locations){const p=pairSamples(estimates,locations),n=p.length,valid=estimates.filter(e=>e.ok).length;return {pairedFixes:n,processedWindows:estimates.length,validWindows:valid,maeMps:n?p.reduce((s,e)=>s+Math.abs(e.errorMps),0)/n:null,biasMps:n?p.reduce((s,e)=>s+e.errorMps,0)/n:null,rmseMps:n?Math.sqrt(p.reduce((s,e)=>s+e.errorMps**2,0)/n):null,intervalHitRate:n?p.filter(e=>e.inside).length/n:null,pairs:p};}
export function csvCell(v){if(v===null||v===undefined)return '';const s=String(v);return /[",\n\r]/.test(s)?`"${s.replaceAll('"','""')}"`:s;}
export function makeCSV(estimates,locations){
  const header=['kind','source','epoch_ms','mid_epoch_ms','interval_start_epoch_ms','interval_end_epoch_ms','status','speed_mps','model95_low_mps','model95_high_mps','relative_heights_per_s','gps_speed_mps','gps_position_accuracy_m','tracks','inliers','reprojection_px','window_s','processing_ms','scale_mode','reason'];
  const rows=estimates.map(e=>({t:e.epoch,row:['vision',e.source,e.epoch,e.midEpoch,e.intervalStartEpoch,e.intervalEndEpoch,e.status,e.ok&&e.metric?e.median:null,e.ok&&e.metric?e.low:null,e.ok&&e.metric?e.high:null,e.ok?e.relativeMedian:null,null,null,e.tracks,e.inliers,e.reprojectionPx,e.windowSeconds,e.computeMs,e.scaleMode,e.reason]}));
  for(const g of locations)rows.push({t:g.epoch,row:['benchmark',g.source,g.epoch,null,null,null,g.speedMps===null?'speed_unavailable':'available',null,null,null,null,g.speedMps,g.positionAccuracyM,null,null,null,null,null,null,'Not input to vision estimator; position accuracy is not speed accuracy']});
  rows.sort((a,b)=>a.t-b.t);return [header,...rows.map(e=>e.row)].map(r=>r.map(csvCell).join(',')).join('\r\n');
}
