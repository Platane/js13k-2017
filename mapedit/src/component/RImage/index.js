import { rImageToCanvas } from "../../lib/common/rImage/toCanvas"
import React, { Component } from "react"

export class RImage extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.rImage !== nextProps.rImage ||
            this.props.param.SIZE !== nextProps.param.SIZE ||
            this.props.size !== nextProps.size
        )
    }

    render() {
        if (this.base) {
            rImageToCanvas(this.props.param.SIZE, this.props.rImage, this.base)
        } else {
            requestAnimationFrame(() => this.forceUpdate())
        }

        return (
            <canvas
                style={{ width: this.props.size, height: this.props.size }}
            />
        )
    }
}
