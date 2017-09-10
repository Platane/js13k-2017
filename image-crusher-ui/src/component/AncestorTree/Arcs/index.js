import { h, Component } from 'preact'
import { request, cancel } from '../../../util/raf'

export class Arcs extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.arcs !== nextProps.arcs
    }

    render() {
        this._timeout = request(this.afterRender)

        return (
            <canvas
                style={{ position: 'absolute', top: 0, left: 0 }}
                width={this.props.width}
                height={this.props.height}
            />
        )
    }

    componentWillUnmount() {
        cancel(this._timeout)
    }

    afterRender = () => {
        const ctx = this.base.getContext('2d')

        const { mx, my, size, arcs } = this.props

        ctx.clearRect(0, 0, 99999, 99999)

        arcs.forEach(({ a, b }) => {
            ctx.beginPath()
            ctx.moveTo(
                mx + a.x * (size + mx) + size * 0.5,
                my + a.y * (size + my) + size * 0.5
            )
            ctx.lineTo(
                mx + b.x * (size + mx) + size * 0.5,
                my + b.y * (size + my) + size * 0.5
            )
            ctx.stroke()
        })
    }
}
