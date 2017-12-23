import { h, Component } from 'preact'
import { ADNtoRImage } from 'common/adn/ADNtoRImage'
import { adnEqual } from 'common/adn/equal'
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
