import type { WorldGrid } from '../type'

// export const generateMaze = (): WorldGrid => [
//     [null, null, null],
//     [null, [null, null, null, null], null],
//     [null, null, null],
// ]

const generateEmptyWorld = length =>
    Array.from({ length }, () => Array.from({ length }))

const removeInPlace = (arr, fn) => {
    for (let i = arr.length; i--; ) if (fn(arr[i])) arr.splice(i, 1)

    return arr
}

const popRandom = arr =>
    arr.splice(Math.floor(Math.random() * arr.length), 1)[0]

export const generateMaze = (n): WorldGrid => {
    const start = { x: 0, y: 4 }

    const world = generateEmptyWorld(n)
    const open = []

    world[start.x][start.y] = 1
    open.push({ x: start.x, y: start.y, parent: start })

    while (open.length) {
        const next = popRandom(open)

        const { x, y, parent } = next

        const adjacents = [
            { x: x + 1, y, parent: next },
            { x: x - 1, y, parent: next },
            { x, y: y + 1, parent: next },
            { x, y: y - 1, parent: next },
        ]
            .filter(o => o.x >= 0 && o.x < n && o.y >= 0 && o.y < n)
            .filter(o => o.x !== parent.x || o.y !== parent.y)

        if (adjacents.every(o => !world[o.x][o.y])) {
            open.push(
                ...adjacents.filter(
                    o => !open.some(u => u.x === o.x && u.y === o.y)
                )
            )

            world[x][y] = 1
        }
    }

    return world.map(line => line.map(x => !x && [null, null, null, null]))
}
