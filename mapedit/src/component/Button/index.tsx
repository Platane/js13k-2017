import React from 'react'
import styled from 'react-emotion'
import { light, lightGrey } from '../_abstract/palette'

export const Button = styled.div`
    min-height: 32px;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    margin: 10px;
    padding: 4px 8px;
    border-radius: 2px;
    cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
    background-color: ${props => (props.disabled ? lightGrey : props.color)};
    box-shadow: 0 0 0 2px ${props => (props.selected ? '#ddd' : 'transparent')};
`

Button.defaultProps = {
    color: light,
    selected: false,
    disabled: false,
}
