# Scenario Forecast: How the 18-Month Monetary Lag Predetermines Presidential PMI Trajectories

**Live Dashboard →** [kchen023.github.io/pmi-dashboard](https://kchen023.github.io/pmi-dashboard/)

---

## The Central Thesis

> *Every U.S. president inherits an economy already in motion — set not by their predecessor's fiscal agenda, but by the Federal Reserve's rate decisions made 12 to 18 months prior. The economic performance credited or blamed to a sitting president is, in most cases, a lagged consequence of monetary policy they had no hand in setting.*

This project visualizes and stress-tests that thesis across five presidential transitions (Obama I & II, Trump I, Biden, Trump II) using monthly ISM Manufacturing PMI data from 2008 to present, cross-referenced against a key monetary leading indicator: the **10-Year Treasury Yield 2-Year Change, Advanced 18 Months**.

---

## Why PMI? Why the Yield Pipeline?

### ISM Manufacturing PMI as the Economic Barometer

The ISM Manufacturing Purchasing Managers' Index (PMI) is one of the most reliable **Leading Economic Indicators (LEIs)** in macroeconomic analysis:

- A reading **above 50** signals expansion in the manufacturing sector
- A reading **below 50** signals contraction
- Historically, sustained PMI moves precede GDP inflections by 1–2 quarters, making it a frontline proxy for **real economic output momentum**
- It aggregates new orders, production, employment, supplier deliveries, and inventories — capturing the full pulse of industrial activity in a single number

### The 18-Month Monetary Transmission Mechanism

The second series — the 10-Year Treasury Yield 2-Year Change, shifted forward 18 months — operationalizes a well-established channel in monetary economics:

```
Fed Rate Decision
      ↓  (12–18 month lag)
Credit Conditions / Borrowing Costs
      ↓
Business Investment & Consumer Spending
      ↓
Leading Economic Indicators (PMI)
      ↓
Business Cycle → Equity Returns
```

When the Fed tightens (yield 2-year change rises), the advanced indicator turns positive — predicting PMI contraction 18 months later. When the Fed eases (yield change falls), it predicts PMI expansion. **This signal has not failed across a single presidential transition in the 18-year dataset.**

---

## Historical Evidence: The Pattern Holds Without Exception

| Administration | Pipeline at Inauguration | PMI Outcome | Framework Verdict |
|---|---|---|---|
| **Obama I** (Jan 2009) | Deep easing (−230 bps) | 32.9 → 60+ V-shape | ✅ Confirmed — strongest recovery in dataset |
| **Obama II** (Jan 2013) | Neutral (~0 bps) | Stable 50–57, no swing | ✅ Confirmed — neutral pipeline, neutral PMI |
| **Trump I** (Jan 2017) | Mild tightening (+50 bps) | 55–60 then declined to 47.8 | ✅ Confirmed — lagged tightening cleared by 2019 |
| **Biden** (Jan 2021) | Peak easing → fastest tightening | 58.7 → 64.7 → 46.0 full round-trip | ✅ Confirmed — most complete experiment in dataset |
| **Trump II** (Jan 2025) | Residual tightening, declining | 47.9 trough → 52.3 recovery | 🔄 Live — V-shape confirmed, forward path TBD |

### The Misattribution Problem

The "Obama Rally" of 2009 is routinely cited as evidence of stimulus-driven recovery. The data tell a different story: the ISM PMI bottomed at 32.9 the month Obama took office and recovered entirely in line with the 18M-advanced yield signal — which had been pointing toward recovery since mid-2007, when Bernanke began easing. Obama's ARRA stimulus was enacted in February 2009; the PMI had already begun its structural recovery before a single dollar was spent.

The reverse holds equally: Biden presided over a PMI collapse from 64.7 to 46.0 between 2021 and 2023 — not because of the Inflation Reduction Act or infrastructure spending, but because 525 basis points of Fed rate hikes, initiated in March 2022, cleared through the 18-month pipeline with mechanical precision.

**The president is a vertical line on the chart. The monetary pipeline is the trend.**

---

## Scenario Forecast: 2026–2027

The dashboard's second section applies the framework forward, modeling Trump II's PMI trajectory under three key policy variables that will determine whether the monetary pipeline's recovery signal is realized, amplified, or suppressed:

### The Three Variables

| Variable | Options | PMI Impact |
|---|---|---|
| **Tariff Policy** | Exit / Renew / Escalate | −2.8 to +2.2 pts |
| **Inflation Path** | Converge / Sticky / Rebound | −2.0 to +1.2 pts |
| **Warsh / Fed Chair** | Dovish / Neutral / Hawkish | −2.0 to +1.5 pts |

### Why These Three?

The 175bps of Fed cuts delivered in late 2025 represent a monetary easing pipeline already locked in — the base recovery signal is set. What the three variables determine is not *whether* PMI recovers, but *how far and how fast*:

- **Tariffs** are the most powerful near-term disruptor: the 2025 effective tariff rate reached 16.8% (highest since 1947), creating simultaneous inflationary pressure and demand destruction — the only configuration capable of overriding the monetary pipeline (as COVID did in 2020)
- **Inflation** determines whether the Fed has room to complete its easing cycle or must reverse course
- **Warsh** (nominated as Fed Chair, May 2026) introduces a new monetary reaction function — his inflation-first credibility stance vs. employment-prioritization materially shifts the forward pipeline

### Scenario Matrix

| Combination | PMI Range | Joint Probability |
|---|---|---|
| Exit + Converge + Dovish | 56–58 (Strong Upside) | ~6% |
| Exit + Sticky + Neutral | 54–56 (Upside) | ~12% |
| Renew + Sticky + Neutral | 51–54 (Base Case) | ~9% |
| Renew + Rebound + Neutral | 48–51 (Downside) | ~4% |
| Escalate + Rebound + Hawkish | 45–48 (Strong Downside) | ~1% |

*Joint probabilities computed as P(tariff) × P(inflation) × P(Fed). Judgmental estimates based on observable market and policy signals as of March 2026.*

---

## The Fiscal Policy Footnote

Reagan increased military spending by 43% — GDP share from 4.4% to 6.0% — yet presided over a PMI collapse to 35 in his first 18 months because Volcker's tightening pipeline was already in transit. The fiscal multiplier for government procurement runs 24–36 months from authorization to economic impact. Tax cut pass-through to capital expenditure takes 12–18 months. Infrastructure spending takes 2–3 years from legislation to ground-breaking.

**Fiscal policy is the slow variable. Monetary policy is the fast variable.** The 18-month window that determines a president's early economic legacy is set before the inauguration speech is written.

---

## Data Sources

| Series | Source | Transformation |
|---|---|---|
| ISM Manufacturing PMI | [ISM](https://www.ismworld.org) / [MacroMicro](https://en.macromicro.me) | Monthly level, Jan 2008–Mar 2026 |
| 10-Year Treasury Yield | [FRED GS10](https://fred.stlouisfed.org/series/GS10) | 2-year change in bps: `GS10(t) − GS10(t−24)` |
| Yield Pipeline (Advanced) | FRED GS10 | Same series, shifted forward 18 months: `grey(t−18)` |
| Tariff Data | [Tax Foundation](https://taxfoundation.org) / [Yale Budget Lab](https://budgetlab.yale.edu) | Effective tariff rate, 2025–2026 |

---

## Tech Stack

- **React** + **Vite**
- **Recharts** — dual-axis time series, scenario forecast line chart
- **GitHub Actions** — CI/CD auto-deploy on push
- **GitHub Pages** — hosting

---

## Theoretical Framework

This project draws on established macroeconomic literature:

- **Estrella & Mishkin (1998)** — yield curve as a leading indicator of real activity
- **Bernanke & Blinder (1992)** — credit channel of monetary policy transmission
- **Taylor Rule empirics** — 12–18 month lag between rate decisions and real economy impact
- **Boskin / Mishkin financial accelerator** — amplification of monetary shocks through credit conditions

---

## Disclaimer

*This dashboard is built for educational and research purposes. All scenario probabilities are judgmental estimates based on publicly available data as of March 2026. Nothing here constitutes investment advice.*

---

*Built by [@kchen023](https://github.com/kchen023)*
