import { read, write } from '../service/localStorage'
import { readFromLocalStorage } from '../store/action'
import { reduceGrid, centerOrigin } from '../service/map/reduceGrid'

export const attachToStore = store => {
    let lastMuseum = null

    const update = () => {
        const { historyStableMuseum: museum } = store.getState()

        if (lastMuseum != museum) {
            lastMuseum = museum

            write('museum', centerOrigin(reduceGrid(museum)))
        }
    }

    const museum = read('museum')
    if (museum) store.dispatch(readFromLocalStorage(museum))

    store.subscribe(update)

    update()
}
