import { createSelector } from 'reselect'
import { packMuseum } from '../../lib/common/map/pack/museum'
import { selectPaintingParam } from './paintings'
import { selectStableMuseumCenter } from './museum'

export const selectMuseumAsBinary = createSelector(
    selectStableMuseumCenter,
    selectPaintingParam,
    (museum, param) => (param ? packMuseum(param, museum) : [])
)
