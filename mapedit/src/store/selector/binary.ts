import { createSelector } from 'reselect'
import { centerOrigin, reduceGrid } from '../../service/map/reduceGrid'
import { packMuseum } from '../../lib/common/map/pack/museum'
import { selectPaintingParam } from './paintings'
import { addBorder } from '../../service/map/expandGrid'
import { selectStableMuseum } from './museum'

export const selectMuseumAsBinary = createSelector(
    selectStableMuseum,
    selectPaintingParam,
    (museum, param) => {
        const m = centerOrigin(addBorder(reduceGrid(museum), 4))

        return param ? packMuseum(param, m) : []
    }
)
