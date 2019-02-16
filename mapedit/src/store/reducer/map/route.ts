import { Action } from '../../action'
import { State } from '../type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'route:sign:set': {
            const i = state.museum.paintings.findIndex(
                ({ id }) => action.id === id
            )

            if (i === -1) break

            const signs = [...state.museum.signs]
            signs[i] = action.sign

            return {
                ...state,
                museum: {
                    ...state.museum,
                    signs,
                },
            }
        }
    }

    return state
}
