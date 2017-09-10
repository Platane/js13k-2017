export const SIZE = 64
export const OPACITY_AVAILABLE = [0.2, 0.5, 0.8, 1]
export const RADIUS_AVAILABLE = [1]

const last = arr => arr[arr.length - 1]
const avLast = arr => arr[arr.length - 2]

while (last(RADIUS_AVAILABLE) < SIZE)
    RADIUS_AVAILABLE.push(
        last(RADIUS_AVAILABLE) + (avLast(RADIUS_AVAILABLE) || 1)
    )

export const POSITION_DELTA = SIZE / 0.8
export const COLOR_PALETTE = []

// prettier-ignore
for(let r=0;r<256;r+= 50)
for(let v=0;v<256;v+= 50)
for(let b=0;b<256;b+= 50)
    COLOR_PALETTE.push([r,v,b]);

export const N_CIRCLE = 48

// genetic param
export const HORIZONTAL_TRIAL = 5
export const CONVERGED_WHEN_UNCHANGED_SINCE = 1000
export const N_FORK = 100
export const N_BATCH = 800
export const GENE_BATCH = 8
