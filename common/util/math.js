export const pickInArray = <T>(arr: Array<T>): T =>
    arr[Math.floor(Math.random() * arr.length)]

export const rand = (max: number, min: number = 0) =>
    min + Math.random() * (max - min)

export const randInt = (max: number, min: number = 0) =>
    Math.floor(rand(max, min))

export const clamp = (min: number, max: number, x: number) =>
    Math.min(max, Math.max(min, x))

// random function with fibonacci distribution
export const randFibo = n => {
    const p = [1, 1]

    for (let k = 2; k <= n; k++) p[k] = p[k - 1] + p[k - 2]

    const u = Math.random() * p[n]

    for (let k = 1; k <= n; k++) if (u <= p[k]) return k - 1
}
