export function TicketList({ tickets, categories }) {
  const categoryNameById = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  const toolNameById = Object.fromEntries(
    categories.flatMap((c) => (c.tools || []).map((t) => [t.id, t.name]))
  );

  return (
    <div className="ticket-list">
      {tickets.map((t) => (
        <article className={`ticket ${t.status.toLowerCase().replace(/\s/g,'-')}`} key={t.id} data-id={t.id}>
          <header>
            <h3>{t.title}</h3>
            <span className="meta">{new Date(t.createdAt).toLocaleString()}</span>
          </header>
          <div className="meta-row">
            <span className="badge category">{categoryNameById[t.category]}</span>
            {t.tool && <span className="badge">{toolNameById[t.tool] || t.tool}</span>}
            {t.environment && <span className="badge">{t.environment}</span>}
            <span className="badge type">{t.type}</span>
            <span className={`badge priority ${t.priority.toLowerCase()}`}>{t.priority}</span>
            <span className="badge status">{t.status}</span>
          </div>
          {t.description && <p className="desc">{t.description}</p>}
        </article>
      ))}
    </div>
  );
}
