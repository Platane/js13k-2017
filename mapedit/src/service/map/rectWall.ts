import { Museum, Point } from "../../../../type"
import { setCells, readCell } from "./set"

export const rectWall = (museum: Museum, A: Point, B: Point) => {
    const min = { x: Math.min(A.x, B.x), y: Math.min(A.y, B.y) }
    const max = { x: Math.max(A.x, B.x), y: Math.max(A.y, B.y) }

    const cells = []

    for (let x = min.x; x <= max.x; x++)
        cells.push({ ...min, x }, { ...max, x })

    for (let y = min.y; y <= max.y; y++)
        cells.push({ ...min, y }, { ...max, y })

    return cells.every(cell => readCell(museum, cell))
        ? museum
        : setCells(museum, cells, false)
}
