import { capitalizeEachWord } from './string-helpers'

describe('capitalizeEachWord', () => {
    it('returns input string with first letter of each word capitolised', () => {
        expect(capitalizeEachWord('TEST ME')).toBe('Test Me')
        expect(capitalizeEachWord('')).toBe('')
        expect(capitalizeEachWord('test me me me')).toBe('Test Me Me Me')
        expect(capitalizeEachWord('te!@£$ me%^&*')).toBe('Te!@£$ Me%^&*')
        expect(capitalizeEachWord('!@test£$ %^&me*')).toBe('!@test£$ %^&Me*')
        expect(capitalizeEachWord('14DAY-NOGGY-FJORDS')).toBe('14Day-Noggy-Fjords')
        expect(capitalizeEachWord('P&O cruise lines stays good')).toBe(
            'P&O Cruise Lines Stays Good'
        )
    })
})
