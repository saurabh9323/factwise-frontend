export default function Topbar({ total, theme, onThemeToggle }) {
  return (
    <header className="flex items-center justify-between px-6 h-[54px] bg-surface border-b border-border shrink-0 z-50">
      <div className="flex items-center gap-0.5 text-[15px] font-bold tracking-tight">
        <span className="text-accent">Fact</span>
        <span className="text-txt">Wise</span>
        <span className="text-muted font-light mx-1">·</span>
        <span className="text-dim font-normal text-[13px]">People</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-muted">{total} employees total</span>

        <button
          onClick={onThemeToggle}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border2 bg-surface2 text-muted hover:text-txt hover:border-border transition-all duration-150 text-xs font-sans cursor-pointer"
        >
          {theme === 'dark' ? (
            <>
              <span>☀️</span>
              <span>Light</span>
            </>
          ) : (
            <>
              <span>🌙</span>
              <span>Dark</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}