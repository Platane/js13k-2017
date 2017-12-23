import type { ADN, Dot, RImage } from 'type'
import { create as createRImage, compose, drawDotOnBlank } from '../rImage'

type RImageTree = {
    rImage: RImage,

    children: [RImageTree, RImageTree] | [],
}

const splitArr = arr => {
    const k = Math.floor(arr.length / 2)

    return [arr.slice(0, k), arr.slice(k)]
}

export const create = (param: Param, adn: ADN): RImageTree => {
    if (adn.length === 0)
        return {
            rImage: createRImage(param.SIZE),
            children: [],
        }

    if (adn.length === 1) {
        const rImage = createRImage(param.SIZE)

        drawDotOnBlank(param, adn[0], rImage)

        return {
            rImage,
            children: [],
        }
    }

    const children = splitArr(adn).map(adn => create(param, adn))

    return {
        rImage: compose(
            children[0].rImage,
            children[1].rImage,
            createRImage(param.SIZE)
        ),
        children,
    }
}

// assuming adnSource and adnTarget have the same length
export const mutate = (
    param: Param,
    adnSource: ADN,
    adnTarget: ADN,
    rImageSource: RImageTree
): RImageTree => {
    // a leaf
    if (adnSource.length === 1) {
        // no change
        if (adnSource[0] === adnTarget[0]) return rImageSource

        // repercute change
        const rImage = createRImage(param.SIZE)

        drawDotOnBlank(param, adnTarget[0], rImage)

        return {
            rImage,
            children: [],
        }
    }

    const aSource = splitArr(adnSource)
    const aTarget = splitArr(adnTarget)

    const children = [
        mutate(param, aSource[0], aTarget[0], rImageSource.children[0]),
        mutate(param, aSource[1], aTarget[1], rImageSource.children[1]),
    ]

    if (
        children[0] === rImageSource.children[0] &&
        children[1] === rImageSource.children[1]
    )
        return rImageSource

    return {
        rImage: compose(
            children[0].rImage,
            children[1].rImage,
            createRImage(param.SIZE)
        ),
        children,
    }
}
