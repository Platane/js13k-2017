import { createSelector } from 'reselect'
import { State } from '../reducer/type'
import { getBestFitLeafs } from '../../lib/common/ancestorTree/stats'

export const selectPaintings = (state: State) => state.paintings

export const selectTargetPaintingsById = createSelector(
    selectPaintings,
    paintings => {
        const byId = {}
        paintings.forEach(painting => (byId[painting.id] = painting.target))
        return byId
    }
)

export const selectBestPaintingsById = createSelector(
    selectPaintings,
    paintings => {
        const byId = {}
        paintings.forEach(
            painting =>
                (byId[painting.id] = getBestFitLeafs(painting.ancestorTree, 6))
        )
        return byId
    }
)

export const selectPaintingParam = createSelector(
    selectPaintings,
    paintings => (paintings[0] && paintings[0].PARAM) || null
)
