import { useState, useEffect, useRef } from "react";

const C = {
  navy: "#0B1F3A", blue: "#1565C0", aqua: "#00B8D9", teal: "#00897B",
  white: "#F8FAFC", slate: "#94A3B8", light: "#E2EDF7", card: "#132235",
  danger: "#EF4444", warn: "#F59E0B", ok: "#22C55E",
};

const s = {
  app: { fontFamily: "'DM Sans','Segoe UI',sans-serif", background: C.navy, minHeight:"100vh", color: C.white, maxWidth: 480, margin:"0 auto", position:"relative" },
  card: { background: C.card, borderRadius: 16, padding:"16px", marginBottom: 12, border:"1px solid rgba(0,184,217,0.12)" },
  input: { background:"rgba(255,255,255,0.07)", border:"1px solid rgba(0,184,217,0.25)", borderRadius: 10, color: C.white, padding:"10px 14px", width:"100%", fontSize: 14, outline:"none", boxSizing:"border-box" },
  label: { fontSize: 11, color: C.aqua, fontWeight: 700, letterSpacing: 1, marginBottom: 4, display:"block", textTransform:"uppercase" },
  btn: { background:`linear-gradient(135deg,${C.aqua},${C.blue})`, color:"#fff", border:"none", borderRadius: 12, padding:"12px 20px", fontWeight: 700, fontSize: 14, cursor:"pointer", width:"100%" },
  btnG: { background:"transparent", color: C.aqua, border:`1px solid ${C.aqua}`, borderRadius: 12, padding:"10px 20px", fontWeight: 600, fontSize: 13, cursor:"pointer" },
  h2: { fontSize: 18, fontWeight: 800, marginBottom: 16, color: C.white },
  h3: { fontSize: 14, fontWeight: 700, marginBottom: 8, color: C.aqua },
};

const badge = (color, txt) => (
  <span style={{ display:"inline-block", background: color+"22", color, border:`1px solid ${color}44`, borderRadius: 20, padding:"2px 10px", fontSize: 11, fontWeight: 700 }}>{txt}</span>
);

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon:"💧", title:"Welcome to BluPool Command", sub:"Your AI-powered field intelligence platform — built exclusively for the BluPool team." },
    { icon:"📡", title:"Live IoT Monitoring", sub:"Track pH, chlorine, temperature, and turbidity across all your properties in real time." },
    { icon:"🤖", title:"AI Chemistry Advisor", sub:"Enter your readings and get instant, specific dosing recommendations tailored to each pool." },
    { icon:"📋", title:"Professional Reports", sub:"Auto-generate branded service reports ready to share with clients in seconds." },
  ];
  const cur = steps[step];
  return (
    <div style={{ ...s.app, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding: 32, textAlign:"center", minHeight:"100vh" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>🌊</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.aqua, letterSpacing: 2, textTransform:"uppercase" }}>BluPool</div>
        <div style={{ fontSize: 11, color: C.slate, letterSpacing: 3, textTransform:"uppercase" }}>Command Center</div>
      </div>
      <div style={{ ...s.card, width:"100%", padding: 28, marginBottom: 32, minHeight: 180, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>{cur.icon}</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{cur.title}</div>
        <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.6 }}>{cur.sub}</div>
      </div>
      <div style={{ display:"flex", gap: 6, marginBottom: 32 }}>
        {steps.map((_,i) => <div key={i} style={{ width: i===step?20:6, height: 6, borderRadius: 3, background: i===step?C.aqua:C.slate, transition:"all 0.3s" }} />)}
      </div>
      {step < steps.length - 1
        ? <button style={s.btn} onClick={() => setStep(step+1)}>Next →</button>
        : <button style={s.btn} onClick={onDone}>Get Started 🚀</button>}
      {step > 0 && <button style={{ background:"none", border:"none", color: C.slate, cursor:"pointer", marginTop: 12, fontSize: 13 }} onClick={() => setStep(step-1)}>← Back</button>}
    </div>
  );
}

