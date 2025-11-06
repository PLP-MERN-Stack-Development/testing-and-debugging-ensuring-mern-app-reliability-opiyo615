
const { validateBugPayload } = require('../../controllers/bugsController');

describe('validateBugPayload', () => {
    test('rejects empty title', () => {
        const { valid, errors } = validateBugPayload({ title: '' });
        expect(valid).toBe(false);
        expect(errors).toContain('Title is required');
    });

    test('accepts valid payload', () => {
        const { valid, errors } = validateBugPayload({ title: 'A bug' });
        expect(valid).toBe(true);
        expect(errors.length).toBe(0);
    });

    test('rejects invalid status', () => {
        const { valid, errors } = validateBugPayload({ title: 'X', status: 'bad' });
        expect(valid).toBe(false);
        expect(errors).toContain('Invalid status');
    });
});

describe('validateBugPayload - advanced cases', () => {
    test('rejects missing title', () => {
        const { valid, errors } = validateBugPayload({ status: 'open' });
        expect(valid).toBe(false);
        expect(errors).toContain('Title is required');
    });

    test('accepts payload with optional fields', () => {
        const { valid, errors } = validateBugPayload({ title: 'Bug with details', description: 'Detailed description', status: 'in progress' });
        expect(valid).toBe(true);
        expect(errors.length).toBe(0);
    });

    test('rejects title that is too long', () => {
        const longTitle = 'A'.repeat(256);
        const { valid, errors } = validateBugPayload({ title: longTitle });
        expect(valid).toBe(false);
        expect(errors).toContain('Title must be less than 255 characters');
    });