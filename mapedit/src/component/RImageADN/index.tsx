import React, { Component } from 'react'
import { ADNtoRImage } from '../../lib/common/adn/ADNtoRImage'
import { RImage } from '../RImage'

export class RImageADN extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.adn !== nextProps.adn ||
            this.props.param !== nextProps.param
        )
    }

    render() {
        return (
            <RImage
                {...this.props}
                rImage={ADNtoRImage(this.props.param, this.props.adn)}
            />
        )
    }
}
