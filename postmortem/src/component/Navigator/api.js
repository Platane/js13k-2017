const toArray = path => path.split('/').filter(Boolean)
const toPath = arr => arr.join('/')

export const pushPath = (basePath: string) => (path: string) =>
    history.pushState(
        {},
        '',
        window.location.origin +
            '/' +
            toPath([...toArray(basePath), ...toArray(path)])
    )

export const getPath = (basePath: string) => () => {
    const b = toArray(basePath)
    const p = toArray(window.location.pathname)

    if (b.every((_, i) => b[i] === p[i])) p.splice(0, b.length)
    return '/' + toPath(p)
}
