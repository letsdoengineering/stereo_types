import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import * as imageStyles from './Image.module.css'

type ImageProps = {
    alt: string
    src: string
    size?: 'S' | 'M' | 'L'
    className?: string
}

const Image: React.FC<ImageProps> = ({ alt, src, size = 'M', className }: ImageProps) => {
    const classNames = getClassNames({
        defaultClasses: [imageStyles[`size${size}`]],
        className,
    })
    return <img alt={alt} src={src} className={classNames} />
}

export default Image
