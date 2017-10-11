export const request =
    typeof requestAnimationFrame === 'undefined'
        ? (fn: (*) => *) => setTimeout(fn, 0)
        : (fn: (*) => *) => requestAnimationFrame(fn)

export const cancel =
    typeof requestAnimationFrame === 'undefined'
        ? x => clearTimeout(x)
        : x => cancelAnimationFrame(x)

export const asPromise = () => new Promise(request)