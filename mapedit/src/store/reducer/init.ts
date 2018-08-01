import { Action } from '../action'
import { State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'localstorage:read': {
            return {
                ...state,
                museum: action.museum,
            }
        }
    }

    return state
}
