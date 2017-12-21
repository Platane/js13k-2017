import { h, Component } from 'preact'
import { Image as Image2 } from '../ImageFromAdnToCanvas'
import { Image } from '../ImageFromAdn'
import { packADN, unpackADN } from '../../util/pack'
import { encode, decode } from '../../util/pack/encode'
import { adnEqual } from '../../util/ancestorTree/merge'

import style from './style.css'

const size = 256

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
