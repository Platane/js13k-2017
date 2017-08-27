import * as PARAM from '../param'

const n_pos = Math.log(PARAM.SIZE) / Math.LN2
const n_color = Math.log(PARAM.COLOR_PALETTE.length) / Math.LN2
const n_opacity = Math.log(PARAM.OPACITY_AVAILABLE.length) / Math.LN2
const n_radius = Math.log(PARAM.RADIUS_AVAILABLE.length) / Math.LN2

const n_dot = n_pos + n_pos + n_color + n_opacity + n_radius

// a dot packed is
// x | y | r | color | opacity
const packDot = dot => {
    let n = 0

    let pack = 0

    pack += dot.x << n
    n += n_pos

    pack += dot.y << n
    n += n_pos

    pack += PARAM.RADIUS_AVAILABLE.indexOf(dot.r) << n
    n += n_radius

    pack += PARAM.COLOR_PALETTE.indexOf(dot.color) << n
    n += n_color

    pack += PARAM.OPACITY_AVAILABLE.indexOf(dot.opacity) << n

    return ('0000000000' + pack.toString(32)).slice(
        -Math.ceil(n_dot / (Math.log(32) / Math.LN2))
    )
}

export const packADN = adn => adn.map(packDot).join('')
