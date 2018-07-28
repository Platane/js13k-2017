import { Action } from "../action"
import { State } from "./type"

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case "http:hydrate:paintings": {
            return {
                ...state,
                paintings: action.paintings,
            }
        }
    }

    return state
}
