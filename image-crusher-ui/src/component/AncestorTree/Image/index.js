import { h, Component } from 'preact'
import { rImageToCanvas } from '../../../util/rImage/toCanvas'
import { getRImage } from '../../../genetic/ADNtoRImage'
import { adnEqual } from '../../../util/ancestorTree/merge'
import { request, cancel } from '../../../util/raf'

export class Image extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.adn.length == 0 ||
            (this.props.adn !== nextProps.adn &&
                !adnEqual(this.props.adn, nextProps.adn))
        )
    }

    render() {
        this._timeout = request(this.afterRender)
        return (
            <canvas
                style={{ width: this.props.size, height: this.props.size }}
            />
        )
    }

    componentWillUnmount() {
        cancel(this._timeout)
    }

    afterRender = () => {
        rImageToCanvas(getRImage(this.props.param, this.props.adn), this.base)
    }
}
