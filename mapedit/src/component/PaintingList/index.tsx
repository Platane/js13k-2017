import { connect } from "react-redux"
import { PaintingList as Dumb } from "./Dumb"
import { startDragPainting } from "../../store/action"

const injectState = connect(
    state => ({
        paintings: state.paintings || [],
    }),
    { startDragPainting }
)

export const PaintingList = injectState(Dumb)
