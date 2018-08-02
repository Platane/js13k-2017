import { State } from '../reducer/type'

export const selectCurrentTool = (state: State) =>
    (state.tool.cameraOverwrite && 'camera') || state.tool.current

export const selectIsCameraOverwrite = (state: State) =>
    state.tool.cameraOverwrite
