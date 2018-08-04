import { Action } from '../action'
import { State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'playwindow:open':
            return {
                ...state,
                playWindow: {
                    ...state.playWindow,
                    refreshKey: +state.playWindow.refreshKey + 1,
                },
            }

        case 'playwindow:autorefresh:toggle':
            return {
                ...state,
                playWindow: {
                    ...state.playWindow,
                    autorefresh: !state.playWindow.autorefresh,
                },
            }

        case 'playwindow:gameposition:update':
            return {
                ...state,
                playWindow: {
                    ...state.playWindow,
                    position: action.position,
                    orientation: action.orientation,
                },
            }
    }

    return state
}
