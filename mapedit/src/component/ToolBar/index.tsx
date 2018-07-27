import { connect } from "react-redux"
import { ToolBar as Dumb } from "./Dumb"

import { selectCurrentTool } from "../../store/selector/currentTool"

import { setTool, undo, redo } from "../../store/action"

const injectState = connect(
    state => ({
        currentTool: selectCurrentTool(state),

        availableTools: ["camera", "tracewall", "rectwall", "no"],
    }),
    {
        setTool,
        undo,
        redo,
    }
)

export const ToolBar = injectState(Dumb)
