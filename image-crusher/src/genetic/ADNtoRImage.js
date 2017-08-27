import * as PARAM from '../param'
import { drawCircle, createBlank } from '../util/rImage/draw'

import type { ADN, Dot } from './type'
import type { RImage } from '../type'

export const ADNtoRImage = (adn: ADN): RImage => {
    const rImage = createBlank()

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

        const rImage = ADNtoRImage(adn)

        memory.push({ adn, rImage })

        while (memory.length > 100) memory.shift()

        return rImage
    }

    return getRImage
}

export const getRImage = createMemoizedADNtoRImage()
