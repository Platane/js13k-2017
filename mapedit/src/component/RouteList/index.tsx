import { connect } from 'react-redux'
import { RouteList as Dumb } from './Dumb'
import { setSign } from '../../store/action'
import { State } from '../../store/reducer/type'
import { selectRoute } from '../../store/selector/route'
import { selectPaintingParam } from '../../store/selector/paintings'

const injectState = connect(
    (state: State) => ({
        route: selectRoute(state),
        param: selectPaintingParam(state),
    }),
    { setSign }
)

export const RouteList = injectState(Dumb)
