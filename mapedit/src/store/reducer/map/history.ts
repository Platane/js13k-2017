import { Action } from '../../action'
import { State } from '../type'

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

        case 'ui:dragstartingpoint:start':
        case 'ui:dragpainting:start':
        case 'ui:drag:start': {
            // grab the mutation label
            const label =
                (action.type === 'ui:dragstartingpoint:start' &&
                    'movestartingpoint') ||
                (action.type === 'ui:dragpainting:start' &&
                    !action.existingId &&
                    'placepainting') ||
                (action.type === 'ui:dragpainting:start' &&
                    action.existingId &&
                    'movepainting') ||
                (['tracewall', 'rectwall', 'erasewall'].includes(state.tool) &&
                    state.tool) ||
                null

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

                return {
                    ...newState,

                    // reset the undo stack
                    historyRedoStack: [],

                    // reset the cache
                    historyCache: null,

                    // if there is a difference, push to the undo stack
                    historyUndoStack:
                        state.historyCache.museum === newState.museum
                            ? state.historyUndoStack
                            : [state.historyCache, ...state.historyUndoStack],
                }
            }

            return reduce(state, action)

        default:
            return reduce(state, action)
    }
}
