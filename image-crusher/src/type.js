export type Color = [number, number, number]
export type RImage = number[]

export type Dot = {
    x: number,
    y: number,

    // index in the available values array
    r: number,

    // index in the available values param array
    color: number,

    // index in the available values param array
    opacity: number,
}

export type ADN = Dot[]

export type AncestorTree = {
    adn: ADN,
    fitness: number,
    children: AncestorTree[],
}
