import { Painting, Museum } from '../../type'
export * from './playWindow'
export * from './canvas'
export * from './tool'

import { Action as ActionPlayWindow } from './playWindow'
import { Action as ActionCanvas } from './canvas'
import { Action as ActionTool } from './tool'

export const readFromLocalStorage = (museum: Museum) => ({
    type: 'localstorage:read',
    museum,
})

export const undo = () => ({
    type: 'undo',
})

export const redo = () => ({
    type: 'redo',
})

export const hydratePaintings = paintings => ({
    type: 'http:hydrate:paintings',
    paintings,
})

export type Action =
    | ActionPlayWindow
    | ActionCanvas
    | ActionTool
    | {
          type: 'localstorage:read'
          museum: Museum
      }
    | {
          type: 'http:hydrate:paintings'
          paintings: Painting[]
      }
    | {
          type: 'undo'
      }
    | {
          type: 'redo'
      }
