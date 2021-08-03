import {
    imagesReducer,
    addImage,
    setIsFetching,
    setError,
    setGrouped,
    clearState,
    ErrorType,
    ImageType,
    InitialStateType,
    addCompositeImage,
} from './images-reducer'

let startState: InitialStateType = {
    randomTagsForDelay: [],
    isFetching: false,
    error: null as ErrorType,
    isGrouped: false,
    images: [] as Array<ImageType>,
}

beforeEach(() => {
    startState = {
        ...startState,
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
    }
})
describe('test', () => {
    test('correct image should be added', () => {
        let newImageTag = 'New Tag'
        let newImageUrl = 'New Image'
        let action = addImage(newImageTag, newImageUrl)

        const endState = imagesReducer(startState, action)

        expect(endState.images.length).toBe(1)
        expect(endState.images[0].tag).toBe(newImageTag)
        expect(endState.images[0].image_url).toBe(newImageUrl)
    })
    test('correct compositeImage should be added', () => {
        let newImageTag = 'New Tag'
        let newImagesUrl = ['image1', 'image2', 'image3']
        let action = addCompositeImage(newImageTag, newImagesUrl)

        const endState = imagesReducer(startState, action)

        expect(endState.images.length).toBe(1)
        expect(endState.images[0].tag).toBe(newImageTag)
        expect(endState.images[0].image_url[1]).toBe('image2')
    })

    test('fetching status should be change correct', () => {
        let newIsFetching = true
        let action = setIsFetching(newIsFetching)

        const endState = imagesReducer(startState, action)

        expect(endState.isFetching).toBe(newIsFetching)
    })

    test('correct error should be added', () => {
        let newError = 'New Error'
        let action = setError(newError)

        const endState = imagesReducer(startState, action)

        expect(endState.error).toBe(newError)
    })

    test('grouping status should be change correct', () => {
        let newIsGrouped = true
        let action = setGrouped(newIsGrouped)

        const endState = imagesReducer(startState, action)

        expect(endState.isGrouped).toBe(newIsGrouped)
    })

    test('state must be cleared correctly', () => {
        let action = clearState()

        const endState = imagesReducer(startState, action)

        expect(endState.images).toStrictEqual([])
    })
})
