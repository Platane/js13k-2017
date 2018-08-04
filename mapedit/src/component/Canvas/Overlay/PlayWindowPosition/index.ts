import { connect } from 'react-redux'
import { PlayWindowPosition as Dumb } from './Dumb'
import { withEcho } from './withEcho'
import { State } from '../../../../store/reducer/type'

const injectState = connect((state: State) => ({
    playWindowPosition: state.playWindow.position,
    playWindowOrientation: state.playWindow.orientation,
}))

export const PlayWindowPosition = injectState(withEcho(Dumb))
