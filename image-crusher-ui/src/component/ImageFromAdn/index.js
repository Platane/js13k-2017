import { h, Component } from 'preact'
import { ADNtoRImage } from '../../genetic/ADNtoRImage'
import { adnEqual } from '../../util/ancestorTree/merge'
import { RImage } from '../RImage'

export class Image extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.adn.length == 0 ||
            (this.props.adn !== nextProps.adn &&
                !adnEqual(this.props.adn, nextProps.adn))
        )
    }

    render() {
        return (
            <RImage
                {...this.props}
                rImage={ADNtoRImage(this.props.param, this.props.adn)}
            />
        )
    }
}
