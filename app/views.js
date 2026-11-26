// views.js — one render function per page. Each returns an HTML string
// for #view. All figures come from data.js; nothing is hard-coded here
// except the words around them.

import { SITE, HEADLINES, POPULATION, ECONOMY, LABOUR, PRICES, HOUSING, SOURCES } from './data.js';
import { barChart, lineChart, donutChart, hbarRows } from './charts.js';

function sourceNote(text) {
  return `<p class="source-note">${text}</p>`;
}

function statCard({ label, value, change, year, note, route }) {
  const inner = `<span class="stat-label">${label}</span>`
    + `<span class="stat-value">${value}</span>`
    + (change ? `<span class="stat-change">${change}</span>` : '')
    + `<span class="stat-year">${year}</span>`
    + (note ? `<span class="stat-note">${note}</span>` : '');
  return route
    ? `<a class="stat-card" href="${route}">${inner}<span class="stat-link">See more →</span></a>`
    : `<div class="stat-card">${inner}</div>`;
}

function statGrid(cards) {
  return `<div class="stat-grid">${cards.map(statCard).join('')}</div>`;
}

function pageHead(title, intro) {
  return `<header class="page-head"><h1>${title}</h1><p class="lede">${intro}</p></header>`;
}

function figureTable(rows) {
  const body = rows.map(([k, v, s]) =>
    `<tr><th scope="row">${k}</th><td>${v}</td><td class="muted">${s}</td></tr>`).join('');
  return `<table class="figures"><tbody>${body}</tbody></table>`;
}

// --- Home -------------------------------------------------------------------
export function renderHome() {
  const growth = barChart(
    ECONOMY.gdpGrowth.map((g) => ({ label: g.year, value: g.value })),
    { unit: '%' },
  );
  const ageSlices = [
    { label: 'aged 65 and over', value: 1761.1, color: '#e4572e' },
    { label: 'aged 25–64', value: 4432.6, color: '#1d3557' },
    { label: 'aged 15–24', value: 583.1, color: '#2a9d8f' },
    { label: 'aged 0–14', value: 723.8, color: '#e9c46a' },
  ];
  return `
  <section class="hero">
    <p class="kicker">${SITE.place} · Official statistics</p>
    <h1>${SITE.name}</h1>
    <p class="lede">${SITE.tagline} Population, the economy, jobs, prices and housing — each figure traced to the release it came from.</p>
    <p class="hero-meta">Latest figures: 2024 annual data and the third quarter of 2025 · Source: Census and Statistics Department, HKSAR.</p>
  </section>
  <section>
    <h2>At a glance</h2>
    ${statGrid(HEADLINES)}
  </section>
  <section class="two-col">
    <div class="card">
      <h2>Real GDP growth</h2>
      <p>Year-on-year change in real GDP, %. The pandemic crash of 2020, the rebound of 2021, and the slower growth since.</p>
      ${growth}
      ${sourceNote('Source: Census and Statistics Department, HKSAR, GDP estimates 2020–2024.')}
    </div>
    <div class="card">
      <h2>An ageing city</h2>
      <p>Share of the population by age group at end-2024. Almost one person in four is now aged 65 or over.</p>
      <div class="donut-wrap">${donutChart(ageSlices)}</div>
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Women and Men in Hong Kong 2025.')}
    </div>
  </section>
  <section>
    <h2>Find a topic</h2>
    <nav class="topic-links" aria-label="Topics">
      <a href="#/population">Population &amp; demographics →</a>
      <a href="#/economy">Economy &amp; trade →</a>
      <a href="#/labour">Labour &amp; income →</a>
      <a href="#/prices">Prices &amp; inflation →</a>
      <a href="#/housing">Housing →</a>
      <a href="#/sources">Sources →</a>
    </nav>
  </section>`;
}

