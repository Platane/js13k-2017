import { toScreen } from "../../../service/camera"
import { placeWall } from "../../../service/map/placeWall"
import { Action } from "../../action"
import { State } from "../index"

export const reduce = (state: State, action: Action): State => {
    if (state.tool !== "tracewall") return state

    switch (action.type) {
        case "ui:drag:start": {
            const pointerScreenAnchor = toScreen(state.camera)(action.pointer)

            return {
                ...state,
                uidragstate: {
                    cameraAnchor: state.camera.t,
                    pointerScreenAnchor,
                },
            }
        }

        case "ui:drag:move":
            const cell = {
                x: Math.floor(action.pointer.x),
                y: Math.floor(action.pointer.y),
            }

            const museum = placeWall(state.museum, cell)

            if (museum !== state.museum) return { ...state, museum }
            break

        case "ui:drag:end":
            return { ...state, uidragstate: {} }
    }

    return state
}
