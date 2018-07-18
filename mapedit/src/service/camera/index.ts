import { Camera, Point } from "../../type"

export const toScreen = ({ a, t }: Camera) => (p: Point): Point => ({
    x: a * (p.x - t.x),
    y: a * (p.y - t.y),
})

export const fromScreen = ({ a, t }: Camera) => (p_: Point): Point => ({
    x: p_.x / a + t.x,
    y: p_.y / a + t.y,
})
