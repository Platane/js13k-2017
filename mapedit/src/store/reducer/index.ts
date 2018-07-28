import { composeReducer } from "../../util/redux"
import { reduce as reduceMap } from "./map"
import { reduce as reduceTool } from "./tool"
import { reduce as reducePaintings } from "./paintings"
import { State } from "./type"

export const defaultState: State = {
    camera: {
        a: 50,
        t: { x: 0, y: 0 },
    },

    paintings: [],

    museum: {
        origin: { x: 5, y: 3 },
        grid: [[true]],
        paintings: [],
    },

    tool: "camera",

    historyCache: null,
    historyRedoStack: [],
    historyUndoStack: [],

    dragCamera: null,
    dragTraceWall: null,
    dragRectWall: null,
    dragPainting: null,
}

export const reduce = composeReducer(reduceMap, reduceTool, reducePaintings)
