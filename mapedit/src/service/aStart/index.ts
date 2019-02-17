import { Point, Museum as Map } from '../../type'
import { readCell, isInside } from '../map/set'
import { addBorder } from '../map/expandGrid'

const around = [
    { x: 0, y: 1, w: 1 },
    { x: 1, y: 0, w: 1 },
    { x: 0, y: -1, w: 1 },
    { x: -1, y: 0, w: 1 },

    { x: 1, y: 1, w: 1.4 },
    { x: -1, y: 1, w: 1.4 },
    { x: -1, y: -1, w: 1.4 },
    { x: 1, y: -1, w: 1.4 },
]

const distance = (A: Point, B: Point) =>
    Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y))

const equal = (A: Point, B: Point) => A.x === B.x && A.y === B.y

const sortFn = (a, b) => a.f - b.f

const unstack = E => (E ? [...unstack(E.parent), E] : [])

const toPoint = ({ x, y }) => ({ x, y })

export const getPath = (map: Map) => (A: Point, B: Point) => {
    // const mm = addBorder(map, 1)
    // const isCellWalkable = P => isInside(mm, P) && !readCell(mm, P)
    const isCellWalkable = P => !readCell(map, P)

    if (!isCellWalkable(A)) return null

    const f_min = distance(A, B)

    const openList = [
        {
            ...A,
            parent: null,
            w: 0,
            f: f_min,
        },
    ]
    const closeList = []

    while (openList.length) {
        openList.sort(sortFn)

        const E = openList.shift()

        if (equal(E, B)) return unstack(E).map(toPoint)

        /**
         * escape hatch
         */
        if (E.f > f_min * 10 || closeList.length > 9999) return null

        around.forEach(({ x, y, w }) => {
            const U = { x: E.x + x, y: E.y + y }

            const Uw = E.w + w

            if (isCellWalkable(U)) {
                if (closeList.some(V => equal(U, V))) return

                const O = openList.find(V => equal(U, V))

                if (O) {
                    const f = Uw + distance(U, B)

                    if (f < O.f) O.f = f

                    return
                }

                openList.push({
                    ...U,
                    parent: E,
                    w: Uw,
                    f: Uw + distance(U, B),
                })
            }
        })

        closeList.push(E)
    }

    return null
}
