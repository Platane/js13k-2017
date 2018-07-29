import React from "react"
import { Canvas } from "../Canvas"
import styled from "react-emotion"

const m = {}
const createClickHandler = (setTool, tool) =>
    (m[tool] = m[tool] || (() => setTool(tool)))

export const ToolBar = ({
    availableTools,
    currentTool,
    setTool,
    undo,
    redo,
}) => (
    <Container>
        {availableTools.map(tool => (
            <ButtonTool
                id={tool}
                onClick={createClickHandler(setTool, tool)}
                selected={currentTool === tool}
            >
                {tool}
            </ButtonTool>
        ))}
    </Container>
)

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`

const ButtonTool = styled.div`
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    border-radius: 2px;
    background-color: #f2f2f2;
    box-shadow: 0 0 0 2px ${props => (props.selected ? "#ddd" : "transparent")};
`
