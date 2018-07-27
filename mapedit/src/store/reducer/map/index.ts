import { composeReducer } from "../../../util/redux"
import { reduce as reduceCameraPan } from "./cameraPan"
import { reduce as reduceCameraZoom } from "./cameraZoom"
import { reduce as reduceTraceWall } from "./traceWall"
import { reduce as reduceRectWall } from "./rectWall"
export { State } from "../index"

export const reduce = composeReducer(
    reduceCameraPan,
    reduceCameraZoom,
    reduceTraceWall,
    reduceRectWall
)
