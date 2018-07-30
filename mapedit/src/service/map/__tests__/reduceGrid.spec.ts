import test from 'tape'
import { reduceGrid, centerOrigin } from '../reduceGrid'
import { Museum } from 'type'

test('reduceGrid', t => {
    const m: Museum = {
        origin: { x: 0, y: 0 },
        grid: [
            [false, true, false],
            [false, false, false],
            [false, true, false],
            [false, false, false],
        ],
        paintings: [],
    }

    const m1 = reduceGrid(m)

    t.deepEqual(
        m1,
        {
            origin: { x: 1, y: 0 },
            grid: [[true], [false], [true]],
            paintings: [],
        },
        'should remove useless line'
    )

    t.end()
})

test('centerOrigin', t => {
    const m: Museum = {
        origin: { x: 4, y: 1 },
        grid: [[true]],
        paintings: [
            {
                cell: { x: 0, y: 0 },
                paintingId: '12',
                orientation: { x: 1, y: 0 },
            },
        ],
        startingPoint: { x: 0, y: 1 },
        startingOrientation: { x: 0, y: 1 },
    }

    const m1 = centerOrigin(m)

    t.deepEqual(
        m1,
        {
            origin: { x: 0, y: 0 },
            grid: [[true]],
            paintings: [
                {
                    cell: { x: -4, y: -1 },
                    paintingId: '12',
                    orientation: { x: 1, y: 0 },
                },
            ],
            startingPoint: { x: -4, y: 0 },
            startingOrientation: { x: 0, y: 1 },
        },
        'should remove useless line'
    )

    t.end()
})
