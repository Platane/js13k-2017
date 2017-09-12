import * as material from '../material'

import type { Painting, WorldGrid } from '../../type'

const L = 0.28
const K = 100

const planeGeom = new THREE.PlaneBufferGeometry(1, 1)

const getU = (n, i, k) =>
    Math.max(0, Math.min(1, (k - (1 - L) * (n - i) / n) / L))

const getDisplacement = (x, y, u: number, t: number) => {
    const seed = ((x * 36 + y * y * x * 137 + x * x * 89) % 37) / 37

    // u = 1 - (1 - u) * (1 - u)

    const s = Math.sin((1 + seed) * 0.045 * t) * u
    const c = Math.cos((1 + seed) * 0.035 * t) * u

    const vx = x - 0.5 + (x < 0.5 ? -0.4 : 0.4)
    const vy = y - 0.5

    return {
        x: x + vx * u + s * 0.2,
        y: y + vy * u + c * 0.17,
        z: u * (0.4 + seed * 0.4) - 0.1 + s * 0.17 * (1 + seed),
    }
}

const draw = (canvas, size, painting, k, t) => {
    const l = 512

    canvas.width = canvas.height = l

    const ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.rect(0, 0, l, l)
    ctx.fillStyle = '#fff'
    ctx.fill()

    painting.forEach((dot, i) => {
        const u = getU(painting.length, i, k)
        const d = getDisplacement(dot.x / size, dot.y / size, u, t)

        const w = dot.r * dot.r - d.z * d.z

        const r =
            d.z > dot.r / size
                ? 0
                : Math.sqrt(dot.r / size * dot.r / size - d.z * d.z)

        ctx.beginPath()
        ctx.arc(d.x * l, d.y * l, r * l, 0, Math.PI * 2)
        ctx.fillStyle = 'rgb(' + dot.color + ')'
        ctx.globalAlpha = dot.opacity
        ctx.fill()
    })
}

const generatePainting = (painting: Painting) => {
    const size = 64

    const heights = painting.map(() => Math.random())

    const object = new THREE.Object3D()

    // paint drop
    painting.forEach((dot, i) => {
        const mat = new THREE.MeshBasicMaterial(
            {
                // transparent: true,
                // opacity: dot.opacity ,
            }
        )

        mat.color.setRGB(...dot.color.map(x => x / 256))

        const geo = new THREE.SphereBufferGeometry(
            Math.min(dot.r / size, 0.5),
            Math.ceil(dot.r / 2) + 2,
            Math.ceil(dot.r / 2) + 2
        )
        const mesh = new THREE.Mesh(geo, mat)

        object.add(mesh)
    })

    // painting as texture
    const canvas = document.createElement('canvas')
    const texture = new THREE.Texture(canvas)
    {
        texture.needsUpdate = true
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)

        const mat = material.createCanvas()
        mat.map = texture

        const mesh = new THREE.Mesh(planeGeom, mat)
        mesh.position.z = 0.02

        object.add(mesh)

        const frame = new THREE.Mesh(planeGeom, material.frame)
        frame.position.z = 0.01
        frame.scale.set(1.1, 1.1, 1.1)
        object.add(frame)
    }

    let drawn_n = -1
    let ex_k = -1

    const update = (k, t) => {
        if (k > 0 || Math.abs(k - ex_k) > 0.1 || (ex_k > 0 && k == 0)) {
            draw(canvas, size, painting, (ex_k = k), t)
            texture.needsUpdate = true
        }

        painting.forEach((dot, i) => {
            const u = getU(painting.length, i, k)
            const d = getDisplacement(dot.x / size, dot.y / size, u, t)

            object.children[i].visible = u > 0

            const s = 1

            object.children[i].scale.set(s, s, s * u)

            object.children[i].position.set(d.x - 0.5, -(d.y - 0.5), d.z)
        })
    }

    update(0, 0)

    return { object, update, t: 0 }
}

export const generatePaintings = (worldGrid: WorldGrid) => {
    const p = []

    const object = new THREE.Object3D()

    for (let x = 0; x < worldGrid.length; x++)
        for (let y = 0; y < worldGrid[0].length; y++)
            for (let k = 0; worldGrid[x][y] && k < 4; k++)
                if (worldGrid[x][y][k]) {
                    const u = generatePainting(worldGrid[x][y][k])

                    p.push(u)

                    const a = around[k]

                    const l = 0.6 + 0.35 * Math.random()

                    u.object.scale.set(l, l, l)
                    u.object.position.set(
                        x + 0.5 + a.x * 0.505,
                        1,
                        y + 0.5 + a.y * 0.505
                    )

                    u.object.rotation.y = Math.PI / 2 * k

                    object.add(u.object)
                }

    let t = 0
    let prev_direction = { x: 0, y: 0 }

    const update = ({ position, direction }) => {
        // const x = direction.x - prev_direction.x
        // const y = direction.y - prev_direction.y
        //
        // const delta = x * x + y * y
        //
        // prev_direction.x = direction.x
        // prev_direction.y = direction.y
        //
        // const j = 0.1 + delta * 60

        t += 1

        p.forEach(p => {
            const x = position.x - p.object.position.x
            const y = position.y - p.object.position.z

            const d = Math.sqrt(x * x + y * y)

            const scal = Math.max(0, -(x * direction.x + y * direction.y) / d)

            if (d < 3 && scal > 0.88) {
                p.t = Math.min(K + 50, p.t + 1)
            } else p.t = Math.max((p.t + 1) * 0.98 - 2, 0)

            p.update(Math.max(0, (p.t - 50) / K), t)
        })
    }

    return { object, update }
}
