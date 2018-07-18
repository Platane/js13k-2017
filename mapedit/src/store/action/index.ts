import { Point, Tool } from "../../type"

export const selectTool = (tool: Tool) => ({
    type: "ui:selectTool",
    tool,
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
    | typeof selectTool
    | typeof startDrag
    | typeof moveDrag
    | typeof endDrag

export type Action = ReturnType<ActionCreator>
