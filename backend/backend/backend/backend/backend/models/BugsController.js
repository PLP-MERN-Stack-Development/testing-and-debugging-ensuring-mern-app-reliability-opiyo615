
const Bug = require('../models/Bug');

// simple validation helper (unit-tested)
function validateBugPayload(payload) {
    const errors = [];
    if (!payload.title || typeof payload.title !== 'string' || payload.title.trim() === '') {
        errors.push('Title is required');
    }
    if (payload.status && !['open', 'in-progress', 'resolved'].includes(payload.status)) {
        errors.push('Invalid status');
    }
    return { valid: errors.length === 0, errors };
}

async function createBug(req, res, next) {
    try {
        const { valid, errors } = validateBugPayload(req.body);
        if (!valid) return res.status(400).json({ errors });

        const bug = new Bug(req.body);
        await bug.save();
        return res.status(201).json(bug);
    } catch (err) {
        next(err);
    }
}

async function getBugs(req, res, next) {
    try {
        const bugs = await Bug.find().sort({ createdAt: -1 });
        res.json(bugs);
    } catch (err) {
        next(err);
    }
}

async function updateBug(req, res, next) {
    try {
        const { id } = req.params;
        const { status, title, description } = req.body;
        const { valid, errors } = validateBugPayload({ title, status });
        if (!valid) return res.status(400).json({ errors });

        const updated = await Bug.findByIdAndUpdate(id, { title, description, status }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Bug not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function deleteBug(req, res, next) {
    try {
        const { id } = req.params;
        const removed = await Bug.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ message: 'Bug not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateBugPayload,
    createBug,
    getBugs,
    updateBug,
    deleteBug,
};