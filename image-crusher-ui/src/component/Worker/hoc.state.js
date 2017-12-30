import { h, Component } from 'preact'
import { create } from '../../worker'

export default C =>
    class WorkerState extends Component {
        _workers: null

        state = { history: [], workers: {}, running: false }

        onChange = x => this.setState(x)

        start = () => {
            if (this._workers) return

            this._workers = create()
            this._workers.onchange = this.onChange
            this.setState({ running: true })
        }

        stop = () => {
            if (!this._workers) return

            this._workers.terminate()
            this._workers = null
            this.setState({ history: [], workers: {}, running: false })
        }

        render() {
            return (
                <C
                    {...this.props}
                    {...this.state}
                    start={this.start}
                    stop={this.stop}
                />
            )
        }
    }
