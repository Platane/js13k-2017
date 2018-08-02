import { Action } from '../../action'
import { State } from '../type'
import { selectBestPaintingsById } from '../../selector/paintings'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'paintingdownsize:set':
            const { adn } = selectBestPaintingsById(state)[
                action.paintingId
            ].find(x => x.id === action.downsizeId)

            const paintings = state.museum.paintings.map(
                p =>
                    p.paintingId === action.paintingId
                        ? { ...p, downsizeId: action.downsizeId, adn }
                        : p
            )

            return {
                ...state,
                museum: {
                    ...state.museum,
                    paintings,
                },
            }
    }

    return state
}
