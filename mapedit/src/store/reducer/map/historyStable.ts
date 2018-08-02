import { Action } from '../../action'
import { State } from '../type'
import { selectIsDraging } from '../../selector/drag'

export const enhance = reduce => (state: State, action: Action) => {
    state = reduce(state, action)

    if (state.historyStableMuseum !== state.museum && !selectIsDraging(state))
        state = {
            ...state,
            historyStableMuseum: state.museum,
        }

    return state
}
