import { Painting, Museum } from '../../type'
export * from './playWindow'
export * from './canvas'
export * from './tool'
export * from './undo'
export * from './panel'
export * from './route'

import { Action as ActionPlayWindow } from './playWindow'
import { Action as ActionCanvas } from './canvas'
import { Action as ActionTool } from './tool'
import { Action as ActionPanel } from './panel'
import { Action as ActionUndo } from './undo'
import { Action as ActionRoute } from './route'

export const readFromLocalStorage = (museum: Museum) => ({
    type: 'localstorage:read',
    museum,
})

export const hydratePaintings = paintings => ({
    type: 'http:hydrate:paintings',
    paintings,
})

export const setPaintingDownsize = (
    paintingId: string,
    downsizeId: string
) => ({
    type: 'paintingdownsize:set',
    downsizeId,
    paintingId,
})

export type Action =
    | ActionPlayWindow
    | ActionCanvas
    | ActionTool
    | ActionUndo
    | ActionPanel
    | ActionRoute
    | {
          type: 'paintingdownsize:set'
          downsizeId
          paintingId
      }
    | {
          type: 'localstorage:read'
          museum: Museum
      }
    | {
          type: 'http:hydrate:paintings'
          paintings: Painting[]
      }
