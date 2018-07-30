import { Action } from '../../action'
import { State } from '../type'

export const enhance = reduce => (state: State, action: Action) => {
    state = reduce(state, action)

    if (
        state.historyStableMuseum !== state.museum &&
        !state.dragStartingPoint &&
        !state.dragTraceWall &&
        !state.dragPainting &&
        !state.dragRectWall
    )
        state = {
            ...state,
            historyStableMuseum: state.museum,
        }

    return state
}
