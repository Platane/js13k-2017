import { Camera, Painting, Museum, Point, Tool, Panel } from '../../type'

export type State = {
    camera: Camera

    // current museum
    museum: Museum

    tool: {
        current: Tool
        cameraOverwrite: boolean
    }

    panel: {
        current: Panel
    }

    paintings: Painting[]

    // as the current museum may change a lot ( every mouse event basically )
    // this hold the value, and only update on "stable" moment -> ie not when something is being dragged
    historyStableMuseum: Museum

    historyRedoStack: {
        label: string
        museum: Museum
    }[]

    historyUndoStack: {
        label: string
        museum: Museum
    }[]

    historyCache: { museum: Museum; label: string } | null

    // drag state, related to each dragging action
    dragCamera: {
        cameraAnchor: Point
        pointerScreenAnchor: Point
    } | null
    dragTraceWall: true | null
    dragStartingPoint: true | null
    dragRectWall: {
        originalMuseum: Museum
        A: Point
    } | null
    dragEraseWall: {
        originalMuseum: Museum
        A: Point
        B: Point
    } | null
    dragPainting: {
        originalMuseum: Museum
        paintingId: string
        downsizeId: string
        adn: Object
        id: string
    } | null

    playWindow: {
        refreshKey: null | number
        autorefresh: boolean
        position: Point | null
        orientation: Point | null
    }
}
