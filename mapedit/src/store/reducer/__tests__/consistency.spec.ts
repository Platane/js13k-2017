import test from 'tape'
import { createStore } from 'redux'
import {
    setTool,
    startDrag,
    moveDrag,
    endDrag,
    startDragPainting,
    undo,
} from '../../action'
import { selectMuseum } from '../../selector/museum'
import { readCell } from '../../../service/map/set'
import { defaultState, reduce } from '..'
import { State } from '../type'
import { Painting } from '../../../type'

// default state with identity camera
const defaultState_: State = {
    ...defaultState,
    camera: { a: 1, t: { x: 0, y: 0 } },
    paintings: [{ id: 'a' } as Painting],
}

test('placeWall wall, place painting, undo', t => {
    const store = createStore(reduce, defaultState_)

    t.assert(
        !readCell(selectMuseum(store.getState()), { x: 1, y: 1 }),
        'wall should not be built yet'
    )

    t.pass(' --- create a wall')
    // create a wall
    store.dispatch(setTool('rectwall'))
    store.dispatch(startDrag({ x: 1, y: 0 }))
    store.dispatch(moveDrag({ x: 1, y: 0 }))
    store.dispatch(endDrag({ x: 1, y: 0 }))

    t.assert(
        readCell(selectMuseum(store.getState()), { x: 1, y: 0 }),
        'wall should be built'
    )

    t.pass(' --- place a painting')
    // place a painting
    store.dispatch(startDragPainting('a'))
    store.dispatch(moveDrag({ x: 2.1, y: 0.5 }))
    store.dispatch(endDrag({ x: 2.1, y: 0.5 }))
    {
        const [paintingSpot] = selectMuseum(store.getState()).paintings
        t.deepEqual(
            paintingSpot.cell,
            { x: 1, y: 0 },
            'painting should be placed at the correct cell'
        )
        t.deepEqual(
            paintingSpot.orientation,
            { x: 1, y: 0 },
            'painting should be placed at the correct orientation'
        )
    }

    t.pass(' --- create a wall on the painting')
    // create a wall on the painting
    store.dispatch(setTool('rectwall'))
    store.dispatch(startDrag({ x: 2, y: 0 }))
    store.dispatch(moveDrag({ x: 2, y: 0 }))
    store.dispatch(endDrag({ x: 2, y: 0 }))

    {
        t.assert(
            readCell(selectMuseum(store.getState()), { x: 2, y: 0 }),
            'wall should be built'
        )
        t.assert(
            selectMuseum(store.getState()).paintings.length === 0,
            'painting should be removed'
        )
    }

    t.pass(' --- undo')
    store.dispatch(undo())
    // undo
    {
        t.assert(
            !readCell(selectMuseum(store.getState()), { x: 2, y: 0 }),
            'wall should be empty'
        )
        t.assert(
            selectMuseum(store.getState()).paintings.length === 1,
            'painting should be back'
        )
    }

    t.pass(' --- move the painting')
    store.dispatch(
        startDragPainting('a', selectMuseum(store.getState()).paintings[0].id)
    )
    store.dispatch(moveDrag({ x: 1.5, y: 0.1 }))
    store.dispatch(endDrag({ x: 1.5, y: 0.1 }))

    {
        const [paintingSpot, ...rest] = selectMuseum(store.getState()).paintings
        t.equal(rest.length, 0, 'should have 1 painting')
        t.deepEqual(
            paintingSpot.cell,
            { x: 1, y: 0 },
            'painting should be moved at the correct cell'
        )
        t.deepEqual(
            paintingSpot.orientation,
            { x: 0, y: -1 },
            'painting should be moved at the correct orientation'
        )
    }

    t.pass(' --- undo')
    store.dispatch(undo())
    // undo
    {
        const [paintingSpot] = selectMuseum(store.getState()).paintings
        t.deepEqual(
            paintingSpot.orientation,
            { x: 1, y: 0 },
            'painting should be moved back'
        )
    }

    t.pass(' --- undo')
    store.dispatch(undo())
    // undo
    {
        t.assert(
            selectMuseum(store.getState()).paintings.length === 0,
            'painting should be removed'
        )
    }
    t.pass(' --- undo')
    store.dispatch(undo())
    // undo
    {
        t.assert(
            !readCell(selectMuseum(store.getState()), { x: 1, y: 0 }),
            'wall should be empty'
        )
    }

    t.end()
})
