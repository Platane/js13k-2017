import { h, Component } from 'preact'
import styled from 'styled-components'

const PATH_BASE = process.env.PATHNAME_BASE || '/'

const isExtern = url => !!url.match(/^(https?:)?\/\//)

export const Link = ({ href, onPathChange, children, ...props }) => (
    <A
        href={isExtern(href) ? href : PATH_BASE + href}
        onClick={
            !isExtern(href) &&
            onPathChange &&
            (e => {
                onPathChange(href)
                e.preventDefault()
            })
        }
    >
        {children}
    </A>
)

const A = styled.a`
    color: #000;
`