// ── JOBS ──────────────────────────────────────────────────────────────────────
const jobData = [
  { id:1, address:"1420 Marine Dr, West Van", time:"8:00 AM", type:"Chemical Check", status:"pending" },
  { id:2, address:"872 Duchess Ave, West Van", time:"10:30 AM", type:"Full Service", status:"done" },
  { id:3, address:"3310 Cypress Bowl Rd", time:"1:00 PM", type:"Equipment Check", status:"pending" },
  { id:4, address:"5892 Eagle Harbour Rd", time:"3:30 PM", type:"Chemical Check", status:"pending" },
];
function Jobs() {
  const [jobs, setJobs] = useState(jobData);
  const toggle = id => setJobs(jobs.map(j => j.id===id ? {...j, status: j.status==="done"?"pending":"done"} : j));
  const done = jobs.filter(j => j.status==="done").length;
  return (
    <div style={{ padding: 16 }}>
      <div style={s.h2}>Today's Jobs</div>
      <div style={{ ...s.card, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div><div style={{ fontSize: 28, fontWeight: 900, color: C.aqua }}>{done}/{jobs.length}</div><div style={{ fontSize: 12, color: C.slate }}>Jobs completed</div></div>
        <div style={{ width:60, height:60, borderRadius:"50%", border:`4px solid ${C.aqua}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:C.aqua }}>{Math.round(done/jobs.length*100)}%</div>
      </div>
      {jobs.map(j => (
        <div key={j.id} style={{ ...s.card, display:"flex", alignItems:"center", gap:12, opacity: j.status==="done"?0.6:1 }}>
          <button onClick={() => toggle(j.id)} style={{ width:28, height:28, borderRadius:"50%", border:`2px solid ${j.status==="done"?C.ok:C.slate}`, background: j.status==="done"?C.ok:"transparent", color:"#fff", fontSize:14, cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{j.status==="done"?"✓":""}</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:600, textDecoration: j.status==="done"?"line-through":"none", color: j.status==="done"?C.slate:C.white }}>{j.address}</div>
            <div style={{ fontSize:11, color:C.slate, marginTop:2 }}>{j.time} · {j.type}</div>
          </div>
          {badge(j.type==="Full Service"?C.aqua:j.type==="Equipment Check"?C.warn:C.teal, j.type.split(" ")[0])}
        </div>
      ))}
    </div>
  );
}

// ── IOT ───────────────────────────────────────────────────────────────────────
const sites = [
  { name:"1420 Marine Dr", pH:7.4, chlorine:2.1, temp:28, turbidity:0.8 },
  { name:"872 Duchess Ave", pH:6.9, chlorine:0.8, temp:26, turbidity:2.4 },
  { name:"3310 Cypress Bowl", pH:7.8, chlorine:3.2, temp:30, turbidity:0.3 },
  { name:"5892 Eagle Harbour", pH:7.2, chlorine:1.9, temp:27, turbidity:1.1 },
];
function sc(k, v) {
  if (k==="pH") return v>=7.2&&v<=7.6?C.ok:v>=7.0&&v<=7.8?C.warn:C.danger;
  if (k==="chlorine") return v>=1.0&&v<=3.0?C.ok:v>=0.5&&v<=4.0?C.warn:C.danger;
  if (k==="turbidity") return v<1?C.ok:v<2?C.warn:C.danger;
  return C.ok;
}
function IoT() {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ padding: 16 }}>
      <div style={s.h2}>Live IoT Dashboard</div>
      <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
        {sites.map((site,i) => {
          const alert = site.pH<7.0||site.pH>7.8||site.chlorine<0.5||site.turbidity>2;
          return <button key={i} onClick={() => setSel(sel===i?null:i)} style={{ background: sel===i?C.aqua:"rgba(255,255,255,0.07)", border:`1px solid ${sel===i?C.aqua:"transparent"}`, color: sel===i?C.navy:C.white, borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{alert?"🔴":"🟢"} Site {i+1}</button>;
        })}
      </div>
      {sites.map((site,i) => (sel!==null&&sel!==i)?null:(
        <div key={i} style={s.card}>
          <div style={s.h3}>{site.name}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["pH",site.pH,"7.2–7.6"],["Chlorine",site.chlorine+" ppm","1–3 ppm"],["Temp",site.temp+"°C","26–32°C"],["Turbidity",site.turbidity+" NTU","<1 NTU"]].map(([k,v,r]) => {
              const color = k==="Temp"?C.ok:sc(k.toLowerCase(),parseFloat(v));
              return (
                <div key={k} style={{ background:"rgba(0,0,0,0.2)", borderRadius:10, padding:"10px 12px", borderLeft:`3px solid ${color}` }}>
                  <div style={{ fontSize:10, color:C.slate, textTransform:"uppercase" }}>{k}</div>
                  <div style={{ fontSize:20, fontWeight:800, color }}>{v}</div>
                  <div style={{ fontSize:10, color:C.slate }}>Target: {r}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── CHECKLIST ─────────────────────────────────────────────────────────────────
const checks = [
  { id:1, task:"Test pH level", note:"If <7.2 add sodium carbonate. If >7.8 add muriatic acid.", critical:true },
  { id:2, task:"Test free chlorine", note:"Target 1–3 ppm. Low? Add liquid chlorine or shock.", critical:true },
  { id:3, task:"Check pump pressure", note:"High pressure (>25 PSI) = dirty filter. Clean or backwash.", critical:false },
  { id:4, task:"Inspect skimmer baskets", note:"Empty and rinse. Clogged baskets restrict flow.", critical:false },
  { id:5, task:"Check total alkalinity", note:"Target 80–120 ppm. Adjust before pH if off.", critical:true },
  { id:6, task:"Brush walls and floor", note:"Focus on steps and corners — algae starts here.", critical:false },
  { id:7, task:"Inspect equipment for leaks", note:"Check pump lid, filter housing, and valve unions.", critical:false },
  { id:8, task:"Record all readings", note:"Use Service Report tab to log and generate client report.", critical:false },
];
function Checklist() {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <div style={{ padding: 16 }}>
      <div style={s.h2}>Service Checklist</div>
      <div style={{ ...s.card, marginBottom: 16 }}>
        <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:13, color:C.slate }}>Progress</span><span style={{ fontSize:13, fontWeight:700, color:C.aqua }}>{done}/{checks.length}</span></div>
        <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:3, marginTop:8 }}>
          <div style={{ height:"100%", width:`${done/checks.length*100}%`, background:`linear-gradient(90deg,${C.teal},${C.aqua})`, borderRadius:3, transition:"width 0.3s" }} />
        </div>
      </div>
      {checks.map(item => (
        <div key={item.id} style={{ ...s.card, padding:"12px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={() => setChecked(c => ({...c,[item.id]:!c[item.id]}))} style={{ width:24, height:24, borderRadius:6, border:`2px solid ${checked[item.id]?C.ok:C.slate}`, background: checked[item.id]?C.ok:"transparent", color:"#fff", fontSize:12, cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{checked[item.id]?"✓":""}</button>
            <div style={{ flex:1, fontSize:13, fontWeight:600, textDecoration:checked[item.id]?"line-through":"none", color:checked[item.id]?C.slate:C.white }}>{item.task}</div>
            {item.critical && badge(C.danger,"Critical")}
            <button onClick={() => setExpanded(e => ({...e,[item.id]:!e[item.id]}))} style={{ background:"none", border:"none", color:C.slate, cursor:"pointer", fontSize:16 }}>{expanded[item.id]?"▲":"▼"}</button>
          </div>
          {expanded[item.id] && <div style={{ marginTop:10, padding:"8px 12px", background:"rgba(0,184,217,0.08)", borderRadius:8, fontSize:12, color:C.slate, lineHeight:1.6, borderLeft:`2px solid ${C.aqua}` }}>💡 {item.note}</div>}
        </div>
      ))}
    </div>
  );
}

// ── DOSING ────────────────────────────────────────────────────────────────────
function Dosing() {
  const [vol, setVol] = useState(50000);
  const [pH, setPH] = useState(7.0);
  const [cl, setCl] = useState(0.5);
  const [alk, setAlk] = useState(70);
  const pHUp = pH<7.2 ? Math.round((7.4-pH)*vol*0.0012*10)/10 : 0;
  const pHDn = pH>7.8 ? Math.round((pH-7.4)*vol*0.001*10)/10 : 0;
  const clD = cl<1.0 ? Math.round((2.0-cl)*vol*0.000013*10)/10 : 0;
  const alkD = alk<80 ? Math.round((100-alk)*vol*0.0000018*10)/10 : 0;
  const Slider = ({label,val,min,max,step,unit,set}) => (
    <div style={{ marginBottom:14 }}>
      <label style={s.label}>{label}</label>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(parseFloat(e.target.value))} style={{ flex:1, accentColor:C.aqua }} />
        <span style={{ fontSize:14, fontWeight:700, color:C.aqua, minWidth:60, textAlign:"right" }}>{val}{unit}</span>
      </div>
    </div>
  );
  const Dose = ({label,dose,unit,color,note}) => dose>0 ? (
    <div style={{ ...s.card, borderLeft:`3px solid ${color}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <span style={{ fontSize:13, fontWeight:600 }}>{label}</span>
        <span style={{ fontSize:20, fontWeight:900, color }}>{dose} {unit}</span>
      </div>
      <div style={{ fontSize:11, color:C.slate }}>💡 {note}</div>
    </div>
  ) : null;
  return (
    <div style={{ padding:16 }}>
      <div style={s.h2}>Dosing Calculator</div>
      <div style={s.card}>
        <Slider label="Pool Volume" val={vol} min={10000} max={200000} step={1000} unit=" L" set={setVol} />
        <Slider label="Current pH" val={pH} min={6.0} max={9.0} step={0.1} unit="" set={setPH} />
        <Slider label="Free Chlorine" val={cl} min={0} max={6} step={0.1} unit=" ppm" set={setCl} />
        <Slider label="Total Alkalinity" val={alk} min={40} max={200} step={5} unit=" ppm" set={setAlk} />
      </div>
      <div style={s.h3}>Recommended Doses</div>
      <Dose label="Sodium Carbonate (pH up)" dose={pHUp} unit="kg" color={C.ok} note="Add slowly near return jets with pump running" />
      <Dose label="Muriatic Acid (pH down)" dose={pHDn} unit="L" color={C.danger} note="Dilute in bucket first. Add near deep end." />
      <Dose label="Liquid Chlorine (shock)" dose={clD} unit="L" color={C.aqua} note="Add at dusk. Retest in 4–6 hours." />
      <Dose label="Sodium Bicarb (alk up)" dose={alkD} unit="kg" color={C.warn} note="Add before adjusting pH. Wait 1 hr then retest." />
      {pHUp===0&&pHDn===0&&clD===0&&alkD===0 && (
        <div style={{ ...s.card, borderLeft:`3px solid ${C.ok}`, textAlign:"center" }}>
          <div style={{ fontSize:24 }}>✅</div>
          <div style={{ fontWeight:700, color:C.ok }}>All levels in range — no dosing needed.</div>
        </div>
      )}
    </div>
  );
}

// ── EQUIPMENT ─────────────────────────────────────────────────────────────────
const equip = [
  { site:"1420 Marine Dr", items:[{name:"Pentair WhisperFlo Pump",installed:"2021-06",next:"2025-06"},{name:"Hayward Pro-Grid Filter",installed:"2020-03",next:"2024-09"}] },
  { site:"872 Duchess Ave", items:[{name:"Jandy JEP Series Pump",installed:"2022-01",next:"2026-01"},{name:"Zodiac Clearwater LM3 Chlorinator",installed:"2022-01",next:"2025-07"}] },
];
function Equipment() {
  return (
    <div style={{ padding:16 }}>
      <div style={s.h2}>Equipment Registry</div>
      {equip.map((site,i) => (
        <div key={i} style={s.card}>
          <div style={s.h3}>{site.site}</div>
          {site.items.map((eq,j) => {
            const due = new Date(eq.next) < new Date();
            return (
              <div key={j} style={{ padding:"10px 0", borderBottom: j<site.items.length-1?"1px solid rgba(255,255,255,0.06)":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>🔧 {eq.name}</span>
                  {badge(due?C.danger:C.ok,due?"OVERDUE":"OK")}
                </div>
                <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>Installed {eq.installed} · Next service {eq.next}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── INVENTORY ─────────────────────────────────────────────────────────────────
const invData = [
  {id:1,item:"Liquid Chlorine (4L)",qty:6,min:4},{id:2,item:"Muriatic Acid (4L)",qty:2,min:2},
  {id:3,item:"Sodium Bicarb (5kg)",qty:3,min:2},{id:4,item:"Sodium Carbonate (5kg)",qty:1,min:2},
  {id:5,item:"Test Strips",qty:45,min:20},{id:6,item:"Algaecide (1L)",qty:3,min:2},
  {id:7,item:"Filter Cleaner",qty:2,min:1},{id:8,item:"Rubber Gloves",qty:4,min:2},
];
function Inventory() {
  const [inv, setInv] = useState(invData);
  const adj = (id,d) => setInv(inv.map(i => i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i));
  return (
    <div style={{ padding:16 }}>
      <div style={s.h2}>Van Inventory</div>
      {inv.map(item => {
        const low = item.qty<=item.min;
        return (
          <div key={item.id} style={{ ...s.card, padding:"10px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600 }}>{item.item}</div>
                <div style={{ fontSize:11, color:C.slate, marginTop:2 }}>Min: {item.min}</div>
              </div>
              {low && badge(C.danger,"LOW")}
              <button onClick={() => adj(item.id,-1)} style={{ width:28,height:28,borderRadius:8,background:"rgba(255,255,255,0.08)",border:"none",color:C.white,fontSize:18,cursor:"pointer" }}>−</button>
              <span style={{ minWidth:28, textAlign:"center", fontWeight:800, color: low?C.danger:C.white }}>{item.qty}</span>
              <button onClick={() => adj(item.id,1)} style={{ width:28,height:28,borderRadius:8,background:C.aqua+"33",border:"none",color:C.aqua,fontSize:18,cursor:"pointer" }}>+</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── AI ASSISTANT (Upgraded) ───────────────────────────────────────────────────
function AI() {
  const [r, setR] = useState({site:"",vol:"",pH:"",cl:"",alk:"",temp:"",turb:""});
  const [msgs, setMsgs] = useState([{role:"assistant",text:"👋 Hey! I'm your BluPool AI Advisor. Enter your pool readings above and I'll give you specific chemical action steps — no guessing required."}]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  const analyze = async () => {
    if (!r.pH && !r.cl) { setMsgs(m => [...m,{role:"assistant",text:"Please enter at least your pH and chlorine readings."}]); return; }
    setLoading(true);
    const prompt = `You are an expert pool chemistry advisor for BluPool, a professional pool service company in Vancouver, BC.
Field technician readings:
- Site: ${r.site||"Not specified"}
- Pool Volume: ${r.vol?r.vol+" litres":"Not specified"}
- pH: ${r.pH||"Not measured"}
- Free Chlorine: ${r.cl?r.cl+" ppm":"Not measured"}
- Total Alkalinity: ${r.alk?r.alk+" ppm":"Not measured"}
- Temperature: ${r.temp?r.temp+"°C":"Not measured"}
- Turbidity: ${r.turb?r.turb+" NTU":"Not measured"}

Ideal: pH 7.2-7.6, Chlorine 1-3 ppm, Alkalinity 80-120 ppm, Turbidity <1 NTU.

Give a concise professional analysis:
1. Quick overall status (1 sentence)
2. Specific chemical adjustments with EXACT doses (if volume given, calculate kg or litres)
3. Order of operations
4. Safety notes
5. When to retest

Be direct and practical. Use bullet points. Under 250 words.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      const text = data.content?.find(b=>b.type==="text")?.text||"Unable to get recommendations.";
      setMsgs(m => [...m,{role:"user",text:`📊 Readings: pH ${r.pH||"—"}, Cl ${r.cl||"—"} ppm, Alk ${r.alk||"—"} ppm`},{role:"assistant",text}]);
    } catch { setMsgs(m => [...m,{role:"assistant",text:"⚠️ Connection error. Try again."}]); }
    setLoading(false);
  };

  const ask = async () => {
    if (!q.trim()) return;
    const question = q; setQ(""); setLoading(true);
    setMsgs(m => [...m,{role:"user",text:question}]);
    try {
      const history = msgs.map(m => ({role:m.role==="assistant"?"assistant":"user",content:m.text}));
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are an expert pool chemistry and equipment advisor for BluPool in Vancouver, BC. Answer concisely and practically. Focus on what a field technician can act on immediately.",messages:[...history,{role:"user",content:question}]})});
      const data = await res.json();
      const text = data.content?.find(b=>b.type==="text")?.text||"No response.";
      setMsgs(m => [...m,{role:"assistant",text}]);
    } catch { setMsgs(m => [...m,{role:"assistant",text:"⚠️ Error. Try again."}]); }
    setLoading(false);
  };

  return (
    <div style={{ padding:16 }}>
      <div style={s.h2}>AI Chemistry Advisor</div>
      <div style={s.card}>
        <div style={s.h3}>Enter Today's Readings</div>
        <div style={{ marginBottom:10 }}>
          <label style={s.label}>Site Name</label>
          <input style={s.input} placeholder="e.g. 1420 Marine Dr" value={r.site} onChange={e=>setR({...r,site:e.target.value})} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
          {[["vol","Volume (L)","number"],["pH","pH Level","number"],["cl","Chlorine (ppm)","number"],["alk","Alkalinity (ppm)","number"],["temp","Temp (°C)","number"],["turb","Turbidity (NTU)","number"]].map(([k,label,type]) => (
            <div key={k}>
              <label style={s.label}>{label}</label>
              <input type={type} step="0.1" style={s.input} placeholder={label} value={r[k]} onChange={e=>setR({...r,[k]:e.target.value})} />
            </div>
          ))}
        </div>
        <button style={s.btn} onClick={analyze} disabled={loading}>{loading?"Analyzing...":"🧪 Analyze Readings"}</button>
      </div>
      <div style={{ ...s.card, maxHeight:340, overflowY:"auto", padding:12 }}>
        {msgs.map((m,i) => (
          <div key={i} style={{ marginBottom:12, display:"flex", flexDirection:"column", alignItems: m.role==="user"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"88%", padding:"10px 14px", borderRadius: m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", background: m.role==="user"?`linear-gradient(135deg,${C.aqua},${C.blue})`:"rgba(255,255,255,0.07)", fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{m.text}</div>
          </div>
        ))}
        {loading && <div style={{ fontSize:12, color:C.slate, padding:8 }}>AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display:"flex", gap:8, marginTop:8 }}>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask anything about pool chemistry..." style={{ ...s.input, flex:1 }} />
        <button onClick={ask} disabled={loading} style={{ ...s.btn, width:"auto", padding:"10px 16px" }}>→</button>
      </div>
    </div>
  );
}

// ── SERVICE REPORT (Polished) ─────────────────────────────────────────────────
function Report() {
  const today = new Date().toLocaleDateString("en-CA",{year:"numeric",month:"long",day:"numeric"});
  const [f, setF] = useState({site:"",tech:"",date:today,vol:"",pH:"",cl:"",alk:"",temp:"",turb:"",chems:"",work:"",notes:"",next:""});
  const [done, setDone] = useState(false);
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const Field = ({label,k,type="text",placeholder}) => (
    <div style={{ marginBottom:12 }}>
      <label style={s.label}>{label}</label>
      <input type={type} step="0.1" placeholder={placeholder||label} value={f[k]} onChange={e=>set(k,e.target.value)} style={s.input} />
    </div>
  );
  const Textarea = ({label,k,placeholder}) => (
    <div style={{ marginBottom:12 }}>
      <label style={s.label}>{label}</label>
      <textarea placeholder={placeholder||label} value={f[k]} onChange={e=>set(k,e.target.value)} style={{ ...s.input, resize:"none", minHeight:70 }} />
    </div>
  );

  if (done) return (
    <div style={{ padding:16 }}>
      <div style={s.h2}>Service Report</div>
      <div style={{ background:"#fff", color:"#0B1F3A", borderRadius:16, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>
        <div style={{ background:"linear-gradient(135deg,#0B1F3A,#1565C0)", padding:"20px 24px", color:"#fff" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontSize:22, fontWeight:900, letterSpacing:1 }}>🌊 BLUPOOL</div>
              <div style={{ fontSize:10, letterSpacing:3, color:"#00B8D9", textTransform:"uppercase", marginTop:2 }}>Professional Pool Services</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>SERVICE REPORT</div>
              <div style={{ fontSize:11, fontWeight:700 }}>#{Math.floor(Math.random()*9000+1000)}</div>
            </div>
          </div>
        </div>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid #E2EDF7", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[["Property",f.site],["Date",f.date],["Technician",f.tech],["Pool Volume",f.vol?f.vol+" L":"—"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:10, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1, marginBottom:2 }}>{k}</div><div style={{ fontSize:14, fontWeight:700 }}>{v||"—"}</div></div>
          ))}
        </div>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid #E2EDF7" }}>
          <div style={{ fontSize:11, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:12 }}>Water Chemistry</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            {[["pH",f.pH,"7.2–7.6"],["Chlorine",f.cl?f.cl+" ppm":"—","1–3 ppm"],["Alkalinity",f.alk?f.alk+" ppm":"—","80–120"],["Temp",f.temp?f.temp+"°C":"—","26–32°C"],["Turbidity",f.turb?f.turb+" NTU":"—","<1 NTU"]].map(([k,v,r]) => (
              <div key={k} style={{ background:"#F8FAFC", borderRadius:8, padding:"8px 10px", border:"1px solid #E2EDF7" }}>
                <div style={{ fontSize:9, color:"#94A3B8", textTransform:"uppercase" }}>{k}</div>
                <div style={{ fontSize:16, fontWeight:800, color:"#0B1F3A" }}>{v||"—"}</div>
                <div style={{ fontSize:9, color:"#94A3B8" }}>Target: {r}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid #E2EDF7" }}>
          <div style={{ fontSize:11, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:8 }}>Work Completed</div>
          <div style={{ fontSize:13, lineHeight:1.6 }}>{f.work||"—"}</div>
        </div>
        {f.chems && <div style={{ padding:"16px 20px", borderBottom:"1px solid #E2EDF7" }}><div style={{ fontSize:11, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:8 }}>Chemicals Added</div><div style={{ fontSize:13, lineHeight:1.6 }}>{f.chems}</div></div>}
        <div style={{ padding:"16px 20px" }}>
          {f.notes && <div style={{ marginBottom:12 }}><div style={{ fontSize:11, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1, fontWeight:700, marginBottom:4 }}>Notes</div><div style={{ fontSize:13, lineHeight:1.6 }}>{f.notes}</div></div>}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"1px solid #E2EDF7" }}>
            <div style={{ fontSize:11, color:"#94A3B8" }}>Next scheduled visit</div>
            <div style={{ fontSize:13, fontWeight:700, color:"#1565C0" }}>{f.next||"TBD"}</div>
          </div>
        </div>
        <div style={{ background:"#F8FAFC", padding:"12px 20px", textAlign:"center" }}>
          <div style={{ fontSize:10, color:"#94A3B8" }}>BluPool Professional Services · Vancouver, BC · Generated by BluPool Command</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, marginTop:16 }}>
        <button style={{ ...s.btnG, flex:1 }} onClick={() => setDone(false)}>← Edit</button>
        <button style={{ ...s.btn, flex:1 }} onClick={() => window.print()}>📄 Share Report</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:16 }}>
      <div style={s.h2}>Service Report</div>
      <div style={s.card}>
        <div style={s.h3}>Site & Technician</div>
        <Field label="Property Address" k="site" />
        <Field label="Technician Name" k="tech" />
        <Field label="Service Date" k="date" />
        <Field label="Pool Volume (L)" k="vol" type="number" />
      </div>
      <div style={s.card}>
        <div style={s.h3}>Water Chemistry</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Field label="pH" k="pH" type="number" />
          <Field label="Chlorine (ppm)" k="cl" type="number" />
          <Field label="Alkalinity (ppm)" k="alk" type="number" />
          <Field label="Temp (°C)" k="temp" type="number" />
          <Field label="Turbidity (NTU)" k="turb" type="number" />
        </div>
      </div>
      <div style={s.card}>
        <div style={s.h3}>Service Details</div>
        <Textarea label="Work Completed" k="work" placeholder="Describe all tasks completed..." />
        <Textarea label="Chemicals Added" k="chems" placeholder="e.g. 2L liquid chlorine, 0.5kg sodium carbonate..." />
        <Textarea label="Notes / Observations" k="notes" placeholder="Issues, recommendations, follow-ups..." />
        <Field label="Next Visit Date" k="next" />
      </div>
      <button style={s.btn} onClick={() => setDone(true)}>Generate Report →</button>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
const TABS = [
  {id:"jobs",label:"Jobs",icon:"📋"},{id:"iot",label:"Live",icon:"📡"},{id:"check",label:"Check",icon:"✅"},
  {id:"dose",label:"Dose",icon:"🧪"},{id:"equip",label:"Equip",icon:"🔧"},{id:"van",label:"Van",icon:"🚐"},
  {id:"ai",label:"AI",icon:"🤖"},{id:"report",label:"Report",icon:"📄"},
];

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [tab, setTab] = useState("jobs");
  if (!onboarded) return <Onboarding onDone={() => setOnboarded(true)} />;
  const Page = () => {
    switch(tab) {
      case "jobs": return <Jobs />;
      case "iot": return <IoT />;
      case "check": return <Checklist />;
      case "dose": return <Dosing />;
      case "equip": return <Equipment />;
      case "van": return <Inventory />;
      case "ai": return <AI />;
      case "report": return <Report />;
      default: return <Jobs />;
    }
  };
  return (
    <div style={s.app}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},#0d2a4a)`, padding:"16px 20px 12px", borderBottom:"1px solid rgba(0,184,217,0.15)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:16, fontWeight:900, color:C.aqua, letterSpacing:1 }}>🌊 BLUPOOL</div>
          <div style={{ fontSize:10, color:C.slate, letterSpacing:2, textTransform:"uppercase" }}>Command Center</div>
        </div>
        <div style={{ fontSize:11, color:C.slate }}>{new Date().toLocaleDateString("en-CA",{weekday:"short",month:"short",day:"numeric"})}</div>
      </div>
      <div style={{ paddingBottom:80, overflowY:"auto", maxHeight:"calc(100vh - 130px)" }}><Page /></div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"#0d1e35", borderTop:"1px solid rgba(0,184,217,0.15)", display:"flex", justifyContent:"space-around", padding:"8px 0 10px", zIndex:100 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 6px", opacity: tab===t.id?1:0.45 }}>
            <span style={{ fontSize:18 }}>{t.icon}</span>
            <span style={{ fontSize:9, color: tab===t.id?C.aqua:C.slate, fontWeight: tab===t.id?700:400, letterSpacing:0.5 }}>{t.label}</span>
            {tab===t.id && <div style={{ width:4, height:4, borderRadius:"50%", background:C.aqua }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
