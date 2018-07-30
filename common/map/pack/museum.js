import { packGrid, unpackGrid } from './grid'
import {
    getOrientationKey,
    orientations,
    packPaintings,
    unpackPaintings,
} from './paintings'
import { packADN } from '../../adn/pack'

export const packMuseum = (param, museum) => {
    const { grid, paintings, startingPoint, startingOrientation } = museum

    const height = grid.length
    const width = grid[0].length
    const paintingLength = museum.paintings[0]
        ? packADN(param, museum.paintings[0].adn).length + 3
        : 0

    if (width > 255 || height > 255) throw new Error('grid is too large')

    // grid
    const gridBuffer = packGrid(grid)

    // paintings
    const paintingsBuffer = packPaintings(param, museum.paintings)

    const buffer = new Uint8Array(
        6 + gridBuffer.length + paintingsBuffer.length
    )
    buffer.set(
        [
            width,
            height,
            paintingLength,
            startingPoint.x,
            startingPoint.y,
            getOrientationKey(startingOrientation),
        ],
        0
    )
    buffer.set(gridBuffer, 6)
    buffer.set(paintingsBuffer, 6 + gridBuffer.length)

    return buffer
}

export const unpackMuseum = (param, buffer) => {
    const [
        width,
        height,
        paintingLength,
        startingPointx,
        startingPointy,
        orientationKey,
    ] = buffer

    const gridLength = Math.ceil((height * width) / 8)

    const grid = unpackGrid(width, height, buffer.slice(6, 6 + gridLength))

    const paintings = unpackPaintings(
        param,
        paintingLength,
        buffer.slice(6 + gridLength)
    )

    return {
        grid,
        paintings,
        startingPoint: { x: startingPointx, y: startingPointy },
        startingOrientation: orientations[orientationKey],
    }
}
