import { connect } from 'react-redux'
import { Canvas as Dumb } from './Dumb'
import { withSize } from './withSize'
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
import { selectIsDraging } from '../../store/selector/drag'

const injectState = connect(
    (state: State) => ({
        camera: selectCamera(state),

        museum: selectMuseum(state),

        dragging: selectIsDraging(state),

        paintingsById: selectTargetPaintingsById(state),

        param: selectPaintingParam(state),

        dragEraseWall: state.dragEraseWall,

        playWindowPosition: state.playWindow.position,
        playWindowOrientation: state.playWindow.orientation,
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

export const Canvas = injectState(withSize(Dumb))
