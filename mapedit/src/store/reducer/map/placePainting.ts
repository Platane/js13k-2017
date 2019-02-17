import { readCell } from '../../../service/map/set'
import { Action } from '../../action'
import { State } from '../type'
import { Museum, Point } from '../../../type'
import { selectBestPaintingsById } from '../../selector/paintings'
import { selectCurrentPanel } from '../../selector/currentPanel'

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

    return closest && closest.distance < 1.5 ? closest.spot : null
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

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ui:dragpainting:start': {
            if (selectCurrentPanel(state) !== 'placepainting') return state

            const samePainting = state.museum.paintings.find(
                x => x.paintingId === action.paintingId
            )

            const downsize = selectBestPaintingsById(state)[
                action.paintingId
            ].find(x => !samePainting || samePainting.downsizeId === x.id)

            const index = state.museum.paintings.findIndex(
                x => x.id === action.existingId
            )

            return {
                ...state,
                dragPainting: {
                    originalMuseum: {
                        ...state.museum,
                        paintings: state.museum.paintings.filter(
                            x => x.id !== action.existingId
                        ),
                    },
                    adn: downsize.adn,
                    downsizeId: downsize.id,
                    paintingId: action.paintingId,
                    id: action.existingId || action.id,
                    index: index === -1 ? state.museum.paintings.length : index,
                },
            }
        }

        case 'ui:drag:move':
            if (state.dragPainting) {
                const { originalMuseum, index, ...rest } = state.dragPainting

                const spot = getClosestSpot(originalMuseum, action.pointer)

                if (spot) {
                    const paintingSpot = { ...spot, ...rest }

                    const newState = {
                        ...state,
                        museum: {
                            ...originalMuseum,
                            paintings: [...originalMuseum.paintings],
                        },
                    }

                    newState.museum.paintings.splice(index, 0, paintingSpot)

                    return newState
                } else
                    return {
                        ...state,
                        museum: originalMuseum,
                    }
            }

            break

        case 'ui:drag:end':
            return { ...state, dragPainting: null }
    }

    return state
}
