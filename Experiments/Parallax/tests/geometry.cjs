const assert=require('node:assert/strict'),C=require('../math.js'),A=require('../engine.js'),T=require('../tracker.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS',name);}
const I=[1,0,0,0,1,0,0,0,1],outer=(u,v)=>u.flatMap(x=>v.map(y=>x*y));
function H(t,n,R=I){const o=outer(t,n);return R.map((x,i)=>x+o[i]);}
function pixelHomography(H,w,h){const K=C.intrinsics(w,h,76);return C.mm(C.mm(K.K,H),K.Ki);}
function matches(H,w=384,h=288){const hp=pixelHomography(H,w,h),ps=[];for(let y=75;y<h-15;y+=13)for(let x=20;x<w-15;x+=17){const [u,v]=C.project(hp,x,y);if(u>12&&u<w-12&&v>12&&v<h-12)ps.push({x,y,u,v});}return ps;}
test('eigen decomposition reconstructs symmetric input',()=>{const m=[3,.2,.4,.2,2,.1,.4,.1,1],d=A.eigenSymmetric(m);for(let j=0;j<3;j++){const diff=C.sub(C.mv(m,d.vectors[j]),C.mul(d.vectors[j],d.values[j]));assert(C.norm(diff)<1e-8);}});
const n=C.unit([.08,1,.20]);
for(const [name,t] of [['forward',[0,0,-.13]],['side',[-.16,0,0]],['oblique',[-.09,0,-.1]]])test('automatic normal recovery: '+name,()=>{const ds=A.decompose(H(t,n));assert(ds.some(d=>C.dot(d.n||[0,0,0],n)>.9999&&C.norm(C.sub(d.t,t))<1e-6));});
test('pure rotation decomposition',()=>{const a=.08,R=[Math.cos(a),0,Math.sin(a),0,1,0,-Math.sin(a),0,Math.cos(a)],ds=A.decompose(R);assert(ds.every(d=>C.norm(d.t)<1e-5));});
test('fit recovers a known homography',()=>{const p=[{x:-.4,y:-.3},{x:.4,y:-.3},{x:.4,y:.3},{x:-.4,y:.3},{x:.2,y:.1}],h=[1.1,.01,.02,-.01,1.02,.03,.001,.02,1];p.forEach(a=>{[a.u,a.v]=C.project(h,a.x,a.y);});const fit=C.fitHomography(p);assert(p.every(a=>C.norm(C.sub(C.project(fit,a.x,a.y),[a.u,a.v]))<1e-7));});
test('engine handles forward geometry with no user inputs',()=>{const e=new A.AutoEstimator(384,288),r=e.process(matches(H([0,0,-.15],n)),.04,1,1000);assert(r.ok,JSON.stringify(r));assert(r.low<r.median&&r.median<r.high);console.log('forward median / interval',r.median,r.low,r.high);});
test('engine handles side view with no user inputs',()=>{const e=new A.AutoEstimator(384,288),r=e.process(matches(H([-.15,0,0],n)),.04,1,1000);assert(r.ok,JSON.stringify(r));});
test('insufficient tracks refuses',()=>assert.equal(new A.AutoEstimator(384,288).process([], .1,1,1).ok,false));
test('frame gap refuses',()=>assert.equal(new A.AutoEstimator(384,288).process(matches(H([-.1,0,0],n)),1,1,1).ok,false));
test('exact stationary rotation refuses',()=>{const a=.08,R=[Math.cos(a),0,Math.sin(a),0,1,0,-Math.sin(a),0,Math.cos(a)];assert.equal(new A.AutoEstimator(384,288).process(matches(R),.04,1,1).ok,false);});
test('scale prior stays uncertain with no references',()=>{const bank=new A.ScaleBank(),d=bank.distribution(76,1);assert(bank.sample(d,.975)/bank.sample(d,.025)>6);});
test('same tracked object remains one reference',()=>{const bank=new A.ScaleBank(),g={n:[0,1,.2],w:384,h:288,fov:76},o={class:'person',score:.92,bbox:[.35,.25,.12,.5],id:1};for(let i=0;i<100;i++)bank.observe([o],g,i*.01);assert.equal(bank.refs.size,1);const d=bank.distribution(76,1);assert(d.weights.every(Number.isFinite));});
test('expired references no longer constrain scale',()=>{const bank=new A.ScaleBank(),g={n:[0,1,.2],w:384,h:288,fov:76};bank.observe([{class:'person',score:.92,bbox:[.35,.25,.12,.5],id:1}],g,0);assert.deepEqual(bank.distribution(76,100).classes,[]);});
console.log(`${count} geometry checks passed.`);
