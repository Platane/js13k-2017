import { h, Component } from 'preact'
import { Image as Image2 } from '../ImageFromAdnToCanvas'
import { Image } from '../ImageFromAdn'
import { packADN, unpackADN } from 'common/adn/pack'
import { adnEqual } from 'common/adn/equal'
import * as PARAM from 'common/param'

import style from './style.css'

const size = 256

const equals = (a, b) => {
    if (Array.isArray(a))
        return (
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((_, i) => equals(a[i], b[i]))
        )

    if (typeof a === 'object' && a)
        return (
            Object.keys(a).length === Object.keys(b).length &&
            Object.keys(a).every((_, i) => equals(a[i], b[i]))
        )

    return a === b
}

export const FloatingRes = ({ adn, param, close }) =>
    !adn ? null : (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.close} onClick={close}>
                    ×
                </div>
            </div>

            <div className={style.image1}>
                <Image adn={adn} size={size} param={param} />
            </div>

            <div className={style.image2}>
                <Image2
                    adn={unpackADN(param, packADN(param, adn))}
                    size={size}
                    param={param}
                />
            </div>

            <div>
                {adnEqual(adn, unpackADN(param, packADN(param, adn)))
                    ? 'pack ok'
                    : 'pack not ok'}
            </div>

            <div>
                {equals(param, PARAM)
                    ? 'standard param ok'
                    : 'standard param not ok'}
            </div>

            <textarea className={style.textarea}>
                {JSON.stringify(packADN(param, adn))}
            </textarea>

            <textarea className={style.textarea}>
                {JSON.stringify(param)}
            </textarea>

            <DownloadButton param={param} adn={adn} />
        </div>
    )

class DownloadButton extends Component {
    onClick = () => {
        const typedArray = packADN(this.props.param, this.props.adn)

        const file = new Blob([typedArray], {
            type: 'application/octet-binary',
            encoding: 'utf8',
        })

        this.base.href = URL.createObjectURL(file)

        this.base.download = 'adn'
    }

    render() {
        return (
            <a ref={el => (this.el = el)} className={style.download}>
                <button className={style.downloadButton} onClick={this.onClick}>
                    save
                </button>
            </a>
        )
    }
}
