import { toScreen } from "../../../service/camera"
import { Action } from "../../action"
import { State } from "../type"

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case "ui:drag:start": {
            if (state.tool !== "camera") return state

            const pointerScreenAnchor = toScreen(state.camera)(action.pointer)

            return {
                ...state,
                dragCamera: {
                    cameraAnchor: state.camera.t,
                    pointerScreenAnchor,
                },
            }
        }

        case "ui:drag:move":
            if (state.dragCamera) {
                const camera = state.camera

                const { cameraAnchor, pointerScreenAnchor } = state.dragCamera

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
            if (state.dragCamera) return { ...state, dragCamera: null }
    }

    return state
}
