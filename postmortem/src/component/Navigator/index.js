import { h, Component } from 'preact'
import { request } from '../..//util/raf'
import { pushPath, getPath } from './api'

export type Props = {
    path: string,
    basePath: string,
    onPathChange: (path: string) => void,
}

export class Navigator extends Component {
    static defaultProps = {
        path: '/',
        basePath: '/',
    }

    update(props: Props) {
        if (
            typeof window !== 'undefined' &&
            getPath(props.basePath)() !== props.path
        )
            pushPath(props.basePath)(props.path)
    }

    onPathChange = () =>
        this.props.onPathChange &&
        this.props.onPathChange(getPath(this.props.basePath)())

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
