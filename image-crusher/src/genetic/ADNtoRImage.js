import * as PARAM from '../param'
import { drawCircle, createBlank, clear } from '../util/rImage/draw'

import type { ADN, Dot } from './type'
import type { RImage } from '../type'

export const ADNtoRImage = (adn: ADN, target_rImage: RImage | null): RImage => {
    const rImage = target_rImage ? clear(target_rImage) : createBlank()

    adn.forEach(({ x, y, r, color, opacity }) =>
        drawCircle(
            rImage,
            x,
            y,
            PARAM.RADIUS_AVAILABLE[r],
            PARAM.COLOR_PALETTE[color],
            PARAM.OPACITY_AVAILABLE[opacity]
        )
    )

    return rImage
}

const createMemoizedADNtoRImage = () => {
    const memory = []
    const getRImage = (adn: ADN) => {
        const x = memory.find(x => x.adn === adn)

        if (x) return x.rImage

        let node = null
        if (memory.length > 50) {
            node = memory.shift()
            node.adn = adn
        } else {
            node = { adn, rImage: null }
        }

        node.rImage = ADNtoRImage(adn, node.rImage)

        memory.push(node)

        return node.rImage
    }

    return getRImage
}

export const getRImage = createMemoizedADNtoRImage()
