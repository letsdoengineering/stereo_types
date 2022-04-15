import React from 'react'
import GridRow from '../../basics/Grid/GridRow/GridRow'
import GridColumn from '../../basics/Grid/GridColumn/GridColumn'
import Heading from '../../basics/Heading/Heading'
import Text from '../../basics/Text/Text'
import Spacing from '../../basics/Spacing/Spacing'
import List from '../../basics/List/List'
import ListItem from '../../basics/List/ListItem'
import Button from '../../basics/Button/Button'
import Link from '../../basics/Link/Link'
import * as errorLayoutStyles from './ErrorLayout.module.css'

type ErrorLayoutProps = {
    onClickGoBack(): void
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ onClickGoBack }: ErrorLayoutProps) => {
    return (
        <>
            <GridRow className={errorLayoutStyles.verticalCenter} isPadded>
                <GridColumn />
                <GridColumn size='7'>
                    <Heading level='1' weight='Bold'>
                        Oops!
                    </Heading>
                    <Spacing size='Double' />
                    <Heading level='2' weight='Bold'>
                        Sorry, there seems to be a problem :(
                    </Heading>
                    <Spacing size='Double' />
                    <Text>
                        Some message to the user that says something or other and helps them along
                        their merry way back to a safe part of the site
                    </Text>
                    <Spacing size='Single' />
                    <Text>Here are some helpful links:</Text>
                    <Spacing size='Single' />
                    <List isIndented isLinks isUnstyled={false}>
                        <ListItem listKey='error-page-link-1'>
                            <Link href='' weight='Bold'>
                                Link 1
                            </Link>
                        </ListItem>
                        <ListItem listKey='error-page-link-2'>
                            <Link href='' weight='Bold'>
                                Link 2
                            </Link>
                        </ListItem>
                        <ListItem listKey='error-page-link-3'>
                            <Link href='' weight='Bold'>
                                Link 3
                            </Link>
                        </ListItem>
                    </List>
                    <Spacing size='Double' />
                    <GridRow>
                        <GridColumn size='6'>
                            <Button
                                onClick={onClickGoBack}
                                size='M'
                                buttonText='Go Back'
                                type='button'
                                fillSpace={false}
                            />
                        </GridColumn>
                        <GridColumn size='6' />
                    </GridRow>
                </GridColumn>
                <GridColumn />
            </GridRow>
        </>
    )
}

export default ErrorLayout
