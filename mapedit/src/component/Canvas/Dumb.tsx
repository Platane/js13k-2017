import React, { Component } from "react"
import styled from "react-emotion"
import { Grid } from "./Grid"
import { fromScreen } from "../../service/camera"

const getPointer = (event): Point => ({
    x: event.clientX,
    y: event.clientY,
})

export class Canvas extends Component {
    state = { dragging: false }

    getPointer = event => fromScreen(this.props.camera)(getPointer(event))

    down = event => {
        const pointer = this.getPointer(event)
        this.setState({ dragging: true })
        this.props.startDrag(pointer)
    }

    move = event => {
        if (!this.state.dragging) return

        const pointer = this.getPointer(event)
        this.props.moveDrag(pointer)
    }

    up = event => {
        if (!this.state.dragging) return

        const pointer = this.getPointer(event)
        this.setState({ dragging: false })
        this.props.endDrag(pointer)
    }

    componentDidMount() {
        document.body.addEventListener("mouseup", this.up)
        document.body.addEventListener("mousemove", this.move)
    }

    render() {
        return (
            <div onMouseDown={this.down} style={{ position: "relative" }}>
                <Grid {...this.props} />
            </div>
        )
    }
}
