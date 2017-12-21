import { h, Component } from 'preact'
import { AncestorTree } from '../AncestorTree'
import { RImage } from '../RImage'
import { count, getBestFitness, getDepth } from '../../util/ancestorTree/stats'

import style from './style.css'

const toDigit = n => x => {
    let [a, d] = x.toString().split('.')

    d = d || ''

    d = (d + '0'.repeat(n)).slice(0, n)

    return `${a}.${d}`
}

export const List = ({ images, onSelectImage }) => (
    <div className={style.container}>
        {images.map(({ id, ancestorTree, PARAM, target }, i) => (
            <div
                className={style.item}
                key={i}
                onClick={() => onSelectImage(id)}
            >
                <RImage param={PARAM} size={64} rImage={target} />
            </div>
        ))}
    </div>
)
