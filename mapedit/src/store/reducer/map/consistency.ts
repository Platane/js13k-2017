import { State } from '../type'
import { Museum, PaintingSpot, Point } from '../../../type'
import { readCell } from '../../../service/map/set'

/**
 * assuming mutation reducer happens before this one /!\
 *
 * check consistency constraints:
 *  - painting must be placed on a wall edge
 *  - painting must not stack
 *  - starting point must be on a valid place
 *
 */

const pointEqual = (a, b) => a.x === b.x && a.y === b.y

const isPaintingSpotValid = (museum: Museum, painting: PaintingSpot) =>
    !readCell(museum, {
        x: painting.cell.x + painting.orientation.x,
        y: painting.cell.y + painting.orientation.y,
    }) &&
    readCell(museum, {
        x: painting.cell.x,
        y: painting.cell.y,
    })

const findReverse = (arr, condition) => {
    for (let i = arr.length; i--; ) if (condition(arr[i], i, arr)) return arr[i]
    return null
}

const isPaintingCovered = ({ paintings }: Museum, painting: PaintingSpot) => {
    const firstPainting = findReverse(
        paintings,
        x =>
            pointEqual(x.orientation, painting.orientation) &&
            pointEqual(x.cell, painting.cell)
    )

    return firstPainting.id !== painting.id
}

const isPaintingValid = (museum: Museum, painting: PaintingSpot) =>
    !isPaintingCovered(museum, painting) &&
    isPaintingSpotValid(museum, painting)

const validatePaintingSpots = (museum: Museum) => {
    const paintings = museum.paintings.filter(
        isPaintingValid.bind(null, museum)
    )

    return paintings.length === museum.paintings.length
        ? museum
        : { ...museum, paintings }
}

const findClosestEmptyCell = (museum: Museum, center: Point, l = 1) => {
    if (l > 10) return null

    const cells = []

    for (let x = -l; x <= l; x++)
        for (let y = -l; y <= l; y++) {
            const cell = { x: center.x + x, y: center.y + y, d: x * x + y * y }
            if (!readCell(museum, cell)) cells.push(cell)
        }

    const [c] = cells.sort((a, b) => a.d - b.d)

    return c || findClosestEmptyCell(museum, center, l + 2)
}

const validateStartingPoint = (museum: Museum) =>
    readCell(museum, museum.startingPoint)
        ? {
              ...museum,
              startingPoint: findClosestEmptyCell(
                  museum,
                  museum.startingPoint
              ) || {
                  x: 0,
                  y: 0,
              },
          }
        : museum

export const reduce = (state: State): State => {
    // check painting spots consistency
    let museum = validatePaintingSpots(state.museum)

    if (!state.dragStartingPoint) museum = validateStartingPoint(museum)

    if (museum !== state.museum) return { ...state, museum }

    return state
}
