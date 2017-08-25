export const SIZE = 64
export const OPACITY_AVAILABLE = [0.2, 0.5, 0.8, 1]
export const RADIUS_AVAILABLE = Array.from(
    { length: SIZE / 2 / 2 },
    (_, i) => i
)
export const COLOR_PALETTE = []

// prettier-ignore
for(let r=0;r<255;r+= 64)
for(let v=0;v<255;v+= 64)
for(let b=0;b<255;b+= 64)
    COLOR_PALETTE.push([r,v,b])

export const N_CIRCLE = 16

// GENETIC
export const MUTATED_BY_STEP = 5
