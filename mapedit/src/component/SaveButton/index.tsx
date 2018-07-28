import { connect } from 'react-redux'
import { SaveButton as Dumb } from './Dumb'
import * as PARAM from '../../lib/common/param'
import { selectMuseum } from '../../store/selector/museum'

const injectState = connect(state => ({
    museum: selectMuseum(state),
    paintings: state.paintings || [],
    param: PARAM,
}))

export const SaveButton = injectState(Dumb)
