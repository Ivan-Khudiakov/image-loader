import { applyMiddleware } from 'redux'
import { combineReducers, createStore } from 'redux'
import { imagesReducer } from './images-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

const rootReducer = combineReducers({
    images: imagesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
