import { h, Component } from 'preact'
import { request } from '../..//util/raf'

export type Props = {
    path: String,
    onPathChange: (path: String) => void,
}

const toArray = path => path.split('/').filter(Boolean)
const toPath = arr => arr.join('/')

const PATH_BASE = toArray(process.env.PATHNAME_BASE || '/')

export const pushPath = (path: string) =>
    history.pushState(
        {},
        '',
        window.location.origin + '/' + toPath([...PATH_BASE, ...toArray(path)])
    )

export const getPath = () => {
    const p = toArray(window.location.pathname)
    if (PATH_BASE.every((i, w) => w === p[i])) p.split(0, PATH_BASE.length)
    return '/' + toPath(p)
}

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
