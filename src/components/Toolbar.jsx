import { Search } from 'lucide-react';

const STATUSES = ['all', 'active', 'inactive'];

export default function Toolbar({ search, status, onSearch, onStatus }) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">

      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={14} className="absolute left-[11px] top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search name, role, department…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full bg-surface border border-border rounded-lg text-[13px] text-txt py-2 pl-8 pr-3 outline-none font-sans placeholder:text-muted focus:border-accent transition-colors duration-150"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-txt text-xs px-1 bg-transparent border-none cursor-pointer"
          >✕</button>
        )}
      </div>

      {/* Status toggle */}
      <div className="flex bg-surface border border-border rounded-lg overflow-hidden">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => onStatus(s)}
            className={[
              'px-3.5 py-[7px] text-xs font-medium border-none cursor-pointer transition-all duration-150 font-sans',
              status === s
                ? 'bg-accent text-white'
                : 'bg-transparent text-muted hover:bg-surface2 hover:text-txt',
            ].join(' ')}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

    </div>
  );
}
