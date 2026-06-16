import { useState, useMemo } from "react";
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";

const PMI_DATA = [
  50.3,47.6,48.3,48.8,48.8,49.8,50,49.2,44.8,38.9,36.5,33.1,
  34.9,35.5,36,39.5,41.7,45.8,49.9,53.5,54.4,56,54.4,55.3,
  57.2,55.8,58.8,58.1,58.3,56.4,56.4,58,56.3,57.7,57.6,57.5,
  59,59.3,59.1,58.9,53.7,56.6,52.9,53,52.8,51.8,52.1,53.1,
  52.8,52.4,53,53.7,53.2,51,50.6,51.1,52.2,51.2,49.5,50.4,
  52.3,53.1,51.5,50,50,52.5,54.9,56.3,56,56.6,57,56.5,
  51.3,54.3,54.4,55.3,55.6,55.7,56.4,58.1,56.1,57.9,57.6,55.1,
  53.5,52.9,51.5,51.5,52.8,53.5,52.7,51.1,50.2,49.4,48.4,48,
  48.2,49.7,51.7,50.7,51,52.8,52.3,49.4,51.7,52,53.5,54.5,
  56,57.6,56.6,55.3,55.5,56.7,56.5,59.3,60.2,58.5,58.2,59.7,
  59.1,60.8,59.3,57.3,58.7,60.2,58.1,61.3,59.8,57.7,59.3,54.3,
  56.6,54.2,55.3,52.8,52.1,51.7,51.2,49.1,47.8,48.3,48.1,47.8,
  50.9,50.1,49.1,41.5,43.1,52.6,54.2,56,55.4,59.3,57.5,60.5,
  58.7,60.8,64.7,60.7,61.2,60.6,59.5,59.9,61.1,60.8,61.1,58.8,
  57.6,58.6,57.1,55.4,56.1,53,52.8,52.8,50.9,50.2,49,48.4,
  47.4,47.7,46.3,47.1,46.9,46,46.4,47.6,49,46.7,46.7,47.1,
  49.1,47.8,50.3,49.2,48.7,48.5,46.8,47.2,47.2,46.5,48.4,49.2,
  50.9,50.3,49,48.7,48.5,49,48,48.7,49.1,48.7,48.2,47.9,
  52.6,52.4,52.7,52.7,54.0,
];
const GREY_DATA = [
  -68,-83,-121,-132,-124,-104,-112,-113,-103,-96,-144,-231,
  -224,-185,-174,-156,-146,-138,-144,-108,-112,-114,-75,-51,
  -1,-4,33,15,-45,-90,-99,-118,-116,-123,-29,105,
  77,71,59,33,-12,-75,-60,-129,-142,-123,-134,-162,
  -176,-173,-167,-180,-162,-158,-145,-97,-81,-79,-124,-152,
  -138,-158,-145,-179,-124,-67,-38,44,75,46,66,93,
  89,73,56,67,75,98,101,74,80,54,70,39,
  -3,-2,1,25,21,5,-26,-60,-56,-55,-46,-66,
  -77,-92,-84,-91,-74,-96,-104,-86,-89,-53,-19,32,
  55,44,51,38,16,-16,0,7,3,29,9,16,
  49,108,95,106,117,127,139,130,137,139,98,34,
  27,23,-7,20,9,-12,-26,-58,-52,-65,-58,-48,
  -82,-149,-199,-223,-233,-225,-227,-214,-231,-238,-224,-190,
  -163,-133,-67,-83,-79,-60,-76,-33,-37,-14,-23,-40,
  0,56,147,225,225,248,227,217,314,324,300,272,
  247,242,222,190,197,237,267,295,326,336,293,245,
  238,237,188,169,158,117,136,96,-10,23,48,57,
  100,76,36,76,84,52,28,-3,-41,-70,-17,42,
  44,22,13,-22,0,
];
const RED_DATA = [
  36,68,60,63,41,33,54,55,6,35,61,110,
  82,41,31,7,-38,-37,-68,-83,-121,-132,-124,-104,
  -112,-113,-103,-96,-144,-231,-224,-185,-174,-156,-146,-138,
  -144,-108,-112,-114,-75,-51,-1,-4,33,15,-45,-90,
  -99,-118,-116,-123,-29,105,77,71,59,33,-12,-75,
  -60,-129,-142,-123,-134,-162,-176,-173,-167,-180,-162,-158,
  -145,-97,-81,-79,-124,-152,-138,-158,-145,-179,-124,-67,
  -38,44,75,46,66,93,89,73,56,67,75,98,
  101,74,80,54,70,39,-3,-2,1,25,21,5,
  -26,-60,-56,-55,-46,-66,-77,-92,-84,-91,-74,-96,
  -104,-86,-89,-53,-19,32,55,44,51,38,16,-16,
  0,7,3,29,9,16,49,108,95,106,117,127,
  139,130,137,139,98,34,27,23,-7,20,9,-12,
  -26,-58,-52,-65,-58,-48,-82,-149,-199,-223,-233,-225,
  -227,-214,-231,-238,-224,-190,-163,-133,-67,-83,-79,-60,
  -76,-33,-37,-14,-23,-40,0,56,147,225,225,248,
  227,217,314,324,300,272,247,242,222,190,197,237,
  267,295,326,336,293,245,238,237,188,169,158,117,
  136,96,-10,23,48,
];

