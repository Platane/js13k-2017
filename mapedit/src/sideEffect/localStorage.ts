import { read, write } from '../service/localStorage'
import { readFromLocalStorage } from '../store/action'
import { selectStableMuseumCenter } from '../store/selector/museum'
import { debounce } from '../util/time'

export const attachToStore = store => {
    let lastMuseum = null

    const update = () => {
        const museum = selectStableMuseumCenter(store.getState())

        if (lastMuseum != museum) write('museum', (lastMuseum = museum))
    }

    const debouncedUpdate = debounce(1000)(update)

    const museum = read('museum')
    if (museum) store.dispatch(readFromLocalStorage(museum))

    store.subscribe(debouncedUpdate)

    debouncedUpdate()

    window.addEventListener('beforeunload', update)
    window.addEventListener('unload', update)
}
