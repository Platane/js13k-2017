export const pickInArray = <T>(arr: Array<T>): T =>
    arr[Math.floor(Math.random() * arr.length)]

export const rand = (max: number, min: number = 0) =>
    min + Math.random() * (max - min)

export const randInt = (max: number, min: number = 0) =>
    Math.floor(rand(max, min))

export const clamp = (min: number, max: number, x: number) =>
    Math.min(max, Math.max(min, x))
