import { Action } from '../../action'
import { State } from '../type'
import { selectCurrentTool } from '../../selector/currentTool'

const getMutationLabel = (action: Action, state: State) =>
    (action.type === 'ui:dragstartingpoint:start' && 'movestartingpoint') ||
    (action.type === 'ui:dragpainting:start' &&
        !action.existingId &&
        'placepainting') ||
    (action.type === 'ui:dragpainting:start' &&
        action.existingId &&
        'movepainting') ||
    (['tracewall', 'rectwall', 'erasewall'].includes(
        selectCurrentTool(state)
    ) &&
        selectCurrentTool(state)) ||
    null

const pushToUndo = (state, museum, label) => ({
    ...state,

    // reset the undo stack
    historyRedoStack: [],

    // reset the cache
    historyCache: null,

    // if there is a difference, push to the undo stack
    historyUndoStack: [{ museum, label }, ...state.historyUndoStack],
})

export const enhance = reduce => (state: State, action: Action) => {
    switch (action.type) {
        case 'undo': {
            const [first, ...historyUndoStack] = state.historyUndoStack

            if (first)
                state = {
                    ...state,
                    museum: first.museum,
                    historyUndoStack,
                    historyRedoStack: [
                        { label: first.label, museum: state.museum },
                        ...state.historyRedoStack,
                    ],
                }

            return state
        }

        case 'redo': {
            const [first, ...historyRedoStack] = state.historyRedoStack

            if (first)
                state = {
                    ...state,
                    museum: first.museum,
                    historyRedoStack,
                    historyUndoStack: [
                        { label: first.label, museum: state.museum },
                        ...state.historyUndoStack,
                    ],
                }

            return state
        }

        case 'paintingdownsize:set': {
            const museum = state.museum

            state = reduce(state, action)

            return state.museum === museum
                ? state
                : pushToUndo(state, museum, 'setpaintingdownsize')
        }

        case 'ui:dragstartingpoint:start':
        case 'ui:dragpainting:start':
        case 'ui:drag:start': {
            const label = getMutationLabel(action, state)

            // cache the current value for some drag action
            if (label)
                state = {
                    ...state,
                    historyCache: { museum: state.museum, label },
                }

            return reduce(state, action)
        }

        case 'ui:drag:end':
            if (state.historyCache) {
                const newState = reduce(state, action)

                const { museum, label } = state.historyCache

                return museum === newState.museum
                    ? newState
                    : pushToUndo(newState, museum, label)
            }

            return reduce(state, action)

        default:
            return reduce(state, action)
    }
}