function genLabels(){const mo=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];const out=[];let y=2008,m=0;for(let i=0;i<221;i++){out.push(mo[m]+"-"+String(y).slice(2));m++;if(m===12){m=0;y++;}}return out;}
const LABELS=genLabels();
const HIST=LABELS.map((t,i)=>({t,pmi:PMI_DATA[i],grey:GREY_DATA[i],red:RED_DATA[i]}));
const INAUGURATIONS=[{t:"Jan-09",label:"Obama I",color:"#1565C0"},{t:"Jan-13",label:"Obama II",color:"#1565C0"},{t:"Jan-17",label:"Trump I",color:"#B71C1C"},{t:"Jan-21",label:"Biden",color:"#1565C0"},{t:"Jan-25",label:"Trump II",color:"#B71C1C"}];
const CASES=[{id:"reagan",title:"Reagan I & II",period:"Jan 1981 – Jan 1989",tag:"Tightening Inherited",tagC:"#B71C1C",monetary:"Inherited Volcker's 20% Fed Funds Rate — the most aggressive tightening in modern history. Pipeline flush took 18 months; PMI collapsed to 35 before recovering as Volcker pivoted to easing in mid-1982. Reagan II inherited a neutral-to-easing environment that sustained moderate expansion.",fiscal:"Military spending rose +43% (GDP share: 4.4% to 6.0%). ERTA tax cuts enacted 1981. Fiscal multipliers delayed 2-3 years. A&D stocks gained +12% immediately post-election but reverted to the business cycle within 6 months. Deficits widened sharply.",pmi:"1981-82: PMI collapsed to 35-38 (bear market). 1983-84: V-shape recovery to PMI 60+ as Volcker's easing pipeline cleared. Mid-to-late 1980s: stable 50-58."},{id:"bush",title:"George H.W. Bush",period:"Jan 1989 – Jan 1993",tag:"Tightening in Pipeline",tagC:"#B71C1C",monetary:"Inherited lagged effects of 1987-88 rate hikes. 10Y yield 2-year change (advanced 18M) turned positive at inauguration. LEIs sank in 1989. S&P 500 entered a bear market despite perceived pro-growth agenda.",fiscal:"No major fiscal expansion. Gulf War spending modest relative to GDP. Read my lips tax pledge reversed. Structural deficit concerns constrained discretionary action.",pmi:"1989-90: Steady decline from 60 to 45. 1990-91 recession pushed PMI to 42-45. Framework prediction was correct."},{id:"obama1",title:"Obama I",period:"Jan 2009 – Jan 2013",tag:"Deep Easing Pipeline",tagC:"#1565C0",monetary:"Inherited $600B+ QE and near-zero FFR. Advanced 18M yield signal was at its most negative in the dataset. The Obama Rally was Bernanke's legacy: monetary stimulus was already in transit 18 months before PMI bottomed.",fiscal:"ARRA ($787B stimulus) enacted Feb 2009. Fiscal multiplier modest vs. monetary impulse scale. PMI recovered before most fiscal measures could transmit.",pmi:"Trough at 32.9 (Jan 2009) coinciding with inauguration. V-shape: 33 to 60+ over 18 months. Perfectly aligned with 18M-advanced yield signal."},{id:"obama2",title:"Obama II",period:"Jan 2013 – Jan 2017",tag:"Neutral Pipeline",tagC:"#546E7A",monetary:"Fed still at zero bound; QE3 tapering signal loomed (May 2013 Taper Tantrum). 18M-advanced signal near zero. Framework prediction: neutral PMI, no major directional swing. Confirmed precisely.",fiscal:"Budget sequestration provided fiscal drag. Deficit reduction constrained spending. Fiscal multiplier modestly negative in near-term.",pmi:"Stable 50-57 throughout term. No V-shape, no collapse. The neutral inheritance case."},{id:"trump1",title:"Trump I",period:"Jan 2017 – Jan 2021",tag:"Mild Tightening",tagC:"#E65100",monetary:"Inherited lagged Yellen rate hikes (2015-16). 18M signal mildly positive at inauguration. PMI held 55-60 through 2017-18. By 2019, accumulated tightening pulled PMI below 50. COVID (Mar 2020) was an exogenous break.",fiscal:"TCJA 2017: corporate rate cut 35% to 21%. Sector trades surged post-election but reverted within 6-12 months. Trade tariffs raised input costs.",pmi:"2017-18: 55-60. 2019: declining to 47.8. COVID shock: 41.5 (Apr 2020). Post-COVID V-shape driven by Fed QE, not Trump policy."},{id:"biden",title:"Biden",period:"Jan 2021 – Jan 2025",tag:"Peak Easing to Fastest Tightening",tagC:"#1565C0",monetary:"The most complete monetary pipeline experiment in modern history. Inherited COVID QE (Fed balance sheet $8.9T). Then 525bps of tightening (2022-23). PMI collapsed from 64.7 to 46 with mechanical precision, 18 months after tightening began.",fiscal:"ARP ($1.9T), Infrastructure ($1.2T), IRA ($369B). Fiscal spending contributed to inflation overshoot but PMI trajectory was driven entirely by the monetary pipeline.",pmi:"Jan-21: 58.7 to Mar-21: 64.7 (all-time high). Collapse: 57 to 50 to 46 (Nov-23 trough). Perfect round-trip predicted by the 18M-advanced yield signal."}];
const T_OPTS=[{v:"exit",l:"Exit",sub:"122 lapses, no replace",d:2.2,c:"#1B5E20"},{v:"renew",l:"Renew",sub:"301/232 bridge holds",d:0.0,c:"#E65100"},{v:"escalate",l:"Escalate",sub:"301/232 set higher",d:-2.8,c:"#B71C1C"}];
const I_OPTS=[{v:"converge",l:"Converge",sub:"Core PCE < 2.5%",d:1.2,c:"#1B5E20"},{v:"sticky",l:"Sticky",sub:"PCE 2.5-3.0%",d:0.0,c:"#E65100"},{v:"rebound",l:"Rebound",sub:"PCE > 3.0%",d:-2.0,c:"#B71C1C"}];
const F_OPTS=[{v:"dove",l:"Dovish",sub:"2 cuts (tail risk)",d:1.5,c:"#1B5E20"},{v:"neutral",l:"Neutral",sub:"Hold, no cuts",d:0.0,c:"#E65100"},{v:"hawk",l:"Hawkish",sub:"Hike late-2026",d:-2.0,c:"#B71C1C"}];
const PROBS={tariff:{exit:0.30,renew:0.50,escalate:0.20},inflation:{converge:0.30,sticky:0.40,rebound:0.30},fed:{dove:0.10,neutral:0.55,hawk:0.35}};
const FWD=["Jun-26","Jul-26","Aug-26","Sep-26","Oct-26","Nov-26","Dec-26","Jan-27","Feb-27","Mar-27","Apr-27","May-27","Jun-27","Jul-27","Aug-27","Sep-27","Oct-27","Nov-27","Dec-27"];

