export const pickInArray = <T>(arr: Array<T>): T =>
    arr[Math.floor(Math.random() * arr.length)]

export const rand = (max: number, min: number = 0) =>
    min + Math.random() * (max - min)

export const randInt = (max: number, min: number = 0) =>
    Math.floor(rand(max, min))

export const clamp = (min: number, max: number, x: number) =>
    Math.min(max, Math.max(min, x))

export const randomWithDistribution = (distribution: number[]) => {
    const sum = distribution.reduce((sum, x) => sum + x, 0)

    const u = [distribution[0] / sum]
    for (let i = 1; i < distribution.length; i++)
        u[i] = u[i - 1] + distribution[i] / sum

    return () => {
        const r = Math.random()
        let k = 0

        for (; u[k] < r; k++);

        return k
    }
}
