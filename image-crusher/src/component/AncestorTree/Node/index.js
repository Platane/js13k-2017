import { h, Component } from 'preact'
import { Image } from '../Image'

import style from './style.css'

export const Node = ({ tree }) =>
    <div className={style.container}>
        <Image adn={tree.adn} />
    </div>
