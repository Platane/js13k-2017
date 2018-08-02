import { State } from '../reducer/type'

export const selectIsDraging = (state: State) =>
    !!(
        state.dragCamera ||
        state.dragPainting ||
        state.dragRectWall ||
        state.dragEraseWall ||
        state.dragTraceWall ||
        state.dragStartingPoint
    )
