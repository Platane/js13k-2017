import { h, Component } from 'preact'
import { request } from '../..//util/raf'

export type Props = {
    path: String,
    onPathChange: (path: String) => void,
}

export const pushPath = (path: string) =>
    history.pushState({}, '', window.location.origin + path)

export const getPath = () => window.location.pathname

export class Navigator extends Component {
    static defaultProps = {
        path: '/',
    }

    update(props: Props) {
        if (typeof window !== 'undefined' && getPath() !== props.path)
            pushPath(props.path)
    }

    onPathChange = () =>
        this.props.onPathChange && this.props.onPathChange(getPath())

    componentDidMount() {
        if (typeof window !== 'undefined')
            window.addEventListener('popstate', this.onPathChange)

        this.onPathChange()
        request(() => this.update(this.props))
    }

    componentWillReceiveProps = (nextProps: Props) => this.update(nextProps)

    componentWillUnmount() {
        if (typeof window !== 'undefined')
            window.removeEventListener('popstate', this.onPathChange)
    }

    render() {
        return null
    }
}
