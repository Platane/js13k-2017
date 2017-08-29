import { h, Component } from 'preact'
import { rImageToCanvas } from '../../../util/rImage/toCanvas'
import { getRImage } from '../../../genetic/ADNtoRImage'

export class Image extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.adn !== nextProps.adn
    }

    render() {
        return <canvas />
    }

    componentDidUpdate() {
        rImageToCanvas(getRImage(this.props.adn), this.base)
    }
}
