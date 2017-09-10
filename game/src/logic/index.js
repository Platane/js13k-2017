import { step } from './step'
import { generateMaze } from '../generation/world'

import type { World } from '../type'

export const world: World = {
    worldGrid: generateMaze(10),

    tim: {
        position: { x: 4.5, y: 0.5 },
        direction: { x: 0, y: 1 },
    },

    control: {
        direction: { x: 0, y: 1 },
    },

    walkers: [],
}

export const tick = () => step(world)