function getThemes(tariff,inflation,fed){
  const tD=T_OPTS.find(o=>o.v===tariff).d;
  const iD=I_OPTS.find(o=>o.v===inflation).d;
  const fD=F_OPTS.find(o=>o.v===fed).d;
  const tot=tD+iD+fD;
  const up=tot>0,dn=tot<-2;
  return[
    {theme:"Geopolitics & Trade",status:tariff==="exit"?"Easing":tariff==="renew"?"Uncertain":"Escalating",statusC:tariff==="exit"?"#1B5E20":tariff==="renew"?"#E65100":"#B71C1C",drivers:tariff==="exit"?"Sec.122 lapses Jul-24 · 301/232 gap leaves effective rate falling · Near-shoring reactivates":tariff==="renew"?"Sec.122 expires Jul-24 · 301/232 rebuilds the wall · Effective rate ~7.2% holds · CIT appeal pending":"Sec.301 forced-labor/capacity + Sec.232 pharma stack higher · EU/Canada retaliation risk",risk:tariff==="exit"?"Pharma Sec.232 (Jul-31/Sep-29) reflates":tariff==="renew"?"301 final determinations exceed 122 rate":"Supply chains re-fracture; truce at risk"},
    {theme:"Inflation",status:inflation==="converge"?"Contained":inflation==="sticky"?"Sticky":"Re-accelerating",statusC:inflation==="converge"?"#1B5E20":inflation==="sticky"?"#E65100":"#B71C1C",drivers:inflation==="converge"?"Core PCE back < 2.5% · Energy fades as Hormuz reopens · Core goods deflating":inflation==="sticky"?"Core PCE 2.5-3.0% · Services sticky (shelter 3.4%) · Core goods soft":"CPI 4.2% (3-yr high) · Core PCE 3.3% · Energy +23.5% on Iran shock · ISM Prices Paid 82.1",risk:inflation==="converge"?"Hormuz re-closes; oil re-spikes":inflation==="sticky"?"Energy shock leaks into core":"Hike bias hardens; expectations de-anchor"},
    {theme:"Unemployment",status:up?"Stabilizing":dn?"Deteriorating":"Edging Higher",statusC:up?"#1B5E20":dn?"#B71C1C":"#E65100",drivers:up?"ISM employment recovering · Reshoring capex hiring · Labor market tightens 4.2-4.3%":dn?"Mfg jobs shed · ISM employment < 45 · UR rises to 4.6-4.8%":"UR edging to 4.4% · Job growth below 100K/mo · Construction + mfg weak",risk:up?"Labor shortage caps output":dn?"Recession unemployment feedback":"Fed dual-mandate conflict sharpens"},
    {theme:"Productivity",status:up?"Improving":dn?"Declining":"Flat",statusC:up?"#1B5E20":dn?"#B71C1C":"#E65100",drivers:up?"AI capex cycle · Reshoring automation · Semiconductor ramp-up":dn?"High borrowing cost delays capex · Margin squeeze shelves investment":"AI data center supports tech mfg · Broad mfg flat · Near-shoring positive",risk:up?"AI bubble correction":dn?"Lost capex cycle compounds":"Uneven sectoral productivity gap"},
    {theme:"Monetary Policy",status:fed==="dove"?"Easing":fed==="neutral"?"On Hold":"Tightening Risk",statusC:fed==="dove"?"#1B5E20":fed==="neutral"?"#E65100":"#B71C1C",drivers:fed==="dove"?"Warsh pivots to cuts · FFR toward 3.0-3.25% · Mfg credit cost falls ~50bps":fed==="neutral"?"Warsh holds FFR 3.5-3.75% (3rd mtg, 8-4 split) · Cuts off the table · EFFR 3.62%":"Warsh: 2% non-negotiable · Futures price FFR ~3.8% late-26 · Hike if energy leaks to core",risk:fed==="dove"?"Inflation re-acceleration forces reversal":fed==="neutral"?"Credibility if core PCE stalls at 3.3%":"Hike collides with the locked-in easing pipeline"},
    {theme:"Fiscal Policy",status:"Slow Transmission",statusC:"#546E7A",drivers:"Fiscal multipliers lag 2-3 years (Reagan precedent) · Tax cut capex pass-through: 12-18mo · Defense contracts: 2-3yr from auth to spend",risk:"Deficit expansion crowds out private investment · IEEPA tariff refunds ($130B) complicate 2026 budget math"}
  ];
}

