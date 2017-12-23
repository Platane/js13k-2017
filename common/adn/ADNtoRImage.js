import { drawCircle, createBlank, clear } from '../rImage/draw'

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
