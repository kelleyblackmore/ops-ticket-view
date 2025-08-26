import { useMemo, useState } from 'react';
import { statuses } from '../data/categories';

export function TicketModal({ ticket, onClose, onUpdate }) {
  const [status, setStatus] = useState(ticket?.status || 'Open');

  if (!ticket) return null;

  function save() {
    onUpdate({ ...ticket, status });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <header className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <h3 style={{margin:0}}>{ticket.title}</h3>
          <button onClick={onClose}>Close</button>
        </header>
        {ticket.description && <p className="muted" style={{marginTop:'.5rem'}}>{ticket.description}</p>}
        <div className="row" style={{gap:'.5rem', margin:'.75rem 0'}}>
          <span className="badge">{ticket.category}</span>
          {ticket.tool && <span className="badge">{ticket.tool}</span>}
          {ticket.environment && <span className="badge">{ticket.environment}</span>}
          <span className="badge type">{ticket.type}</span>
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
