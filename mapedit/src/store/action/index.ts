import { Point, Tool } from "../../type"

export const setTool = (tool: Tool) => ({
    type: "ui:tool:set",
    tool,
})

export const mouseWheel = (delta: Point, pointer: Point) => ({
    type: "ui:wheel",
    delta,
    pointer,
})

export const startDrag = (pointer: Point) => ({
    type: "ui:drag:start",
    pointer,
})

export const moveDrag = (pointer: Point) => ({
    type: "ui:drag:move",
    pointer,
})

export const endDrag = (pointer: Point) => ({
    type: "ui:drag:end",
    pointer,
})

export const undo = () => ({
    type: "undo",
})

export const redo = () => ({
    type: "redo",
})

export type Action =
    | {
          type: "ui:tool:set"
          tool: Tool
      }
    | {
          type: "ui:wheel"
          delta: 1 | -1
          pointer: Point
      }
    | {
          type: "ui:drag:start"
          pointer: Point
      }
    | {
          type: "ui:drag:move"
          pointer: Point
      }
    | {
          type: "ui:drag:end"
          pointer: Point
      }
    | {
          type: "undo"
      }
    | {
          type: "redo"
      }

//
//
// type ActionCreator =
//     | typeof setTool
//     | typeof mouseWheel
//     | typeof startDrag
//     | typeof moveDrag
//     | typeof endDrag
//     | typeof undo
//     | typeof redo
//
// export type Action = ReturnType<ActionCreator>
