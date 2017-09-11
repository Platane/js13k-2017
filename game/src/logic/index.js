import { step } from './step';
import { generateMaze } from '../generation/world';
import { worldGrid } from '../generation/static';
import * as PARAM from '../asset/param';

import type { World } from '../type';

const ml = require('../asset/monalisa.json');

const toPainting = (PARAM, adn) =>
    adn.map(dot => ({
        ...dot,
        r: PARAM.RADIUS_AVAILABLE[dot.r],
        opacity: PARAM.OPACITY_AVAILABLE[dot.opacity],
        color: PARAM.COLOR_PALETTE[dot.color]
    }));

const painting = [toPainting(PARAM, ml)];

export const world: World = {
    // worldGrid: generateMaze(10),
    worldGrid,
    // worldGrid: [
    //     [null, null, null, null, null],
    //     [null, null, null, null, null],
    //     [null, null, null, null, [null, null, painting[0], null]],
    //     [null, null, null, null, null],
    //     [null, null, null, null, null],
    // ],

    tim: {
        position: { x: 24.5, y: 31.5 },
        direction: { x: 0, y: 1 }
    },

    control: {
        direction: { x: 0, y: 0 }
    },

    walkers: []
};

export const tick = () => step(world);
