// firstName + lastName → initials
export function initials(emp) {
  return ((emp.firstName?.[0] || '') + (emp.lastName?.[0] || '')).toUpperCase();
}

export function fullName(emp) {
  return `${emp.firstName} ${emp.lastName}`;
}

export function formatSalary(val) {
  return '$' + val.toLocaleString();
}

export function formatSalaryShort(val) {
  return '$' + Math.round(val / 1000) + 'k';
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

// isActive boolean → 'active' | 'inactive'
export function statusLabel(emp) {
  return emp.isActive ? 'Active' : 'Inactive';
}

export function computeStats(data) {
  if (!data.length) return { total: 0, active: 0, inactive: 0, avgSalary: 0, avgRating: 0, totalProjects: 0 };
  const active        = data.filter(e => e.isActive).length;
  const avgSalary     = Math.round(data.reduce((s, e) => s + e.salary, 0) / data.length);
  const avgRating     = parseFloat((data.reduce((s, e) => s + e.performanceRating, 0) / data.length).toFixed(1));
  const totalProjects = data.reduce((s, e) => s + e.projectsCompleted, 0);
  return { total: data.length, active, inactive: data.length - active, avgSalary, avgRating, totalProjects };
}

export function groupByDept(data) {
  const map = {};
  data.forEach(e => {
    if (!map[e.department]) map[e.department] = [];
    map[e.department].push(e);
  });
  return Object.entries(map).map(([dept, list]) => ({
    dept,
    count:         list.length,
    avgSalary:     Math.round(list.reduce((s, e) => s + e.salary, 0) / list.length),
    avgRating:     parseFloat((list.reduce((s, e) => s + e.performanceRating, 0) / list.length).toFixed(2)),
    totalProjects: list.reduce((s, e) => s + e.projectsCompleted, 0),
    active:        list.filter(e => e.isActive).length,
  })).sort((a, b) => b.count - a.count);
}

export function topPerformers(data, n = 5) {
  return [...data].sort((a, b) => b.performanceRating - a.performanceRating).slice(0, n);
}
