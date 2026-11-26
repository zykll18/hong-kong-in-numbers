// charts.js — small hand-rolled SVG charts. No library, no network.
// Each function takes plain data and returns an SVG string. Colours come
// from the site palette so every chart looks like it belongs here.

const INK = '#1d3557';
const ACCENT = '#e4572e';
const TEAL = '#2a9d8f';
const SAND = '#e9e2d0';
const GRID = '#d8d2c2';
const MUTED = '#6b7280';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += size) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// Bar chart. `bars` is [{label, value}]; values may be negative.
// `unit` is appended to value labels (e.g. '%').
export function barChart(bars, { unit = '', width = 640, height = 260, color = TEAL, negColor = ACCENT } = {}) {
  const padL = 44, padR = 12, padT = 14, padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const vals = bars.map((b) => b.value);
  const lo = Math.min(0, ...vals);
  const hi = Math.max(0, ...vals);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  const zeroY = y(0);
  const slot = plotW / bars.length;
  const bw = Math.min(46, slot * 0.58);
  const ticks = niceTicks(lo, hi, 4);
  // Inline SVG in HTML needs no xmlns attribute; leaving it out also
  // keeps every external URL string out of the bundle.
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart"><title>Bar chart</title>`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${t}${unit}</text>`;
  }
  s += `<line x1="${padL}" y1="${zeroY}" x2="${width - padR}" y2="${zeroY}" stroke="${INK}" stroke-width="1.5"/>`;
  bars.forEach((b, i) => {
    const x = padL + i * slot + (slot - bw) / 2;
    const top = Math.min(y(b.value), zeroY);
    const h = Math.max(1, Math.abs(y(b.value) - zeroY));
    const fill = b.value < 0 ? negColor : color;
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${fill}"/>`;
    // A '+' prefix only makes sense for changes (unit '%'); a plain
    // total such as HK$9,464.5 bn must not read like a change.
    const sign = unit === '%' && b.value > 0 ? '+' : '';
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(b.value < 0 ? top + h + 14 : top - 5).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${sign}${b.value}${unit}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(b.label)}</text>`;
  });
  return s + '</svg>';
}

// Line chart. `points` is [{label, value}].
export function lineChart(points, { unit = '', width = 640, height = 260, color = ACCENT } = {}) {
  const padL = 44, padR = 16, padT = 18, padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const vals = points.map((p) => p.value);
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  if (hi - lo < 1e-9) { hi += 1; lo -= 1; }
  lo -= (hi - lo) * 0.15;
  hi += (hi - lo) * 0.15;
  const x = (i) => padL + (i / (points.length - 1)) * plotW;
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  const ticks = niceTicks(lo, hi, 4);
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart"><title>Line chart</title>`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${t}${unit}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${p.value}${unit}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  return s + '</svg>';
}

// Donut chart with a legend. `slices` is [{label, value, color}].
export function donutChart(slices, { size = 240 } = {}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = slices.reduce((a, s) => a + s.value, 0);
  let angle = -Math.PI / 2;
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Donut chart"><title>Donut chart</title>`;
  for (const sl of slices) {
    const frac = sl.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${sl.color}"/>`;
  }
  const pct = Math.round((slices[0].value / total) * 1000) / 10;
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">${pct}%</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(slices[0].label)}</text>`;
  return s + '</svg>';
}

// Horizontal bars for ranked lists, e.g. age groups.
export function hbarRows(rows, { unit = '', max = null } = {}) {
  const top = max ?? Math.max(...rows.map((r) => r.value));
  return rows.map((r) => {
    const pct = Math.max(2, (r.value / top) * 100);
    return `<div class="hbar-row"><span class="hbar-label">${esc(r.label)}</span>`
      + `<span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%"></span></span>`
      + `<span class="hbar-value">${r.value}${unit}</span></div>`;
  }).join('');
}

export const PALETTE = { INK, ACCENT, TEAL, SAND, GRID, MUTED };
