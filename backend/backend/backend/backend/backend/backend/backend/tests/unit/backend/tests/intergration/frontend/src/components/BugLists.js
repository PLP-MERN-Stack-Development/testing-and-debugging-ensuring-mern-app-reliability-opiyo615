
import React from 'react';

export default function BugList({ bugs = [], onUpdate, onDelete }) {
    if (!bugs.length) return <div data-testid="empty-list">No bugs reported yet.</div>;

    return (
        <ul>
            {bugs.map(b => (
                <li key={b._id} data-testid="bug-item">
                    <strong>{b.title}</strong> - <em>{b.status}</em>
                    <div>{b.description}</div>
                    <button onClick={() => onUpdate(b._id, { ...b, status: b.status === 'open' ? 'in-progress' : 'resolved' })}>Toggle Status</button>
                    <button onClick={() => onDelete(b._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}