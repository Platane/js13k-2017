import { Action } from '../action'
import { State } from './type'
import { selectAvailableTools } from '../selector/currentTool'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:panel:set': {
            const newState = {
                ...state,
                panel: {
                    current: action.panel,
                },
            }

            /**
             * ensure that the current tool is valid
             */
            if (
                selectAvailableTools(newState).includes(newState.tool.current)
            ) {
                newState.tool = {
                    current: selectAvailableTools(newState)[0],
                    cameraOverwrite: false,
                }
            }

            return newState
        }
    }

    return state
}
