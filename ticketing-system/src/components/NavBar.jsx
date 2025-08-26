export function NavBar() {
  return (
    <nav className="navbar card" style={{padding:'.75rem 1rem', marginBottom:'1rem', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div style={{display:'flex', gap:'.75rem', alignItems:'center'}}>
        <div style={{width:28, height:28, borderRadius:8, background:'var(--primary)', boxShadow:'0 0 0 2px rgba(0,0,0,.15)'}} />
        <strong>Ops Ticketing</strong>
      </div>
      <div className="row" style={{gap:'.5rem'}}>
        <a href="#" className="muted">Dashboard</a>
        <a href="#" className="muted">Reports</a>
        <a href="#" className="muted">Settings</a>
      </div>
    </nav>
  );
}
