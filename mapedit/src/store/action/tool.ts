import { Tool } from '../../type'

export const setTool = (tool: Tool) => ({
    type: 'ui:tool:set',
    tool,
})

export const cameraOverwriteOn = () => ({
    type: 'ui:tool:cameraoverwrite:on',
})

export const cameraOverwriteOff = () => ({
    type: 'ui:tool:cameraoverwrite:off',
})

export type Action =
    | {
          type: 'ui:tool:cameraoverwrite:on'
      }
    | {
          type: 'ui:tool:cameraoverwrite:off'
      }
    | {
          type: 'ui:tool:set'
          tool: Tool
      }
