import { connect } from 'react-redux'
import { PlayButton as Dumb } from './Dumb'
import { State } from '../../store/reducer/type'
import { togglePlayWindowAutoRefresh, openPlayWindow } from '../../store/action'

const injectState = connect(
    (state: State) => ({
        autorefresh: state.playWindow.autorefresh,
    }),
    {
        togglePlayWindowAutoRefresh,
        openPlayWindow,
    }
)

export const PlayButton = injectState(Dumb)
