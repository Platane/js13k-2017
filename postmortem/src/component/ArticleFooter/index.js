import { h, render, Component } from 'preact'

import { Link } from '../Link'

import styled from 'preact-emotion'

const articles = ['original-idea-and-gameplay', 'image-processing', 'graphics']

export const ArticleFooter = ({ path }) => {
    if (path === '/') return null

    const i = articles.indexOf(path.replace(/^\//, ''))
    const next = articles[i + 1]

    return (
        <Body>
            <Link href={'/'}>summary</Link>
            {next && (
                <Link href={next}>
                    {next} {'->'}
                </Link>
            )}
        </Body>
    )
}

const Body = styled.div`
    position: relative;
    padding: 50px 20px;
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
