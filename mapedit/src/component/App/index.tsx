import React from "react"
import { withCssReset } from "../_abstract/cssReset"
import { Canvas } from "../Canvas"
import { PaintingList } from "../PaintingList"
import { ToolBar } from "../ToolBar"
import styled from "react-emotion"

const App_ = props => (
    <Container>
        <Canvas {...props} width={600} height={400} />

        <ToolBarContainer>
            <ToolBar />
        </ToolBarContainer>

        <PaintingListContainer>
            <PaintingList />
        </PaintingListContainer>
    </Container>
)

const Container = styled.div``
const ToolBarContainer = styled.div`
    position: fixed;
    z-index: 2;
    bottom: 0;
    top: 0;
    right: 0px;
`
const PaintingListContainer = styled.div`
    position: fixed;
    z-index: 2;
    bottom: 0;
    top: 0;
    right: 100px;
`

export const App = withCssReset(App_)
