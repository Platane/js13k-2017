import type { WorldGrid, Painting } from '../type'

import * as PARAM from '../asset/param'

import { readPainting } from './painting'

const _paintings = []
Promise.all([require('../asset/1.adn')].map(readPainting))
    .then(x => _paintings.push(x))
    .then(() => console.log(_paintings))

const ml = require('../asset/monalisa.json')

const toPainting = (PARAM, adn) =>
    adn.map(dot => ({
        ...dot,
        r: PARAM.RADIUS_AVAILABLE[dot.r],
        opacity: PARAM.OPACITY_AVAILABLE[dot.opacity],
        color: PARAM.COLOR_PALETTE[dot.color],
    }))

const rand = arr => arr[Math.floor(arr.length * Math.random())]

const paintings: Painting[] = [
    toPainting(PARAM, ml),
    ...Array.from({ length: 10 }, () =>
        Array.from({ length: 3 }, () => ({
            x: Math.random() * 64,
            y: Math.random() * 64,
            r: Math.random() * 30,
            color: rand(PARAM.COLOR_PALETTE),
            opacity: 1,
        }))
    ),
]

const getCell = x => {
    switch (x) {
        case '1':
            return [null, paintings[0], null, null]
        case '2':
            return [null, null, paintings[0], null]

        case 'l':
            return [null, null, rand(paintings.slice(1)), null]
        case 't':
            return [null, rand(paintings.slice(1)), null, null]
        case 'r':
            return [rand(paintings.slice(1)), null, null, null]
        case 'b':
            return [null, null, null, rand(paintings.slice(1))]

        default:
            return [null, null, null, null]
    }
}

const map =
    '#                                                                              \n' +
    '                                      #                                            \n' +
    '                                      ###################                             \n' +
    '                                                        #                             \n' +
    '                                      ################# #                             \n' +
    '                                      #               # #                             \n' +
    '                                      #               # #                             \n' +
    '                                      ################# ####                                             \n' +
    '                                      ##   #       #       #                            \n' +
    '                                      ##   r       l       #                            \n' +
    '                                           #       #       #                           \n' +
    '                   ###########   #######       #       #   #                                  \n' +
    '                          ####   ####  #       l       l   2                            \n' +
    '                          #         #  #       #       #   ######                            \n' +
    '                          #         #  #       #       #        #                       \n' +
    '                          r  t   1  l  #       l       l   #### #                           \n' +
    '                          #         ####       #       #   #  # #                           \n' +
    '                          #                #       #       #  # #                       \n' +
    '                          #         ####   r       l       #  # #                            \n' +
    '                          r  b   b  l  #   #       #       #  # #                          \n' +
    '                          #         #  ################ ####### #                                          \n' +
    '                          #         #                 #         #                    \n' +
    '                          #### ######                 ###########                             \n' +
    '                             #   #                                                   \n' +
    '                             #*  #                                                  '

export const worldGrid: WorldGrid = map
    .split('\n')
    .map(line => line.split('').map(c => (c === ' ' ? 0 : getCell(c))))

// on 1
