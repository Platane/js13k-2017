import React, { Component } from "react"
import { Grid } from "./Grid"
import { Overlay } from "./Overlay"
import { fromScreen } from "../../service/camera"

const getPointer = (top, event): Point => ({
    x: event.clientX,
    y: event.clientY - top,
})

export class Canvas extends Component {
    state = { dragging: false, top: 0 }

    getPointer = event =>
        fromScreen(this.props.camera)(getPointer(this.state.top, event))

    down = event => {
        const pointer = this.getPointer(event)
        this.props.startDrag(pointer)
        this.setState({ dragging: true }, () => this.move(event))
    }

    move = event => {
        if (!this.state.dragging && !this.props.dragging) return

        const pointer = this.getPointer(event)
        this.props.moveDrag(pointer)
    }

    up = event => {
        if (!this.state.dragging && !this.props.dragging) return

        const pointer = this.getPointer(event)
        this.setState({ dragging: false })
        this.props.endDrag(pointer)
    }

    dragover = event => {
        if (!this.props.dragging) return

        event.preventDefault()
    }

    wheel = event => {
        event.preventDefault()
        const pointer = this.getPointer(event)
        this.props.mouseWheel(event.deltaY > 0 ? 1 : -1, pointer)
    }

    componentDidMount() {
        document.body.addEventListener("drop", this.up)
        document.body.addEventListener("mouseup", this.up)
        document.body.addEventListener("mousemove", this.move)
        document.body.addEventListener("drag", this.move)
        document.body.addEventListener("dragover", this.dragover)

        const { top } = this.base.getBoundingClientRect()

        this.setState({ top })
    }

    render() {
        return (
            <div
                onMouseDown={this.down}
                onWheel={this.wheel}
                style={{
                    position: "relative",
                    width: this.props.width,
                    height: this.props.height,
                }}
            >
                <Grid {...this.props} />
                <Overlay {...this.props} />
            </div>
        )
    }
}
