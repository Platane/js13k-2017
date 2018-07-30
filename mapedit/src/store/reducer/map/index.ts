import { composeReducer } from '../../../util/redux'
import { reduce as reduceCameraPan } from './cameraPan'
import { reduce as reduceCameraZoom } from './cameraZoom'
import { reduce as reduceTraceWall } from './traceWall'
import { reduce as reducePlacePainting } from './placePainting'
import { reduce as reduceMoveStartingPoint } from './moveStartingPoint'
import { reduce as reduceRectWall } from './rectWall'
import { enhance as enhanceHistory } from './history'
import { enhance as enhanceHistoryStable } from './historyStable'
export { State } from '../type'

export const reduce = enhanceHistoryStable(
    enhanceHistory(
        composeReducer(
            reduceCameraPan,
            reduceCameraZoom,
            reduceTraceWall,
            reduceRectWall,
            reducePlacePainting,
            reduceMoveStartingPoint
        )
    )
)
