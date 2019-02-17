import { Museum, Point } from '../../type'
import { expandGrid } from './expandGrid'

export const mutateCell = (
    { grid, origin }: Museum,
    cell: Point,
    value: boolean
) => (grid[cell.y - origin.y][cell.x - origin.x] = value)

export const readCell = ({ grid, origin }: Museum, cell: Point) =>
    (grid[cell.y - origin.y] && grid[cell.y - origin.y][cell.x - origin.x]) ||
    false

export const isInside = ({ grid, origin }: Museum, cell: Point) =>
    cell.y - origin.y >= 0 &&
    cell.y - origin.y < grid.length &&
    cell.x - origin.x >= 0 &&
    cell.x - origin.x < grid[cell.y - origin.y].length

export const cloneGrid = (grid: boolean[][]) => grid.map(x => x.slice())

export const setCells = (m: Museum, cells: Point[], value: boolean) => {
    const max = cells.reduce(
        (max, cell) => {
            max.x = Math.max(max.x, cell.x)
            max.y = Math.max(max.y, cell.y)

            return max
        },
        { ...m.origin }
    )

    const min = cells.reduce(
        (min, cell) => {
            min.x = Math.min(min.x, cell.x)
            min.y = Math.min(min.y, cell.y)

            return min
        },
        { ...m.origin }
    )

    let m_ = expandGrid(m, min, max)

    m_ = {
        ...m_,
        grid: cloneGrid(m_.grid),
    }

    cells.forEach(cell => mutateCell(m_, cell, value))

    return m_
}
