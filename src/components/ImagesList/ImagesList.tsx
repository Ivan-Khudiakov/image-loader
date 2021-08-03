import React from 'react'
import { ImageType } from '../../state/images-reducer'
import './ImageList.css'
import { GroupedImagesList } from './GroupedImagesList/GroupedImagesList'
import { UngroupedImagesList } from './UngroumedImagesList/UngroupedImagesList'

type PropsType = {
    images: Array<ImageType>
    isGrouped: boolean
    getTag: (newTag: string) => void
}
export const ImagesList: React.FC<PropsType> = ({
    images,
    isGrouped,
    getTag,
}) => {
    if (isGrouped) {
        return <GroupedImagesList images={images} getTag={getTag} />
    }
    return <UngroupedImagesList images={images} getTag={getTag} />
}
