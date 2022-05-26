import React from 'react'
import * as accordionItemStyles from './AccordionItem.module.css'

type AccordionItemProps = React.AllHTMLAttributes<HTMLDivElement>

/** AccordionItem: returns a <div> element styled with the margin that children of accordion would usually need */
const AccordionItem: React.FC<AccordionItemProps> = ({ children }: AccordionItemProps) => (
  <div className={accordionItemStyles.itemSpacing}>{children}</div>
)

export default AccordionItem
