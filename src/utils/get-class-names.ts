type Options = {
    /** array of class-name strings that the component will always render with */
    defaultClasses?: string[]
    /** string of optional class-names that a parent component may pass as props (pass through from props) */
    className?: string
    /** key/value pairs where the key is a class-name and the value is a bool indicating whether to set */
    conditionalClasses?: Record<string, boolean>
}

/**
 getClassNames: returns a clean string of class-names for styling a component
 @param { object } options An object containing options for defaultClasses, className and conditionalClasses
 */
const getClassNames = ({ defaultClasses, className, conditionalClasses }: Options): string => {
    const conditionals = []

    /** iterate conditionalClasses and push any keys where the value is true to conditionals */
    for (const className in conditionalClasses)
        if (conditionalClasses[className]) conditionals.push(className)
    /** spread defaultClasses/className options + any conditionals into single array and then join with whitespace */
    return [
        ...(defaultClasses ? defaultClasses : []),
        ...(className ? [className] : []),
        ...conditionals,
    ].join(' ')
}

export default getClassNames
