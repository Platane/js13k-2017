import { h, render, Component } from 'preact'

import { Image as Image_ } from '../Image'
import { Link } from '../Link'

import styled from 'styled-components'
import image_src from '../../asset/image/header.jpg'

export const Header = () => (
    <Body>
        <Link href="/">
            <Ratio />
            <ImageW>
                <Image src={image_src} alt="article header" />
            </ImageW>
            <Mask />
            <Center>
                <Title>Vernissage!</Title>
                <SubTitle>js13k game post-mortem</SubTitle>
            </Center>
        </Link>
    </Body>
)

const Body = styled.div`
    position: relative;
    width: 100%;
`

const Mask = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6) 30%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0) 80%
    );
`
const Center = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.span`
    margin-top: 20%;
    color: #fff;
    font-family: helvetica, sans-serif;
    font-weight: bold;
    font-size: 60px;
    letter-spacing: 3px;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
`
const SubTitle = styled.span`
    margin-top: 10px;
    color: #fff;
    font-family: helvetica, sans-serif;
    font-size: 30px;
    letter-spacing: 2px;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    text-align: center;
`
const Ratio = styled.div`
    margin-top: 30%;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
`
const ImageW = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
const Image = styled(Image_)`
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    object-position: center;
`
