import { packMuseum, unpackMuseum } from '../museum'
import * as param from '../../../param'
import { samples as paintingsSamples } from '../../../adn/pack/__tests__/pack.spec'
import { samples as gridSamples } from './packGrid.spec'

const samples = [
    {
        grid: [[]],
        paintings: [],
        startingPoint: { x: 0, y: 0 },
        startingOrientation: { x: 0, y: 1 },
    },

    {
        grid: gridSamples[0],
        paintings: [
            {
                cell: { x: 9, y: 19 },
                orientation: { x: 1, y: 0 },
                adn: paintingsSamples[0],
            },
        ],
        startingPoint: { x: 0, y: 0 },
        startingOrientation: { x: 0, y: 1 },
    },

    {
        grid: gridSamples[4],
        paintings: [
            {
                cell: { x: 9, y: 19 },
                orientation: { x: 1, y: 0 },
                adn: paintingsSamples[2],
            },
            {
                cell: { x: 19, y: 119 },
                orientation: { x: 0, y: -1 },
                adn: paintingsSamples[2],
            },
            {
                cell: { x: 219, y: 11 },
                orientation: { x: 0, y: -1 },
                adn: paintingsSamples[2],
            },
        ],
        startingPoint: { x: 0, y: 0 },
        startingOrientation: { x: 0, y: 1 },
    },
]

samples.forEach((museum, i) =>
    it(`pack / unpack museum should be identity ${i}`, () =>
        expect(unpackMuseum(param, packMuseum(param, museum))).toEqual(museum))
)
