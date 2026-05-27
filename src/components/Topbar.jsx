export default function Topbar({ total }) {
  return (
    <header className="flex items-center justify-between px-6 h-[54px] bg-surface border-b border-border shrink-0 z-50">
      <div className="flex items-center gap-0.5 text-[15px] font-bold tracking-tight">
        <span className="text-accent">Fact</span>
        <span className="text-txt">Wise</span>
        <span className="text-muted font-light mx-1">·</span>
        <span className="text-dim font-normal text-[13px]">People</span>
      </div>
      <span className="text-xs text-muted">{total} employees total</span>
    </header>
  );
}
