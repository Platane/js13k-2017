import { h, Component } from 'preact'
import styled from 'styled-components'

import cssReset from '../_abstract/cssReset'

import { Head } from '../Head'
import { Navigator } from '../Navigator'
import { Article } from '../Article'
import injectState from './hoc.state'

export const App = ({ content, path, onPathChange }) =>
    cssReset() || (
        <Container>
            <Head />
            <Navigator path={path} onPathChange={onPathChange} />
            <Body>
                <Content>
                    <Article content={content} onPathChange={onPathChange} />
                </Content>
            </Body>
        </Container>
    )

const Container = styled.div``

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f8f8f8;
`

const Content = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
    padding: 40px;
    background-color: #fff;
`

export const StateFulApp = injectState(App)
