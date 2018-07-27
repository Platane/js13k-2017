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

type ActionCreator =
    | typeof setTool
    | typeof startDrag
    | typeof moveDrag
    | typeof endDrag

// export type Action = ReturnType<ActionCreator>

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