const GEO={exit:"Sec.122's 10% surcharge lapses Jul-24 and the Sec.301/232 replacements leave a gap — effective tariff rate drifts below today's ~7.2%. Near-shoring supply chains reactivate in Mexico and Vietnam. Trade-uncertainty premium exits capital expenditure decisions.",renew:"Sec.122 expires Jul-24 but USTR's Sec.301 (forced-labor, excess-capacity) and Sec.232 (pharma) remedies rebuild the wall on a more durable footing — effective rate ~7.2% holds. CIT struck 122 down (May-7) but only for named plaintiffs; appeal pending. Trade policy stays the #1 ISM-cited cost risk.",escalate:"Sec.301 final determinations land above the 122 rate and Sec.232 pharma (Jul-31/Sep-29) stacks on top. EU/Canada retaliation re-engages; China truce strained. Supply chains re-fracture. The one configuration that can override the monetary pipeline."};
const ECO={"exit-converge":"Dual tailwind: import-cost relief + energy disinflation as Hormuz reopens. ISM Prices Paid (82.1 in May) falls toward 60. PMI expansion shifts from inflation-driven pre-buy to genuine demand. The healthiest profile.","exit-sticky":"Supply-side relief partially offset by sticky services inflation (shelter 3.4%). Net mild positive for margins. New orders (56.8 in May) stay firm, led by tech/defense/auto. PMI grinds higher but does not accelerate.","exit-rebound":"Tariff relief negated by the Iran energy shock (CPI 4.2%). Consumer real income squeezed; Fed cannot ease into it. Net neutral to modestly negative for PMI.","renew-converge":"Policy-visibility gap restrains capex even as energy fades and real incomes recover. PMI oscillates near 53. Constructive but directionless.","renew-rebound":"Jun-26 reality: 301/232 wall holds + CPI 4.2% / core PCE 3.3% on the energy shock. Yet PMI sits at 54 — manufacturing is shrugging off energy-led inflation because core goods are deflating and demand (new orders 56.8) is strong. Risk is one-sided: if energy leaks into core and Warsh hikes, PMI rolls toward 50-52 in H2-26.","renew-sticky":"Watchful expansion: 301/232 wall + core PCE easing back toward 2.5-3%. Price pressures persist but moderate. PMI 53-55 modal, pending the Jul-24 tariff fork.","escalate-converge":"Structural contradiction: high tariffs are inflationary, but convergence implies weak global demand. PMI drifts 49-52 in a high-cost, low-demand equilibrium.","escalate-sticky":"Classic stagflation setup: cost-push (tariffs + energy) on sticky prices. Fed cannot cut. 1970s precedent: PMI 45-50 for extended periods.","escalate-rebound":"Extreme tail: max tariff + energy/inflation overshoot forces Warsh to hike into the cycle. PMI breaks below 45 only in 2008 GFC, COVID, and the 1981-82 Volcker shock."};
const MON={dove:"Now a tail: Warsh would have to prioritize employment over the final inflation mile. Two cuts (~50bps) take FFR to 3.0-3.25% and cut mfg lending rates. With core PCE at 3.3% and CPI at 4.2%, a pivot to cuts would risk de-anchoring inflation expectations — hence low odds.",neutral:"Base case. Warsh (chair since May-15) holds FFR at 3.5-3.75% for a third straight meeting; the May vote split 8-4, the most divided since 1992. Cuts are now off the table for 2026. EFFR sits at 3.62%. The locked-in easing pipeline supports PMI even as the Fed stands pat.",hawk:"Materializing risk: futures price FFR drifting to ~3.8% by late-2026. If the Iran energy shock leaks from headline into core, Warsh's 2%-non-negotiable stance turns into a hike — colliding head-on with the easing pipeline still clearing through. Volcker parallel."};
const FISCAL="Reagan (1981): enacted 43% defense spending increase immediately yet PMI collapsed to 35 within 12 months as Volcker's pipeline cleared. Fiscal multipliers for government procurement run 24-36 months from authorization to economic impact.\n\nCurrent situation: even if Congress enacts major tax cuts or infrastructure, PMI signal in 2026-27 will be driven by (1) the monetary pipeline already locked in and (2) tariff policy shocks. Fiscal policy's PMI contribution begins materializing in 2028+.\n\nThis is the inherited economy principle: presidents receive economic credit or blame for conditions they did not create.";
function getChartText(tot){if(tot>=1)return"PIPELINE ALIGNMENT: Selection is consistent with the 18M-advanced yield signal. The 175bps of Fed cuts (Sep-Dec 2025) already delivered the recovery — PMI 47.9 to 54.0. Historical parallel: Obama I. Direction confirmed; policy variables set the magnitude, not the sign.";if(tot>=-2)return"PARTIAL OFFSET: The easing pipeline still points up, but the Iran energy shock and Warsh's hike bias are consuming part of the impulse. Framework directionally valid, magnitude compressed. Effective easing = pipeline minus policy drag.";return"PIPELINE DISRUPTION: This combination replicates the only case where the 18M signal failed — COVID (Mar-May 2020). A tariff/energy inflation overshoot that forces Warsh to hike can bypass the standard transmission mechanism. The framework's documented failure mode.";}
function HistTip({active,payload,label}){if(!active||!payload||!payload.length)return null;return(<div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:3,padding:"8px 12px",fontSize:13,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}><div style={{fontWeight:700,color:"#6b7280",marginBottom:4}}>{label}</div>{payload.filter(p=>p.value!=null).map(p=>(<div key={p.dataKey} style={{color:p.dataKey==="pmi"?"#1565C0":p.dataKey==="grey"?"#888":"#B71C1C",marginBottom:1}}>{p.dataKey==="pmi"?"ISM PMI: ":p.dataKey==="grey"?"Actual yield chg: ":"Adv-18M yield chg: "}{Number(p.value).toFixed(p.dataKey==="pmi"?1:0)}{p.dataKey!=="pmi"?" bps":""}</div>))}</div>);}
let _FC="#1565C0";
function FcastTip({active,payload,label}){if(!active||!payload||!payload.length)return null;const item=payload.find(p=>p.value!=null);if(!item)return null;return(<div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:3,padding:"8px 12px",fontSize:13,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}><div style={{fontWeight:700,color:"#6b7280",marginBottom:3}}>{label}</div><div style={{color:item.dataKey==="h"?"#1565C0":_FC}}>PMI: {Number(item.value).toFixed(1)}{item.dataKey==="f"?" (forecast)":""}</div></div>);}

