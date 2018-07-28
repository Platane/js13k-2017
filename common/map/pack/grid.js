import { readNumber, writeNumber } from "../../adn/pack"

export const packGrid = grid => {
    const h = grid.length
    const w = grid[0].length

    const buffer = new Uint8Array(Math.ceil((h * w) / 8))

    for (let y = h; y--; )
        for (let x = w; x--; )
            writeNumber(y * w + x, y * w + x + 1, buffer, grid[y][x] ? 1 : 0)

    return buffer
}

export const unpackGrid = (w, h, buffer) => {
    const grid = Array.from({ length: h }).map(() => Array.from({ length: w }))

    for (let y = h; y--; )
        for (let x = w; x--; )
            grid[y][x] = !!readNumber(y * w + x, y * w + x + 1, buffer)

    return grid
}
