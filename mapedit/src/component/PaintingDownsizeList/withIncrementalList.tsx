import React, { Component } from 'react'

const raf = fn => setTimeout(fn, 60)
const cancelRaf = x => clearTimeout(x)

export const withIncrementalList = C =>
    class WithIncrementalList extends Component {
        state = { k: 0 }

        tic = () => {
            cancelRaf(this._timeout)

            if (this.props.paintings.length > this.state.k)
                this.setState(
                    ({ k }) => ({ k: k + 2 }),
                    () => {
                        if (this.props.paintings.length > this.state.k)
                            this._timeout = raf(this.tic)
                    }
                )
        }

        componentWillReceiveProps() {
            this._timeout = raf(this.tic)
        }

        componentDidMount() {
            this.tic()
        }

        componentWillUnmount() {
            cancelRaf(this._timeout)
        }

        render() {
            return (
                <C
                    {...this.props}
                    paintings={this.props.paintings.slice(0, this.state.k)}
                />
            )
        }
    }
