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
  52.6,52.4,52.3,
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
  44,22,13,
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
  136,96,-10,
];
function genLabels(){const mo=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];const out=[];let y=2008,m=0;for(let i=0;i<219;i++){out.push(mo[m]+"-"+String(y).slice(2));m++;if(m===12){m=0;y++;}}return out;}
const LABELS=genLabels();
const HIST=LABELS.map((t,i)=>({t,pmi:PMI_DATA[i],grey:GREY_DATA[i],red:RED_DATA[i]}));
const INAUGURATIONS=[{t:"Jan-09",label:"Obama I",color:"#1565C0"},{t:"Jan-13",label:"Obama II",color:"#1565C0"},{t:"Jan-17",label:"Trump I",color:"#B71C1C"},{t:"Jan-21",label:"Biden",color:"#1565C0"},{t:"Jan-25",label:"Trump II",color:"#B71C1C"}];
const CASES=[{id:"reagan",title:"Reagan I & II",period:"Jan 1981 – Jan 1989",tag:"Tightening Inherited",tagC:"#B71C1C",monetary:"Inherited Volcker's 20% Fed Funds Rate — the most aggressive tightening in modern history. Pipeline flush took 18 months; PMI collapsed to 35 before recovering as Volcker pivoted to easing in mid-1982. Reagan II inherited a neutral-to-easing environment that sustained moderate expansion.",fiscal:"Military spending rose +43% (GDP share: 4.4% to 6.0%). ERTA tax cuts enacted 1981. Fiscal multipliers delayed 2-3 years. A&D stocks gained +12% immediately post-election but reverted to the business cycle within 6 months. Deficits widened sharply.",pmi:"1981-82: PMI collapsed to 35-38 (bear market). 1983-84: V-shape recovery to PMI 60+ as Volcker's easing pipeline cleared. Mid-to-late 1980s: stable 50-58."},{id:"bush",title:"George H.W. Bush",period:"Jan 1989 – Jan 1993",tag:"Tightening in Pipeline",tagC:"#B71C1C",monetary:"Inherited lagged effects of 1987-88 rate hikes. 10Y yield 2-year change (advanced 18M) turned positive at inauguration. LEIs sank in 1989. S&P 500 entered a bear market despite perceived pro-growth agenda.",fiscal:"No major fiscal expansion. Gulf War spending modest relative to GDP. Read my lips tax pledge reversed. Structural deficit concerns constrained discretionary action.",pmi:"1989-90: Steady decline from 60 to 45. 1990-91 recession pushed PMI to 42-45. Framework prediction was correct."},{id:"obama1",title:"Obama I",period:"Jan 2009 – Jan 2013",tag:"Deep Easing Pipeline",tagC:"#1565C0",monetary:"Inherited $600B+ QE and near-zero FFR. Advanced 18M yield signal was at its most negative in the dataset. The Obama Rally was Bernanke's legacy: monetary stimulus was already in transit 18 months before PMI bottomed.",fiscal:"ARRA ($787B stimulus) enacted Feb 2009. Fiscal multiplier modest vs. monetary impulse scale. PMI recovered before most fiscal measures could transmit.",pmi:"Trough at 32.9 (Jan 2009) coinciding with inauguration. V-shape: 33 to 60+ over 18 months. Perfectly aligned with 18M-advanced yield signal."},{id:"obama2",title:"Obama II",period:"Jan 2013 – Jan 2017",tag:"Neutral Pipeline",tagC:"#546E7A",monetary:"Fed still at zero bound; QE3 tapering signal loomed (May 2013 Taper Tantrum). 18M-advanced signal near zero. Framework prediction: neutral PMI, no major directional swing. Confirmed precisely.",fiscal:"Budget sequestration provided fiscal drag. Deficit reduction constrained spending. Fiscal multiplier modestly negative in near-term.",pmi:"Stable 50-57 throughout term. No V-shape, no collapse. The neutral inheritance case."},{id:"trump1",title:"Trump I",period:"Jan 2017 – Jan 2021",tag:"Mild Tightening",tagC:"#E65100",monetary:"Inherited lagged Yellen rate hikes (2015-16). 18M signal mildly positive at inauguration. PMI held 55-60 through 2017-18. By 2019, accumulated tightening pulled PMI below 50. COVID (Mar 2020) was an exogenous break.",fiscal:"TCJA 2017: corporate rate cut 35% to 21%. Sector trades surged post-election but reverted within 6-12 months. Trade tariffs raised input costs.",pmi:"2017-18: 55-60. 2019: declining to 47.8. COVID shock: 41.5 (Apr 2020). Post-COVID V-shape driven by Fed QE, not Trump policy."},{id:"biden",title:"Biden",period:"Jan 2021 – Jan 2025",tag:"Peak Easing to Fastest Tightening",tagC:"#1565C0",monetary:"The most complete monetary pipeline experiment in modern history. Inherited COVID QE (Fed balance sheet $8.9T). Then 525bps of tightening (2022-23). PMI collapsed from 64.7 to 46 with mechanical precision, 18 months after tightening began.",fiscal:"ARP ($1.9T), Infrastructure ($1.2T), IRA ($369B). Fiscal spending contributed to inflation overshoot but PMI trajectory was driven entirely by the monetary pipeline.",pmi:"Jan-21: 58.7 to Mar-21: 64.7 (all-time high). Collapse: 57 to 50 to 46 (Nov-23 trough). Perfect round-trip predicted by the 18M-advanced yield signal."}];
const T_OPTS=[{v:"exit",l:"Exit",sub:"Sec.122 expires",d:2.2,c:"#1B5E20"},{v:"renew",l:"Renew",sub:"150-day extension",d:0.0,c:"#E65100"},{v:"escalate",l:"Escalate",sub:"Raise to 15-20%",d:-2.8,c:"#B71C1C"}];
const I_OPTS=[{v:"converge",l:"Converge",sub:"Core PCE < 2.5%",d:1.2,c:"#1B5E20"},{v:"sticky",l:"Sticky",sub:"PCE 2.5-3.0%",d:0.0,c:"#E65100"},{v:"rebound",l:"Rebound",sub:"PCE > 3.0%",d:-2.0,c:"#B71C1C"}];
const F_OPTS=[{v:"dove",l:"Dovish",sub:"2+ cuts, 50+ bps",d:1.5,c:"#1B5E20"},{v:"neutral",l:"Neutral",sub:"0-1 cut, on hold",d:0.0,c:"#E65100"},{v:"hawk",l:"Hawkish",sub:"Hold / hike risk",d:-2.0,c:"#B71C1C"}];
const PROBS={tariff:{exit:0.55,renew:0.35,escalate:0.10},inflation:{converge:0.40,sticky:0.45,rebound:0.15},fed:{dove:0.25,neutral:0.55,hawk:0.20}};
const FWD=["Apr-26","May-26","Jun-26","Jul-26","Aug-26","Sep-26","Oct-26","Nov-26","Dec-26","Jan-27","Feb-27","Mar-27","Apr-27","May-27","Jun-27","Jul-27","Aug-27","Sep-27","Oct-27","Nov-27","Dec-27"];
function getThemes(tariff,inflation,fed){const tD=T_OPTS.find(o=>o.v===tariff).d;const iD=I_OPTS.find(o=>o.v===inflation).d;const fD=F_OPTS.find(o=>o.v===fed).d;const tot=tD+iD+fD;const up=tot>0,dn=tot<-2;return[{theme:"Geopolitics & Trade",status:tariff==="exit"?"Easing":tariff==="renew"?"Uncertain":"Escalating",statusC:tariff==="exit"?"#1B5E20":tariff==="renew"?"#E65100":"#B71C1C",drivers:tariff==="exit"?"Sec.122 expires Jul-26 · Near-shoring reactivates · US-China truce to Nov-26":tariff==="renew"?"150-day extension · EU talks stalled · Steel/auto pricing uncertain":"EU/Canada retaliation · Sec.232 expanding · Supply chains re-fracture",risk:tariff==="exit"?"Pharma tariffs (200%?) late-2026":tariff==="renew"?"Escalation if talks fail":"Sec.301 investigations broadening"},{theme:"Inflation",status:inflation==="converge"?"Contained":inflation==="sticky"?"Sticky":"Re-accelerating",statusC:inflation==="converge"?"#1B5E20":inflation==="sticky"?"#E65100":"#B71C1C",drivers:inflation==="converge"?"Core PCE < 2.5% · Import prices fall · Real wage recovery":inflation==="sticky"?"PCE 2.5-3.0% · Services sticky · Tariff pass-through 40-76%":"PCE > 3% · Oil shock (Iran) · Tariff + wage spiral",risk:inflation==="converge"?"Oil spike / Iran conflict":inflation==="sticky"?"Services re-acceleration":"Entrenched expectations"},{theme:"Unemployment",status:up?"Stabilizing":dn?"Deteriorating":"Edging Higher",statusC:up?"#1B5E20":dn?"#B71C1C":"#E65100",drivers:up?"ISM employment recovering · Reshoring capex hiring · Labor market tightens 4.2-4.3%":dn?"Mfg jobs shed · ISM employment < 45 · UR rises to 4.6-4.8%":"UR edging to 4.4% · Job growth below 100K/mo · Construction + mfg weak",risk:up?"Labor shortage caps output":dn?"Recession unemployment feedback":"Fed dual-mandate conflict sharpens"},{theme:"Productivity",status:up?"Improving":dn?"Declining":"Flat",statusC:up?"#1B5E20":dn?"#B71C1C":"#E65100",drivers:up?"AI capex cycle · Reshoring automation · Semiconductor ramp-up":dn?"High borrowing cost delays capex · Margin squeeze shelves investment":"AI data center supports tech mfg · Broad mfg flat · Near-shoring positive",risk:up?"AI bubble correction":dn?"Lost capex cycle compounds":"Uneven sectoral productivity gap"},{theme:"Monetary Policy",status:fed==="dove"?"Easing":fed==="neutral"?"On Hold":"Tightening Risk",statusC:fed==="dove"?"#1B5E20":fed==="neutral"?"#E65100":"#B71C1C",drivers:fed==="dove"?"Warsh: 2+ cuts · FFR to 3.0-3.25% · Mfg credit cost falls ~50bps":fed==="neutral"?"Warsh: 0-1 cut · FFR at 3.5-3.75% · Dot plot: 1 cut 2026":"Warsh: inflation non-negotiable · Hold through 2026 · Hike language possible",risk:fed==="dove"?"Inflation re-acceleration forces reversal":fed==="neutral"?"Credibility if PCE stalls at 2.8%":"Employment deterioration forces Fed capitulation"},{theme:"Fiscal Policy",status:"Slow Transmission",statusC:"#546E7A",drivers:"Fiscal multipliers lag 2-3 years (Reagan precedent) · Tax cut capex pass-through: 12-18mo · Defense contracts: 2-3yr from auth to spend",risk:"Deficit expansion crowds out private investment · IEEPA tariff refunds ($130B) complicate 2026 budget math"}];}
const GEO={exit:"Sec.122 tariffs expire Jul-26. Near-shoring supply chains reactivate in Mexico and Vietnam. US-China 1-year tariff truce sustained to Nov-26. EU framework negotiations move to center stage. Trade uncertainty premium exits capital expenditure decisions.",renew:"Sec.122 extension signals continued protectionism. ISM survey respondents cite trade policy as the #1 cost risk. EU auto/steel tariffs remain. Inventory management stays conservative. Business investment decisions delayed pending Jul-26 fork.",escalate:"15-20% tariff regime triggers EU/Canada retaliation. China truce at risk. Semiconductor and auto sectors face bilateral crossfire. Supply chains re-fracture. This is the one scenario where the monetary pipeline framework can be overridden."};
const ECO={"exit-converge":"Dual tailwind: import cost relief + consumer purchasing power restoration. ISM Prices Paid likely falls from 70.5 to sub-60. PMI expansion shifts from pre-buy inflation-driven to genuine demand-driven. The healthiest expansion profile.","exit-sticky":"Supply-side relief partially offset by persistent services inflation (PCE 2.5-3%). Net: mild positive for margins. New orders improve led by tech/defense/auto. PMI grinds higher but does not accelerate.","exit-rebound":"Tariff relief negated by oil/services inflation re-acceleration. Consumer spending softens. Fed cannot respond. Net neutral to modestly negative for PMI.","renew-converge":"Policy visibility gap restrains capex despite improving consumer real incomes. PMI oscillates near 52. Constructive but directionless.","renew-sticky":"Mar-26 baseline: tariff uncertainty + PCE 2.8%. Manufacturing in watchful expansion. Price pressures persist. PMI 52-54 is the modal path, waiting for Jul-26 tariff fork.","renew-rebound":"Double squeeze: trade uncertainty + inflation reigniting. Margin compression on both cost and demand sides. PMI risks slipping back to 48-50 in H2 2026.","escalate-converge":"Structural contradiction: high tariffs typically inflationary, but PCE convergence implies global demand weakness. PMI likely drifts 48-51 in a high-cost, low-demand equilibrium.","escalate-sticky":"Classic stagflation setup: cost-push inflation (tariffs) + price stickiness. Fed cannot cut. Historical precedent: 1970s PMI ranged 45-50 for extended periods.","escalate-rebound":"Extreme tail: max tariff + inflation overshoot forces Warsh to hike. PMI historically breaks below 45 only in: 2008 GFC, COVID lockdown, 1981-82 Volcker shock."};
const MON={dove:"Warsh prioritizes employment over final inflation mile. Two cuts (50bps total) take FFR to 3.0-3.25%. Manufacturing lending rates fall ~50bps. Critical risk: if market reads this as abandoning 2% target, inflation expectations de-anchor.",neutral:"Warsh holds FFR at 3.5-3.75%, consistent with Dec-25 dot plot (1 cut 2026). Market already priced. Key uncertainty: will Warsh reduce forward guidance? If so, rate uncertainty premium rises.",hawk:"Warsh treats 2% inflation as non-negotiable. No cuts in 2026. If PCE re-accelerates, hike language re-emerges. Volcker parallel: hawkish credibility at cost of near-term PMI collapse."};
const FISCAL="Reagan (1981): enacted 43% defense spending increase immediately yet PMI collapsed to 35 within 12 months as Volcker's pipeline cleared. Fiscal multipliers for government procurement run 24-36 months from authorization to economic impact.\n\nCurrent situation: even if Congress enacts major tax cuts or infrastructure, PMI signal in 2026-27 will be driven by (1) the monetary pipeline already locked in and (2) tariff policy shocks. Fiscal policy's PMI contribution begins materializing in 2028+.\n\nThis is the inherited economy principle: presidents receive economic credit or blame for conditions they did not create.";
function getChartText(tot){if(tot>=1)return"PIPELINE ALIGNMENT: Current selection is consistent with the 18M-advanced yield signal framework. The 175bps of Fed cuts (Sep-Dec 2025) support PMI recovery in Jan-Jul 2026. Historical parallel: Obama I. PMI direction confirmed; policy variables determine magnitude, not direction.";if(tot>=-2)return"PARTIAL OFFSET: Monetary pipeline signals recovery, but selected factors are consuming part of the easing impulse. Framework remains directionally valid but magnitude compressed. Effective easing = nominal pipeline minus policy drag.";return"PIPELINE DISRUPTION: Selected combination replicates the only historical case where the 18M signal failed: COVID (Mar-May 2020). Tariff escalation + inflation rebound can bypass the standard monetary transmission mechanism. The framework's documented failure mode.";}
function HistTip({active,payload,label}){if(!active||!payload||!payload.length)return null;return(<div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:3,padding:"8px 12px",fontSize:11,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}><div style={{fontWeight:700,color:"#6b7280",marginBottom:4}}>{label}</div>{payload.filter(p=>p.value!=null).map(p=>(<div key={p.dataKey} style={{color:p.dataKey==="pmi"?"#1565C0":p.dataKey==="grey"?"#888":"#B71C1C",marginBottom:1}}>{p.dataKey==="pmi"?"ISM PMI: ":p.dataKey==="grey"?"Actual yield chg: ":"Adv-18M yield chg: "}{Number(p.value).toFixed(p.dataKey==="pmi"?1:0)}{p.dataKey!=="pmi"?" bps":""}</div>))}</div>);}
let _FC="#1565C0";
function FcastTip({active,payload,label}){if(!active||!payload||!payload.length)return null;const item=payload.find(p=>p.value!=null);if(!item)return null;return(<div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:3,padding:"8px 12px",fontSize:11,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}><div style={{fontWeight:700,color:"#6b7280",marginBottom:3}}>{label}</div><div style={{color:item.dataKey==="h"?"#1565C0":_FC}}>PMI: {Number(item.value).toFixed(1)}{item.dataKey==="f"?" (forecast)":""}</div></div>);}
function Pill({label,sub,active,color,onClick}){return(<button onClick={onClick} style={{padding:"8px 14px",cursor:"pointer",borderRadius:3,textAlign:"center",border:active?"2px solid "+color:"1px solid #d1d5db",background:active?color+"0d":"#fff",color:active?color:"#6b7280",minWidth:84}}><div style={{fontWeight:700,fontSize:11}}>{label}</div><div style={{fontSize:9,marginTop:2,opacity:0.85}}>{sub}</div></button>);}
function TogRow({label,opts,val,set}){return(<div style={{marginBottom:14}}><div style={{fontSize:9,fontWeight:700,letterSpacing:1,color:"#9ca3af",marginBottom:6,textTransform:"uppercase"}}>{label}</div><div style={{display:"flex",gap:6}}>{opts.map(o=><Pill key={o.v} label={o.l} sub={o.sub} active={val===o.v} color={o.c} onClick={()=>set(o.v)}/>)}</div></div>);}
const HIST_LEGEND=[{color:"#1565C0",dash:null,label:"ISM Manufacturing PMI (L)"},{color:"#9ca3af",dash:"6 3 1 3",label:"Actual 10-Year Yield (2-Year Change in bps, Inverted R)"},{color:"#B71C1C",dash:"6 3 1 3",label:"10-Year Treasury Yield (2-Year Change in bps, Advanced 18 Months, Inverted R)"}];

