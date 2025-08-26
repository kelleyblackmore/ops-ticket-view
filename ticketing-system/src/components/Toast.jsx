import { useEffect, useState } from 'react';

export function Toast({ message, onDone, duration = 2500 }) {
  const [show, setShow] = useState(Boolean(message));
  useEffect(() => {
    if (!message) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      onDone?.();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onDone]);

  if (!show || !message) return null;
  return (
    <div style={{position:'fixed', right:16, bottom:16, zIndex:50}}>
      <div className="card" style={{padding:'.6rem .8rem'}}>{message}</div>
    </div>
  );
}
