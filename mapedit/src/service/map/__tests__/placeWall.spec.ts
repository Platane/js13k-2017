import test from 'tape'
import { placeWall } from '../placeWall'
import { readCell } from '../set'
import { Museum } from 'type'

test('placeWall', t => {
    const m: Museum = {
        origin: { x: 0, y: 0 },
        grid: [[]],
        paintings: [],
    }

    const m1 = placeWall(m, { x: -2, y: -1 }, true)

    t.assert(readCell(m1, { x: -2, y: -1 }), 'should have set the point')

    t.deepEqual(m.grid, [[]], 'should have left the original untouched')

    t.end()
})
