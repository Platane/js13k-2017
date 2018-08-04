import { State } from '../reducer/type'
import { createSelector } from 'reselect'
import { centerOrigin, reduceGrid } from '../../service/map/reduceGrid'
import { addBorder } from '../../service/map/expandGrid'

export const selectMuseum = (state: State) => state.museum

export const selectStableMuseum = (state: State) => state.historyStableMuseum

export const selectStableUniquePaintings = createSelector(
    selectStableMuseum,
    ({ paintings }) =>
        paintings
            .filter(
                (a, i, arr) =>
                    arr.findIndex(b => a.paintingId === b.paintingId) === i
            )
            .sort((a, b) => (a.paintingId < b.paintingId ? 1 : -1))
)

export const selectStableMuseumCenter = createSelector(
    selectStableMuseum,
    museum => centerOrigin(addBorder(reduceGrid(museum), 4))
)
