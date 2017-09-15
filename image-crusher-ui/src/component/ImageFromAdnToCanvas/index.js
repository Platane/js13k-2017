import { h, Component } from 'preact'
import { rImageToCanvas } from '../../util/rImage/toCanvas'
import { adnEqual } from '../../util/ancestorTree/merge'
import { request, cancel } from '../../util/raf'

export class Image extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.adn !== nextProps.adn &&
            !adnEqual(this.props.adn, nextProps.adn)
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
        const s = this.props.size

        this.base.width = this.base.height = s

        const ctx = this.base.getContext('2d')

        ctx.save()

        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, s, s)

        this.props.adn.forEach(({ x, y, r, color, opacity }) => {
            ctx.beginPath()
            ctx.fillStyle = 'rgb(' + this.props.param.COLOR_PALETTE[color] + ')'
            ctx.globalAlpha = this.props.param.OPACITY_AVAILABLE[opacity]

            ctx.arc(
                x / 64 * s,
                y / 64 * s,
                this.props.param.RADIUS_AVAILABLE[r] / 64 * s,
                0,
                Math.PI * 2
            )
            ctx.fill()
        })

        ctx.restore()
    }
}
