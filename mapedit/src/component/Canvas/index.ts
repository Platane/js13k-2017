import { connect } from "react-redux"
import { Canvas as Dumb } from "./Dumb"

import { selectCamera } from "../../store/selector/camera"
import { selectMuseum } from "../../store/selector/museum"

import { mouseWheel, startDrag, moveDrag, endDrag } from "../../store/action"

const injectState = connect(
    state => ({
        camera: selectCamera(state),

        museum: selectMuseum(state),
    }),
    {
        mouseWheel,
        startDrag,
        moveDrag,
        endDrag,
    }
)

export const Canvas = injectState(Dumb)
