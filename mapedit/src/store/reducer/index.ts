import { Camera, Museum, Point, Tool } from "../../type"
import { Action } from "../action"
import { fromScreen, toScreen } from "../../service/camera"
import { placeWall } from "./map/mutate/placeWall"
import { clamp } from "../../util/math"

export type State = {
    camera: Camera

    museum: Museum

    tool: Tool

    uidragstate: { cameraAnchor: Point; pointerScreenAnchor: Point } | {}
}

export const defaultState: State = {
    camera: {
        a: 50,
        t: { x: 0, y: 0 },
    },

    museum: {
        origin: { x: 1, y: 1 },

        grid: [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        paintings: [],
    },

    tool: "tracewall",

    uidragstate: {},
}

const zoomLevel = [10, 16, 24, 36, 46, 60, 80]

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case "ui:tool:set": {
            return {
                ...state,
                tool: action.tool,
            }
        }

        case "ui:wheel": {
            const _a = state.camera.a
            const _t = state.camera.t

            const p = action.pointer

            const i = zoomLevel.findIndex(x => x >= _a)

            const a =
                zoomLevel[clamp(0, zoomLevel.length - 1, i - action.delta)]

            const t = {
                x: p.x + (_a / a) * (_t.x - p.x),
                y: p.y + (_a / a) * (_t.y - p.y),
            }

            return {
                ...state,
                camera: { t, a },
            }
        }

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
            if (state.uidragstate.cameraAnchor && state.tool === "camera") {
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

            if (state.tool === "tracewall") {
                const cell = {
                    x: Math.floor(action.pointer.x),
                    y: Math.floor(action.pointer.y),
                }

                const museum = placeWall(state.museum, cell)

                if (museum !== state.museum) return { ...state, museum }
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
