import { rectWall } from '../../../service/map/rectWall'
import { Action } from '../../action'
import { State } from '../type'
import { selectCurrentTool } from '../../selector/currentTool'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:drag:start': {
            if (selectCurrentTool(state) !== 'erasewall') return state

            const A = {
                x: Math.floor(action.pointer.x),
                y: Math.floor(action.pointer.y),
            }

            return {
                ...state,
                dragEraseWall: {
                    A,
                    B: A,
                    originalMuseum: state.museum,
                },
            }
        }

        case 'ui:drag:move':
            if (state.dragEraseWall) {
                const B = {
                    x: Math.floor(action.pointer.x),
                    y: Math.floor(action.pointer.y),
                }

                const { A, originalMuseum } = state.dragEraseWall

                const museum = rectWall(originalMuseum, A, B, false, true)

                return {
                    ...state,
                    museum,
                    dragEraseWall: {
                        ...state.dragEraseWall,
                        B,
                    },
                }
            }

        case 'ui:drag:end':
            if (state.dragEraseWall) return { ...state, dragEraseWall: null }
    }

    return state
}
