import React from 'react'

import styled from 'react-emotion'
import { light, lightGrey } from '../_abstract/palette'
import { PanelTabs } from './PanelTabs'
import { RouteList } from '../RouteList'
import { PaintingList } from '../PaintingList'
import { PaintingDownsizeList } from '../PaintingDownsizeList'

export const RightPanel = ({ currentPanel, ...props }) => (
    <Container>
        <Header>
            <PanelTabs {...props} currentPanel={currentPanel} />
        </Header>

        {currentPanel === 'routebuilder' && <RouteList />}
        {currentPanel === 'placepainting' && <PaintingList />}
        {currentPanel === 'downsizePainting' && <PaintingDownsizeList />}
    </Container>
)

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${light};
    border-left: solid 1px ${lightGrey};
`
const Header = styled.div`
    border-bottom: solid 1px ${lightGrey};
`

const RightPanelContainer = styled.div`
    overflow: hidden;
    height: 100%;
    background-color: ${light};
`
