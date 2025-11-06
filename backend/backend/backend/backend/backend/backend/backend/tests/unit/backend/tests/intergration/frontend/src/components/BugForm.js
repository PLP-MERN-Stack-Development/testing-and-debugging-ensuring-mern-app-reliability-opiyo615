
import React, { useState } from 'react';

export default function BugForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    function validate() {
        if (!title.trim()) return 'Title is required';
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const err = validate();
        if (err) return setError(err);
        setError(null);
        try {
            await onCreate({ title: title.trim(), description });
            setTitle('');
            setDescription('');
        } catch (e) {
            setError('Failed to create bug');
        }
    }

    return (
        <form onSubmit={handleSubmit} data-testid="bug-form">
            <h3>Report Bug</h3>
            {error && <div role="alert">{error}</div>}
            <div>
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <button type="submit">Report Bug</button>
        </form>
    );
}