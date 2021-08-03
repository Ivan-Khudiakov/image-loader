import React from 'react'
import { ImageType } from '../../../state/images-reducer'
import './GroupedImagesList.css'

type PropsType = {
    images: Array<ImageType>
    getTag: (newTag: string) => void
}

export const GroupedImagesList: React.FC<PropsType> = ({ images, getTag }) => {
    let filteredTags: Array<string> = Array.from(
        new Set(images.map((i) => i.tag))
    )
    return (
        <div className="group-wrapper">
            {filteredTags.map((f) => {
                return (
                    <div key={f} className="card">
                        <div className="card-body">
                            <h5>{f}</h5>
                            <div className="group-filtered-card">
                                {images
                                    .filter((i) => i.tag === f)
                                    .map((i) => {
                                        return (
                                            <div
                                                key={i.id}
                                                className="card"
                                                onClick={() => getTag(i.tag)}
                                            >
                                                <div className="card-body">
                                                    {typeof i.image_url ==
                                                    'string' ? (
                                                        <img
                                                            className="image"
                                                            src={i.image_url}
                                                            alt="img"
                                                        />
                                                    ) : (
                                                        i.image_url.map(
                                                            (el) => {
                                                                return (
                                                                    <img
                                                                        key={el}
                                                                        className="image"
                                                                        src={el}
                                                                        alt="img"
                                                                    />
                                                                )
                                                            }
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
