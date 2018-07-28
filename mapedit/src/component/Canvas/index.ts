import { connect } from "react-redux"
import { Canvas as Dumb } from "./Dumb"

import { selectCamera } from "../../store/selector/camera"
import { selectMuseum } from "../../store/selector/museum"
import {
    selectTargetPaintingsById,
    selectPaintingParam,
} from "../../store/selector/paintings"

import { mouseWheel, startDrag, moveDrag, endDrag } from "../../store/action"

const injectState = connect(
    state => ({
        camera: selectCamera(state),

        museum: selectMuseum(state),

        dragging: !!state.dragPainting,

        paintingsById: selectTargetPaintingsById(state),

        param: selectPaintingParam(state),
    }),
    {
        mouseWheel,
        startDrag,
        moveDrag,
        endDrag,
    }
)

export const Canvas = injectState(Dumb)
