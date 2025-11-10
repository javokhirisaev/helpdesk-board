'use client';

import { useEffect, useMemo, useState } from 'react';
import { priorityOrder, statusOrder } from '../lib/severity';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import TicketList from './TicketList';
import MyQueueSummary from './MyQueueSummary';
import StatusMessage from './StatusMessage';

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'On Hold', 'Resolved'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High', 'Critical'];

const nextStatus = (s) =>
  s === 'Open' ? 'In Progress' : s === 'In Progress' ? 'On Hold' : s === 'On Hold' ? 'Resolved' : 'Resolved';

const escalatePriority = (p) =>
  p === 'Low' ? 'Medium' : p === 'Medium' ? 'High' : p === 'High' ? 'Critical' : 'Critical';

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({});

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/tickets', { cache: 'no-store' });
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        if (!ignore) {
          setTickets(data);
          setError(null);
        }
      } catch (e) {
        if (!ignore) setError('Unable to load tickets.');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!tickets.length) return;
    const id = setInterval(() => {
      setTickets((prev) => {
        if (!prev.length) return prev;
        const idx = Math.floor(Math.random() * prev.length);
        const t = prev[idx];
        const changeStatus = Math.random() < 0.6;
        const updated = {
          ...t,
          status: changeStatus ? nextStatus(t.status) : t.status,
          priority: !changeStatus ? escalatePriority(t.priority) : t.priority,
          updatedAt: new Date().toISOString(),
        };
        const next = [...prev];
        next[idx] = updated;
        return next;
      });
    }, 6000 + Math.floor(Math.random() * 4000));
    return () => clearInterval(id);
  }, [tickets.length]);

  const handleStatusChange = (v) => setFilters((f) => ({ ...f, status: v }));
  const handlePriorityChange = (v) => setFilters((f) => ({ ...f, priority: v }));
  const handleSearchChange = (v) => setSearch(v);

  const addToQueue = (id) => setQueue((q) => (q[id] ? q : { ...q, [id]: true }));
  const removeFromQueue = (id) => {
    const copy = { ...queue };
    delete copy[id];
    setQueue(copy);
  };
  const clearQueue = () => setQueue({});

  const visibleTickets = useMemo(() => {
    const s = search.trim().toLowerCase();
    return tickets.filter((t) => {
      const statusOk = filters.status === 'All' || t.status === filters.status;
      const prioOk = filters.priority === 'All' || t.priority === filters.priority;
      const textOk = !s || t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s);
      return statusOk && prioOk && textOk;
    });
  }, [tickets, filters, search]);

  const queuedIds = useMemo(() => new Set(Object.keys(queue)), [queue]);
  const queuedTickets = useMemo(
    () => tickets.filter((t) => queuedIds.has(t.id)),
    [tickets, queuedIds]
  );

  const sortedVisible = useMemo(() => {
    return [...visibleTickets].sort((a, b) => {
      const p = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (p !== 0) return p;
      const s = statusOrder[a.status] - statusOrder[b.status];
      if (s !== 0) return s;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }, [visibleTickets]);

  const isEmpty = !loading && !error && sortedVisible.length === 0;

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatusFilter value={filters.status} onChange={handleStatusChange} options={STATUS_OPTIONS} />
        <PriorityFilter value={filters.priority} onChange={handlePriorityChange} options={PRIORITY_OPTIONS} />
        <SearchBox value={search} onChange={handleSearchChange} />
      </div>

      <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

      {!loading && !error && sortedVisible.length > 0 && (
        <TicketList tickets={sortedVisible} queuedSet={queuedIds} onAddToQueue={addToQueue} />
      )}

      <MyQueueSummary tickets={queuedTickets} onRemove={removeFromQueue} onClear={clearQueue} />
    </div>
  );
}
