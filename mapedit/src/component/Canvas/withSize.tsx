import React, { Component } from 'react'

export const withSize = C =>
    class WithSize extends Component {
        state = { width: 0, height: 0 }

        onResize = () => {
            const { width, height } = this.base.getBoundingClientRect()
            this.setState({ width, height })
        }

        componentDidMount() {
            this.onResize()

            window.addEventListener('resize', this.onResize)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.onResize)
        }

        render() {
            return (
                <div
                    style={{
                        overflow: 'hidden',
                        position: 'relative',
                        ...(this.props.style || {}),
                    }}
                >
                    <C {...this.props} {...this.state} />
                </div>
            )
        }
    }
