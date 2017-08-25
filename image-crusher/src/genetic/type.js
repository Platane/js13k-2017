import type { RImage, Color } from '../type'

export type Dot = {
    x: number,
    y: number,
    r: number,
    color: Color,
    opacity: number,
}

export type ADN = Dot[]

export type Entity = {
    rImage: RImage,

    adn: ADN,
}
