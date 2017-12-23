import { ADNtoRImage } from '../ADNtoRImage'
import { createBlank } from '../rImage/draw'

import type { Param, ADN, Dot, RImage } from '../type'

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
