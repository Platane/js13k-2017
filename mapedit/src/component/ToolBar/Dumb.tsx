import React from 'react'
import styled from 'react-emotion'
import { Button } from '../Button'

const toolLabel = {
    camera: 'Camera',
    tracewall: 'Pen',
    rectwall: 'Rect',
    erasewall: 'Eraser',
}

const m = {}
const createClickHandler = (setTool, tool) =>
    (m[tool] = m[tool] || (() => setTool(tool)))

export const ToolBar = ({ availableTools, currentTool, setTool }) => (
    <Container>
        {availableTools.map(tool => (
            <ButtonTool
                id={tool}
                onClick={createClickHandler(setTool, tool)}
                selected={currentTool === tool}
            >
                {toolLabel[tool]}
            </ButtonTool>
        ))}
    </Container>
)

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`

const ButtonTool = styled(Button)``
