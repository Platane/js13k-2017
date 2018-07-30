import React from "react"
import styled from "react-emotion"

export const UndoButton = ({ toUndo, toRedo, undo, redo }) => (
    <Container>
        <ButtonTool
            onClick={undo}
            disabled={!toUndo}
            title={toUndo && `undo ${toUndo}`}
        >
            {"<"}
        </ButtonTool>
        <ButtonTool
            onClick={redo}
            disabled={!toRedo}
            title={toRedo && `redo ${toRedo}`}
        >
            {">"}
        </ButtonTool>
    </Container>
)

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
`

const ButtonTool = styled.div`
    cursor: ${props => (props.disabled ? "auto" : "pointer")};
    margin: 4px;
    margin-left: 10px;
    padding: 10px;
    border-radius: 2px;
    background-color: ${props => (props.disabled ? "#f2f2f2" : "#fff")};
`
