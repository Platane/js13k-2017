import { createSelector } from 'reselect'
import { selectTargetPaintingsById } from './paintings'
import { selectStableMuseum } from './museum'
import { getPath } from '../../service/aStart'

export const selectRoute = createSelector(
    selectTargetPaintingsById,
    selectStableMuseum,
    (targetPaintingsById, { paintings, signs }) =>
        paintings.map(({ id, paintingId }, i) => ({
            target: targetPaintingsById[paintingId],
            id,
            sign: signs[i],
        }))
)

export const selectRoutePath = createSelector(
    selectStableMuseum,
    m => {
        /**
         * compute sections
         */
        const sections =
            m.signs.reduceRight((res, x, i) => {
                if (x || res) {
                    const a = m.paintings[i - 1]
                    const b = m.paintings[i]

                    if (a && b) {
                        const A = {
                            x: a.cell.x + a.orientation.x,
                            y: a.cell.y + a.orientation.y,
                        }
                        const B = {
                            x: b.cell.x + b.orientation.x,
                            y: b.cell.y + b.orientation.y,
                        }

                        return [[A, B], ...(res || [])]
                    }
                }

                return res
            }, null) || []

        /**
         * compute path on sections
         */
        return sections.map(([A, B]) => getPath(m)(A, B))
    }
)
