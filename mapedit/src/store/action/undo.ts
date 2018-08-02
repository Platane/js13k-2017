export const undo = () => ({
    type: 'undo',
})

export const redo = () => ({
    type: 'redo',
})

export type Action =
    | {
          type: 'undo'
      }
    | {
          type: 'redo'
      }
