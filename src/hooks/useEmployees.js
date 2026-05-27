import { useState, useMemo } from 'react';
import { employees as ALL } from '../data/employees';
import { fullName } from '../utils/helpers';
import { PER_PAGE } from '../utils/constants';

export function useEmployees() {
  const [dept,    setDept]    = useState('All');
  const [status,  setStatus]  = useState('all');
  const [search,  setSearch]  = useState('');
  const [sortCol, setSortCol] = useState('firstName');
  const [sortDir, setSortDir] = useState(1);
  const [page,    setPage]    = useState(1);

  // 1. filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL.filter(e => {
      if (dept !== 'All' && e.department !== dept) return false;
      if (status === 'active'   && !e.isActive)  return false;
      if (status === 'inactive' &&  e.isActive)  return false;
      if (q && ![fullName(e), e.position, e.department, e.location, e.email]
        .some(f => f?.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [dept, status, search]);

  // 2. sort — handle computed fullName sort too
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortCol], bv = b[sortCol];
      // sort by full name when col is firstName
      if (sortCol === 'firstName') { av = fullName(a); bv = fullName(b); }
      if (typeof av === 'string') return av.localeCompare(bv) * sortDir;
      return (av - bv) * sortDir;
    });
  }, [filtered, sortCol, sortDir]);

  // 3. paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const pageData   = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d * -1);
    else { setSortCol(col); setSortDir(1); }
    setPage(1);
  }

  function handleDept(d)   { setDept(d);   setPage(1); }
  function handleStatus(s) { setStatus(s); setPage(1); }
  function handleSearch(s) { setSearch(s); setPage(1); }

  return {
    all: ALL, filtered, sorted, pageData,
    dept, status, search, sortCol, sortDir,
    page: safePage, totalPages,
    handleSort, handleDept, handleStatus, handleSearch, setPage,
  };
}
