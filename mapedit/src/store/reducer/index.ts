import { Camera, Museum, Point, Tool } from "../../type"
import { composeReducer } from "../../util/redux"
import { reduce as reduceMap } from "./map"
import { reduce as reduceTool } from "./tool"

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
        grid: [[]],
        paintings: [],
    },

    tool: "camera",

    uidragstate: {},
}

export const reduce = composeReducer(reduceMap, reduceTool)
