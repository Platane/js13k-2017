import { State } from '../reducer/type'
import { createSelector } from 'reselect'

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
