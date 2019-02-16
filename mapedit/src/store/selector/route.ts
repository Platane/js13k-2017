import { createSelector } from 'reselect'
import { selectTargetPaintingsById } from './paintings'
import { selectStableMuseum } from './museum'

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
