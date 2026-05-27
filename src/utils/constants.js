export const DEPT_COLORS = {
  Engineering: { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa', border: 'rgba(59,130,246,0.3)', chart: '#3b82f6' },
  Marketing:   { bg: 'rgba(245,158,11,0.15)', text: '#fbbf24', border: 'rgba(245,158,11,0.3)', chart: '#f59e0b' },
  Sales:       { bg: 'rgba(34,197,94,0.15)',  text: '#4ade80', border: 'rgba(34,197,94,0.3)',  chart: '#22c55e' },
  HR:          { bg: 'rgba(244,114,182,0.15)',text: '#f472b6', border: 'rgba(244,114,182,0.3)',chart: '#ec4899' },
  Finance:     { bg: 'rgba(167,139,250,0.15)',text: '#a78bfa', border: 'rgba(167,139,250,0.3)',chart: '#8b5cf6' },
  Operations:  { bg: 'rgba(52,211,153,0.15)', text: '#34d399', border: 'rgba(52,211,153,0.3)', chart: '#10b981' },
  Product:     { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', border: 'rgba(251,146,60,0.3)', chart: '#f97316' },
  Data:        { bg: 'rgba(248,113,113,0.15)',text: '#f87171', border: 'rgba(248,113,113,0.3)',chart: '#ef4444' },
};

export const CHART_COLORS = Object.values(DEPT_COLORS).map(d => d.chart);

export const PER_PAGE = 8;
