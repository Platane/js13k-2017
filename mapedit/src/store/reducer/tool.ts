import { Action } from "../action"
import { State } from "./type"

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case "ui:tool:set": {
            return {
                ...state,
                tool: action.tool,
            }
        }
    }

    return state
}
