import { State } from '../reducer/type'
import { Tool } from '../../type'
import { createSelector } from 'reselect'
import { selectCurrentPanel } from './currentPanel'

export const selectCurrentTool = (state: State) =>
    (state.tool.cameraOverwrite && 'camera') || state.tool.current

export const selectIsCameraOverwrite = (state: State) =>
    state.tool.cameraOverwrite

export const selectAvailableTools = createSelector(
    selectCurrentPanel,
    panel => {
        switch (panel) {
            case 'placepainting':
                return [
                    'camera',
                    'tracewall',
                    'rectwall',
                    'erasewall',
                ] as Tool[]
            default:
                return ['camera'] as Tool[]
        }
    }
)
