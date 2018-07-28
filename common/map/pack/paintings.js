import { packADN, unpackADN } from "../../adn/pack"

const orientations = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { y: 1, x: 0 },
    { y: -1, x: 0 },
]
const getOrientationKey = ({ x, y }) =>
    orientations.findIndex(o => o.x === x && o.y === y)

const flat = arr => [].concat(...arr)

export const packPaintings = (param, paintings) =>
    flat(
        paintings.map(({ cell, orientation, adn }) => [
            cell.x,
            cell.y,
            getOrientationKey(orientation),
            ...packADN(param, adn),
        ])
    )

export const unpackPaintings = (param, paintingLength, buffer) =>
    Array.from({
        length: buffer.length / paintingLength,
    }).map((_, i) => {
        const [x, y, orientationKey] = buffer.slice(paintingLength * i)

        const adn = unpackADN(
            param,
            buffer.slice(paintingLength * i + 3, paintingLength * (i + 1))
        )

        return {
            cell: { x, y },
            orientation: orientations[orientationKey],
            adn,
        }
    })
