import React from 'react'
import { withCssReset } from '../_abstract/cssReset'
import { Canvas } from '../Canvas'
import { lightGrey } from '../_abstract/palette'
import { SaveButton } from '../SaveButton'
import { PlayButton } from '../PlayButton'
import { ToolBar } from '../ToolBar'
import { Header } from '../Header'
import { RightPanel } from '../RightPanel'
import styled from 'react-emotion'
import { light } from '../_abstract/palette'

const App_ = props => (
    <Container>
        <Header />

        <Bottom>
            <Main>
                <Canvas {...props} style={{ width: '100%', height: '100%' }} />
            </Main>

            <Panel>
                <ToolBarContainer>
                    <ToolBar />
                    <div style={{ marginTop: 'auto' }} />
                    <SaveButton />
                    <PlayButton />
                </ToolBarContainer>

                <RightPanel />
            </Panel>
        </Bottom>
    </Container>
)

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    overflow: hidden;
`

const Main = styled.div`
    position: relative;
    flex-basis: 100px;
    flex-grow: 1;
`

const Panel = styled.div`
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 200px;
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: row;
`

const ToolBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${light};
    border-left: solid 1px ${lightGrey};
    border-right: solid 1px ${lightGrey};
`

export const App = withCssReset(App_)
