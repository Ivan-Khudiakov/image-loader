import React, { ChangeEvent, useState } from 'react'
import './App.css'
import { ImagesList } from './components/ImagesList/ImagesList'
import {
    clearState,
    ErrorType,
    fetchImage,
    ImageType,
    interval,
    manyTagsFetchImages,
    setError,
    setGrouped,
    setIsFetching,
} from './state/images-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'

export const App = () => {
    const images = useSelector<AppRootStateType, Array<ImageType>>(
        (state) => state.images.images
    )
    const isFetching = useSelector<AppRootStateType, boolean>(
        (state) => state.images.isFetching
    )
    const error = useSelector<AppRootStateType, ErrorType>(
        (state) => state.images.error
    )

    const isGrouped = useSelector<AppRootStateType, boolean>(
        (state) => state.images.isGrouped
    )

    let [tag, setTag] = useState('')

    const dispatch = useDispatch()

    const addTag = () => {
        if (tag.trim() === '') {
            dispatch(setError(`Заполните поле "тег"`))
        } else if (/[^a-z_,]/i.test(tag)) {
            dispatch(
                setError(
                    'Тег может состоять только из латинских букв и запятых'
                )
            )
        } else if (tag.split(',').length > 1) {
            let tagsArray = tag.split(',')
            dispatch(manyTagsFetchImages(tagsArray))
        } else {
            dispatch(fetchImage(tag))
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTag(e.currentTarget.value)
    }

    const clearAll = () => {
        dispatch(setIsFetching(false))
        setTag('')
        dispatch(clearState())
        clearInterval(interval)
        dispatch(setError(null))
    }

    const groupImages = () => {
        dispatch(setGrouped(!isGrouped))
    }

    const getTag = (newTag: string) => {
        setTag(newTag)
    }

    return (
        <div className="app">
            <div className="search">
                <div className="search-input">
                    {error ? (
                        <div>
                            <input
                                type="text"
                                className="form-control is-invalid"
                                id="floatingInputInvalid"
                                placeholder="Введите тег"
                                value={tag}
                                onChange={onChangeHandler}
                            />
                            <div className="invalid-feedback">{error}</div>
                        </div>
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Введите тег"
                            value={tag}
                            onChange={onChangeHandler}
                        />
                    )}
                </div>
                <div className="search-button">
                    {isFetching ? (
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={addTag}
                            disabled
                        >
                            Загрузка...
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={addTag}
                        >
                            Загрузить
                        </button>
                    )}
                </div>
                <div className="search-button">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={clearAll}
                    >
                        Очистить
                    </button>
                </div>
                <div className="search-button">
                    {isGrouped ? (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={groupImages}
                        >
                            Разгрупировать
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={groupImages}
                        >
                            Группировать
                        </button>
                    )}
                </div>
            </div>
            <ImagesList images={images} isGrouped={isGrouped} getTag={getTag} />
        </div>
    )
}
