import { DEPT_COLORS } from '../utils/constants';
import { initials, fullName, formatSalary, formatDate } from '../utils/helpers';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

const AVATAR_PALETTE = [
  ['#1e3a6e','#60a5fa'], ['#14532d','#4ade80'], ['#451a03','#fbbf24'],
  ['#3b0764','#c084fc'], ['#064e3b','#34d399'], ['#4a0d2e','#f472b6'],
  ['#431407','#fb923c'], ['#450a0a','#f87171'],
];

function Avatar({ emp }) {
  const [bg, fg] = AVATAR_PALETTE[(emp.id - 1) % AVATAR_PALETTE.length];
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
      style={{ background: bg, color: fg }}
    >
      {initials(emp)}
    </div>
  );
}

function DeptPill({ dept }) {
  const c = DEPT_COLORS[dept] || { bg: '#1e2026', text: '#9ca3af', border: '#2a2d35' };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border whitespace-nowrap"
      style={{ background: c.bg, color: c.text, borderColor: c.border }}
    >
      {dept}
    </span>
  );
}

function RatingBar({ rating }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`w-2 h-2 rounded-[2px] ${i <= Math.round(rating) ? 'bg-amber' : 'bg-surface3'}`} />
        ))}
      </div>
      <span className="text-[11px] text-muted font-mono">{rating.toFixed(1)}</span>
    </div>
  );
}

function SortIcon({ col, sortCol, sortDir }) {
  if (sortCol !== col) return <ChevronsUpDown size={12} className="inline-block align-middle ml-1 opacity-35 text-muted" />;
  return sortDir === 1
    ? <ChevronUp   size={12} className="inline-block align-middle ml-1 text-accent" />
    : <ChevronDown size={12} className="inline-block align-middle ml-1 text-accent" />;
}

const COLUMNS = [
  { key: 'firstName',         label: 'Employee'    },
  { key: 'department',        label: 'Department'  },
  { key: 'position',          label: 'Position'    },
  { key: 'salary',            label: 'Salary'      },
  { key: 'performanceRating', label: 'Rating'      },
  { key: 'projectsCompleted', label: 'Projects'    },
  { key: 'location',          label: 'Location'    },
  { key: 'isActive',          label: 'Status'      },
  { key: 'hireDate',          label: 'Hired'       },
];

export default function EmployeeTable({
  data, sortCol, sortDir, onSort,
  page, totalPages, onPage, total,
}) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {COLUMNS.map(c => (
                <th
                  key={c.key}
                  onClick={() => onSort(c.key)}
                  className={[
                    'px-3.5 py-2.5 text-left text-[10px] font-semibold tracking-[0.6px] uppercase whitespace-nowrap select-none border-b border-border bg-surface2 cursor-pointer transition-colors',
                    sortCol === c.key ? 'text-accent' : 'text-muted hover:text-txt',
                  ].join(' ')}
                >
                  {c.label}
                  <SortIcon col={c.key} sortCol={sortCol} sortDir={sortDir} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <div className="text-center py-12 px-6 text-muted">
                    <div className="text-[32px] mb-2.5 opacity-50">🔍</div>
                    <p className="text-sm">No employees match your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map(e => (
                <tr key={e.id} className="border-b border-border last:border-b-0 hover:bg-surface2 transition-colors duration-100">

                  {/* Employee */}
                  <td className="px-3.5 py-[11px] align-middle">
                    <div className="flex items-center gap-2.5">
                      <Avatar emp={e} />
                      <div>
                        <div className="text-[13px] font-medium text-txt">{fullName(e)}</div>
                        <div className="text-[11px] text-muted">{e.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-3.5 py-[11px] align-middle"><DeptPill dept={e.department} /></td>

                  {/* Position */}
                  <td className="px-3.5 py-[11px] align-middle text-[12px] text-dim">{e.position}</td>

                  {/* Salary */}
                  <td className="px-3.5 py-[11px] align-middle text-[13px] font-mono text-txt">{formatSalary(e.salary)}</td>

                  {/* Rating */}
                  <td className="px-3.5 py-[11px] align-middle"><RatingBar rating={e.performanceRating} /></td>

                  {/* Projects */}
                  <td className="px-3.5 py-[11px] align-middle text-[13px] font-mono font-semibold text-txt">{e.projectsCompleted}</td>

                  {/* Location */}
                  <td className="px-3.5 py-[11px] align-middle text-[12px] text-dim">{e.location}</td>

                  {/* Status */}
                  <td className="px-3.5 py-[11px] align-middle">
                    <span className={`inline-flex items-center gap-1.5 text-xs ${e.isActive ? 'text-green' : 'text-muted'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${e.isActive ? 'bg-green shadow-[0_0_5px_#22c55e]' : 'bg-muted'}`} />
                      {e.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* Hired */}
                  <td className="px-3.5 py-[11px] align-middle text-[13px] font-mono text-muted">{formatDate(e.hireDate)}</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface">
        <span className="text-xs text-muted">
          {total} result{total !== 1 ? 's' : ''} &nbsp;·&nbsp; page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => onPage(page - 1)}
            className="min-w-[28px] h-7 px-1.5 rounded-lg border border-border bg-transparent text-muted text-xs font-mono flex items-center justify-center hover:bg-surface2 hover:text-txt transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >‹</button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => onPage(n)}
              className={[
                'min-w-[28px] h-7 px-1.5 rounded-lg border text-xs font-mono flex items-center justify-center transition-all duration-150',
                n === page
                  ? 'bg-accent border-accent text-white'
                  : 'bg-transparent border-border text-muted hover:bg-surface2 hover:text-txt',
              ].join(' ')}
            >{n}</button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => onPage(page + 1)}
            className="min-w-[28px] h-7 px-1.5 rounded-lg border border-border bg-transparent text-muted text-xs font-mono flex items-center justify-center hover:bg-surface2 hover:text-txt transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >›</button>
        </div>
      </div>
    </div>
  );
}
