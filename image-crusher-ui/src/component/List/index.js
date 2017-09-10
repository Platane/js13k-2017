import { h, Component } from 'preact'
import { AncestorTree } from '../AncestorTree'

import style from './style.css'

export const List = ({ images, onClick }) => (
    <div className={style.container}>
        {images.map(({ ancestorTree, PARAM, target }, i) => (
            <div className={style.item} key={i}>
                <AncestorTree
                    param={PARAM}
                    ancestorTree={ancestorTree}
                    onClick={onClick}
                />
            </div>
        ))}
    </div>
)
