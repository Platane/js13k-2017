import { composeReducer } from '../../../util/redux'
import { reduce as reduceCameraPan } from './cameraPan'
import { reduce as reduceCameraZoom } from './cameraZoom'
import { reduce as reduceTraceWall } from './traceWall'
import { reduce as reducePlacePainting } from './placePainting'
import { reduce as reduceMoveStartingPoint } from './moveStartingPoint'
import { reduce as reduceRectWall } from './rectWall'
import { reduce as reduceEraseWall } from './eraseWall'
import { reduce as reduceConsistency } from './consistency'
import { reduce as reduceSetPaintingDownsize } from './setPaintingDownsize'
import { enhance as enhanceHistory } from './history'
import { enhance as enhanceHistoryStable } from './historyStable'
export { State } from '../type'

export const reduce = enhanceHistoryStable(
    enhanceHistory(
        composeReducer(
            // this one should be the last one /!\
            reduceConsistency,

            reduceCameraPan,
            reduceCameraZoom,
            reduceTraceWall,
            reduceEraseWall,
            reduceRectWall,
            reducePlacePainting,
            reduceMoveStartingPoint,
            reduceSetPaintingDownsize
        )
    )
)
