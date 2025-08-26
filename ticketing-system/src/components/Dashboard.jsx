import { useEffect, useMemo, useState } from 'react';
import { categories, statuses, priorities, environments } from '../data/categories';
import { TicketForm } from './TicketForm';
import { TicketList } from './TicketList';
import { CategoryFilter } from './CategoryFilter';
import { ThemeToggle } from './ThemeToggle';
import { NavBar } from './NavBar';
import { Toast } from './Toast';
import { TicketModal } from './TicketModal';

export function Dashboard() {
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('tickets');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ex-1',
        title: 'Provision new CI runner',
        description: 'We need a new VM runner with 4 vCPU and 8GB RAM.',
        category: 'devops',
        type: 'VM Request',
        priority: 'High',
        status: 'Open',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ex-2',
        title: 'Create read replica for reporting',
        description: 'Read replica for analytics workload in us-east-1.',
        category: 'dba',
        type: 'DB Request',
        priority: 'Medium',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 3600_000).toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tickets', JSON.stringify(tickets));
    } catch {}
  }, [tickets]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [env, setEnv] = useState('all');
  const [sortBy, setSortBy] = useState('created-desc');
  const [toast, setToast] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);

  function addTicket(ticket) {
    setTickets((prev) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: 'Open',
        ...ticket,
      },
      ...prev,
    ]);
    setToast('Ticket created');
  }

  function updateTicket(updated) {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setToast('Ticket updated');
  }

  const filtered = useMemo(() => {
    const priRank = { Urgent: 1, High: 2, Medium: 3, Low: 4 };
    const stRank = { 'Open': 1, 'In Progress': 2, 'Resolved': 3 };
    const list = tickets.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (status !== 'all' && t.status !== status) return false;
      if (env !== 'all' && t.environment !== env) return false;
      if (query && !(t.title + ' ' + (t.description || '')).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    const arr = [...list];
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'created-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          return (priRank[a.priority] || 9) - (priRank[b.priority] || 9);
        case 'status':
          return (stRank[a.status] || 9) - (stRank[b.status] || 9);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created-desc':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    return arr;
  }, [tickets, category, status, env, query, sortBy]);

  function exportCsv() {
    const headers = ['ID','Title','Category','Tool','Type','Priority','Status','Environment','GroupName','GroupAccess','Member','GroupDesc','CreatedAt'];
    const rows = filtered.map(t => [
      t.id,
      (t.title || '').replace(/\n/g,' '),
      t.category,
      t.tool || '',
      t.type || '',
      t.priority || '',
      t.status || '',
      t.environment || '',
      t.groupName || '',
      t.groupAccess || '',
      t.memberName || '',
      t.groupDesc || '',
      t.createdAt || '',
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
    }).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tickets.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="dashboard">
      <NavBar />
      <header className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h1>Company Ticketing System</h1>
          <p className="muted">Create and track requests across DevOps, DBA, Sys Admins, Cyber, IA, Cloud, and Processes.</p>
        </div>
        <ThemeToggle />
      </header>
      <section className="actions">
        <TicketForm categories={categories} onCreate={addTicket} />
      </section>
      <section className="filters">
        <input
          type="search"
          placeholder="Search tickets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CategoryFilter value={category} onChange={setCategory} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={env} onChange={(e) => setEnv(e.target.value)}>
          <option value="all">All Envs</option>
          {environments.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created-desc">Newest</option>
          <option value="created-asc">Oldest</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
        <button onClick={exportCsv}>Export CSV</button>
      </section>
      <section>
        <div onClick={(e) => {
          const card = e.target.closest('article.ticket');
          if (!card) return;
          const id = card.getAttribute('data-id');
          const t = tickets.find((x) => x.id === id);
          if (t) setActiveTicket(t);
        }}>
          <TicketList tickets={filtered} categories={categories} />
        </div>
        {filtered.length === 0 && (
          <p className="empty">No tickets yet. Create your first ticket above.</p>
        )}
      </section>
      <TicketModal ticket={activeTicket} onClose={() => setActiveTicket(null)} onUpdate={updateTicket} />
      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  );
}
