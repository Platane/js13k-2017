import { connect } from 'react-redux'
import { ToolBar as Dumb } from './Dumb'
import { selectCurrentTool } from '../../store/selector/currentTool'
import { setTool } from '../../store/action'
import { Tool } from '../../type'
import { State } from '../../store/reducer/type'

const availableTools: Tool[] = ['camera', 'tracewall', 'rectwall', 'erasewall']

const injectState = connect(
    (state: State) => ({
        currentTool: selectCurrentTool(state),

        availableTools,
    }),
    {
        setTool,
    }
)

export const ToolBar = injectState(Dumb)
