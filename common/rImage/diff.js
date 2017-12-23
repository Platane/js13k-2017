import type { Color, RImage } from '../type'

export const diff = (
    colorError: (a: Color, b: Color) => number,
    a: RImage,
    b: RImage
): number => {
    let sum = 0

    for (let i = a.length / 3; i--; )
        sum += colorError(
            [a[i * 3 + 0], a[i * 3 + 1], a[i * 3 + 2]],
            [b[i * 3 + 0], b[i * 3 + 1], b[i * 3 + 2]]
        )

    return sum
}
