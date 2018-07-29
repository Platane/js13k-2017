import { connect } from "react-redux"
import { UndoButton as Dumb } from "./Dumb"
import { undo, redo } from "../../store/action"
import { State } from "store/reducer/type"

const injectState = connect(
    (state: State) => ({
        toUndo:
            (state.historyUndoStack[0] && state.historyUndoStack[0].label) ||
            null,

        toRedo:
            (state.historyRedoStack[0] && state.historyRedoStack[0].label) ||
            null,
    }),
    {
        undo,
        redo,
    }
)

export const UndoButton = injectState(Dumb)
