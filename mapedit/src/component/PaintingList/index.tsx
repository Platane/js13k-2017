import { connect } from 'react-redux'
import { PaintingList as Dumb } from './Dumb'
import { startDragPainting } from '../../store/action'

const injectState = connect(
    state => ({
        waiting: !state.paintings,

        paintings: state.paintings || [],
    }),
    { startDragPainting }
)

export const PaintingList = injectState(Dumb)
