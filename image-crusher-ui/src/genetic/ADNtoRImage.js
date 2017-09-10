import { drawCircle, createBlank, clear } from '../util/rImage/draw'

import type { Param, ADN, Dot, RImage } from '../type'

export const ADNtoRImage = (
    PARAM: Param,
    adn: ADN,
    target_rImage: RImage | null
): RImage => {
    const rImage = target_rImage
        ? clear(target_rImage)
        : createBlank(PARAM.SIZE)

    adn.forEach(({ x, y, r, color, opacity }) =>
        drawCircle(
            PARAM.SIZE,
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
    const getRImage = (PARAM: Param, adn: ADN) => {
        const x = memory.find(x => x.adn === adn)

        if (x) return x.rImage

        let node = null
        if (memory.length > 50) {
            node = memory.shift()
            node.adn = adn
        } else {
            node = { adn, rImage: null }
        }

        node.rImage = ADNtoRImage(PARAM, adn, node.rImage)

        memory.push(node)

        return node.rImage
    }

    return getRImage
}

export const getRImage = createMemoizedADNtoRImage()
