import React from 'react'
import Card from '../../Card/Card'
import GridRow from '../../../basics/Grid/GridRow/GridRow'
import * as accordionCardStyles from './AccordionCard.module.css'
import getClassNames from '../../../../utils/get-class-names'
import GridColumn from '../../../basics/Grid/GridColumn/GridColumn'
import useAccordion from '../useAccordion'
import IconButton from '../../../basics/IconButton/IconButton'

type AccordionCardProps = {
  /** JSX passed in to render in the top of the card displayed before the accordion content */
  headSection: React.ReactNode
  /** JSX passed in for the accordion content itslef */
  innerContent: React.ReactNode
  /** a baseId used to create a number of unique IDs and associated attributes */
  baseId: string
}

/** AccordionCard: returns a Card that behaves like an accordion */
const AccordionCard: React.FC<AccordionCardProps> = ({
  headSection,
  innerContent,
  baseId,
}: AccordionCardProps) => {
  const { isOpen, scrollHeight, toggleAccordion, ref } = useAccordion()

  const contentId = `${baseId}-content`
  const accordionId = `${baseId}-accordion`

  const iconClasses = getClassNames({
    defaultClasses: [accordionCardStyles.icon],
    conditionalClasses: {
      [accordionCardStyles.rotate]: isOpen,
    },
  })

  return (
    <Card>
      <GridRow className={accordionCardStyles.headSectionBottomBorder}>
        <GridColumn size='11'>{headSection}</GridColumn>
        <GridColumn>
          <IconButton
            icon='chevron-down'
            iconSize='XL'
            iconClassName={iconClasses}
            buttonClassName={accordionCardStyles.accordion}
            label={accordionId}
            aria-expanded={isOpen}
            id={accordionId}
            aria-controls={contentId}
            iconColor='Blue'
            onClick={toggleAccordion}
          />
        </GridColumn>
      </GridRow>
      <div
        id={contentId}
        aria-labelledby={accordionId}
        ref={ref}
        role='region'
        style={{ maxHeight: `${scrollHeight}` }}
        className={accordionCardStyles.accordionContent}
      >
        {innerContent}
      </div>
    </Card>
  )
}

export default AccordionCard
