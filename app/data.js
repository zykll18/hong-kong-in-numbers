// data.js — every figure on this site, with its source.
// All figures were verified against the Census and Statistics Department
// (C&SD), Hong Kong SAR, and the Rating and Valuation Department (RVD)
// in November 2026. Nothing here is estimated or invented: if a number
// could not be traced to an official release, it was left out.

export const SITE = {
  name: 'Hong Kong in Numbers',
  place: 'Hong Kong',
  tagline: 'The official statistics of Hong Kong, plainly explained.',
  updated: 'November 2026',
};

// Home-page headline indicators.
export const HEADLINES = [
  {
    id: 'population', label: 'Population', value: '7.53 million',
    change: '+0.1% on a year earlier', year: 'End-2024', route: '#/population',
    note: 'Usual residents 7.27 million; mobile residents 267,100.',
  },
  {
    id: 'gdp', label: 'GDP', value: 'HK$3,175.1 bn',
    change: '+2.5% in real terms', year: '2024', route: '#/economy',
    note: 'Nominal GDP; GDP per capita HK$421,990.',
  },
  {
    id: 'unemployment', label: 'Unemployment rate', value: '3.9%',
    change: 'Seasonally adjusted', year: 'Q3 2025', route: '#/labour',
    note: 'Up from 3.5% in Q2 2025; 155,600 people unemployed.',
  },
  {
    id: 'cpi', label: 'Consumer prices', value: '+1.7%',
    change: 'Composite CPI, year on year', year: '2024', route: '#/prices',
    note: 'Underlying inflation (net of one-off relief) was +1.1%.',
  },
  {
    id: 'income', label: 'Median household income', value: 'HK$30,000',
    change: 'Per month', year: 'Q3 2025', route: '#/labour',
    note: 'Median monthly employment earnings were HK$20,500.',
  },
  {
    id: 'housing', label: 'Home prices', value: '−7.1%',
    change: 'Private homes, December on December', year: '2024', route: '#/housing',
    note: 'Prices have fallen about 28% from the 2021 peak.',
  },
];

// --- Population -------------------------------------------------------------
export const POPULATION = {
  total: { value: '7,534,200', year: 'End-2024', change: '+6,400 (+0.1%) on end-2023' },
  usual: { value: '7,267,100', note: 'Usual residents' },
  mobile: { value: '267,100', note: 'Mobile residents' },
  births: { value: '36,700', year: '2024' },
  deaths: { value: '51,400', year: '2024' },
  netInflow: { value: '+21,000', year: '2024', note: 'Net movement of residents' },
  medianAge: { value: '47.9 years', year: '2024' },
  lifeMale: { value: '82.7 years', year: '2024' },
  lifeFemale: { value: '88.2 years', year: '2024' },
  // End-2024, thousands of persons (C&SD, Women and Men in Hong Kong 2025).
  ageGroups: [
    { group: '0–14', value: 723.8, share: '9.6%' },
    { group: '15–24', value: 583.1, share: '7.8%' },
    { group: '25–64', value: 4432.6, share: '59.1%' },
    { group: '65 and over', value: 1761.1, share: '23.5%' },
  ],
  females: '4,096,100',
  males: '3,404,500',
};

// --- Economy ----------------------------------------------------------------
export const ECONOMY = {
  gdpNominal: { value: 'HK$3,175.1 billion', year: '2024' },
  gdpPerCapita: { value: 'HK$421,990', year: '2024' },
  gdpUsd: { value: 'US$407.1 billion', year: '2024' },
  servicesShare: { value: '93.5%', year: '2023', note: 'Services share of GDP' },
  // Real GDP growth, % year on year (C&SD).
  gdpGrowth: [
    { year: '2020', value: -6.5 },
    { year: '2021', value: 6.4 },
    { year: '2022', value: -3.5 },
    { year: '2023', value: 3.2 },
    { year: '2024', value: 2.5 },
  ],
  // External merchandise trade, HK$ billion (C&SD, Hong Kong in Figures 2026).
  trade: {
    exports2024: { value: 'HK$4,542.4 bn', change: '+8.7%' },
    imports2024: { value: 'HK$4,922.1 bn', change: '+6.0%' },
    total2024: { value: 'HK$9,464.5 bn', change: '+7.3%' },
    balance2024: { value: 'HK$−379.7 bn', note: 'Visible trade deficit, 7.7% of imports' },
    series: [
      { year: '2020', exports: 3927.5, imports: 4269.8, total: 8197.3 },
      { year: '2024', exports: 4542.4, imports: 4922.1, total: 9464.5 },
      { year: '2025', exports: 5240.3, imports: 5686.8, total: 10927.1 },
    ],
    topSources: [
      { partner: 'Chinese Mainland', value: 'HK$2,144.7 bn' },
      { partner: 'Taiwan', value: 'HK$557.0 bn' },
    ],
  },
};

