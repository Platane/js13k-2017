const L = 0.28
const K = 100

const planeGeom = new THREE.PlaneBufferGeometry(1, 1)

const getU = (n, i, k) =>
    Math.max(0, Math.min(1, (k - ((1 - L) * (n - i)) / n) / L))

const getDisplacement = (x, y, u, t) => {
    const seed = ((x * 36 + y * y * x * 137 + x * x * 89) % 37) / 37

    // u = 1 - (1 - u) * (1 - u)

    const s = Math.sin((1 + seed) * 0.045 * t) * u
    const c = Math.cos((1 + seed) * 0.035 * t) * u

    const vx = x - 0.5 + (x < 0.5 ? -0.4 : 0.4)
    const vy = y - 0.5

    const q = 1 - (1 - u) * (1 - u) * (1 - u)

    return {
        x: x + vx * u + s * 0.2,
        y: y + vy * u + c * 0.17,
        z: u * (0.6 + seed * 0.6 + s * 0.23 * (1 + seed)),

        s: 0.3 + (1 - u) * 0.7,
    }
}

const draw = (canvas, size, painting, text, k, t) => {
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

        const dotr = (dot.r * d.s) / size

        const r = d.z > dotr ? 0 : Math.sqrt(dotr * dotr - d.z * d.z)

        ctx.beginPath()

        ctx.arc(d.x * l, d.y * l, r * l, 0, Math.PI * 2)
        ctx.fillStyle = 'rgb(' + dot.color + ')'
        ctx.globalAlpha = dot.opacity
        ctx.fill()
    })

    if (k > 0.8 && text) {
        ctx.globalAlpha = (k - 0.8) / 0.2
        text.forEach((t, i) => {
            ctx.fillStyle = '#333'
            ctx.font = '50px Helvetica'
            // ctx.beginPath()
            ctx.fillText(t, 50, i * 60 + 100)
        })
    }
}

const generatePainting = (dots, i, text) => {
    const size = 64

    const object = new THREE.Object3D()

    const canvas = document.createElement('canvas')

    const l = 512

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, size, size)

    // paint drop
    dots.forEach(({ r, opacity, color, x, y }, i) => {
        const mat = new THREE.MeshLambertMaterial()
        {
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fillStyle = 'rgb(' + color + ')'
            ctx.globalAlpha = opacity
            ctx.fill()

            const { data } = ctx.getImageData(0, 0, size, size)

            const c = [0, 0, 0]
            let s = 0

            for (let dx = -r; dx < r; dx++)
                for (let dy = -r; dy < r; dy++)
                    if (
                        dx * dx + dy * dy < r * r &&
                        x + dx >= 0 &&
                        y + dy >= 0 &&
                        x + dx < size &&
                        y + dy < size
                    ) {
                        const k = ((x + dx) * 1 + (y + dy) * size) * 4

                        c[0] += data[k + 0]
                        c[1] += data[k + 1]
                        c[2] += data[k + 2]
                        s++
                    }

            mat.color.setRGB(c[0] / s / 255, c[1] / s / 255, c[2] / s / 255)
        }

        const geo = new THREE.SphereBufferGeometry(
            Math.min(r / size, 0.5),
            Math.ceil(r / 4) + 4,
            Math.ceil(r / 4) + 4
        )
        const mesh = new THREE.Mesh(geo, mat)

        object.add(mesh)
    })

    // painting as texture
    const texture = new THREE.Texture(canvas)
    {
        texture.needsUpdate = true
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)

        const mat = new THREE.MeshBasicMaterial()
        mat.map = texture

        const mesh = new THREE.Mesh(planeGeom, mat)
        mesh.position.z = 0.02

        object.add(mesh)

        const frame = new THREE.Mesh(planeGeom, lat)
        frame.position.z = 0.01
        frame.scale.set(1.1, 1.1, 1.1)
        object.add(frame)
    }

    let drawn_n = -1
    let ex_k = -1

    const update = (k, t) => {
        if (i > step) k = 0

        if (i == step && k > 0.9) step++

        if (k > 0 || Math.abs(k - ex_k) > 0.1 || (ex_k > 0 && k == 0)) {
            draw(canvas, size, dots, text, (ex_k = k), t)
            texture.needsUpdate = true

            dots.forEach((dot, i) => {
                const u = getU(dots.length, i, k)
                const d = getDisplacement(dot.x / size, dot.y / size, u, t)

                object.children[i].visible = u > 0

                object.children[i].scale.set(d.s, d.s, d.s * u)

                object.children[i].position.set(
                    d.x - 0.5,
                    -(d.y - 0.5),
                    d.z - 0.1
                )
            })
        }
    }

    update(0, 0)

    return { object, update, t: 0 }
}

const generatePaintings = paintings => {
    const p = []

    const object = new THREE.Object3D()

    const loop = () => {
        const pa = paintings.shift()

        if (!pa) return

        const u = generatePainting(pa.adn, p.length, [])

        p.push(u)

        const a = around[pa.k]

        const k =
            ((pa.y * pa.x * 19 + pa.x * 37 + pa.y * pa.y + a.y * 7 + a.x * 23) %
                27) /
            27

        const l = 0.6 + 0.35 * k

        u.object.scale.set(l, l, l)
        u.object.position.set(
            pa.x + 0.5 + a.x * 0.51,
            1,
            pa.y + 0.5 + a.y * 0.51
        )

        u.object.rotation.y = (Math.PI / 2) * pa.k

        object.add(u.object)

        requestAnimationFrame(loop)
    }

    loop()

    let t = 0
    let prev_direction = { x: 0, y: 0 }

    const update = ({ position, direction }) => {
        t += 1

        p.forEach((p, i) => {
            const x = position.x - p.object.position.x
            const y = position.y - p.object.position.z

            const d = Math.sqrt(x * x + y * y)

            const scal = Math.max(0, -(x * direction.x + y * direction.y) / d)

            if (d < 3 && scal > 0.92) {
                p.t = Math.min(K + 50, p.t + 1)
            } else p.t = Math.max((p.t + 1) * 0.98 - 2, 0)

            p.update(Math.max(0, (p.t - 50) / K), t)
        })
    }

    return { object, update }
}
