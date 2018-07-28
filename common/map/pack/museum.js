import { packGrid, unpackGrid } from "./grid"
import { packPaintings, unpackPaintings } from "./paintings"
import { packADN } from "../../adn/pack"

export const packMuseum = (param, museum) => {
    const { grid, paintings } = museum

    const height = grid.length
    const width = grid[0].length
    const paintingLength = museum.paintings[0]
        ? packADN(param, museum.paintings[0].adn).length + 3
        : 0

    if (width > 255 || height > 255) throw new Error("grid is too large")

    // grid
    const gridBuffer = packGrid(grid)

    // paintings
    const paintingsBuffer = packPaintings(param, museum.paintings)

    const buffer = new Uint8Array(
        3 + gridBuffer.length + paintingsBuffer.length
    )
    buffer.set([width, height, paintingLength], 0)
    buffer.set(gridBuffer, 3)
    buffer.set(paintingsBuffer, 3 + gridBuffer.length)

    return buffer
}

export const unpackMuseum = (param, buffer) => {
    const [width, height, paintingLength] = buffer

    const gridLength = Math.ceil((height * width) / 8)

    const grid = unpackGrid(width, height, buffer.slice(3, 3 + gridLength))

    const paintings = unpackPaintings(
        param,
        paintingLength,
        buffer.slice(3 + gridLength)
    )

    return { grid, paintings }
}
