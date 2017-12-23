import { h, Component } from 'preact'
import { rImageToCanvas } from '../../util/rImage/toCanvas'
import { adnEqual } from 'common/adn/equal'
import { request, cancel } from 'common/util/raf'

export class RImage extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.rImage !== nextProps.rImage
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
        rImageToCanvas(this.props.param.SIZE, this.props.rImage, this.base)
    }
}
