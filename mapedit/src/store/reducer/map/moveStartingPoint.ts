import { readCell } from '../../../service/map/set'
import { Action } from '../../action'
import { State } from '../type'
import { Museum, Point, Orientation } from '../../../type'

const orientations = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
]

const getClosestCells = (museum: Museum, point: Point, l: number) => {
    const cells = []

    const px = Math.floor(point.x)
    const py = Math.floor(point.y)

    for (let x = -l; x <= l; x++)
        for (let y = -l; y <= l; y++) {
            const cell = { x: px + x, y: py + y }

            if (readCell(museum, cell)) cells.push(cell)
        }

    return cells
}

const flat = arr => [].concat(...arr)

const getClosestSpot = (museum: Museum, point: Point) => {
    const [closest] = flat(
        getClosestCells(museum, point, 3).map(cell =>
            orientations
                .filter(
                    v => !readCell(museum, { x: cell.x + v.x, y: cell.y + v.y })
                )
                .map(orientation => {
                    const spot = { orientation, cell }

                    const cx = cell.x + 0.5 + 0.5 * orientation.x
                    const cy = cell.y + 0.5 + 0.5 * orientation.y
                    const distance =
                        (point.x - cx) * (point.x - cx) +
                        (point.y - cy) * (point.y - cy)

                    return { spot, distance }
                })
        )
    ).sort((a, b) => a.distance - b.distance)

    return closest && closest.distance < 2.5 ? closest.spot : null
}

const haveThePaintingAlready = (
    { paintings },
    { cell, orientation, paintingId }
) => {
    const last = paintings[paintings.length - 1]

    return (
        last &&
        last.cell.x === cell.x &&
        last.cell.y === cell.y &&
        last.orientation.x === orientation.x &&
        last.orientation.y === orientation.y &&
        last.paintingId === paintingId
    )
}

const pointEqual = (a, b) => a.x === b.x && a.y === b.y

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:dragstartingpoint:start':
            return {
                ...state,
                dragStartingPoint: true,
            }

        case 'ui:drag:move':
            if (state.dragStartingPoint) {
                const startingPoint = {
                    x: Math.floor(action.pointer.x),
                    y: Math.floor(action.pointer.y),
                }

                const dx = (((action.pointer.x % 1) + 1) % 1) - 0.5
                const dy = (((action.pointer.y % 1) + 1) % 1) - 0.5

                const startingOrientation: Orientation = {
                    x: Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : -1) : 0,
                    y: Math.abs(dy) >= Math.abs(dx) ? (dy > 0 ? 1 : -1) : 0,
                } as any

                if (
                    !pointEqual(startingPoint, state.museum.startingPoint) ||
                    !pointEqual(
                        startingOrientation,
                        state.museum.startingOrientation
                    )
                )
                    return {
                        ...state,
                        museum: {
                            ...state.museum,
                            startingPoint,
                            startingOrientation,
                        },
                    }
            }

            break

        case 'ui:drag:end':
            return { ...state, dragStartingPoint: null }
    }

    return state
}
