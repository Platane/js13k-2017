import { composeReducer } from '../../util/redux'
import { reduce as reduceMap } from './map'
import { reduce as reduceTool } from './tool'
import { reduce as reducePaintings } from './paintings'
import { reduce as reducePlayWindow } from './playWindow'
import { reduce as reduceInit } from './init'
import { State } from './type'
import { Museum } from '../../type'

const museum: Museum = {
    origin: { x: 0, y: 0 },
    grid: [[]],
    paintings: [],
    startingPoint: { x: 0, y: 0 },
    startingOrientation: { x: 0, y: 1 },
}

export const defaultState: State = {
    camera: {
        a: 50,
        t: { x: 0, y: 0 },
    },

    paintings: [],

    museum,

    tool: {
        current: 'camera',
        cameraOverwrite: false,
    },

    historyStableMuseum: museum,
    historyCache: null,
    historyRedoStack: [],
    historyUndoStack: [],

    dragCamera: null,
    dragTraceWall: null,
    dragEraseWall: null,
    dragRectWall: null,
    dragPainting: null,
    dragStartingPoint: null,

    playWindow: {
        refreshKey: null,
        autorefresh: false,
    },
}

export const reduce = composeReducer(
    reduceInit,
    reduceMap,
    reduceTool,
    reducePaintings,
    reducePlayWindow
)
