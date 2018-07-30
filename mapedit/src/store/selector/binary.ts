import { createSelector } from 'reselect'
import { State } from '../reducer/type'
import { centerOrigin, reduceGrid } from '../../service/map/reduceGrid'
import { packMuseum } from '../../lib/common/map/pack/museum'
import { selectBestPaintingsById, selectPaintingParam } from './paintings'

export const selectStableMuseum = (state: State) => state.historyStableMuseum

export const selectMuseumAsBinary = createSelector(
    selectStableMuseum,
    selectBestPaintingsById,
    selectPaintingParam,
    (museum, bestPaintingsById, param) => {
        const m: any = centerOrigin(reduceGrid(museum))

        m.paintings = m.paintings.map(({ paintingId, ...painting }) => {
            const [{ adn }] = bestPaintingsById[paintingId]

            return { adn, ...painting }
        })

        return packMuseum(param, m)
    }
)
