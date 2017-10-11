import { h, Component } from 'preact'
import { Transition } from 'react-propstransition'
import { imageLoadedStore } from './imageStore'
import styled, { keyframes } from 'styled-components'
import { request, cancel } from '../../util/raf'

export type Props = {
    alt?: string,
    image?: ImageBundle,
    width?: number,
    height?: number,
}

export type State = {
    loaded: boolean,
    url: ?string,
    blurUrl: ?string,
}

export class Image extends Component {
    static defaultProps = {
        width: 800,
        height: 600,
    }

    state = { loaded: false, url: null, blurUrl: null }

    onLoad = () => {
        imageLoadedStore.flagAsLoaded(this.state.url)
        this.setState({ loaded: true })
    }

    prepareState(props) {
        props = props || this.props

        const blurUrl =
            (props.image && imageLoadedStore.getBlur(props.image)) || null

        const url =
            (props.image &&
                imageLoadedStore.getBestResolution(
                    props.image,
                    props.width,
                    props.height
                )) ||
            null

        const loaded = imageLoadedStore.isImageLoaded(url)

        return { blurUrl, url, loaded }
    }

    constructor(props: Props) {
        super(props)
        this.state = this.prepareState(this.props)
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return (
            this.props.alt != nextProps.alt ||
            this.state.url != nextState.url ||
            this.state.loaded != nextState.loaded
        )
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState(this.prepareState(nextProps))
    }

    componentDidRender = () => {
        const image =
            this.base && this.base.querySelector('[data-anchor="loader"]')

        if (image) {
            // test if image is loaded
            if (image.naturalWidth) {
                this.onLoad()
            } else {
                image.removeEventListener('load', this.onLoad)
                image.addEventListener('load', this.onLoad)
            }
        }
    }

    componentWillUnmount() {
        cancel(this._rafKiller)
    }

    render({ alt, ...props }, { url, blurUrl, loaded }) {
        cancel(this._rafKiller)

        if (!loaded) this._rafKiller = request(this.componentDidRender)

        return (
            <Body {...props}>
                {url && (
                    <HiddenImageLoader
                        data-anchor="loader"
                        alt={alt}
                        src={url}
                    />
                )}
                <Transition toTransition={loaded ? url : blurUrl} delay={600}>
                    {({ next, previous, transition }) => (
                        <Background src={next}>
                            {previous &&
                                transition && (
                                    <Background src={previous} fadeoff />
                                )}
                        </Background>
                    )}
                </Transition>
            </Body>
        )
    }
}

const HiddenImageLoader = styled.img`
    width: 1px;
    height: 1px;
    opacity: 0.1;
`

const Body = styled.div`position: relative;`

const fadeoff = keyframes`
    0%{ opacity: 1;}
    100%{ opacity: 0;}
`

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.src});
    animation-duration: 600ms;
    animation-timing-function: ease;
    animation-name: ${props => (props.fadeoff ? fadeoff : 'none')};
    opacity: ${props => (props.fadeoff ? 0 : 1)};
`
