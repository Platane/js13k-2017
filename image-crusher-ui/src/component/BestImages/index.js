import { h, Component } from 'preact'
import { Image } from '../ImageFromAdn'
import { getBestFitLeafs } from '../../util/ancestorTree/stats'
import style from './style.css'

export const BestImages = ({ image, n, onSelectAdn }) => (
    <div className={style.container}>
        {getBestFitLeafs(image.ancestorTree, n).map(tree => (
            <div
                className={style.item}
                onClick={() => onSelectAdn(tree.adn, image.PARAM)}
            >
                <Image adn={tree.adn} param={image.PARAM} size={64} />
            </div>
        ))}
    </div>
)
