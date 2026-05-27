import { computeStats, formatSalaryShort } from '../utils/helpers';

export default function KpiCards({ data }) {
  const s = computeStats(data);
  const activePct = s.total ? Math.round((s.active / s.total) * 100) : 0;

  const cards = [
    { label: 'Total Employees', value: s.total,                        sub: `${s.inactive} inactive`,  icon: '👥',  accent: false },
    { label: 'Active',          value: s.active,                       sub: `${activePct}% of total`,  icon: '✅',  accent: true  },
    { label: 'Avg Salary',      value: formatSalaryShort(s.avgSalary), sub: 'annual',                  icon: '💰',  accent: false },
    { label: 'Avg Rating',      value: s.avgRating.toFixed(1),         sub: 'out of 5.0',              icon: '⭐',  accent: false },
    { label: 'Total Projects',  value: s.totalProjects,                sub: 'completed',               icon: '🚀',  accent: false },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-sm:grid-cols-2">
      {cards.map(c => (
        <div
          key={c.label}
          className={[
            'flex flex-col gap-1 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-px',
            c.accent
              ? 'border-accent/30 bg-gradient-to-br from-surface to-accent-dim'
              : 'border-border bg-surface hover:border-border2',
          ].join(' ')}
        >
          <span className="text-lg mb-1">{c.icon}</span>
          <div className="text-[11px] font-medium tracking-[0.2px] text-muted">{c.label}</div>
          <div className={`text-2xl font-bold tracking-tight font-mono ${c.accent ? 'text-accent' : 'text-txt'}`}>{c.value}</div>
          <div className="text-[11px] text-muted">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
