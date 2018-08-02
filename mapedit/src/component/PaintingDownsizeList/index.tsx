import { connect } from 'react-redux'
import { PaintingDownsizeList as Dumb } from './Dumb'
import { setPaintingDownsize } from '../../store/action'
import { State } from '../../store/reducer/type'
import {
    selectBestPaintingsById,
    selectTargetPaintingsById,
    selectPaintingParam,
} from '../../store/selector/paintings'
import { withIncrementalList } from './withIncrementalList'
import { selectStableUniquePaintings } from '../../store/selector/museum'

const injectState = connect(
    (state: State) => ({
        paintings: selectStableUniquePaintings(state),

        targetPaintingsById: selectTargetPaintingsById(state),

        bestPaintingsById: selectBestPaintingsById(state),

        param: selectPaintingParam(state),
    }),
    { setPaintingDownsize }
)

export const PaintingDownsizeList = injectState(withIncrementalList(Dumb))
