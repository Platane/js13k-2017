import { Camera, Painting, Museum, Point, Tool, Panel } from '../../type'

export type State = {
    camera: Camera

    museum: Museum

    currentPanel: Panel

    tool: Tool

    paintings: Painting[]

    historyStableMuseum: Museum,

    historyRedoStack: {
        label: string
        museum: Museum
    }[]

    historyUndoStack: {
        label: string
        museum: Museum
    }[]

    historyCache: Museum | null

    dragCamera: { cameraAnchor: Point; pointerScreenAnchor: Point } | null
    dragTraceWall: true | null
    dragStartingPoint: true | null
    dragRectWall: { originalMuseum: Museum; A: Point } | null
    dragPainting: {
        originalMuseum: Museum
        paintingId: string
        id: string
    } | null
}
