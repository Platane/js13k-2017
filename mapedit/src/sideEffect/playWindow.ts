import { selectMuseumAsBinary } from '../store/selector/binary'
import { updatePlayWindowGamePosition } from '../store/action'

const url = '/game?local=1'
const features =
    'height=600,width=800,location=no,status=no,toolbar=no,centerscreen=yes'

const throttle = delay => fn => {
    let args = []
    let timeout = null

    const exec = () => {
        clearTimeout(timeout)
        timeout = null

        fn(...args)
    }

    return (..._args) => {
        args = _args

        timeout = timeout || setTimeout(exec, delay)
    }
}

export const attachToStore = store => {
    let win = null

    window.onbeforeunload = () => win && win.close()

    const isWindowOpened = () => win && win.location && win.location.reload

    const refresh = forceFocus => {
        if (!isWindowOpened()) {
            win = window.open(url, '_blank', features)

            if (win) win.onclose = () => (win = null)
        } else {
            if (win.refreshMap) win.refreshMap()
            else win.location.reload()
        }

        if (isWindowOpened() && forceFocus) win.focus()
    }

    let lastMuseum = null
    let lastRefreshKey = null

    const update = () => {
        const state = store.getState()

        const { historyStableMuseum: museum, playWindow } = state

        const museumAsBinary = selectMuseumAsBinary(state)

        if (
            (lastMuseum != museum &&
                playWindow.autorefresh &&
                isWindowOpened()) ||
            lastRefreshKey != playWindow.refreshKey
        ) {
            const forceFocus = lastRefreshKey != playWindow.refreshKey

            lastRefreshKey = playWindow.refreshKey
            lastMuseum = museum

            localStorage.setItem('museumAsBinary', museumAsBinary.join(','))

            refresh(forceFocus)
        }
    }

    window.updateGamePosition = throttle(150)(({ position, direction }) =>
        store.dispatch(
            updatePlayWindowGamePosition(
                { x: position.x - 0.5, y: position.y - 0.5 },
                { ...direction }
            )
        )
    )

    store.subscribe(update)

    update()
}
