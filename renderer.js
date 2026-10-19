// This existing file is loaded once as a context-isolated preload and again by
// index.html; keep the bridge narrow and run the animation only in the page world.
if (typeof require === 'function' && typeof process !== 'undefined' && process.contextIsolated) {
  const { contextBridge, ipcRenderer } = require('electron');
  contextBridge.exposeInMainWorld('poojaDecor', {
    setMouseIgnored: ignore => ipcRenderer.send('pooja-decor:set-mouse-ignored', Boolean(ignore))
  });
} else {
const c=document.getElementById('c'),x=c.getContext('2d'),P=document.getElementById('pattai'),B=document.getElementById('bell');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TAU=6.2832;
let W,H,S,T=0;
const R=n=>{const v=Math.sin(n*127.1)*43758.5453;return v-Math.floor(v)};

function fit(){
  const d=Math.min(devicePixelRatio||1,2);
  W=innerWidth;H=innerHeight;S=Math.max(.55,Math.min(1.25,W/1400));
  c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);
  P.style.width=150*S+'px';P.style.top=(6*S+96*S-6*S)+'px';
  if(RM)frame(0);
}

/* ---------- flowers ---------- */
function marigold(px,py,r,rot,k){
  const C=k?['#E8750A','#FFB000','#FFD84D']:['#C94A08','#F28C0C','#FFC21A'];
  x.save();x.translate(px,py);x.rotate(rot);
  for(let l=0;l<3;l++){
    const n=13-l*3,rr=r*(1-l*.27);x.fillStyle=C[l];x.rotate(.3);
    for(let i=0;i<n;i++){x.rotate(TAU/n);x.beginPath();x.ellipse(rr*.55,0,rr*.46,rr*.21,0,0,TAU);x.fill()}
  }
  x.fillStyle='#8a3a05';x.beginPath();x.arc(0,0,r*.12,0,TAU);x.fill();x.restore();
}
function bud(px,py,r,rot){
  x.save();x.translate(px,py);x.rotate(rot);x.fillStyle='#FFFBEF';x.beginPath();x.ellipse(0,0,r,r*.55,0,0,TAU);x.fill();
  x.fillStyle='#e9d9a8';x.beginPath();x.arc(r*.6,0,r*.2,0,TAU);x.fill();x.restore();
}

/* ---------- garland across the top ---------- */
const y0=()=>6*S;
const swags=()=>[{a:-10,b:W*.25,g:46*S},{a:W*.25,b:W*.75,g:96*S},{a:W*.75,b:W+10,g:46*S}];
const pt=(s,t)=>({x:s.a+(s.b-s.a)*t,y:y0()+s.g*4*t*(1-t)});
function strand(px,py,L,seed){
  const dx=y=>RM?0:Math.sin(T*1.5+seed+y*.03)*3*(y/L);
  x.strokeStyle='rgba(110,80,40,.7)';x.lineWidth=1;x.beginPath();x.moveTo(px,py);
  for(let y=0;y<=L;y+=6)x.lineTo(px+dx(y),py+y);x.stroke();
  for(let y=8*S;y<L;y+=8*S)bud(px+dx(y),py+y,4.4*S,Math.PI/2+dx(y)*.1);
  marigold(px+dx(L),py+L+5*S,7.5*S,seed,seed%2);
}
function garland(){
  x.lineWidth=1.5;x.strokeStyle='#5b3a1a';
  swags().forEach((s,si)=>{
    x.beginPath();
    for(let t=0;t<=1.001;t+=.02){const p=pt(s,t);t?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y)}
    x.stroke();
    const n=Math.round((s.b-s.a)/(21*S));
    for(let i=0;i<=n;i++){
      const p=pt(s,i/n),sway=RM?0:Math.sin(T*1.3+p.x*.012)*1.6;
      marigold(p.x,p.y+sway,(11+i%3)*S,i*.7,(i+si)%2);
      if(i%4===2&&Math.abs(p.x-W/2)>130*S)strand(p.x,p.y+sway,(38+R(i+si*50)*70)*S,i+si);
    }
  });
}