function Pill({label,sub,active,color,onClick}){
  return(
    <button onClick={onClick} style={{flex:"1 1 30%", padding:"8px 4px",cursor:"pointer",borderRadius:3,textAlign:"center",border:active?"2px solid "+color:"1px solid #d1d5db",background:active?color+"0d":"#fff",color:active?color:"#6b7280",minWidth:80, boxSizing:"border-box"}}>
      <div style={{fontWeight:700,fontSize:15}}>{label}</div>
      <div style={{fontSize:13,marginTop:2,opacity:0.85}}>{sub}</div>
    </button>
  );
}

function TogRow({label,opts,val,set}){
  return(
    <div style={{marginBottom:14}}>
      <div style={{fontSize:15,fontWeight:700,letterSpacing:1,color:"#9ca3af",marginBottom:6,textTransform:"uppercase"}}>{label}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {opts.map(o=><Pill key={o.v} label={o.l} sub={o.sub} active={val===o.v} color={o.c} onClick={()=>set(o.v)}/>)}
      </div>
    </div>
  );
}

const HIST_LEGEND=[{color:"#1565C0",dash:null,label:"ISM Manufacturing PMI (L)"},{color:"#9ca3af",dash:"6 3 1 3",label:"Actual 10-Year Yield (2-Year Change in bps, Inverted R)"},{color:"#B71C1C",dash:"6 3 1 3",label:"10-Year Treasury Yield (2-Year Change in bps, Advanced 18 Months, Inverted R)"}];

