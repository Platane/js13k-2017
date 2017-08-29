export const SIZE = 64
export const OPACITY_AVAILABLE = [0.2, 0.5, 0.8, 1]
export const RADIUS_AVAILABLE = [2, 3, 5, 7, 9, 12, 15, 20]
export const COLOR_PALETTE = []
export const POSITION_DELTA = SIZE / 0.8

// prettier-ignore
for(let r=0;r<255;r+= 16)
for(let v=0;v<255;v+= 16)
for(let b=0;b<255;b+= 16)
    COLOR_PALETTE.push([r,v,b])

export const N_CIRCLE = 32

// genetic param
export const CONVERGED_WHEN_UNCHANGED_SINCE = 2000
export const N_FORK = 20
export const N_BATCH = 500
export const GENE_BATCH = 8
