import { personProxy, personProxyValidation, personProxyReflect } from './proxy.mjs';

describe('Proxy Pattern', () => {
    test('personProxy get name to equal John Doe', () => {
        expect(personProxy.name).toBe('John Doe');
    });
    test('personProxyValidation set age as string to throw Sorry, you can only pass numeric values for age.', () => {
        expect(() => { personProxyValidation.age = '43' }).toThrow('Sorry, you can only pass numeric values for age.');
    });
    test('personProxyReflect get name to equal John Doe', () => {
        expect(personProxy.name).toBe('John Doe');
    });
})
