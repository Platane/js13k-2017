import type { World, Point, WorldGrid } from '../../type'

const around = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
]

const isInside = (grid: WorldGrid, x: number, y: number) =>
    x >= 0 && x < grid.length && y >= 0 && y < grid[0].length

const getClosestWall = (p: Point, grid: WorldGrid) => {
    const gx = Math.floor(p.x)
    const gy = Math.floor(p.y)

    return around.reduce((best, dir) => {
        const x = gx + dir.x
        const y = gy + dir.y

        // is a wall
        if (!isInside(grid, x, y) || grid[x][y]) {
            const dx = dir.x === 0 ? 0 : dir.x > 0 ? 1 - p.x % 1 : p.x % 1
            const dy = dir.y === 0 ? 0 : dir.y > 0 ? 1 - p.y % 1 : p.y % 1

            const d = Math.sqrt(dx * dx + dy * dy)

            return !best || best.d > d ? { x, y, dir, d } : best
        } else return best
    }, null)
}

export const step = (world: World): World => {
    // make tim walk
    {
        const { position, direction } = world.tim

        const newPos = {
            x: position.x + direction.x * 0.01,
            y: position.y + direction.y * 0.01,
        }

        const closestWall = getClosestWall(newPos, world.worldGrid)

        console.log(closestWall && closestWall.d)

        if (!closestWall || closestWall.d > 0.05) {
            position.x = newPos.x
            position.y = newPos.y
        }
    }

    return world
}
