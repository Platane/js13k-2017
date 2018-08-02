import { Action } from '../action'
import { State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:tool:set': {
            return {
                ...state,
                tool: {
                    current: action.tool,
                    cameraOverwrite: false,
                },
            }
        }

        case 'ui:tool:cameraoverwrite:on': {
            return {
                ...state,
                tool: {
                    ...state.tool,
                    cameraOverwrite: true,
                },
            }
        }

        case 'ui:tool:cameraoverwrite:off': {
            return {
                ...state,
                tool: {
                    ...state.tool,
                    cameraOverwrite: false,
                },
            }
        }
    }

    return state
}
