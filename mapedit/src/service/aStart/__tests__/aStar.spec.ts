import test from 'tape'
import { getPath } from '..'
import { Museum } from 'type'

test('aStar', t => {
    const m: Museum = {
        origin: { x: 0, y: 0 },
        grid: [[false, false]],
    }

    const A = { x: 0, y: 0 }
    const B = { x: 1, y: 0 }
    const path = getPath(m)(A, B)

    t.deepEqual(A, path[0], 'should start with A')
    t.deepEqual(B, path[path.length - 1], 'should end with B')

    t.end()
})