export default function App(){
  const [nav,setNav]=useState("history");
  const [tariff,setTariff]=useState("renew");
  const [inflation,setInf]=useState("rebound");
  const [fed,setFed]=useState("neutral");
  const [activeCase,setCase]=useState(null);
  const [descTab,setDescTab]=useState("geo");
  
  const tD=T_OPTS.find(o=>o.v===tariff).d;
  const iD=I_OPTS.find(o=>o.v===inflation).d;
  const fD=F_OPTS.find(o=>o.v===fed).d;
  const total=tD+iD+fD;
  
  const scen=useMemo(()=>{
    if(total>=2.8)return{name:"Strong Upside",c:"#1B5E20",range:"56-58",bg:"#f0fdf4"};
    if(total>=1.2)return{name:"Upside",c:"#2E7D32",range:"54-56",bg:"#f0fdf4"};
    if(total>=-1.2)return{name:"Base Case",c:"#1565C0",range:"51-54",bg:"#eff6ff"};
    if(total>=-3.0)return{name:"Downside",c:"#B71C1C",range:"48-51",bg:"#fef2f2"};
    return{name:"Strong Downside",c:"#7f1d1d",range:"45-48",bg:"#fef2f2"};
  },[total]);
  
  _FC=scen.c;
  const prob=useMemo(()=>Math.max(1,Math.round(PROBS.tariff[tariff]*PROBS.inflation[inflation]*PROBS.fed[fed]*100)),[tariff,inflation,fed]);
  const fcast=useMemo(()=>FWD.map((label,i)=>{
    const t=i/(FWD.length-1);
    const tP=i<4?i/4*0.3:Math.min(1,0.3+(i-4)/5);
    const iP=Math.min(1,i/8);
    const fP=i<2?0:Math.min(1,(i-2)/6);
    const base=54.0+t*0.7+0.28*Math.sin(t*Math.PI*2.4+0.4);
    return{t:label,f:Math.round((base+tD*tP+iD*iP+fD*fP)*10)/10};
  }),[tD,iD,fD]);
  
  const endPMI=fcast[fcast.length-1].f;
  const chartData=useMemo(()=>{
    const rec=HIST.slice(-27).map(d=>({t:d.t,h:d.pmi}));
    return[...rec,{t:"May-26",h:54.0,f:54.0},...fcast.map(d=>({t:d.t,f:d.f}))];
  },[fcast]);
  
  const themes=getThemes(tariff,inflation,fed);
  const DTABS=[{id:"geo",l:"Geopolitics"},{id:"eco",l:"Economy"},{id:"mon",l:"Monetary Policy"},{id:"fiscal",l:"Fiscal Policy"},{id:"chart",l:"Framework Check"}];
  
  return(
    <>
      <style>{`
        .app-container { background: #fff; min-height: 100vh; font-family: Helvetica Neue, Arial, sans-serif; color: #0a0a0a; overflow-x: hidden; box-sizing: border-box; }
        .content-wrapper { max-width: 1300px; margin: 0 auto; width: 100%; padding: 0 40px; box-sizing: border-box; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .grid-sidebar { display: grid; grid-template-columns: 320px 1fr; gap: 40px; align-items: start; }
        @media (max-width: 900px) {
          .content-wrapper { padding: 0 16px; }
          .grid-3 { grid-template-columns: 1fr; }
          .grid-sidebar { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="app-container">
        <div className="content-wrapper">
          {/* Header section */}
          <div style={{borderBottom:"3px solid #0a0a0a",padding:"16px 0 0",boxSizing:"border-box"}}>
            <div style={{textAlign:"center",marginBottom:10}}>
              <div style={{fontSize:15,letterSpacing:3,color:"#6b7280",fontWeight:700,marginBottom:8}}>SCENARIO FORECAST · MACRO RESEARCH · JUNE 2026</div>
              <h1 style={{margin:0,fontSize:24,fontWeight:700,letterSpacing:-0.3,lineHeight:1.3}}>Locked-In Legacies: How the 18-Month Monetary Lag Predetermines Presidential PMI Trajectories</h1>
              <p style={{margin:"8px auto 0",fontSize:15,color:"#4b5563",maxWidth:800,lineHeight:1.5}}>"Fed rate decisions precede economic outcomes by 18 months, which holds true for many administrations."</p>
            </div>
            
            {/* Top Navigation Tabs */}
            <div style={{display:"flex",gap:8,marginTop:48,flexWrap:"wrap",justifyContent:"center"}}>
              {["history","forecast"].map((id,idx)=>(
                <button key={id} onClick={()=>setNav(id)} style={{padding:"8px 12px",fontSize:15,fontWeight:700,letterSpacing:0.5,cursor:"pointer",border:"none",borderBottom:nav===id?"2px solid #0a0a0a":"2px solid transparent",background:"transparent",color:nav===id?"#0a0a0a":"#6b7280",textTransform:"uppercase"}}>
                  {idx===0?"PART 1 · HISTORICAL EVIDENCE":"PART 2 · SCENARIO FORECAST 2026-27"}
                </button>
              ))}
            </div>
          </div>

          {nav==="history"&&(
            <div style={{padding:"24px 0",boxSizing:"border-box"}}>
              <div style={{marginBottom:24}}>
                <div style={{fontSize:15,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:12}}>CORE PRINCIPLES</div>
                {/* CSS Grid ensures true 3 columns on PC, stacking on mobile */}
                <div className="grid-3">
                  {[{n:"01",h:"The Inherited Economy",b:"A president's first 1-3 years are macro-determined by the Fed's prior stance. Credit or blame assigned to presidents is largely misattributed to the wrong variable."},{n:"02",h:"Fiscal Is Not the Market Driver",b:"Presidential fiscal policy is NOT the primary driver of equity market performance. Monetary policy — the lagged effects of Fed rate cycles — predetermines economic outcomes long before a new president takes the oath."},{n:"03",h:"The Transmission Channel",b:"Fed tightening/easing (12-18 month lag) leads to LEIs/PMIs, then Business Cycle, then Equity Returns. Fiscal policy overlays this cycle but rarely overrides it."}].map(p=>(
                    <div key={p.n} style={{borderTop:"2px solid #0a0a0a",paddingTop:10}}>
                      <div style={{fontSize:15,letterSpacing:2,fontWeight:700,color:"#6b7280",marginBottom:4}}>PRINCIPLE {p.n}</div>
                      <div style={{fontSize:15,fontWeight:700,marginBottom:5}}>{p.h}</div>
                      <div style={{fontSize:13,color:"#4b5563",lineHeight:1.7}}>{p.b}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Main Chart Section */}
              <div style={{marginBottom:24}}>
                <div style={{fontSize:15,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:6,marginTop:44}}>THE INAUGURATION OF PRESIDENT DID NOT CHANGE THE COURSE OF THE CYCLE (2008 - PRESENT)</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:8}}>
                  {HIST_LEGEND.map(l=>(<span key={l.label} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#4b5563"}}><svg width="28" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke={l.color} strokeWidth={l.dash?"1.5":"2"} strokeDasharray={l.dash||"none"}/></svg>{l.label}</span>))}
                </div>
                <div style={{border:"1px solid #e5e7eb",height:360,width:"100%"}}>
                  <ResponsiveContainer width="100%" height="100%">
                    {/* Updated margins so Left and Right are exactly identical (both 10) */}
                    <ComposedChart data={HIST} margin={{top:20,right:10,bottom:30,left:10}}>
                      <CartesianGrid strokeDasharray="2 4" stroke="#f3f4f6" vertical={false}/>
                      <XAxis dataKey="t" tick={{fontSize:13,fill:"#9ca3af"}} tickLine={false} axisLine={{stroke:"#e5e7eb"}} interval={11} angle={-35} textAnchor="end" height={40}/>
                      <YAxis yAxisId="pmi" domain={[30,68]} ticks={[35,40,45,50,55,60,65]} tick={{fontSize:13,fill:"#9ca3af"}} tickLine={false} axisLine={false} width={30}/>
                      <YAxis yAxisId="yld" orientation="right" reversed={true} domain={[-260,360]} ticks={[-200,-100,0,100,200,300]} tick={{fontSize:13,fill:"#9ca3af"}} tickLine={false} axisLine={false} width={30}/>
                      <Tooltip content={<HistTip/>}/>
                      <ReferenceLine yAxisId="pmi" y={50} stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={0.8}/>
                      <ReferenceLine yAxisId="yld" y={0} stroke="#d1d5db" strokeWidth={0.5}/>
                      {/* Increased Inauguration Label Font Size to 15, matching Medium level */}
                      {INAUGURATIONS.map(g=>(<ReferenceLine key={g.t} yAxisId="pmi" x={g.t} stroke={g.color} strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.75} label={{value:g.label,position:"insideTopLeft",fontSize:15,fill:g.color,dx:4,dy:-4}}/>))}
                      <Line yAxisId="pmi" dataKey="pmi" stroke="#1565C0" strokeWidth={2.5} dot={false} isAnimationActive={false}/>
                      <Line yAxisId="yld" dataKey="grey" stroke="#9ca3af" strokeWidth={1.8} strokeDasharray="6 3 1 3" dot={false} isAnimationActive={false}/>
                      <Line yAxisId="yld" dataKey="red" stroke="#B71C1C" strokeWidth={2.5} strokeDasharray="6 3 1 3" dot={false} isAnimationActive={false}/>
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div style={{fontSize:13,color:"#9ca3af",marginTop:4,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                  <span>Vertical dashed lines = presidential inauguration date</span>
                  <span>Right axis inverted</span>
                </div>
              </div>
              
              <div style={{borderLeft:"3px solid #0a0a0a",padding:"12px 16px",background:"#f9fafb",marginBottom:24}}>
                {/* Replaced paragraph with Bullet Points List */}
                <div style={{fontSize:13,lineHeight:1.75}}>
                  <strong>Core Finding:</strong>
                  <ul style={{margin: "8px 0 0 0", paddingLeft: 24}}>
                    <li style={{marginBottom: 6}}><strong>The Inheritance Effect:</strong> A President’s early economic performance is primarily predetermined by the Federal Reserve's prior actions, not their own fiscal initiatives.</li>
                    <li style={{marginBottom: 6}}><strong>The 18-Month Lag:</strong> Monetary policy operates with a significant lag; the economic trajectory for the first 1.5 years of a new term is "baked in" by the Fed long before inauguration.</li>
                    <li style={{marginBottom: 6}}><strong>PMI as the Proxy:</strong> The Purchasing Managers' Index (PMI) and Leading Economic Indicators (LEIs) serve as the primary trackers for this lag, reflecting interest rate trends set 18 months prior.</li>
                    <li style={{marginBottom: 6}}><strong>Monetary Dominance:</strong> While fiscal measures like deregulation/defense spending take years to manifest, monetary tightening/easing can immediately overpower a President's short-term intentions.</li>
                    <li><strong>Perception vs. Reality:</strong> This lag explains why Presidents are often unfairly credited or blamed for market performance that was actually set in motion by the previous administration's macro backdrop.</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div style={{fontSize:15,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:12,marginTop:44}}>CASE STUDIES ACROSS PRESIDENTIAL ADMINISTRATIONS</div>
                {/* CSS Grid replaces flex to guarantee 3 columns x 2 rows on PC */}
                <div className="grid-3">
                  {CASES.map(cs=>(
                    <div key={cs.id} onClick={()=>setCase(activeCase===cs.id?null:cs.id)} style={{border:activeCase===cs.id?"1.5px solid #0a0a0a":"1px solid #e5e7eb",borderRadius:2,padding:"12px",cursor:"pointer",background:activeCase===cs.id?"#f9fafb":"#fff"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                        <div><div style={{fontWeight:700,fontSize:15}}>{cs.title}</div><div style={{fontSize:13,color:"#9ca3af",marginTop:1}}>{cs.period}</div></div>
                        <span style={{fontSize:13,fontWeight:700,color:cs.tagC,background:cs.tagC+"11",padding:"2px 6px",borderRadius:2,whiteSpace:"nowrap"}}>{cs.tag}</span>
                      </div>
                      {activeCase===cs.id?(
                        <div style={{marginTop:8}}>{[["MONETARY PIPELINE",cs.monetary],["FISCAL POLICY",cs.fiscal],["PMI TRAJECTORY",cs.pmi]].map(([hd,bd])=>(<div key={hd} style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,letterSpacing:1,color:"#6b7280",marginBottom:3}}>{hd}</div><div style={{fontSize:13,color:"#374151",lineHeight:1.65}}>{bd}</div></div>))}</div>
                      ):(
                        <div style={{fontSize:13,color:"#6b7280",lineHeight:1.5}}>{cs.monetary.slice(0,85)}...<span style={{color:"#1565C0",marginLeft:4,fontSize:13}}>Expand</span></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {nav==="forecast"&&(
            <div style={{padding:"24px 0",boxSizing:"border-box",width:"100%"}}>
              <div style={{fontSize:15,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:3,marginTop:24,textAlign:"center"}}>SCENARIO FORECAST ON PMI (2026-2027)</div>
              <div style={{fontSize:15,color:"#4b5563",textAlign:"center",margin:"0 auto 18px auto",lineHeight:1.5}}>
                "175bps of Fed cuts (Sep-Dec 2025) drove the pipeline-predicted V-shape — PMI 47.9 to 54.0 (May-26). Forward path now hinges on the Iran energy shock, Warsh's hike bias, and the Jul-24 tariff fork."
              </div>
              
              {/* Uses the injected .grid-sidebar class for perfect PC proportions and mobile stacking */}
              <div className="grid-sidebar">
                {/* Left Controls Column */}
                <div>
                  <TogRow label="Tariff Policy" opts={T_OPTS} val={tariff} set={setTariff}/>
                  <TogRow label="Inflation Path" opts={I_OPTS} val={inflation} set={setInf}/>
                  <TogRow label="Warsh / Fed Chair" opts={F_OPTS} val={fed} set={setFed}/>
                  
                  <div style={{border:"1.5px solid "+scen.c,borderRadius:2,padding:12,background:scen.bg,marginTop:44}}>
                    <div style={{fontSize:15,letterSpacing:1,color:"#6b7280",marginBottom:10,fontWeight:700}}>COMBINED SCENARIO</div>
                    <div style={{fontSize:24,fontWeight:700,color:scen.c,marginBottom:20}}>{scen.name}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:44}}>
                      {[{l:"PMI Range",v:scen.range},{l:"Joint Prob.",v:"~"+prob+"%"},{l:"End-2027",v:endPMI.toFixed(1)},{l:"Net Shock",v:(total>=0?"+":"")+total.toFixed(1)+" pts"}].map(c=>(
                        <div key={c.l} style={{background:"rgba(255,255,255,0.7)",borderRadius:2,padding:"6px 8px",border:"1px solid #e5e7eb"}}>
                          <div style={{fontSize:13,color:"#6b7280",fontWeight:600}}>{c.l}</div>
                          <div style={{fontSize:15,fontWeight:700}}>{c.v}</div>
                        </div>
                      ))}
                    </div>
                    {[{l:"Tariff",v:tD},{l:"Inflation",v:iD},{l:"Fed",v:fD}].map(d=>{
                      const bc=d.v>0?"#1B5E20":d.v<0?"#B71C1C":"#6b7280";
                      return(
                        <div key={d.l} style={{marginBottom:5}}>
                          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:2}}><span style={{color:"#6b7280",fontWeight:600}}>{d.l}</span><span style={{color:bc,fontWeight:700}}>{d.v>0?"+":""}{d.v.toFixed(1)} pts</span></div>
                          <div style={{height:3,background:"#e5e7eb",borderRadius:2}}><div style={{height:"100%",width:Math.abs(d.v)/5*100+"%",background:bc,borderRadius:2,transition:"width 0.3s"}}/></div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Chart & Table Column */}
                <div style={{width:"100%", minWidth:0}}>
                  <div style={{display:"flex",gap:16,marginBottom:7,fontSize:13,color:"#4b5563"}}>
                    {[{c:"#1565C0",l:"Historical PMI",d:false},{c:scen.c,l:"Forecast: "+scen.name,d:true}].map(lg=>(<span key={lg.l} style={{display:"flex",alignItems:"center",gap:4}}><svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke={lg.c} strokeWidth="2" strokeDasharray={lg.d?"5 3":"none"}/></svg>{lg.l}</span>))}
                  </div>
                  
                  <div style={{border:"1px solid #e5e7eb",height:280,marginBottom:14,width:"100%"}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData} margin={{top:16,right:10,bottom:30,left:0}}>
                        <CartesianGrid strokeDasharray="2 4" stroke="#f3f4f6" vertical={false}/>
                        <XAxis dataKey="t" tick={{fontSize:13,fill:"#9ca3af"}} tickLine={false} axisLine={{stroke:"#e5e7eb"}} interval={4} angle={-35} textAnchor="end" height={40}/>
                        <YAxis domain={[44,60]} ticks={[47,50,53,56,59]} tick={{fontSize:13,fill:"#9ca3af"}} tickLine={false} axisLine={false} width={30}/>
                        <Tooltip content={<FcastTip/>}/>
                        <ReferenceLine y={50} stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={0.8}/>
                        <ReferenceLine x="May-26" stroke="#7c3aed" strokeDasharray="3 3" strokeWidth={1} label={{value:"Warsh",position:"top",fontSize:13,fill:"#7c3aed"}}/>
                        <ReferenceLine x="Jul-26" stroke="#b45309" strokeDasharray="3 3" strokeWidth={1} label={{value:"Tariff fork",position:"top",fontSize:13,fill:"#b45309"}}/>
                        <Line dataKey="h" stroke="#1565C0" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false}/>
                        <Line dataKey="f" stroke={scen.c} strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={false} isAnimationActive={true} animationDuration={350}/>
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{marginBottom:14}}>
                    <div style={{display:"flex",borderBottom:"2px solid #e5e7eb", overflowX:"auto", whiteSpace:"nowrap", WebkitOverflowScrolling:"touch"}}>
                      {DTABS.map(tb=>(
                        <button key={tb.id} onClick={()=>setDescTab(tb.id)} style={{padding:"6px 12px",fontSize:15,fontWeight:700,cursor:"pointer",border:"none",background:"transparent",color:descTab===tb.id?"#0a0a0a":"#9ca3af",borderBottom:descTab===tb.id?"2px solid #0a0a0a":"2px solid transparent",marginBottom:-2,transition:"all 0.1s"}}>
                          {tb.l}
                        </button>
                      ))}
                    </div>
                    <div style={{padding:"10px 0",fontSize:13,color:"#374151",lineHeight:1.8,minHeight:72,whiteSpace:"pre-line"}}>
                      <div style={{fontSize:15,fontWeight:700,letterSpacing:1,color:scen.c,marginBottom:7}}>{T_OPTS.find(o=>o.v===tariff).l} TARIFF · {I_OPTS.find(o=>o.v===inflation).l} INFLATION · WARSH {F_OPTS.find(o=>o.v===fed).l.toUpperCase()}</div>
                      {descTab==="geo"&&GEO[tariff]}
                      {descTab==="eco"&&(ECO[tariff+"-"+inflation]||ECO["renew-sticky"])}
                      {descTab==="mon"&&MON[fed]}
                      {descTab==="fiscal"&&FISCAL}
                      {descTab==="chart"&&getChartText(total)}
                    </div>
                  </div>

                  <div>
                    <div style={{fontSize:15,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:8,marginTop:40}}>THEMATIC ANALYSIS MATRIX</div>
                    <div style={{width:"100%", overflowX:"auto", WebkitOverflowScrolling:"touch", paddingBottom:8}}>
                      <table style={{width:"100%", minWidth: 500, borderCollapse:"collapse",fontSize:13}}>
                        <thead>
                          <tr style={{background:"#0a0a0a",color:"#fff"}}>
                            {["THEME","STATUS","KEY DRIVERS","TAIL RISK"].map(h=>(<th key={h} style={{padding:"6px 9px",textAlign:"left",fontWeight:700,width:h==="THEME"?"14%":h==="STATUS"?"12%":h==="KEY DRIVERS"?"46%":"28%"}}>{h}</th>))}
                          </tr>
                        </thead>
                        <tbody>
                          {themes.map((row,i)=>(
                            <tr key={row.theme} style={{background:i%2===0?"#f9fafb":"#fff",borderBottom:"1px solid #e5e7eb"}}>
                              <td style={{padding:"7px 9px",fontWeight:700,verticalAlign:"top"}}>{row.theme}</td>
                              <td style={{padding:"7px 9px",verticalAlign:"top"}}><span style={{fontWeight:700,color:row.statusC,fontSize:13,background:row.statusC+"11",padding:"2px 5px",borderRadius:2}}>{row.status}</span></td>
                              <td style={{padding:"7px 8px",color:"#374151",verticalAlign:"top",lineHeight:1.55}}>{row.drivers}</td>
                              <td style={{padding:"7px 8px",color:"#6b7280",verticalAlign:"top",lineHeight:1.55,fontStyle:"italic"}}>{row.risk}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          
          <div style={{borderTop:"1px solid #e5e7eb",padding:"12px 0",fontSize:13,color:"#9ca3af",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,boxSizing:"border-box"}}>
            <span>PMI: ISM Manufacturing · Yield: FRED GS10 10-Year Treasury</span>
            <span>Judgmental estimates · Not investment advice</span>
          </div>
        </div>
      </div>
    </>
  );
}
