import { h, Component } from 'preact'
import { AncestorTree } from '../AncestorTree'
import { RImage } from '../RImage'

import style from './style.css'

export const List = ({ images, onClick }) => (
    <div className={style.container}>
        {images.map(({ ancestorTree, PARAM, target }, i) => (
            <div className={style.item} key={i}>
                <RImage param={PARAM} size={64} rImage={target} />
                <AncestorTree
                    param={PARAM}
                    ancestorTree={ancestorTree}
                    onClick={onClick}
                />
            </div>
        ))}
    </div>
)
