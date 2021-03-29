describe('Test individually', () => {
    const concat = (partA, partB) => partA + partB;


    test('first and second = firstsecond', () => {
        expect(concat('first', 'second')).toBe('firstsecond');
    })

    test('je and st = jest', () => {
        expect(concat('je', 's')).toBe('jest');
    })

    test('1 and 2 = 3', () => {
        expect(concat(1, 2)).toBe(3);
    })
})