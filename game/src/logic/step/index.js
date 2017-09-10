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
        const control = world.control

        position.x += direction.x * control.direction.y * 0.05
        position.y += direction.y * control.direction.y * 0.05

        const closestWall = getClosestWall(position, world.worldGrid)

        console.log(closestWall && closestWall.d)

        const L = 0.2

        if (closestWall && closestWall.d < L) {
            const r = L - closestWall.d

            position.x -= r * closestWall.dir.x
            position.y -= r * closestWall.dir.y
        }
    }

    return world
}
