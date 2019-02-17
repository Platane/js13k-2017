import React from 'react'

import styled from 'react-emotion'
import { light, lightGrey } from '../_abstract/palette'
import { PanelTabs } from './PanelTabs'
import { Hint } from './Hint'
import { RouteList } from '../RouteList'
import { PaintingList } from '../PaintingList'
import { PaintingDownsizeList } from '../PaintingDownsizeList'

export const RightPanel = ({ currentPanel, ...props }) => (
    <Container>
        <Header>
            <PanelTabs {...props} currentPanel={currentPanel} />
        </Header>

        <Main>
            <Hint currentPanel={currentPanel} />

            <Content>
                {currentPanel === 'routebuilder' && <RouteList />}
                {currentPanel === 'placepainting' && <PaintingList />}
                {currentPanel === 'downsizePainting' && (
                    <PaintingDownsizeList />
                )}
            </Content>
        </Main>
    </Container>
)

const scrollGutter = 28
const breaks = [2, 3, 4].map(x => x * (64 + 8) + scrollGutter)

const Container = styled.div`
    background-color: ${light};

    display: flex;
    flex-direction: column;
    width: ${breaks[0]}px;
    height: 100%;
    position: relative;

    @media (min-width: 1200px) {
        width: ${breaks[1]}px;
    }
    @media (min-width: 1400px) {
        width: ${breaks[2]}px;
    }
`
const Main = styled.div`
    padding-top: 10px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    height: fit-content;
    min-height: 0;
`
const Content = styled.div`
    position: relative;
    flex: 1 1 auto;
    height: fit-content;
    min-height: 0;
`
const Header = styled.div`
    border-bottom: solid 1px ${lightGrey};
`
