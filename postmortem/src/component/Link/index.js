import { h, Component } from 'preact'
import styled from 'styled-components'

export const Link = ({ href, onPathChange, children, ...props }) => (
    <A
        href={href}
        onClick={e => {
            if (onPathChange) {
                onPathChange(href)
                e.preventDefault()
            }
        }}
    >
        {children}
    </A>
)

const A = styled.a`
    color: #000;
`
