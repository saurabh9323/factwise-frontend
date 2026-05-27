import { useState, useEffect } from 'react';
import './App.css';
import { useEmployees } from './hooks/useEmployees';
import Topbar         from './components/Topbar';
import Sidebar        from './components/Sidebar';
import KpiCards       from './components/KpiCards';
import Toolbar        from './components/Toolbar';
import EmployeeTable  from './components/EmployeeTable';
import {
  HeadcountChart, SalaryChart, RatingRadar,
  StatusDonut, ProjectsChart, TopPerformers,
} from './components/Charts';
import { employees } from './data/employees';

export default function App() {
  const [theme, setTheme] = useState('light'); // 'dark' | 'light'

  // Apply theme class to <html> so CSS variables switch globally
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const {
    filtered, pageData,
    dept, status, search,
    sortCol, sortDir,
    page, totalPages,
    handleSort, handleDept, handleStatus, handleSearch, setPage,
  } = useEmployees();

  return (
    <div className="flex flex-col h-screen bg-bg text-txt font-sans">

      <Topbar
        total={employees.length}
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar activeDept={dept} onDeptChange={handleDept} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col gap-5 max-w-[1400px]">

            <KpiCards data={filtered} />

            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted -mb-1">
              Analytics
            </p>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              <HeadcountChart data={filtered} />
              <SalaryChart    data={filtered} />
              <RatingRadar    data={filtered} />
              <StatusDonut    data={filtered} />
              <ProjectsChart  data={filtered} />
              <TopPerformers  data={filtered} />
            </div>

            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted -mb-1">
              All Employees
            </p>
            <Toolbar
              search={search} status={status}
              onSearch={handleSearch} onStatus={handleStatus}
            />
            <EmployeeTable
              data={pageData} sortCol={sortCol} sortDir={sortDir} onSort={handleSort}
              page={page} totalPages={totalPages} onPage={setPage} total={filtered.length}
            />

          </div>
        </main>
      </div>
    </div>
  );
}