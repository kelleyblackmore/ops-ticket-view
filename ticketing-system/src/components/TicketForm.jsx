import { useMemo, useState } from 'react';
import { environments } from '../data/categories';

export function TicketForm({ categories, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('devops');
  const [tool, setTool] = useState('');
  const [type, setType] = useState('VM Request');
  const [priority, setPriority] = useState('Medium');
  const [environment, setEnvironment] = useState('Dev');
  // dynamic fields
  const [groupName, setGroupName] = useState('');
  const [groupAccess, setGroupAccess] = useState('Developer');

  const categoryObj = useMemo(() => categories.find((c) => c.id === category) || categories[0], [categories, category]);
  const toolOptions = categoryObj?.tools || [];
  const selectedTool = toolOptions.find((t) => t.id === tool);
  const typeOptions = selectedTool?.types || categoryObj?.types || [];

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), description: description.trim(), category, tool, type, priority, environment,
      // include dynamic fields conditionally
      ...(tool && type === 'Group Access' ? { groupName: groupName.trim(), groupAccess } : {})
    });
    setTitle('');
    setDescription('');
    setGroupName('');
  }

  return (
    <form className="ticket-form" onSubmit={submit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="row">
        <select value={category} onChange={(e) => { setCategory(e.target.value); setTool(''); setType(''); }}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {/* Tool dropdown appears when category supports tools */}
        {toolOptions.length > 0 && (
          <select value={tool} onChange={(e) => { setTool(e.target.value); setType(''); }}>
            <option value="">Select Tool (optional)</option>
            {toolOptions.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        )}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {typeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
          {environments.map((env) => (
            <option key={env} value={env}>{env}</option>
          ))}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {['Low','Medium','High','Urgent'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      {/* Dynamic fields for GitHub/GitLab Group Access */}
      {tool && type === 'Group Access' && (
        <div className="row" style={{marginTop:'.5rem'}}>
          <input
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <select value={groupAccess} onChange={(e) => setGroupAccess(e.target.value)}>
            {['Guest','Reporter','Developer','Maintainer','Owner'].map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      )}
  <button className="primary" type="submit">Create Ticket</button>
    </form>
  );
}
