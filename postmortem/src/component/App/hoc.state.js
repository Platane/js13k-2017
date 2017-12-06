import { h, Component } from 'preact'

export default C =>
    class Stateful extends Component {
        state = { path: '/' }

        constructor(props) {
            super(props)
            this.state = { path: this.props.path || '/' }
        }

        setPath = path =>
            this.setState({ path: (this.props.contents[path] && path) || '/' })

        render(props, state) {
            return (
                <C
                    {...props}
                    {...state}
                    onPathChange={this.setPath}
                    content={props.contents[state.path]}
                />
            )
        }
    }
