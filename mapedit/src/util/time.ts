export const throttle = delay => fn => {
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

export const debounce = delay => fn => {
    let timeout = null
    let args = []

    const exec = () => fn(...args)

    return (..._args) => {
        args = _args

        clearTimeout(timeout)
        timeout = setTimeout(exec, delay)
    }
}
