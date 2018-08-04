import React, { Component } from 'react'

export const withEcho = C =>
    class WithEcho extends Component {
        state = { path: [] }

        componentWillReceiveProps(nextProps) {
            //
            if (
                nextProps.playWindowPosition &&
                nextProps.playWindowPosition !== this.props.playWindowPosition
            )
                this.setState(({ path }) => ({
                    path: [nextProps.playWindowPosition, ...path].slice(0, 32),
                }))
        }

        render() {
            return <C {...this.props} {...this.state} />
        }
    }

// path={[{ x, y }, { x: x + 2, y }]}
