import { myTag } from './index';

describe('myTag', () => {
    test('using function', () => {
        const str = myTag`Hi ${() => 'Red'}`
        expect(str).toBe('Hi Red');
    })
    
    test('using variable', () => {
        const name = 'Red';
        const str = myTag`Hi ${name}`
        expect(str).toBe('Hi Red');
    })

    test('with break lines', () => {
        const name = 'Red';
        const str = myTag`
            Hi, 
            
            ${name}
        `
        expect(str).toBe(`
            Hi, 
            
            Red
        `);
    })
})