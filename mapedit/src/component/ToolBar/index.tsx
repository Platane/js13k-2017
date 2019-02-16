import { connect } from 'react-redux'
import { ToolBar as Dumb } from './Dumb'
import {
    selectCurrentTool,
    selectAvailableTools,
} from '../../store/selector/currentTool'
import { setTool } from '../../store/action'
import { State } from '../../store/reducer/type'

const injectState = connect(
    (state: State) => ({
        currentTool: selectCurrentTool(state),
        availableTools: selectAvailableTools(state),
    }),
    {
        setTool,
    }
)

export const ToolBar = injectState(Dumb)
