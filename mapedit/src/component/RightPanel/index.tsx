import { connect } from 'react-redux'
import { RightPanel as Dumb } from './Dumb'
import {
    selectCurrentPanel,
    selectAvailablePanels,
} from '../../store/selector/currentPanel'
import { setPanel } from '../../store/action'
import { State } from '../../store/reducer/type'

const injectState = connect(
    (state: State) => ({
        currentPanel: selectCurrentPanel(state),
        availablePanels: selectAvailablePanels(state),
    }),
    {
        setPanel,
    }
)

export const RightPanel = injectState(Dumb)