/* ---------- brass plate: kumkum, vibhuti, turmeric ---------- */
function plate(){
  const cx=Math.max(150*S,W*.12),cy=H-52*S,rx=118*S,ry=34*S;
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(cx,cy+ry*.9,rx*1.02,ry*.55,0,0,TAU);x.fill();
  let g=x.createLinearGradient(cx-rx,0,cx+rx,0);
  g.addColorStop(0,'#7a4e12');g.addColorStop(.3,'#f0c15a');g.addColorStop(.55,'#b98320');g.addColorStop(1,'#6b430e');
  x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,TAU);x.fill();
  x.fillStyle='#4a2d09';x.beginPath();x.ellipse(cx,cy+1,rx*.88,ry*.82,0,0,TAU);x.fill();
  g=x.createLinearGradient(cx-rx,0,cx+rx,0);g.addColorStop(0,'#8a5c14');g.addColorStop(.5,'#d9a640');g.addColorStop(1,'#80520f');
  x.fillStyle=g;x.beginPath();x.ellipse(cx,cy+2,rx*.84,ry*.76,0,0,TAU);x.fill();
  [{d:-.42,a:'#ff4a3a',b:'#a50c12',r:30},{d:0,a:'#ffffff',b:'#c4bcab',r:32},{d:.42,a:'#ffd23a',b:'#d98200',r:28}].forEach((m,k)=>{
    const mx=cx+m.d*rx,my=cy+ry*.18,w=m.r*S*1.1,h=m.r*S*.9;
    const rg=x.createRadialGradient(mx-w*.3,my-h*.7,2,mx,my-h*.3,w*1.2);rg.addColorStop(0,m.a);rg.addColorStop(1,m.b);
    x.fillStyle=rg;x.beginPath();x.moveTo(mx-w,my);x.bezierCurveTo(mx-w*.6,my-h*1.1,mx+w*.6,my-h*1.1,mx+w,my);
    x.ellipse(mx,my,w,w*.28,0,0,Math.PI);x.fill();
    x.fillStyle='rgba(255,255,255,.28)';
    for(let i=0;i<26;i++){const u=R(i+k*40),v=R(i*3+k*7);x.fillRect(mx-w*.7+u*w*1.4,my-h*.8*v*(1-Math.abs(u-.5)),1.2,1.2)}
  });
  for(let i=0;i<7;i++){
    const a=Math.PI*(.08+i*.14),px=cx+Math.cos(a)*rx*.78,py=cy+Math.sin(a)*ry*.62+3;
    i%2?bud(px,py,5*S,i):marigold(px,py,8.5*S,i,i%3===0);
  }
}

/* ---------- agarbathi with smoke ---------- */
const tips=[],sm=[];
function incense(){
  const bx=W-Math.max(120*S,W*.09),by=H-36*S;
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(bx,by+24*S,50*S,9*S,0,0,TAU);x.fill();
  let g=x.createLinearGradient(bx-44*S,0,bx+44*S,0);
  g.addColorStop(0,'#6b430e');g.addColorStop(.35,'#f0c15a');g.addColorStop(1,'#7a4e12');
  x.fillStyle=g;x.beginPath();x.moveTo(bx-44*S,by);x.lineTo(bx-28*S,by+24*S);x.lineTo(bx+28*S,by+24*S);x.lineTo(bx+44*S,by);x.fill();
  x.beginPath();x.ellipse(bx,by,44*S,13*S,0,0,TAU);x.fill();
  x.fillStyle='#cfc7b7';x.beginPath();x.ellipse(bx,by,39*S,9.5*S,0,0,TAU);x.fill();
  [[-18,-.32,175],[2,-.05,205],[20,.24,150]].forEach(([o,a,L],i)=>{
    const sx=bx+o*S,sy=by,ex=sx+Math.sin(a)*L*S,ey=sy-Math.cos(a)*L*S,mx=sx+(ex-sx)*.68,my=sy+(ey-sy)*.68;
    x.lineCap='round';x.lineWidth=2.4*S;x.strokeStyle='#c79a5a';x.beginPath();x.moveTo(sx,sy);x.lineTo(mx,my);x.stroke();
    x.lineWidth=3*S;x.strokeStyle='#6b3a1c';x.beginPath();x.moveTo(mx,my);x.lineTo(ex,ey);x.stroke();
    const f=RM?.8:.7+.3*Math.sin(T*7+i*2),eg=x.createRadialGradient(ex,ey,0,ex,ey,11*S);
    eg.addColorStop(0,`rgba(255,170,60,${f})`);eg.addColorStop(.35,`rgba(255,100,20,${f*.45})`);eg.addColorStop(1,'rgba(255,80,0,0)');
    x.fillStyle=eg;x.beginPath();x.arc(ex,ey,11*S,0,TAU);x.fill();
    x.fillStyle='#ffd08a';x.beginPath();x.arc(ex,ey,1.6*S,0,TAU);x.fill();
    tips.push({x:ex,y:ey});
  });
}
function smoke(){
  if(!RM)tips.forEach(p=>{if(Math.random()<.35)sm.push({x:p.x,y:p.y,r:2*S,l:0,s:Math.random()*9,L:260+Math.random()*140})});
  for(let i=sm.length-1;i>=0;i--){
    const q=sm[i];q.l++;
    if(q.l>q.L){sm.splice(i,1);continue}
    q.y-=.75*S+q.l*.002;q.x+=Math.sin(q.l*.035+q.s)*.55*S+.12*S;q.r+=.11*S;
    const a=.2*(1-q.l/q.L)*Math.min(1,q.l/12),rg=x.createRadialGradient(q.x,q.y,0,q.x,q.y,q.r);
    rg.addColorStop(0,`rgba(238,232,224,${a})`);rg.addColorStop(1,'rgba(238,232,224,0)');
    x.fillStyle=rg;x.beginPath();x.arc(q.x,q.y,q.r,0,TAU);x.fill();
  }
}

