import { h, Component } from 'preact'
import { rImageToCanvas } from '../../../util/rImage/toCanvas'
import { getRImage } from '../../../genetic/ADNtoRImage'

export class Image extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.adn.length == 0 || this.props.adn !== nextProps.adn
    }

    render() {
        return (
            <canvas
                style={{ width: this.props.size, height: this.props.size }}
            />
        )
    }

    componentDidUpdate() {
        rImageToCanvas(getRImage(this.props.adn), this.base)
    }
}
