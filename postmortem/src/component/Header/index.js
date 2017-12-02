import { h, render, Component } from 'preact'

import { Image as Image_ } from '../Image'
import { Link } from '../Link'

import styled from 'styled-components'
import image_src from '../../asset/image/header.jpg'

export const Header = () => (
    <Body>
        <Ratio />
        <Image src={image_src} alt="header" />
    </Body>
)

const Body = styled.div`
    position: relative;
`
const Ratio = styled.div`
    margin-top: 30%;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
`
const Image = styled(Image_)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