/* ---------- drifting petals ---------- */
const pet=Array.from({length:18},(_,i)=>({x:R(i),y:R(i+9),v:.25+R(i+3)*.4,w:R(i+5)*6,c:['#F28C0C','#FFC21A','#fff6e0','#e8506a'][i%4],z:.6+R(i+7)*.7}));
function petals(){
  pet.forEach(p=>{
    if(!RM){p.y+=p.v*.0012;if(p.y>1.05)p.y=-.05}
    x.save();x.translate((p.x+Math.sin(T*.6+p.w)*.03)*W,p.y*H);x.rotate(T*.8+p.w);
    x.globalAlpha=.9;x.fillStyle=p.c;x.beginPath();x.ellipse(0,0,6*p.z*S,3*p.z*S,0,0,TAU);x.fill();x.restore();
  });
}

function frame(t){
  T=t/1000;x.clearRect(0,0,W,H);tips.length=0;
  plate();incense();smoke();garland();petals();
  if(!RM)requestAnimationFrame(frame);
}

/* ---------- interactive puja bell ---------- */
let bellDragging=false,bellLastX=0,bellDirection=0,bellMoved=false,bellRang=false,bellLastStrike=0,audioContext=null;
function setMouseIgnored(ignore){window.poojaDecor?.setMouseIgnored(ignore)}
function overBell(px,py){const r=B.getBoundingClientRect();return px>=r.left&&px<=r.right&&py>=r.top&&py<=r.bottom}
function playBellSound(){
  try{
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio)return;
    audioContext??=new Audio();
    if(audioContext.state==='suspended')audioContext.resume();
    const now=audioContext.currentTime;
    [[526,.095,2.5],[1051,.065,2.15],[1584,.04,1.8],[2117,.022,1.35]].forEach(([frequency,volume,duration])=>{
      const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
      oscillator.type='sine';oscillator.frequency.value=frequency;
      gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(volume,now+.012);
      gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
      oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(now);oscillator.stop(now+duration+.03);
    });
  }catch{}
}
function ringBell(){
  const now=performance.now();
  if(now-bellLastStrike<130)return false;
  bellLastStrike=now;
  B.classList.remove('ringing');void B.offsetWidth;B.classList.add('ringing');
  playBellSound();
  return true;
}
addEventListener('mousemove',e=>{
  const inside=overBell(e.clientX,e.clientY);
  setMouseIgnored(!(inside||bellDragging));
  if(!bellDragging)return;
  const dx=e.clientX-bellLastX;
  if(Math.abs(dx)>=4){
    bellMoved=true;
    const direction=Math.sign(dx);
    if(bellDirection&&direction!==bellDirection&&ringBell())bellRang=true;
    bellDirection=direction;
  }
  bellLastX=e.clientX;
},{passive:true});
B.addEventListener('pointerdown',e=>{
  if(e.button!==0)return;
  bellDragging=true;bellLastX=e.clientX;bellDirection=0;bellMoved=false;bellRang=false;
  setMouseIgnored(false);B.classList.add('dragging');
  try{B.setPointerCapture(e.pointerId)}catch{}
  e.preventDefault();
});
function endBellGesture(e){
  if(!bellDragging)return;
  bellDragging=false;B.classList.remove('dragging');
  setMouseIgnored(!overBell(e.clientX,e.clientY));
  if(!bellRang)ringBell();
}
B.addEventListener('pointerup',endBellGesture);
B.addEventListener('pointercancel',endBellGesture);

addEventListener('resize',fit);
fit();
if(!RM)requestAnimationFrame(frame);
}
