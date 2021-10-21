import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

export default function(preloadedState){
    const store = configureStore({
        reducer: rootReducer,
        middleware: [thunk],
        preloadedState
    })

    return store
}