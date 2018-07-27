import { Camera, Museum, Point, Tool } from "../../type"
import { composeReducer } from "../../util/redux"
import { reduce as reduceMap } from "./map"
import { reduce as reduceTool } from "./tool"

export type State = {
    camera: Camera

    museum: Museum

    tool: Tool

    dragCamera: { cameraAnchor: Point; pointerScreenAnchor: Point } | null
    dragTraceWall: true | null
    dragRectWall: { originalMuseum: Museum; A: Point } | null
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

    dragCamera: null,
    dragTraceWall: null,
    dragRectWall: null,
}

export const reduce = composeReducer(reduceMap, reduceTool)
