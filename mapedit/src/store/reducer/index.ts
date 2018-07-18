import { Camera, Museum, Point, Tool } from "../../type"
import { Action } from "../action"
import { fromScreen, toScreen } from "../../service/camera"

export type State = {
    camera: Camera

    museum: Museum

    tool: Tool

    uidragstate: { cameraAnchor: Point; pointerScreenAnchor: Point }
}

export const defaultState: State = {
    camera: {
        a: 50,
        t: { x: 0, y: 0 },
    },

    museum: {
        origin: { x: 0, y: 0 },

        grid: [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        paintings: [],
    },

    tool: "camera",

    uidragstate: {},
}

export const reduce = (state: State, action: Action): State => {
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
            if (state.uidragstate.cameraAnchor) {
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
            return {
                ...state,
                uidragstate: {},
            }
    }

    return state
}
