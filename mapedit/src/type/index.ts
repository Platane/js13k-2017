export type Point = { x: number; y: number }

export type Orientation =
    | { x: 1; y: 0 }
    | { x: -1; y: 0 }
    | { x: 0; y: 1 }
    | { x: 0; y: -1 }

export type PaintingSpot = {
    id: string
    paintingId: string
    downsizeId: string
    adn: Object
    cell: Point
    orientation: Orientation
}

export type Sign = string

export type Museum = {
    origin: Point

    grid: boolean[][]

    paintings: PaintingSpot[]

    signs: Sign[]

    startingPoint: Point
    startingOrientation: Orientation
}

export type Camera = {
    a: number
    t: Point
}

export type Tool = 'camera' | 'tracewall' | 'rectwall' | 'erasewall'

export type Panel =
    | 'wallbuilder'
    | 'placepainting'
    | 'routebuilder'
    | 'downsizePainting'

export type Painting = {
    id: string
    PARAM: Object
    ancestorTree: Object
    target: number[]
}
