import { Museum, Point } from "../../type"

export const expandGrid = (museum: Museum, min: Point, max: Point) => {
    let { origin, grid } = museum

    if (min.x < origin.x) {
        const a = Array.from({ length: origin.x - min.x }, () => false)

        grid = grid.map(line => [...a, ...line])

        origin = { ...origin, x: min.x }
    }

    if (max.x + 1 > origin.x + (grid[0] ? grid[0].length : 0)) {
        const a = Array.from(
            { length: max.x + 1 - origin.x - (grid[0] ? grid[0].length : 0) },
            () => false
        )

        grid = grid.map(line => [...line, ...a])
    }

    if (origin.y + grid.length < max.y + 1) {
        grid = [
            ...grid,
            ...Array.from({ length: max.y + 1 - origin.y - grid.length }, () =>
                Array.from(grid[0] || { length: 0 }, () => false)
            ),
        ]
    }

    if (min.y < origin.y) {
        grid = [
            ...Array.from({ length: origin.y - min.y }, () =>
                Array.from(grid[0], () => false)
            ),
            ...grid,
        ]

        origin = { ...origin, y: min.y }
    }

    if (grid === museum.grid) return museum

    return {
        ...museum,
        origin,
        grid,
    }
}

export const reduceGrid = (museum: Museum) => museum
