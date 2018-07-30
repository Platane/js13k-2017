import test from 'tape'
import { rectWall } from '../rectWall'
import { readCell } from '../set'
import { Museum } from 'type'

test('rectWall', t => {
    const m: Museum = {
        origin: { x: 0, y: 0 },
        grid: [[]],
        paintings: [],
    }

    const m1 = rectWall(m, { x: -1, y: -1 }, { x: 1, y: 1 }, true, false)

    const cells = [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },

        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },

        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ]

    t.assert(
        cells.every(cell => readCell(m1, cell)),
        'should have set the points'
    )

    t.deepEqual(m.grid, [[]], 'should have left the original untouched')

    t.end()
})
