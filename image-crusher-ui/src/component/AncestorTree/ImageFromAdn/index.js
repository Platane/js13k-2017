import { h, Component } from 'preact'
import { getRImage } from '../../../genetic/ADNtoRImage'
import { adnEqual } from '../../../util/ancestorTree/merge'
import { Image as Image_ } from '../../Image'

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
            <Image_
                {...this.props}
                rImage={getRImage(this.props.param, this.props.adn)}
            />
        )
    }
}
