import { connect } from 'react-redux'
import { SaveButton as Dumb } from './Dumb'
import { selectMuseumAsBinary } from '../../store/selector/binary'
import { State } from '../../store/reducer/type'

const injectState = connect((state: State) => ({
    museumAsBinary: selectMuseumAsBinary(state),
}))

export const SaveButton = injectState(Dumb)
