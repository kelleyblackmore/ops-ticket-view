import { useMemo, useState } from 'react';
import { categories, statuses } from '../data/categories';

export function TicketModal({ ticket, onClose, onUpdate }) {
  const [status, setStatus] = useState(ticket?.status || 'Open');

  if (!ticket) return null;

  function save() {
    onUpdate({ ...ticket, status });
    onClose();
  }

  const categoryNameById = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.name])), []);
  const toolNameById = useMemo(() => Object.fromEntries(categories.flatMap((c) => (c.tools || []).map((t) => [t.id, t.name]))), []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <header className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <h3 style={{margin:0}}>{ticket.title}</h3>
          <button onClick={onClose}>Close</button>
        </header>
        {ticket.description && <p className="muted" style={{marginTop:'.5rem'}}>{ticket.description}</p>}
        <div className="row" style={{gap:'.5rem', margin:'.75rem 0'}}>
          <span className="badge">{categoryNameById[ticket.category] || ticket.category}</span>
          {ticket.tool && <span className="badge">{toolNameById[ticket.tool] || ticket.tool}</span>}
          {ticket.environment && <span className="badge">{ticket.environment}</span>}
          <span className="badge type">{ticket.type}</span>
          {ticket.type === 'Group Access' && ticket.groupName && (
            <span className="badge">Group: {ticket.groupName}</span>
          )}
          {ticket.type === 'Group Access' && ticket.groupAccess && (
            <span className="badge">{ticket.groupAccess}</span>
          )}
          <span className={`badge priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
        </div>
        <div className="row" style={{gap:'.5rem'}}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