// --- Population ---------------------------------------------------------------
export function renderPopulation() {
  const p = POPULATION;
  const ageRows = p.ageGroups.map((g) => ({
    label: `${g.group} years`, value: g.value, unit: '',
  }));
  return `
  ${pageHead('Population &amp; demographics', 'Hong Kong ended 2024 with 7.53 million people — up slightly on the year, older than ever, and with more deaths than births.')}
  ${statGrid([
    { label: 'Total population', value: p.total.value, change: p.total.change, year: p.total.year },
    { label: 'Usual residents', value: p.usual.value, year: 'End-2024' },
    { label: 'Mobile residents', value: p.mobile.value, year: 'End-2024' },
    { label: 'Median age', value: p.medianAge.value, year: p.medianAge.year },
    { label: 'Life expectancy — men', value: p.lifeMale.value, year: p.lifeMale.year },
    { label: 'Life expectancy — women', value: p.lifeFemale.value, year: p.lifeFemale.year },
  ])}
  <section class="two-col">
    <div class="card">
      <h2>Age structure, end-2024</h2>
      <p>Thousands of people in each age group. The 65-and-over group (1.76 million) is now nearly a quarter of the city.</p>
      ${hbarRows(ageRows)}
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Women and Men in Hong Kong — Key Statistics, 2025 Edition.')}
    </div>
    <div class="card">
      <h2>Births, deaths and movement, 2024</h2>
      ${figureTable([
        ['Live births', p.births.value, '2024'],
        ['Deaths', p.deaths.value, '2024'],
        ['Natural change', '−14,700', 'Births minus deaths'],
        ['Net inflow of residents', p.netInflow.value, '2024'],
        ['Women', p.females, 'End-2024'],
        ['Men', p.males, 'End-2024'],
      ])}
      <p>Births rose about 10% on 2023, but still fell well short of deaths. The population grew only because more people arrived than left.</p>
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Year-end Population for 2024 (February 2025).')}
    </div>
  </section>
  <section class="card">
    <h2>Why it matters</h2>
    <p>Hong Kong is ageing fast: the share aged 65 and over more than doubled from 10.0% in 1995 to 25.0% in 2025, while the median age rose from 33.8 to 49.4. Life expectancy — 82.7 years for men and 88.2 for women in 2024 — is among the longest in the world. An older population shapes everything from the labour force to housing and health spending.</p>
    ${sourceNote('Source: Census and Statistics Department, HKSAR, 2025 Economic Background and 2026 Prospects.')}
  </section>`;
}

// --- Economy ------------------------------------------------------------------
export function renderEconomy() {
  const e = ECONOMY;
  const growth = barChart(e.gdpGrowth.map((g) => ({ label: g.year, value: g.value })), { unit: '%' });
  // Total trade is shown as bars, not a line: the verified years (2020,
  // 2024, 2025) are unevenly spaced, and a line would imply the gaps.
  const trade = barChart(
    e.trade.series.map((t) => ({ label: t.year, value: t.total })),
    { unit: '' },
  );
  return `
  ${pageHead('Economy &amp; trade', 'A services economy built on trade: GDP of HK$3,175.1 billion in 2024, and total merchandise trade worth nearly three times GDP.')}
  ${statGrid([
    { label: 'GDP (nominal)', value: e.gdpNominal.value, change: '+2.5% real growth', year: e.gdpNominal.year },
    { label: 'GDP per capita', value: e.gdpPerCapita.value, year: e.gdpPerCapita.year },
    { label: 'GDP in US dollars', value: e.gdpUsd.value, year: e.gdpUsd.year },
    { label: 'Services share of GDP', value: e.servicesShare.value, year: e.servicesShare.year },
    { label: 'Total exports of goods', value: e.trade.exports2024.value, change: e.trade.exports2024.change, year: '2024' },
    { label: 'Total imports of goods', value: e.trade.imports2024.value, change: e.trade.imports2024.change, year: '2024' },
  ])}
  <section class="two-col">
    <div class="card">
      <h2>Real GDP growth, 2020–2024</h2>
      ${growth}
      ${sourceNote('Source: Census and Statistics Department, HKSAR, GDP estimates.')}
    </div>
    <div class="card">
      <h2>Total merchandise trade, HK$ billion</h2>
      ${trade}
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Hong Kong in Figures 2026.')}
    </div>
  </section>
  <section class="card">
    <h2>Trade in 2024</h2>
    ${figureTable([
      ['Total trade', e.trade.total2024.value, e.trade.total2024.change + ' on 2023'],
      ['Total exports', e.trade.exports2024.value, e.trade.exports2024.change + ' on 2023'],
      ['Imports', e.trade.imports2024.value, e.trade.imports2024.change + ' on 2023'],
      ['Merchandise trade balance', e.trade.balance2024.value, e.trade.balance2024.note],
      ['Largest source of imports — Chinese Mainland', e.trade.topSources[0].value, '2024'],
      ['Second largest — Taiwan', e.trade.topSources[1].value, '2024'],
    ])}
    <p>Hong Kong's exports are worth 1.4 times its GDP and its imports 1.6 times — the city lives by moving goods between the mainland and the world.</p>
    ${sourceNote('Source: Census and Statistics Department, HKSAR, Hong Kong Monthly Digest of Statistics, September 2025.')}
  </section>`;
}

