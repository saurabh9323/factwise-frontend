import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { groupByDept, topPerformers, initials, fullName } from '../utils/helpers';
import { DEPT_COLORS } from '../utils/constants';

const TIP_STYLE = {
  background: '#1e2026', border: '1px solid #2a2d35',
  borderRadius: 8, color: '#e8eaf0', fontSize: 12, padding: '8px 12px',
};

function ChartCard({ title, sub, children }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-txt mb-0.5">{title}</h3>
      <p className="text-[11px] text-muted mb-3.5">{sub}</p>
      {children}
    </div>
  );
}

export function HeadcountChart({ data }) {
  const deptData = groupByDept(data);
  return (
    <ChartCard title="Headcount by Department" sub="How many people are in each team">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={deptData} layout="vertical" margin={{ left: 10, right: 20, top: 4, bottom: 4 }}>
          <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="dept" type="category" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip contentStyle={TIP_STYLE} formatter={v => [v, 'Employees']} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {deptData.map(e => <Cell key={e.dept} fill={DEPT_COLORS[e.dept]?.chart || '#4f8ef7'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SalaryChart({ data }) {
  const deptData = groupByDept(data).map(d => ({ ...d, avgSalaryK: Math.round(d.avgSalary / 1000) }));
  return (
    <ChartCard title="Avg Salary by Department" sub="Annual compensation in $k">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={deptData} margin={{ left: 0, right: 10, top: 4, bottom: 40 }}>
          <XAxis dataKey="dept" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} />
          <Tooltip contentStyle={TIP_STYLE} formatter={v => [`$${v}k`, 'Avg Salary']} />
          <Bar dataKey="avgSalaryK" radius={[4, 4, 0, 0]} maxBarSize={36}>
            {deptData.map(e => <Cell key={e.dept} fill={DEPT_COLORS[e.dept]?.chart || '#4f8ef7'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function RatingRadar({ data }) {
  const deptData = groupByDept(data).map(d => ({
    dept: d.dept.length > 5 ? d.dept.slice(0, 5) : d.dept,
    rating: d.avgRating,
  }));
  return (
    <ChartCard title="Performance by Department" sub="Average rating per team (out of 5)">
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={deptData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="#2a2d35" />
          <PolarAngleAxis dataKey="dept" tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <Radar dataKey="rating" stroke="#4f8ef7" fill="#4f8ef7" fillOpacity={0.25} strokeWidth={2} />
          <Tooltip contentStyle={TIP_STYLE} formatter={v => [v, 'Avg Rating']} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function StatusDonut({ data }) {
  const active   = data.filter(e => e.isActive).length;
  const inactive = data.filter(e => !e.isActive).length;
  const pieData  = [{ name: 'Active', value: active }, { name: 'Inactive', value: inactive }];
  const COLORS   = ['#22c55e', '#4b5563'];
  return (
    <ChartCard title="Active vs Inactive" sub="Current employee status split">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
            {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip contentStyle={TIP_STYLE} />
          <Legend formatter={v => <span style={{ color: '#9ca3af', fontSize: 12 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ProjectsChart({ data }) {
  const deptData = groupByDept(data);
  return (
    <ChartCard title="Projects by Department" sub="Total completed projects per team">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={deptData} margin={{ left: 0, right: 10, top: 4, bottom: 40 }}>
          <XAxis dataKey="dept" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TIP_STYLE} formatter={v => [v, 'Projects']} />
          <Bar dataKey="totalProjects" radius={[4, 4, 0, 0]} maxBarSize={36}>
            {deptData.map(e => <Cell key={e.dept} fill={DEPT_COLORS[e.dept]?.chart || '#4f8ef7'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

const AVATAR_COLORS = [
  ['#1e3a6e','#60a5fa'], ['#14532d','#4ade80'], ['#451a03','#fbbf24'],
  ['#3b0764','#c084fc'], ['#064e3b','#34d399'],
];

export function TopPerformers({ data }) {
  const top = topPerformers(data, 5);
  return (
    <ChartCard title="Top Performers" sub="Highest rated employees">
      <div className="flex flex-col gap-2.5 mt-1">
        {top.map((e, i) => {
          const [bg, fg] = AVATAR_COLORS[i % AVATAR_COLORS.length];
          return (
            <div key={e.id} className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono text-muted w-5 shrink-0">#{i + 1}</span>
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0"
                style={{ background: bg, color: fg }}
              >
                {initials(e)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-medium text-txt truncate">{fullName(e)}</span>
                <span className="text-[10px] text-muted">{e.position}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold font-mono text-amber">
                <span className="text-[11px]">★</span>
                {e.performanceRating.toFixed(1)}
              </div>
            </div>
          );
        })}
        {top.length === 0 && <p className="text-center py-5 text-sm text-muted">No data</p>}
      </div>
    </ChartCard>
  );
}
