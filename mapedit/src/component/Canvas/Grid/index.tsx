import React, { Component } from "react"
import { draw } from "./draw"

export class Grid extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.museum !== this.props.museum ||
            nextProps.camera !== this.props.camera ||
            nextProps.height !== this.props.height ||
            nextProps.width !== this.props.width
        )
    }

    render() {
        if (this.base) {
            this.base.width = this.props.width
            this.base.height = this.props.height

            const ctx = this.base.getContext("2d")

            draw(ctx, this.props.camera, this.props.museum)
        } else {
            requestAnimationFrame(() => this.forceUpdate())
        }

        return <canvas style={{ position: "absolute", top: 0, left: 0 }} />
    }
}
