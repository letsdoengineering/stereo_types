import React, { useEffect } from 'react'
import './Accordion.module.css'
import Icon from '../../../basics/Icon/Icon'
import Text from '../../../basics/Text/Text'
import getClassNames from '../../../../utils/get-class-names'
import * as accordionStyles from './Accordion.module.css'
import Heading from '../../../basics/Heading/Heading'
import useAccordion from '../useAccordion'

type AccordionProps = {
    /** the title of the accordion */
    title: string
    /** what size to display the accordion title */
    titleSize: ElementSize
    /** the section heading tag level between <h1>-<h6> that you wish to set */
    titleLevel?: '1' | '2' | '3' | '4' | '5' | '6'
    /** set to true if Accordion should start in Active state */
    startOpen?: boolean
    /** icon should space all the way to the right of the accordion's container */
    iconRight?: boolean
    /** children always of type ReactNode */
    children?: React.ReactNode
    /** a string to be used to form new unique IDs from whilst keeping a sense of common identity */
    baseId: string
}

/** Accordion: returns an accordion that can be clicked by a user to expand the contents passed as children */
const Accordion: React.FC<AccordionProps> = ({
    title,
    titleSize,
    titleLevel = '3',
    startOpen = false,
    iconRight = false,
    children,
    baseId,
}: AccordionProps) => {
    const { isOpen, scrollHeight, toggleAccordion, ref } = useAccordion()

    useEffect(() => {
        if (startOpen) toggleAccordion()
    }, [])

    const iconClasses = getClassNames({
        defaultClasses: [accordionStyles.icon],
        conditionalClasses: {
            [`${accordionStyles.rotate}`]: isOpen,
            [`${accordionStyles.accordionIconRight}`]: iconRight,
        },
    })

    const accordionClasses = getClassNames({
        defaultClasses: [accordionStyles.accordion],
        conditionalClasses: {
            [`${accordionStyles.accordionIconRight}`]: iconRight,
        },
    })

    const contentId = `${baseId}-content`
    const accordionId = `${baseId}-accordion`

    return (
        <>
            <div className={accordionStyles.accordionSection}>
                <Heading level={titleLevel}>
                    <button
                        type='button'
                        id={accordionId}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className={accordionClasses}
                        onClick={toggleAccordion}
                    >
                        <Text tagName='span' size={titleSize} weight='Bold'>
                            {title}
                        </Text>
                        <Icon
                            icon='chevron-down'
                            iconSize={titleSize}
                            iconColor='Grey'
                            className={iconClasses}
                        />
                    </button>
                </Heading>
                <div
                    id={contentId}
                    aria-labelledby={accordionId}
                    ref={ref}
                    role='region'
                    style={{ maxHeight: `${scrollHeight}` }}
                    className={accordionStyles.accordionContent}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default Accordion
