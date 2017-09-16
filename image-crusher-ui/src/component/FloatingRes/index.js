import { h, Component } from 'preact'
import { Image as Image2 } from '../ImageFromAdnToCanvas'
import { Image } from '../ImageFromAdn'
import { packADN, unpackADN } from '../../util/pack'
import { encode, decode } from '../../util/pack/encode'
import { adnEqual } from '../../util/ancestorTree/merge'

import style from './style.css'

export const FloatingRes = ({ adn, param }) =>
    !adn ? null : (
        <div className={style.container}>
            <div className={style.image1}>
                <Image adn={adn} size={256} param={param} />
            </div>

            <div className={style.image2}>
                <Image2 adn={adn} size={256} param={param} />
            </div>

            <div className={style.image2}>
                <Image2
                    adn={unpackADN(param, packADN(param, adn))}
                    size={256}
                    param={param}
                />
            </div>

            <div>
                {adnEqual(adn, unpackADN(param, packADN(param, adn)))
                    ? 'pack ok'
                    : 'pack not ok'}
            </div>

            <div>
                {adnEqual(
                    adn,
                    unpackADN(param, decode(encode(packADN(param, adn))))
                )
                    ? 'encode ok'
                    : 'encode not ok'}
            </div>

            <textarea className={style.textarea}>
                {JSON.stringify(encode(packADN(param, adn)))}
            </textarea>

            <textarea className={style.textarea}>
                {JSON.stringify(param)}
            </textarea>
        </div>
    )
