import { composeReducer } from '../../util/redux'
import { reduce as reduceMap } from './map'
import { reduce as reduceTool } from './tool'
import { reduce as reducePanel } from './panel'
import { reduce as reducePaintings } from './paintings'
import { reduce as reducePlayWindow } from './playWindow'
import { reduce as reduceInit } from './init'
import { defaultMuseum } from './defaultMuseum'
import { State } from './type'

export const defaultState: State = {
    camera: {
        a: 50,
        t: { x: 0, y: 0 },
    },

    paintings: [],

    museum: defaultMuseum,

    tool: {
        current: 'camera',
        cameraOverwrite: false,
    },

    panel: {
        current: 'placepainting',
    },

    historyStableMuseum: defaultMuseum,
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
        autorefresh: true,
        position: null,
        orientation: null,
    },
}

export const reduce = composeReducer(
    reduceInit,
    reduceMap,
    reduceTool,
    reducePanel,
    reducePaintings,
    reducePlayWindow
)