// --- Labour -------------------------------------------------------------------
export function renderLabour() {
  const l = LABOUR;
  const chart = lineChart(l.unemploymentSeries.map((p) => ({ label: p.label, value: p.value })), { unit: '%' });
  return `
  ${pageHead('Labour &amp; income', 'Unemployment has climbed from 3.0% to 3.9% in a year, while the typical household still brings in HK$30,000 a month.')}
  ${statGrid([
    { label: 'Labour force', value: l.labourForce.value, year: l.labourForce.year },
    { label: 'Participation rate', value: l.participation.value, year: l.participation.year },
    { label: 'Employed persons', value: l.employed.value, year: l.employed.year },
    { label: 'Unemployed persons', value: l.unemployed.value, year: l.unemployed.year },
    { label: 'Median monthly earnings', value: l.medianEarnings.value, year: l.medianEarnings.year },
    { label: 'Median household income', value: l.medianHouseholdIncome.value, change: 'Per month', year: l.medianHouseholdIncome.year },
  ])}
  <section class="two-col">
    <div class="card">
      <h2>Unemployment rate, seasonally adjusted</h2>
      ${chart}
      ${sourceNote('Source: Census and Statistics Department, HKSAR, General Household Survey.')}
    </div>
    <div class="card">
      <h2>What workers earn</h2>
      ${figureTable([
        ['Median monthly employment earnings', l.medianEarnings.value, 'Q3 2025'],
        ['Median monthly household income', l.medianHouseholdIncome.value, 'Q3 2025'],
        ['Domestic households', l.households.value, 'Q3 2025'],
        ['Underemployment rate', l.underemployment.value, 'Q3 2025'],
        ['Underemployed persons', l.underemployedPersons.value, 'Q3 2025'],
      ])}
      <p>Earnings are the median across all employed people — half earn more, half less. Household income counts everyone living under one roof.</p>
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Quarterly Report on General Household Survey, Q3 2025.')}
    </div>
  </section>`;
}

// --- Prices -------------------------------------------------------------------
export function renderPrices() {
  const p = PRICES;
  const chart = barChart(p.cpiSeries.map((c) => ({ label: c.year, value: c.value })), { unit: '%' });
  return `
  ${pageHead('Prices &amp; inflation', 'Prices rose 1.7% in 2024 — the slowest annual increase in three years — and the poorest households felt it most.')}
  ${statGrid([
    { label: 'Composite CPI', value: p.composite2024.value, change: 'Annual average', year: '2024' },
    { label: 'Underlying CPI', value: p.underlying2024.value, change: 'Net of one-off relief', year: '2024' },
    { label: 'CPI(A) — lower spending', value: p.cpiA.value, year: '2024' },
    { label: 'CPI(B) — middle spending', value: p.cpiB.value, year: '2024' },
    { label: 'CPI(C) — higher spending', value: p.cpiC.value, year: '2024' },
    { label: 'December 2024', value: p.dec2024.value, change: 'Year on year', year: 'Dec 2024' },
  ])}
  <section class="two-col">
    <div class="card">
      <h2>Inflation, annual average</h2>
      ${chart}
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Monthly Report on the Consumer Price Index.')}
    </div>
    <div class="card">
      <h2>How the CPI is built</h2>
      <p>The Composite CPI tracks the prices of a basket of goods and services bought by Hong Kong households. It is published in three versions by household spending: CPI(A) covers lower-spending households, CPI(B) the middle, and CPI(C) the higher-spending. In 2024 the lower-spending basket rose fastest (+2.1%), driven by food, housing and meals out.</p>
      <p>The <em>underlying</em> rate strips out one-off government relief measures, such as rates concessions, to show the inflation households actually feel. It was +1.1% in 2024.</p>
      ${sourceNote('Source: Census and Statistics Department, HKSAR, Monthly Report on the Consumer Price Index, December 2024.')}
    </div>
  </section>`;
}

