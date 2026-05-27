import { useMemo } from 'react';
import { employees } from '../data/employees';
import { DEPT_COLORS } from '../utils/constants';

export default function Sidebar({ activeDept, onDeptChange }) {
  const depts = ['All', ...new Set(employees.map(e => e.department))];

  const counts = useMemo(() => {
    const c = { All: employees.length };
    employees.forEach(e => { c[e.department] = (c[e.department] || 0) + 1; });
    return c;
  }, []);

  return (
    <aside className="w-[210px] shrink-0 bg-surface border-r border-border overflow-y-auto py-5 px-2.5 hidden md:block">
      <p className="text-[10px] font-semibold tracking-[1px] uppercase text-muted px-2.5 mb-2">
        Departments
      </p>
      <nav className="flex flex-col gap-0.5">
        {depts.map(d => {
          const color = DEPT_COLORS[d];
          const isActive = activeDept === d;
          return (
            <button
              key={d}
              onClick={() => onDeptChange(d)}
              className={[
                'flex items-center gap-2 w-full px-2.5 py-[7px] rounded-lg border text-[13px] font-sans cursor-pointer transition-all duration-150 text-left',
                isActive ? 'font-medium' : 'border-transparent text-dim hover:bg-surface2 hover:text-txt',
              ].join(' ')}
              style={isActive && color ? {
                background: color.bg, color: color.text, borderColor: color.border,
              } : isActive ? {
                background: 'rgba(79,142,247,0.12)', color: '#4f8ef7', borderColor: 'rgba(79,142,247,0.3)',
              } : {}}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: d === 'All' ? '#4f8ef7' : DEPT_COLORS[d]?.chart }}
              />
              <span className="flex-1">{d}</span>
              <span className="text-[10px] font-mono bg-surface3 text-muted px-1.5 rounded-full">
                {counts[d] || 0}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
