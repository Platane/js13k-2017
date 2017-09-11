import * as material from '../material'

import type { Painting, WorldGrid } from '../../type'

const L = 0.2

const getU = (n, i, k) => Math.max(0, Math.min(1, (k - (1 - L) * i / n) / L))

const getDisplacement = (x, y, u, t) => {
    const seed = ((position.x + position.y * position.y) % 37) / 37

    const s = Math.sin((1 + seed * seed) * Math.PI * t)
    const c = Math.cos((1 + seed * seed) * Math.PI * t)

    return {
        x: x + x * u + s * u * (seed * 0.2 + 0.4),
        y: y + y * u + s * u * (seed * 0.2 + 0.4),
        z: u * (1 + seed * 0.4) + s * 0.5,
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
        const u = ctx.beginPath()
        ctx.arc(
            dot.x / size * l,
            dot.y / size * l,
            dot.r / size * l,
            0,
            Math.PI * 2
        )
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
        const mat = new THREE.MeshBasicMaterial({
            transparent: true,
            // opacity: dot.opacity ,
        })

        mat.color.setRGB(...dot.color.map(x => x / 256))

        const geo = new THREE.SphereGeometry(
            Math.min(dot.r / size / 4, 0.5),
            Math.ceil(dot.r / 3) + 1,
            Math.ceil(dot.r / 3) + 1
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

        const geo = new THREE.PlaneGeometry(1, 1)
        const mesh = new THREE.Mesh(geo, mat)

        object.add(mesh)
    }

    let drawn_n = -1

    const update = (k, t) => {
        // const n = Math.ceil(Math.max(0, 1 - k) * painting.length)
        const n = 90

        if (n != drawn_n) {
            draw(canvas, size, painting.slice(0, (drawn_n = n)))
            texture.needsUpdate = true
        }

        painting.forEach((dot, i) => {
            const u = 1 - i / painting.length

            object.children[i].visible = true

            const s = 1

            object.children[i].scale.set(s, s, s)

            object.children[i].position.set(
                (dot.x / size - 0.5) * (k * 2),
                dot.y / size - 0.5,
                k
            )
        })
    }

    update(100)

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

    const update = ({ position, direction }) => {
        t++

        p.forEach(p => {
            const x = position.x - p.object.position.x
            const y = position.y - p.object.position.z

            const d = Math.sqrt(x * x + y * y)

            const scal = Math.max(0, -(x * direction.x + y * direction.y) / d)

            if (d < 3 && scal > 0.88) {
                p.t = Math.min(200, p.t + 1)
            } else p.t = Math.max((p.t + 4) / 1.3 - 1, 0)

            p.update(p.t / 200, t)
        })
    }

    return { object, update }
}
