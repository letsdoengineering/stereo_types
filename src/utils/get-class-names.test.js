import getClassNames from './get-class-names'

describe('getClassNames', () => {
  it('returns a string of class-names composed of only defaultClasses', () => {
    const classNames = getClassNames({
      defaultClasses: ['columns', 'section'],
    })
    expect(classNames).toBe('columns section')
  })
  it('returns a string of class-names composed from only className', () => {
    const classNames = getClassNames({
      className: 'some-stylish-class',
    })
    expect(classNames).toBe('some-stylish-class')
  })
  it('returns a string of class-names composed from conditionalClasses when the conditional class has a value of true', () => {
    const classNames = getClassNames({
      conditionalClasses: { 'some-conditional-class': true },
    })
    expect(classNames).toBe('some-conditional-class')
  })
  it('returns an empty string when conditionalClasses are provide but the value of the conditional class is set to false', () => {
    const classNames = getClassNames({
      conditionalClasses: { 'some-conditional-class': false },
    })
    expect(classNames).toBe('')
  })
})