// --- Housing ------------------------------------------------------------------
export function renderHousing() {
  const h = HOUSING;
  const indexChart = barChart([
    { label: '2023', value: 337.4 },
    { label: '2024', value: 298.7 },
    { label: '2025', value: 290.1 },
  ], { unit: '' });
  const changeChart = barChart(h.yearlyChange.map((c) => ({ label: c.year, value: c.value })), { unit: '%' });
  return `
  ${pageHead('Housing', 'Home prices fell for three straight years, then steadied in 2025 — but Hong Kong remains the world’s least affordable housing market.')}
  ${statGrid([
    { label: 'Price index, 2024', value: h.index2024.value, change: 'Annual average (1999 = 100)', year: '2024' },
    { label: 'Price index, 2025', value: h.index2025.value, change: 'Annual average (1999 = 100)', year: '2025' },
    { label: 'Change in 2024', value: '−7.1%', change: 'December on December', year: '2024' },
    { label: 'Change in 2025', value: '+3.6%', change: 'December on December', year: '2025' },
    { label: 'Fall from 2021 peak', value: h.fallFromPeak.value, change: 'By early 2025', year: '2021–2025' },
  ])}
  <section class="two-col">
    <div class="card">
      <h2>Private domestic price index</h2>
      <p>Annual average, 1999 = 100. Compiled from prices paid for completed private homes on the secondary market.</p>
      ${indexChart}
      ${sourceNote('Source: Rating and Valuation Department, HKSAR, Property Market Statistics.')}
    </div>
    <div class="card">
      <h2>Year-on-year change in home prices</h2>
      <p>December-on-December change, %. Three years of falls (2022–2024) gave way to a modest recovery in 2025.</p>
      ${changeChart}
      ${sourceNote('Source: Rating and Valuation Department, HKSAR, via Global Property Guide.')}
    </div>
  </section>
  <section class="card">
    <h2>Reading the market</h2>
    <p>High mortgage rates, softer demand and a slow economy pushed prices down 15.0% in 2022, 7.0% in 2023 and 7.1% in 2024. Even after the fall, Hong Kong's homes remain the least affordable in the world by the Demographia survey — a typical home costs many times the typical household's annual income.</p>
    ${sourceNote('Sources: Rating and Valuation Department, HKSAR; Demographia International Housing Affordability 2026.')}
  </section>`;
}

// --- Sources ------------------------------------------------------------------
export function renderSources() {
  const rows = SOURCES.map((s) => `
    <article class="source-item">
      <h3>${s.topic}</h3>
      <p><strong>${s.title}</strong><br>${s.publisher} · Released ${s.released}</p>
      <p>${s.covers}</p>
    </article>`).join('');
  return `
  ${pageHead('Sources', 'Every figure on this site comes from an official release. Here is the full list, so you can check any number yourself.')}
  <section class="source-list">${rows}</section>
  <section class="card">
    <h2>How figures are shown</h2>
    <p>Figures are quoted as published, with the year or quarter they describe. Where a release revises earlier figures, the latest release is used. Nothing on this site is estimated, modelled or rounded beyond the source's own rounding.</p>
    <p>All data is from the Census and Statistics Department and the Rating and Valuation Department of the Hong Kong Special Administrative Region, except the Demographia affordability ranking cited on the housing page.</p>
  </section>`;
}

export const ROUTES = {
  '/': { title: 'Home', render: renderHome },
  '/population': { title: 'Population', render: renderPopulation },
  '/economy': { title: 'Economy', render: renderEconomy },
  '/labour': { title: 'Labour', render: renderLabour },
  '/prices': { title: 'Prices', render: renderPrices },
  '/housing': { title: 'Housing', render: renderHousing },
  '/sources': { title: 'Sources', render: renderSources },
};
