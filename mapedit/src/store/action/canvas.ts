import { Point } from '../../type'

export const mouseWheel = (delta: Point, pointer: Point) => ({
    type: 'ui:wheel',
    delta,
    pointer,
})

export const startDragPainting = (paintingId: string, existingId?: string) => ({
    type: 'ui:dragpainting:start',
    paintingId,
    existingId,
    id: Math.random()
        .toString(16)
        .slice(2, 10),
})

export const startDragStartingPoint = () => ({
    type: 'ui:dragstartingpoint:start',
})

export const startDrag = (pointer: Point) => ({
    type: 'ui:drag:start',
    pointer,
})

export const moveDrag = (pointer: Point) => ({
    type: 'ui:drag:move',
    pointer,
})

export const endDrag = (pointer: Point) => ({
    type: 'ui:drag:end',
    pointer,
})

export type Action =
    | {
          type: 'ui:wheel'
          delta: 1 | -1
          pointer: Point
      }
    | {
          type: 'ui:dragstartingpoint:start'
      }
    | {
          type: 'ui:drag:start'
          pointer: Point
      }
    | {
          type: 'ui:dragpainting:start'
          paintingId: string
          existingId: string
          id: string
      }
    | {
          type: 'ui:drag:move'
          pointer: Point
      }
    | {
          type: 'ui:drag:end'
          pointer: Point
      }
