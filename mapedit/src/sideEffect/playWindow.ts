import { selectMuseumAsBinary } from '../store/selector/binary'

const url = '/game?local=1'
const features =
    'height=600,width=800,location=no,status=no,toolbar=no,centerscreen=yes'

export const attachToStore = store => {
    let win = null

    window.onbeforeunload = () => win && win.close()

    const isWindowOpened = () => win && win.location && win.location.reload

    const refresh = forceFocus => {
        if (!isWindowOpened()) {
            win = window.open(url, '_blank', features)

            if (win) win.onclose = () => (win = null)
        } else {
            win.location.reload()
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

    store.subscribe(update)

    update()
}
