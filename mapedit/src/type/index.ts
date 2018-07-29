export type Point = { x: number; y: number }

export type PaintingSpot = {
    id: string
    paintingId: string
    cell: Point
    orientation:
        | { x: 1; y: 0 }
        | { x: -1; y: 0 }
        | { x: 0; y: 1 }
        | { x: 0; y: -1 }
}

export type Museum = {
    origin: Point

    grid: boolean[][]

    paintings: PaintingSpot[]
}

export type Camera = {
    a: number
    t: Point
}

export type Tool = "camera" | "tracewall" | "rectwall"

export type Painting = {
    id: string
    PARAM: Object
    ancestorTree: Object
    target: number[]
}