// --- Labour -----------------------------------------------------------------
export const LABOUR = {
  labourForce: { value: '3,830,100', year: 'Q3 2025' },
  participation: { value: '57.1%', year: 'Q3 2025', note: 'Labour force participation rate' },
  employed: { value: '3,674,500', year: 'Q3 2025' },
  medianEarnings: { value: 'HK$20,500', year: 'Q3 2025', note: 'Median monthly employment earnings' },
  unemployed: { value: '155,600', year: 'Q3 2025' },
  underemployment: { value: '1.6%', year: 'Q3 2025' },
  underemployedPersons: { value: '60,000', year: 'Q3 2025' },
  households: { value: '2,787,900', year: 'Q3 2025', note: 'Domestic households' },
  medianHouseholdIncome: { value: 'HK$30,000', year: 'Q3 2025', note: 'Median monthly domestic household income' },
  // Seasonally adjusted unemployment rate, % (C&SD General Household Survey).
  unemploymentSeries: [
    { label: 'Q3 2024', value: 3.0 },
    { label: 'Q4 2024', value: 3.1 },
    { label: 'Q1 2025', value: 3.2 },
    { label: 'Q2 2025', value: 3.5 },
    { label: 'Q3 2025', value: 3.9 },
  ],
};

// --- Prices -----------------------------------------------------------------
export const PRICES = {
  composite2024: { value: '+1.7%', note: 'Composite CPI, annual average' },
  underlying2024: { value: '+1.1%', note: 'Underlying Composite CPI (net of one-off relief measures)' },
  cpiA: { value: '+2.1%', note: 'CPI(A) — lower expenditure range' },
  cpiB: { value: '+1.6%', note: 'CPI(B) — middle expenditure range' },
  cpiC: { value: '+1.5%', note: 'CPI(C) — higher expenditure range' },
  dec2024: { value: '+1.4%', note: 'Composite CPI, December 2024 year on year' },
  // Annual average change in the Composite CPI, % (C&SD).
  cpiSeries: [
    { year: '2022', value: 1.9 },
    { year: '2023', value: 2.1 },
    { year: '2024', value: 1.7 },
  ],
};

// --- Housing ----------------------------------------------------------------
export const HOUSING = {
  index2024: { value: '298.7', note: 'Private domestic price index, annual average (1999 = 100)' },
  index2023: { value: '337.4', note: 'Annual average, 2023' },
  index2025: { value: '290.1', note: 'Annual average, 2025' },
  fallFromPeak: { value: 'about 28%', note: 'Fall from the 2021 peak by early 2025' },
  // December-on-December change in private home prices, % (RVD).
  yearlyChange: [
    { year: '2022', value: -15.0 },
    { year: '2023', value: -7.0 },
    { year: '2024', value: -7.1 },
    { year: '2025', value: 3.6 },
  ],
};

// --- Sources ----------------------------------------------------------------
export const SOURCES = [
  {
    topic: 'Population',
    publisher: 'Census and Statistics Department, HKSAR',
    title: 'Year-end Population for 2024',
    released: 'February 2025',
    covers: 'Total population, usual and mobile residents, births, deaths and net movement.',
  },
  {
    topic: 'Population by age and sex',
    publisher: 'Census and Statistics Department, HKSAR',
    title: 'Women and Men in Hong Kong — Key Statistics, 2025 Edition',
    released: 'August 2025',
    covers: 'Population by sex and age group at end-2024; life expectancy at birth.',
  },
  {
    topic: 'Ageing',
    publisher: 'Census and Statistics Department, HKSAR',
    title: '2025 Economic Background and 2026 Prospects',
    released: 'February 2026',
    covers: 'Share aged 65 and over, median age and life expectancy, 1995–2025.',
  },
  {
    topic: 'Economy',
    publisher: 'Census and Statistics Department, HKSAR',
    title: 'Gross Domestic Product, 2024',
    released: '2025',
    covers: 'Nominal GDP HK$3,175.1 billion, GDP per capita HK$421,990, real growth +2.5%.',
  },
  {
    topic: 'Trade',
    publisher: 'Census and Statistics Department, HKSAR',
    title: 'Hong Kong in Figures, 2026 Edition',
    released: 'April 2026',
    covers: 'Aggregate merchandise trade 2020, 2024 and 2025; trade by main partner.',
  },
  {
    topic: 'Labour',
    publisher: 'Census and Statistics Department, HKSAR',
    title: 'Quarterly Report on General Household Survey, Third Quarter 2025',
    released: 'November 2025',
    covers: 'Labour force, employment, unemployment and underemployment, earnings and household income.',
  },
  {
    topic: 'Prices',
    publisher: 'Census and Statistics Department, HKSAR',
    title: 'Monthly Report on the Consumer Price Index, December 2024',
    released: 'January 2025',
    covers: 'Composite CPI and CPI(A), CPI(B), CPI(C) for 2024 as a whole.',
  },
  {
    topic: 'Housing',
    publisher: 'Rating and Valuation Department, HKSAR',
    title: 'Property Market Statistics — Private Domestic Price Index',
    released: '2025–2026',
    covers: 'Annual average price index (1999 = 100) and December-on-December changes.',
  },
];

export const SOURCE_LINE = 'Source: Census and Statistics Department, HKSAR';
