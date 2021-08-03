import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { GiphiAPI } from '../api/api'
import { AppRootStateType } from './store'

const ADD_IMAGE = 'images/ADD_IMAGE'
const ADD_COMPOSITE_IMAGE = 'images/ADD_COMPOSITE_IMAGE'
const SET_IS_FETCHING = 'images/SET_IS_FETCHING'
const SET_ERROR = 'images/SET_ERROR'
const SET_GROUPED = 'images/SET_GROUPED'
const CLEAR_STATE = 'images/CLEAR_STATE'

// types
export type ActionsType =
    | ReturnType<typeof addImage>
    | ReturnType<typeof addCompositeImage>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setError>
    | ReturnType<typeof setGrouped>
    | ReturnType<typeof clearState>

export type ImageType = {
    id: string
    tag: string
    image_url: string | Array<string>
}

export type ErrorType = string | null

const initialState = {
    randomTagsForDelay: [
        'cat',
        'dog',
        'mouse',
        'friends',
        'joke',
        'auto',
        'sport',
        'kids',
        'games',
        'moto',
    ],
    isFetching: false,
    error: null as ErrorType,
    isGrouped: false,
    images: [] as Array<ImageType>,
}

export type InitialStateType = typeof initialState

export const imagesReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case ADD_IMAGE: {
            let newImage: ImageType = {
                id: v1(),
                tag: action.tag,
                image_url: action.image_url,
            }
            return { ...state, images: [...state.images, newImage] }
        }
        case ADD_COMPOSITE_IMAGE: {
            let newCompositeImage: ImageType = {
                id: v1(),
                tag: action.tag,
                image_url: action.images_url,
            }
            return { ...state, images: [...state.images, newCompositeImage] }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_ERROR: {
            return { ...state, error: action.error }
        }
        case SET_GROUPED: {
            return { ...state, isGrouped: action.isGrouped }
        }
        case CLEAR_STATE: {
            return { ...state, images: [] }
        }
        default:
            return state
    }
}

//actions
export const addImage = (tag: string, image_url: string) => {
    return { type: ADD_IMAGE, tag, image_url } as const
}
export const addCompositeImage = (tag: string, images_url: Array<string>) => {
    return { type: ADD_COMPOSITE_IMAGE, tag, images_url } as const
}
export const setIsFetching = (isFetching: boolean) => {
    return { type: SET_IS_FETCHING, isFetching } as const
}
export const setError = (error: ErrorType) => {
    return { type: SET_ERROR, error } as const
}
export const setGrouped = (isGrouped: boolean) => {
    return { type: SET_GROUPED, isGrouped } as const
}
export const clearState = () => {
    return { type: CLEAR_STATE } as const
}

//thunks
export let interval: NodeJS.Timeout
export const fetchImage =
    (tag: string) =>
    async (
        dispatch: Dispatch<ActionsType>,
        getState: () => AppRootStateType
    ) => {
        dispatch(setIsFetching(true))
        if (tag === 'delay') {
            dispatch(setIsFetching(true))
            let newTags = getState().images.randomTagsForDelay
            try {
                interval = setInterval(async () => {
                    let newTag =
                        newTags[Math.floor(Math.random() * newTags.length)]
                    let response = await GiphiAPI.getImage(newTag)
                    dispatch(addImage(newTag, response.data.data.image_url))
                }, 5000)
            } catch (error) {
                dispatch(setError('Произошла http ошибка'))
                dispatch(setIsFetching(false))
            }
        } else {
            try {
                let response = await GiphiAPI.getImage(tag)
                if (!response.data.data.image_url) {
                    dispatch(setError('По тегу ничего не найдено'))
                } else {
                    dispatch(addImage(tag, response.data.data.image_url))
                    dispatch(setError(null))
                }
                dispatch(setIsFetching(false))
            } catch (error) {
                dispatch(setError('Произошла http ошибка'))
                dispatch(setIsFetching(false))
            }
        }
    }

export const manyTagsFetchImages =
    (tags: Array<string>) => async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setIsFetching(true))
        try {
            let response = await Promise.all(
                tags.map((tag) =>
                    GiphiAPI.getImage(tag).then(
                        (res) => res.data.data.image_url
                    )
                )
            )
            dispatch(addCompositeImage(tags[0], response))
            dispatch(setIsFetching(false))
        } catch (error) {
            dispatch(
                setError('Произошла http ошибка или один из тегов не найден')
            )
            dispatch(setIsFetching(false))
        }
    }
