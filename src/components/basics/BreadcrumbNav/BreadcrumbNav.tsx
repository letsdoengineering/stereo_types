import React from 'react'
import Text from '../../basics/Text/Text'
import ListItem from '../../basics/List/ListItem'
import List from '../../basics/List/List'
import * as breadcrumbNavStyles from './BreadcrumbNav.module.css'

type Breadcrumb = {
    url?: string
    label: string
}

type BreadCrumbProps = {
    urlList: Breadcrumb[]
}

const BreadcrumbNav: React.FC<BreadCrumbProps> = ({ urlList }) => {
    const navTrail = urlList.map((crumb: Breadcrumb, i) => {
        const location = crumb.url ? (
            <a className={breadcrumbNavStyles.link} href={crumb.url}>
                <Text>{crumb.label}</Text>
            </a>
        ) : (
            <Text weight='Bold'>{crumb.label}</Text>
        )

        return (
            <ListItem key={`${i}-${crumb.label}`} listKey={`${i}-${crumb.label}`}>
                {i > 0 && <Text className={breadcrumbNavStyles.divider}>{`>`}</Text>}
                {location}
            </ListItem>
        )
    })
    return <List className={breadcrumbNavStyles.list}>{navTrail}</List>
}

export default BreadcrumbNav
