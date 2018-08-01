import { rectWall } from '../../../service/map/rectWall'
import { Action } from '../../action'
import { State } from '../type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:drag:start': {
            if (state.tool !== 'rectwall') return state

            const A = {
                x: Math.floor(action.pointer.x),
                y: Math.floor(action.pointer.y),
            }

            return {
                ...state,
                dragRectWall: {
                    A,
                    originalMuseum: state.museum,
                },
            }
        }

        case 'ui:drag:move':
            if (state.dragRectWall) {
                const B = {
                    x: Math.floor(action.pointer.x),
                    y: Math.floor(action.pointer.y),
                }

                const { A, originalMuseum } = state.dragRectWall

                const museum = rectWall(originalMuseum, A, B, true, false)

                return { ...state, museum }
            }

        case 'ui:drag:end':
            if (state.dragRectWall) return { ...state, dragRectWall: null }
    }

    return state
}
