import React from 'react'
import styled from 'react-emotion'
import { light, lightGrey, black, grey } from '../_abstract/palette'
import { Panel } from '../../type'

const panelLabel: { [p in Panel]: string } = {
    placepainting: 'Scene',
    downsizePainting: 'Images',
    routebuilder: 'Route',
    wallbuilder: 'w',
}

const m = {}
const createClickHandler = (setPanel, panel) =>
    (m[panel] = m[panel] || (() => setPanel(panel)))

export const PanelTabs = ({ availablePanels, currentPanel, setPanel }) => (
    <Container>
        {availablePanels.map(panel => (
            <Tab
                id={panel}
                onClick={createClickHandler(setPanel, panel)}
                selected={currentPanel === panel}
            >
                <TabInside>{panelLabel[panel]}</TabInside>
            </Tab>
        ))}
    </Container>
)

const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
`

const TabInside = styled.div`
    padding: 8px 0;
    transition: color 200ms;
`

const Tab = styled.div`
    position: relative;
    flex: 1 1 10px;
    text-align: center;
    transform: translateY(${props => (props.selected ? 7 : 0)}px);
    background-color: ${light};
    transition: transform 200ms;
    border-bottom: solid 6px ${light};

    ${TabInside} {
        border: solid 1px
            ${props => (props.selected ? lightGrey : 'transparent')};
        border-bottom: none;
        color: ${props => (props.selected ? black : grey)};
    }
    :first-child ${TabInside} {
        border-left: none;
    }
`
