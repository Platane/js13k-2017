export type Point = { x: number; y: number }

export type Orientation =
    | { x: 1; y: 0 }
    | { x: -1; y: 0 }
    | { x: 0; y: 1 }
    | { x: 0; y: -1 }

export type PaintingSpot = {
    id: string
    paintingId: string
    cell: Point
    orientation: Orientation
}

export type Museum = {
    origin: Point

    grid: boolean[][]

    paintings: PaintingSpot[]

    startingPoint: Point
    startingOrientation: Orientation

    indications: string[]
}

export type Camera = {
    a: number
    t: Point
}

export type Tool = 'camera' | 'tracewall' | 'rectwall'

export type Panel = 'wallbuilder' | 'placepainting' | 'routebuilder'

export type Painting = {
    id: string
    PARAM: Object
    ancestorTree: Object
    target: number[]
}
