import { packGrid, unpackGrid } from "../grid"

// prettier-ignore
export const samples = [
    [
        [],
    ],
    [
        [true],
    ],
    [
        [false],
    ],
    [
        [false,false,false],
        [true,false,false],
        [true,true,false],
    ],
    [
        [false,false,false,true,false,true],
        [false,false,false,false,false,false],
        [false,false,false,true,false,true],
        [true,false,false,true,false,true],
        [true,false,true,true,false,true],
        [false,false,false,false,false,false],
        [false,false,false,true,false,false],
    ],
]

samples.forEach((grid, i) =>
    it(`pack / unpack grid should be identity ${i}`, () =>
        expect(unpackGrid(grid[0].length, grid.length, packGrid(grid))).toEqual(
            grid
        ))
)
