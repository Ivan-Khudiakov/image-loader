import React from 'react'
import { ImageType } from '../../../state/images-reducer'
import './UngroupedImagesList.css'

type PropsType = {
    images: Array<ImageType>
    getTag: (newTag: string) => void
}
export const UngroupedImagesList: React.FC<PropsType> = ({
    images,
    getTag,
}) => {
    return (
        <div className="wrapper">
            {images.map((i) => {
                return (
                    <div
                        key={i.id}
                        className="card"
                        onClick={() => getTag(i.tag)}
                    >
                        <div className="card-body">
                            {typeof i.image_url == 'string' ? (
                                <img
                                    className="image"
                                    src={i.image_url}
                                    alt="img"
                                />
                            ) : (
                                i.image_url.map((el) => {
                                    return (
                                        <img
                                            key={el}
                                            className="image"
                                            src={el}
                                            alt="img"
                                        />
                                    )
                                })
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
