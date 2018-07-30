import React from 'react'
import { withCssReset } from '../_abstract/cssReset'
import { Canvas } from '../Canvas'
import { RouteBuilder } from '../RouteBuilder'
import { PaintingList } from '../PaintingList'
import { SaveButton } from '../SaveButton'
import { PlayButton } from '../PlayButton'
import { ToolBar } from '../ToolBar'
import { Header } from '../Header'
import styled from 'react-emotion'

const App_ = props => (
    <Container>
        <Header />

        <Bottom>
            <Main>
                <Canvas {...props} width={600} height={400} />
            </Main>

            <Panel>
                <ToolBarContainer>
                    <ToolBar />
                    <div style={{ margin: '60px' }} />
                    <SaveButton />
                    <PlayButton />
                </ToolBarContainer>

                <PaintingListContainer>
                    <PaintingList />
                </PaintingListContainer>
            </Panel>
        </Bottom>
    </Container>
)
// {/* <RouteBuilderContainer>
//     <RouteBuilder />
// </RouteBuilderContainer> */}

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100;
    display: flex;
    flex-direction: column;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
`

const Main = styled.div`
    flex-basis: 100px;
    flex-grow: 1;
`

const Panel = styled.div`
    flex-basis: 200px;
    flex-grow: 1;
    width: 50%;
    min-width: 200px;
    max-width: 480px;

    display: flex;
    flex-direction: row;
`

const ToolBarContainer = styled.div`
    z-index: 2;
    bottom: 0;
    top: 0;
    right: 0px;
`
const PaintingListContainer = styled.div`
    overflow: hidden;
    height: 100%;
    margin-left: auto;
`
const RouteBuilderContainer = styled.div`
    overflow: hidden;
    height: 100%;
    margin-left: auto;
`

export const App = withCssReset(App_)
