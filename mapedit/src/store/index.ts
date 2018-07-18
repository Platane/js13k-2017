import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { attachToStore as attachToStoreUI } from "../sideEffect/ui"

import { reduce, defaultState } from "./reducer"

const sideEffects = [attachToStoreUI]

const crashReporterMiddleware = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        err.action = action
        console.error(err)
        throw err
    }
}

export const create = () => {
    const middlewares = [crashReporterMiddleware]

    // enhancers composing
    const enhancers = [
        applyMiddleware(...middlewares),
        "undefined" != typeof window &&
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
    ].filter(Boolean)

    const store = createStore(reduce, defaultState, compose(...enhancers))

    sideEffects.forEach(init => init(store))

    return store
}
