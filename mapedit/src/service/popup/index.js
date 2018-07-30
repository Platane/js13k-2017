const url = '/game?local=1'
// const url = ''
const features = 'height=600,width=800,location=no'

export const create = () => {
    let win = null

    return () => {
        if (!win) {
            win = window.open(url, '_blank', features)

            win.onbeforeunload = win.onclose = () => (win = null)
        } else {
            win.location.reload()
        }

        win.focus()
    }
}
