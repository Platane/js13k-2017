import { placeWall } from '../../../service/map/placeWall'
import { Action } from '../../action'
import { State } from '../type'
import { selectCurrentTool } from '../../selector/currentTool'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:drag:start':
            if (selectCurrentTool(state) === 'tracewall')
                return {
                    ...state,
                    dragTraceWall: true,
                }

        case 'ui:drag:move':
            if (state.dragTraceWall) {
                const cell = {
                    x: Math.floor(action.pointer.x),
                    y: Math.floor(action.pointer.y),
                }

                const museum = placeWall(state.museum, cell, true)

                if (museum !== state.museum) return { ...state, museum }
            }
            break

        case 'ui:drag:end':
            if (state.dragTraceWall) return { ...state, dragTraceWall: null }
    }

    return state
}