export default function App(){
  const [nav,setNav]=useState("history");
  const [tariff,setTariff]=useState("renew");
  const [inflation,setInf]=useState("sticky");
  const [fed,setFed]=useState("neutral");
  const [activeCase,setCase]=useState(null);
  const [descTab,setDescTab]=useState("geo");
  const tD=T_OPTS.find(o=>o.v===tariff).d;
  const iD=I_OPTS.find(o=>o.v===inflation).d;
  const fD=F_OPTS.find(o=>o.v===fed).d;
  const total=tD+iD+fD;
  const scen=useMemo(()=>{if(total>=2.8)return{name:"Strong Upside",c:"#1B5E20",range:"56-58",bg:"#f0fdf4"};if(total>=1.2)return{name:"Upside",c:"#2E7D32",range:"54-56",bg:"#f0fdf4"};if(total>=-1.2)return{name:"Base Case",c:"#1565C0",range:"51-54",bg:"#eff6ff"};if(total>=-3.0)return{name:"Downside",c:"#B71C1C",range:"48-51",bg:"#fef2f2"};return{name:"Strong Downside",c:"#7f1d1d",range:"45-48",bg:"#fef2f2"};},[total]);
  _FC=scen.c;
  const prob=useMemo(()=>Math.max(1,Math.round(PROBS.tariff[tariff]*PROBS.inflation[inflation]*PROBS.fed[fed]*100)),[tariff,inflation,fed]);
  const fcast=useMemo(()=>FWD.map((label,i)=>{const t=i/(FWD.length-1);const tP=i<4?i/4*0.3:Math.min(1,0.3+(i-4)/5);const iP=Math.min(1,i/8);const fP=i<2?0:Math.min(1,(i-2)/6);const base=52.3+t*0.7+0.28*Math.sin(t*Math.PI*2.4+0.4);return{t:label,f:Math.round((base+tD*tP+iD*iP+fD*fP)*10)/10};}),[tD,iD,fD]);
  const endPMI=fcast[fcast.length-1].f;
  const chartData=useMemo(()=>{const rec=HIST.slice(-27).map(d=>({t:d.t,h:d.pmi}));return[...rec,{t:"Mar-26",h:52.3,f:52.3},...fcast.map(d=>({t:d.t,f:d.f}))];},[fcast]);
  const themes=getThemes(tariff,inflation,fed);
  const DTABS=[{id:"geo",l:"Geopolitics"},{id:"eco",l:"Economy"},{id:"mon",l:"Monetary Policy"},{id:"fiscal",l:"Fiscal Policy"},{id:"chart",l:"Framework Check"}];
  return(
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:"Helvetica Neue, Arial, sans-serif",color:"#0a0a0a",fontSize:15,overflowX:"hidden",maxWidth:"100vw"}}>
      <div style={{borderBottom:"3px solid #0a0a0a",padding:"16px 32px 0"}}>
        <div style={{textAlign:"center",marginBottom:10}}>
          <div style={{fontSize:11,letterSpacing:3,color:"#6b7280",fontWeight:700,marginBottom:8}}>MACRO RESEARCH · MARCH 2026</div>
          <h1 style={{margin:0,fontSize:24,fontWeight:700,letterSpacing:-0.3,lineHeight:1.3}}>Locked-In Legacies: How the 18-Month Monetary Lag Predetermines Presidential PMI Trajectories</h1>
          <p style={{margin:"8px auto 0",fontSize:13,color:"#4b5563",maxWidth:640}}>Fed rate decisions precede economic outcomes by 18 months. Five administrations have not changed this.</p>
        </div>
        <div style={{display:"flex",gap:0,marginTop:16}}>
          {["history","forecast"].map((id,idx)=><button key={id} onClick={()=>setNav(id)} style={{padding:"8px 24px",fontSize:11,fontWeight:700,letterSpacing:0.5,cursor:"pointer",border:"none",borderBottom:nav===id?"2px solid #0a0a0a":"2px solid transparent",background:"transparent",color:nav===id?"#0a0a0a":"#6b7280",textTransform:"uppercase"}}>{idx===0?"PART 1 · HISTORICAL EVIDENCE":"PART 2 · SCENARIO FORECAST 2026-27"}</button>)}
        </div>
      </div>
      {nav==="history"&&(
        <div style={{padding:"24px 32px"}}>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:13,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:12}}>CORE PRINCIPLES</div>
            <div className="mobile-single" style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14}}>
              {[{n:"01",h:"The Inherited Economy",b:"A president's first 1-3 years are macro-determined by the Fed's prior stance. Credit or blame assigned to presidents is largely misattributed to the wrong variable."},{n:"02",h:"Fiscal Is Not the Market Driver",b:"Presidential fiscal policy is NOT the primary driver of equity market performance. Monetary policy — the lagged effects of Fed rate cycles — predetermines economic outcomes long before a new president takes the oath."},{n:"03",h:"The Transmission Channel",b:"Fed tightening/easing (12-18 month lag) leads to LEIs/PMIs, then Business Cycle, then Equity Returns. Fiscal policy overlays this cycle but rarely overrides it."}].map(p=>(
                <div key={p.n} style={{borderTop:"2px solid #0a0a0a",paddingTop:10}}>
                  <div style={{fontSize:11,letterSpacing:2,fontWeight:700,color:"#6b7280",marginBottom:4}}>PRINCIPLE {p.n}</div>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:5}}>{p.h}</div>
                  <div style={{fontSize:11,color:"#4b5563",lineHeight:1.7}}>{p.b}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:13,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:2}}>THE MONETARY PIPELINE · 2008 - PRESENT</div>
            <div style={{fontSize:13,color:"#4b5563",marginBottom:8}}>Monthly data · ISM PMI (left axis) · 10Y Treasury yield 2-year change (right axis, inverted)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:8}}>
              {HIST_LEGEND.map(l=>(<span key={l.label} style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:"#4b5563"}}><svg width="28" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke={l.color} strokeWidth={l.dash?"1.5":"2"} strokeDasharray={l.dash||"none"}/></svg>{l.label}</span>))}
            </div>
            <div style={{border:"1px solid #e5e7eb",height:320}}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={HIST} margin={{top:10,right:60,bottom:30,left:10}}>
                  <CartesianGrid strokeDasharray="2 4" stroke="#f3f4f6" vertical={false}/>
                  <XAxis dataKey="t" tick={{fontSize:8,fill:"#9ca3af"}} tickLine={false} axisLine={{stroke:"#e5e7eb"}} interval={11} angle={-35} textAnchor="end" height={38}/>
                  <YAxis yAxisId="pmi" domain={[30,68]} ticks={[35,40,45,50,55,60,65]} tick={{fontSize:8,fill:"#9ca3af"}} tickLine={false} axisLine={false} width={26} label={{value:"PMI",angle:-90,position:"insideLeft",offset:10,style:{fontSize:9,fill:"#6b7280"}}}/>
                  <YAxis yAxisId="yld" orientation="right" reversed={true} domain={[-260,360]} ticks={[-200,-100,0,100,200,300]} tick={{fontSize:8,fill:"#9ca3af"}} tickLine={false} axisLine={false} width={36}/>
                  <Tooltip content={<HistTip/>}/>
                  <ReferenceLine yAxisId="pmi" y={50} stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={0.8}/>
                  <ReferenceLine yAxisId="yld" y={0} stroke="#d1d5db" strokeWidth={0.5}/>
                  {INAUGURATIONS.map(g=>(<ReferenceLine key={g.t} yAxisId="pmi" x={g.t} stroke={g.color} strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.75} label={{value:g.label,position:"insideTopLeft",fontSize:7,fill:g.color,dx:2,dy:-1}}/>))}
                  <Line yAxisId="pmi" dataKey="pmi" stroke="#1565C0" strokeWidth={1.8} dot={false} isAnimationActive={false}/>
                  <Line yAxisId="yld" dataKey="grey" stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="6 3 1 3" dot={false} isAnimationActive={false}/>
                  <Line yAxisId="yld" dataKey="red" stroke="#B71C1C" strokeWidth={1.8} strokeDasharray="6 3 1 3" dot={false} isAnimationActive={false}/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div style={{fontSize:9,color:"#9ca3af",marginTop:4,display:"flex",justifyContent:"space-between"}}>
              <span>Vertical dashed lines = presidential inauguration · Blue = Democrat · Red = Republican</span>
              <span>Right axis inverted: top = easing pipeline; bottom = tightening pipeline</span>
            </div>
          </div>
          <div style={{borderLeft:"3px solid #0a0a0a",padding:"12px 16px",background:"#f9fafb",marginBottom:24}}>
            <div style={{fontSize:13,lineHeight:1.75}}><strong>Core finding:</strong> Every PMI direction change is predicted by the red line (10Y yield 2-year change, advanced 18 months) — without exception across 5 administrations and 18 years. Inauguration day is a vertical line on this chart, nothing more.</div>
          </div>
          <div>
            <div style={{fontSize:13,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:12,marginTop:40}}>PRESIDENTIALCASE STUDIES · CLICK TO EXPAND</div>
            <div className="mobile-single" style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10}}>
              {CASES.map(cs=>(<div key={cs.id} onClick={()=>setCase(activeCase===cs.id?null:cs.id)} style={{border:activeCase===cs.id?"1.5px solid #0a0a0a":"1px solid #e5e7eb",borderRadius:2,padding:"12px",cursor:"pointer",background:activeCase===cs.id?"#f9fafb":"#fff"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div><div style={{fontWeight:700,fontSize:12}}>{cs.title}</div><div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{cs.period}</div></div>
                  <span style={{fontSize:9,fontWeight:700,color:cs.tagC,background:cs.tagC+"11",padding:"2px 6px",borderRadius:2,whiteSpace:"nowrap"}}>{cs.tag}</span>
                </div>
                {activeCase===cs.id?(<div style={{marginTop:8}}>{[["MONETARY PIPELINE",cs.monetary],["FISCAL POLICY",cs.fiscal],["PMI TRAJECTORY",cs.pmi]].map(([hd,bd])=>(<div key={hd} style={{marginBottom:8}}><div style={{fontSize:9,fontWeight:700,letterSpacing:1,color:"#6b7280",marginBottom:3}}>{hd}</div><div style={{fontSize:11,color:"#374151",lineHeight:1.65}}>{bd}</div></div>))}</div>):(<div style={{fontSize:10,color:"#6b7280",lineHeight:1.5}}>{cs.monetary.slice(0,85)}<span style={{color:"#1565C0",marginLeft:4,fontSize:9}}>Expand</span></div>)}
              </div>))}
            </div>
          </div>
        </div>
      )}

      {nav==="forecast"&&(
        <div style={{padding:"24px 16px",overflowX:"hidden"}}>
          <div style={{fontSize:13,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:3,textAlign:"center"}}>PMI SCENARIO FORECAST · 2026-2027</div>
          <div style={{fontSize:13,color:"#4b5563",textAlign:"center",margin:"0 auto 18px auto",whiteSpace:"nowrap"}}>175bps of Fed cuts (Sep 2025-Dec 2025) delivered the pipeline-predicted V-shape (Dec-25 trough 47.9 to Mar-26: 52.3). Forward trajectory determined by three policy variables.</div>
          <div className="mobile-stack" style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:40,alignItems:"start"}}>
            <div>
              <TogRow label="Tariff Policy" opts={T_OPTS} val={tariff} set={setTariff}/>
              <TogRow label="Inflation Path" opts={I_OPTS} val={inflation} set={setInf}/>
              <TogRow label="Warsh / Fed Chair" opts={F_OPTS} val={fed} set={setFed}/>
              <div style={{border:"1.5px solid "+scen.c,borderRadius:2,padding:12,background:scen.bg,marginTop:4}}>
                <div style={{fontSize:9,letterSpacing:1,color:"#6b7280",marginBottom:3,fontWeight:700}}>COMBINED SCENARIO</div>
                <div style={{fontSize:17,fontWeight:700,color:scen.c,marginBottom:10}}>{scen.name}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10}}>
                  {[{l:"PMI Range",v:scen.range},{l:"Joint Prob.",v:"~"+prob+"%"},{l:"End-2027",v:endPMI.toFixed(1)},{l:"Net Shock",v:(total>=0?"+":"")+total.toFixed(1)+" pts"}].map(c=>(<div key={c.l} style={{background:"rgba(255,255,255,0.7)",borderRadius:2,padding:"6px 8px",border:"1px solid #e5e7eb"}}><div style={{fontSize:9,color:"#6b7280",fontWeight:600}}>{c.l}</div><div style={{fontSize:14,fontWeight:700}}>{c.v}</div></div>))}
                </div>
                {[{l:"Tariff",v:tD},{l:"Inflation",v:iD},{l:"Fed",v:fD}].map(d=>{const bc=d.v>0?"#1B5E20":d.v<0?"#B71C1C":"#6b7280";return(<div key={d.l} style={{marginBottom:5}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:2}}><span style={{color:"#6b7280",fontWeight:600}}>{d.l}</span><span style={{color:bc,fontWeight:700}}>{d.v>0?"+":""}{d.v.toFixed(1)} pts</span></div><div style={{height:3,background:"#e5e7eb",borderRadius:2}}><div style={{height:"100%",width:Math.abs(d.v)/5*100+"%",background:bc,borderRadius:2,transition:"width 0.3s"}}/></div></div>);})}
              </div>
            </div>
            <div>
              <div style={{display:"flex",gap:16,marginBottom:7,fontSize:10,color:"#4b5563"}}>
                {[{c:"#1565C0",l:"Historical PMI",d:false},{c:scen.c,l:"Forecast: "+scen.name,d:true}].map(lg=>(<span key={lg.l} style={{display:"flex",alignItems:"center",gap:4}}><svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke={lg.c} strokeWidth="2" strokeDasharray={lg.d?"5 3":"none"}/></svg>{lg.l}</span>))}
              </div>
              <div style={{border:"1px solid #e5e7eb",height:260,marginBottom:14,maxWidth:"100%",overflow:"hidden"}}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{top:8,right:12,bottom:30,left:10}}>
                    <CartesianGrid strokeDasharray="2 4" stroke="#f3f4f6" vertical={false}/>
                    <XAxis dataKey="t" tick={{fontSize:8,fill:"#9ca3af"}} tickLine={false} axisLine={{stroke:"#e5e7eb"}} interval={4} angle={-35} textAnchor="end" height={36}/>
                    <YAxis domain={[44,60]} ticks={[47,50,53,56,59]} tick={{fontSize:8,fill:"#9ca3af"}} tickLine={false} axisLine={false} width={24}/>
                    <Tooltip content={<FcastTip/>}/>
                    <ReferenceLine y={50} stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={0.8}/>
                    <ReferenceLine x="May-26" stroke="#7c3aed" strokeDasharray="3 3" strokeWidth={1} label={{value:"Warsh",position:"top",fontSize:8,fill:"#7c3aed"}}/>
                    <ReferenceLine x="Jul-26" stroke="#b45309" strokeDasharray="3 3" strokeWidth={1} label={{value:"Tariff fork",position:"top",fontSize:8,fill:"#b45309"}}/>
                    <Line dataKey="h" stroke="#1565C0" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false}/>
                    <Line dataKey="f" stroke={scen.c} strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={false} isAnimationActive={true} animationDuration={350}/>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",borderBottom:"2px solid #e5e7eb"}}>
                  {DTABS.map(tb=>(<button key={tb.id} onClick={()=>setDescTab(tb.id)} style={{padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer",border:"none",background:"transparent",color:descTab===tb.id?"#0a0a0a":"#9ca3af",borderBottom:descTab===tb.id?"2px solid #0a0a0a":"2px solid transparent",marginBottom:-2,transition:"all 0.1s"}}>{tb.l}</button>))}
                </div>
                <div style={{padding:"10px 0",fontSize:11,color:"#374151",lineHeight:1.8,minHeight:72,whiteSpace:"pre-line"}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:1,color:scen.c,marginBottom:7}}>{T_OPTS.find(o=>o.v===tariff).l} TARIFF · {I_OPTS.find(o=>o.v===inflation).l} INFLATION · WARSH {F_OPTS.find(o=>o.v===fed).l.toUpperCase()}</div>
                  {descTab==="geo"&&GEO[tariff]}
                  {descTab==="eco"&&(ECO[tariff+"-"+inflation]||ECO["renew-sticky"])}
                  {descTab==="mon"&&MON[fed]}
                  {descTab==="fiscal"&&FISCAL}
                  {descTab==="chart"&&getChartText(total)}
                </div>
              </div>
              <div>
                <div style={{fontSize:9,letterSpacing:3,fontWeight:700,color:"#6b7280",marginBottom:8}}>THEMATIC ANALYSIS MATRIX</div>
                <div className="mobile-table-wrap">
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
                  <thead><tr style={{background:"#0a0a0a",color:"#fff"}}>{["THEME","STATUS","KEY DRIVERS","TAIL RISK"].map(h=>(<th key={h} style={{padding:"6px 9px",textAlign:"center",fontWeight:700,width:h==="THEME"?"14%":h==="STATUS"?"10%":h==="KEY DRIVERS"?"48%":"28%"}}>{h}</th>))}</tr></thead>
                  <tbody>{themes.map((row,i)=>(<tr key={row.theme} style={{background:i%2===0?"#f9fafb":"#fff",borderBottom:"1px solid #e5e7eb"}}><td style={{padding:"7px 9px",fontWeight:700,verticalAlign:"top"}}>{row.theme}</td><td style={{padding:"7px 9px",verticalAlign:"top"}}><span style={{fontWeight:700,color:row.statusC,fontSize:9,background:row.statusC+"11",padding:"2px 5px",borderRadius:2}}>{row.status}</span></td><td style={{padding:"7px 8px",color:"#374151",verticalAlign:"top",lineHeight:1.55}}>{row.drivers}</td><td style={{padding:"7px 8px",color:"#6b7280",verticalAlign:"top",lineHeight:1.55,fontStyle:"italic"}}>{row.risk}</td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      <div style={{borderTop:"1px solid #e5e7eb",padding:"12px 32px",fontSize:9,color:"#9ca3af",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
        <span>PMI: ISM Manufacturing · Yield: FRED GS10 10-Year Treasury · Joint probability = P(tariff) x P(inflation) x P(Fed)</span>
        <span>Judgmental estimates · Not investment advice</span>
      </div>
    </div>
  );
}