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

export type Param = {
    SIZE: number,
    OPACITY_AVAILABLE: number[],
    RADIUS_AVAILABLE: number[],
    COLOR_PALETTE: Color[],

    POSITION_DELTA: number,

    N_CIRCLE: number,

    HORIZONTAL_TRIAL: number,
    N_FORK: number,
    N_BATCH: number,
    GENE_BATCH: number,
}

export type AncestorTree = {
    id: string,
    adn: ADN,
    fitness: number,
    children: AncestorTree[],
}
