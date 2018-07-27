import { toScreen } from "../../../service/camera"
import { Action } from "../../action"
import { State } from "../index"

export const reduce = (state: State, action: Action): State => {
    if (state.tool !== "camera") return state

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
            if ("cameraAnchor" in state.uidragstate) {
                const camera = state.camera

                const { cameraAnchor, pointerScreenAnchor } = state.uidragstate

                const pointerScreen = toScreen(camera)(action.pointer)

                const t = {
                    x:
                        cameraAnchor.x -
                        (pointerScreen.x - pointerScreenAnchor.x) / camera.a,
                    y:
                        cameraAnchor.y -
                        (pointerScreen.y - pointerScreenAnchor.y) / camera.a,
                }

                return {
                    ...state,
                    camera: { ...state.camera, t },
                }
            }

            break

        case "ui:drag:end":
            return { ...state, uidragstate: {} }
    }

    return state
}
