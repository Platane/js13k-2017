import { packGrid, unpackGrid } from './grid'
import { packSigns, unpackSigns } from './signs'
import {
    getOrientationKey,
    orientations,
    packPaintings,
    unpackPaintings,
} from './paintings'
import { packADN } from '../../adn/pack'

export const packMuseum = (param, museum) => {
    const { grid, paintings, signs, startingPoint, startingOrientation } = museum

    const height = grid.length
    const width = grid[0].length
    const paintingLength = museum.paintings[0]
        ? packADN(param, museum.paintings[0].adn).length + 3
        : 0

    const paintingNumber = museum.paintings.length

    if (width > 255 || height > 255) throw new Error('grid is too large')

    // grid
    const gridBuffer = packGrid(grid)

    // paintings
    const paintingsBuffer = packPaintings(param, museum.paintings)

    // signs
    const signsBuffer = packSigns(signs)

    const metaBuffer = [
        width,
        height,
        paintingLength,
        paintingNumber,
        startingPoint.x,
        startingPoint.y,
        getOrientationKey(startingOrientation),
    ]

    // const buffer = new Uint8Array(
    //     metaBuffer.length + gridBuffer.length + paintingsBuffer.length + signsBuffer.length
    // )
    // buffer.set(metaBuffer,0)
    // buffer.set(gridBuffer, 7)
    // buffer.set(paintingsBuffer, 6 + gridBuffer.length)
    // buffer.set(signsBuffer, 6 + gridBuffer.length+ paintingsBuffer)

    return Uint8Array.from([
        ...metaBuffer,
        ...gridBuffer,
        ...paintingsBuffer,
        ...signsBuffer,
    ])
}

export const unpackMuseum = (param, buffer) => {
    const [
        width,
        height,
        paintingLength,
        paintingNumber,
        startingPointx,
        startingPointy,
        orientationKey,
    ] = buffer

    const metaLength = 7

    const gridLength = Math.ceil((height * width) / 8)

    const grid = unpackGrid(width, height, buffer.slice(metaLength, metaLength + gridLength))

    const paintings = unpackPaintings(
        param,
        paintingLength,
        buffer.slice(metaLength + gridLength,metaLength + gridLength + paintingLength*paintingNumber)
    )

    const signs = unpackSigns(
        buffer.slice(metaLength + gridLength + paintingLength*paintingNumber)
    )

    return {
        grid,
        signs,
        paintings,
        startingPoint: { x: startingPointx, y: startingPointy },
        startingOrientation: orientations[orientationKey],
    }
}
