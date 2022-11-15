import { Counter } from './singleton.mjs';

describe('Singleton Pattern', () => {
    test('new Counter() to throw You can only create one instance!', () => {
        expect(() => { new Counter(); }).toThrow('You can only create one instance!');
    });
});
