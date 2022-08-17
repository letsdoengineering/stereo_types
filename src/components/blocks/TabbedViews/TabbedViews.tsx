import React, { useState } from 'react'
import TabButton from './TabButton/TabButton'
import GridColumn from '../../basics/Grid/GridColumn/GridColumn'
import GridRow from '../../basics/Grid/GridRow/GridRow'
import tabbedViewsStyles from './TabbedViewsStyles.module.css'
import Spacing from '../../basics/Spacing/Spacing'

type TabbedViewsProps = {
  /** string description/view element/component key/pairs - worth noting this is specifically
   * an object and not an array of arrays because the assumption is we'd like to ensure unique tab names*/
  views: Record<string, JSX.Element | React.ReactElement>
}

/** TabbedViews: takes a 'views' object consisting of key/pairs of the tab
 * description and the corresponding view and returns a tabbed interface for
 * selecting different views */
const TabbedViews: React.FC<TabbedViewsProps> = ({ views }: TabbedViewsProps) => {
  const [[currentViewName, currentView], setCurrentView] = useState<
    [string, JSX.Element | React.ReactElement]
  >(Object.entries(views)[0])

  const tabButtons = Object.entries(views).map((el, index) => {
    const [viewName, view] = el
    const isActive = view === currentView
    const viewNameForButtonAria = viewName.replace(/\s/g, '')
    return (
      <GridColumn role='tablist' size='1' key={`${viewName}-${index}-tab-button-container`}>
        <TabButton
          key={`${viewName}-${index}-tab-button`}
          onClick={(): void => setCurrentView([viewName, view])}
          isHighlighted={isActive}
          role='tab'
          aria-selected={isActive}
          aria-controls={`${viewNameForButtonAria}-tab`}
          id={`${viewNameForButtonAria}-button`}
        >
          {viewName}
        </TabButton>
      </GridColumn>
    )
  })

  const viewNameForTabAria = currentViewName.replace(/\s/g, '')
  return (
    <>
      <GridRow className={tabbedViewsStyles.tabSection}>{tabButtons}</GridRow>
      <Spacing size='Double' />
      <div id={`${viewNameForTabAria}-tab`} aria-labelledby={`${viewNameForTabAria}-button`}>
        {currentView}
      </div>
    </>
  )
}

export default TabbedViews
