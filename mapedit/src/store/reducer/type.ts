import { Camera, Painting, Museum, Point, Tool } from "../../type"

export type State = {
    camera: Camera

    museum: Museum

    tool: Tool

    paintings: Painting[]

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
    dragRectWall: { originalMuseum: Museum; A: Point } | null
    dragPainting: { originalMuseum: Museum; paintingId: string } | null
}
