import { connect } from 'react-redux'
import { Canvas as Dumb } from './Dumb'

import { selectCamera } from '../../store/selector/camera'
import { selectMuseum } from '../../store/selector/museum'
import {
    selectTargetPaintingsById,
    selectPaintingParam,
} from '../../store/selector/paintings'

import {
    mouseWheel,
    startDrag,
    moveDrag,
    endDrag,
    startDragPainting,
    startDragStartingPoint,
} from '../../store/action'
import { State } from '../../store/reducer/type'

const injectState = connect(
    (state: State) => ({
        camera: selectCamera(state),

        museum: selectMuseum(state),

        dragging: !!(state.dragPainting || state.dragStartingPoint),

        paintingsById: selectTargetPaintingsById(state),

        param: selectPaintingParam(state),

        dragEraseWall: state.dragEraseWall,
    }),
    {
        startDragStartingPoint,
        startDragPainting,
        mouseWheel,
        startDrag,
        moveDrag,
        endDrag,
    }
)

export const Canvas = injectState(Dumb)
