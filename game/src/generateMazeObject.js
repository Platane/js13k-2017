// floor mat
const floor = new THREE.MeshLambertMaterial()
{
    const canvas = document.createElement('canvas')
    canvas.width = 16 * 32
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    for (let i = 16; i--; ) {
        ctx.beginPath()
        ctx.rect(i * 32, 0, 32, 1)

        const h = 32 + (0 | (8 * Math.random()))
        const l = 22 + (0 | (20 * Math.random()))

        ctx.fillStyle = `hsl(${h}, 55%, ${l}%)`
        ctx.fill()
    }

    const texture = new THREE.Texture(
        canvas,
        THREE.UVMapping,
        THREE.RepeatWrapping,
        THREE.LinearFilter,
        THREE.LinearFilter
        // THREE.NearestFilter,
        // THREE.NearestFilter
    )
    texture.needsUpdate = true
    texture.repeat.set(10, 1)

    floor.map = texture
}

const generateMazeObject = world => {
    const maze = new THREE.Object3D()

    const w = world.length
    const h = world[0].length

    // wall mat
    const wall = new THREE.MeshLambertMaterial()
    {
        const canvas = document.createElement('canvas')
        const s = 256
        canvas.height = 1
        canvas.width = s
        const ctx = canvas.getContext('2d')

        for (let i = s; i--; ) {
            ctx.fillStyle = i / s > 0.06 ? '#fff' : '#888'
            ctx.fillRect(i, 0, 1, 1)
        }

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.ClampToEdgeWrapping,
            THREE.LinearFilter,
            THREE.LinearFilter
            // THREE.NearestFilter,
        )
        texture.needsUpdate = true

        wall.map = texture
    }

    // wall aomap
    {
        const canvas = document.createElement('canvas')
        const s = 64
        canvas.width = canvas.height = s

        const ctx = canvas.getContext('2d')

        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, s, s)

        for (let x = s; x--; )
            for (let y = s; y--; ) {
                const r = Math.sqrt(x * x + y * y) / Math.sqrt(s * s) / 1.45

                const ly1 = Math.min(1, Math.max(0, (1 - y / s) * 3))
                const ly2 = Math.min(1, Math.max(0, (y / s) * 3))
                const lr = 1 - r * r
                const l =
                    (0.4 + 0.6 * (1 - (1 - ly1) * (1 - ly1))) *
                    lr *
                    (0.88 + 0.12 * ly2)

                ctx.fillStyle = `hsl(0, 0%, ${l * 100}%)`
                ctx.fillRect(x, y, 1, 1)
            }
        //
        // document.body.appendChild(canvas)
        // canvas.style.position = 'fixed'
        // canvas.style.zIndex = 99999999
        // canvas.style.top = 0

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.ClampToEdgeWrapping, // not working for aomap ?
            THREE.NearestFilter,
            THREE.LinearFilter
            // THREE.LinearFilter,
            // THREE.LinearFilter
        )
        texture.needsUpdate = true

        // wall.map = texture
        wall.aoMap = texture
        wall.aoMapIntensity = 0.8
    }

    // floor aomap
    {
        const S = 512
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = S
        const ctx = canvas.getContext('2d')

        const w = world.length
        const h = world[0].length

        // fill with white
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, S, S)

        // prepare to draw each box with blur
        ctx.fillStyle = '#333'
        ctx.filter = `blur(${(0.12 * S) / w}px)`

        // size of each box
        const s = 1.12

        for (let x = world.length; x--; )
            for (let y = world[0].length; y--; )
                if (world[x][y]) {
                    ctx.fillRect(
                        ((x - (s - 1) / 2) / w) * S,
                        ((y - (s - 1) / 2) / h) * S,
                        (s * S) / w,
                        (s * S) / h
                    )
                }

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.ClampToEdgeWrapping,
            THREE.LinearFilter,
            THREE.LinearFilter
            // THREE.NearestFilter,
            // THREE.NearestFilter
        )
        texture.needsUpdate = true
        // texture.repeat.set(world.length / L, world[0].length / L)

        floor.aoMap = texture
        floor.aoMapIntensity = 1.4

        // document.body.appendChild(canvas)
        // canvas.style.position = 'fixed'
        // canvas.style.zIndex = 99999999
        // canvas.style.top = 0
    }

    // floor
    {
        const geom = new THREE.PlaneGeometry(w, h)

        geom.faceVertexUvs[1] = geom.faceVertexUvs[0]

        const mesh = new THREE.Mesh(geom, floor)
        mesh.position.set(w / 2, 0, h / 2)
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        maze.add(mesh)
    }

    // wall
    {
        const geom = new THREE.Geometry()

        geom.faceVertexUvs = [[], []]

        const top = new THREE.Vector2(0, 0)
        const bottom = new THREE.Vector2(1, 0)

        const mapuvs = geom.faceVertexUvs[0]
        const aouvs = geom.faceVertexUvs[1]

        const pushWall = (a, b, shadowA, shadowB, d) => {
            const n = geom.faces.length

            mapuvs[n] = [top, bottom, bottom]
            mapuvs[n + 1] = [top, bottom, top]

            aouvs[n] = [
                new THREE.Vector2(0, 0.05),
                new THREE.Vector2(0, 0.95),
                new THREE.Vector2(0, 0.95),
            ]
            aouvs[n + 1] = [
                new THREE.Vector2(0, 0.05),
                new THREE.Vector2(0, 0.95),
                new THREE.Vector2(0, 0.05),
            ]

            const k = 1 - d * 0.8

            if (shadowB) {
                aouvs[n][0].x = 1
                aouvs[n][1].x = 1
                aouvs[n][2].x = k

                aouvs[n + 1][0].x = 1
                aouvs[n + 1][1].x = k
                aouvs[n + 1][2].x = k
            } else if (shadowA) {
                aouvs[n][0].x = k
                aouvs[n][1].x = k
                aouvs[n][2].x = 1

                aouvs[n + 1][0].x = k
                aouvs[n + 1][1].x = 1
                aouvs[n + 1][2].x = 1
            }

            geom.faces.push(
                new THREE.Face3(
                    geom.vertices.length + 0,
                    geom.vertices.length + 1,
                    geom.vertices.length + 2
                ),
                new THREE.Face3(
                    geom.vertices.length + 0,
                    geom.vertices.length + 2,
                    geom.vertices.length + 3
                )
            )

            geom.vertices.push(
                new THREE.Vector3(b.x, 0, b.y),
                new THREE.Vector3(b.x, 1, b.y),
                new THREE.Vector3(a.x, 1, a.y),
                new THREE.Vector3(a.x, 0, a.y)
            )
        }

        const faces = [[], [], [], []]

        for (let x = world.length; x--; )
            for (let y = world[0].length; y--; )
                if (world[x][y])
                    for (let u = 0; u < 4; u++)
                        if (!isWall(world, x + around[u].x, y + around[u].y))
                            faces[u].push({
                                x: x + around[u].x,
                                y: y + around[u].y,
                            })

        for (let i = 0; i < 4; i++) {
            const f = faces[i]
            const v = around[i].y ? 'y' : 'x'
            const u = v === 'y' ? 'x' : 'y'
            const dir = around[i].y + around[i].x

            while (f.length) {
                const j = f.shift()

                let a = j[u]
                let b = a

                const anchor = j[v]

                let fl = -1
                while (fl != f.length) {
                    fl = f.length
                    for (let k = f.length; k--; )
                        if (f[k][v] === anchor) {
                            if (f[k][u] === a - 1) {
                                f.splice(k, 1)
                                a = a - 1
                            } else if (f[k][u] === b + 1) {
                                f.splice(k, 1)
                                b = b - 1
                            }
                        }
                }

                const A = {}
                const B = {}
                A[v] = B[v] = anchor + (i == 0 || i === 1 ? 0 : 1)
                A[u] = a
                B[u] = b + 1

                const d = b + 1 - a

                let shadowA = false
                let shadowB = false

                if (i === 0) {
                    shadowA = isWall(world, A.x - 1, A.y)
                    shadowB = isWall(world, B.x, B.y)
                } else if (i === 1) {
                    shadowA = isWall(world, A.x, A.y - 1)
                    shadowB = isWall(world, B.x, B.y)
                } else if (i === 2) {
                    shadowA = isWall(world, A.x - 1, A.y - 1)
                    shadowB = isWall(world, B.x, B.y - 1)
                } else if (i === 3) {
                    shadowA = isWall(world, A.x - 1, A.y - 1)
                    shadowB = isWall(world, B.x - 1, B.y)
                }

                const pushW =
                    i == 0 || i === 3
                        ? pushWall
                        : (a, b, c, d, e) => pushWall(b, a, d, c, e)

                if (shadowA && shadowB) {
                    const C = {
                        x: (A.x + B.x) / 2,
                        y: (A.y + B.y) / 2,
                    }

                    pushW(A, C, true, false, d / 2)
                    pushW(C, B, false, true, d / 2)
                } else pushW(A, B, shadowA, shadowB, d)
            }
        }

        geom.computeFlatVertexNormals()
        geom.computeFaceNormals()
        geom.verticesNeedUpdate = true
        geom.normalsNeedUpdate = true
        geom.uvsNeedUpdate = true

        const mesh = new THREE.Mesh(geom, wall)
        mesh.scale.set(1, 2.8, 1)
        maze.add(mesh)
    }

    // ceiling
    {
        const geom = new THREE.PlaneBufferGeometry(0.08, h * 2)

        for (let x = 0; x < world.length; x += 3) {
            const mesh = new THREE.Mesh(geom, ceiling)

            mesh.rotation.x = Math.PI / 2
            mesh.position.set(x + 0.04, 4.5, h / 2)

            maze.add(mesh)
        }
    }

    // intro text
    // {
    //     const canvas = document.createElement('canvas')
    //     canvas.height = canvas.width = 512
    //     const ctx = canvas.getContext('2d')
    //     ctx.fillStyle = '#fff'
    //     ctx.fillRect(0, 0, 512, 512)
    //
    //     texts[0].forEach((t, i) => {
    //         ctx.fillStyle = '#333'
    //         ctx.font = '30px Helvetica'
    //         ctx.fillText(t, 50, i * 40 + 100)
    //     })
    //
    //     const texture = new THREE.Texture(canvas)
    //     texture.needsUpdate = true
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    //     texture.repeat.set(1, 1)
    //
    //     const mat = new THREE.MeshLambertMaterial()
    //     mat.map = texture
    //     mat.aoMap = wall.aoMap
    //     mat.aoMapIntensity = wall.aoMapIntensity
    //
    //     const planeGeom = new THREE.PlaneGeometry(2, 2)
    //
    //     const _x = 1 - 2 * 0.8
    //     const top = 0.12
    //     const bottom = 0.7
    //     planeGeom.faceVertexUvs[1] = [
    //         [
    //             new THREE.Vector2(_x, bottom),
    //             new THREE.Vector2(_x, top),
    //             new THREE.Vector2(1, bottom),
    //         ],
    //         [
    //             new THREE.Vector2(_x, top),
    //             new THREE.Vector2(1, top),
    //             new THREE.Vector2(1, bottom),
    //         ],
    //     ]
    //     planeGeom.uvsNeedUpdate
    //
    //     const mesh = new THREE.Mesh(planeGeom, mat)
    //     mesh.position.z = 0.005
    //
    //     const object = new THREE.Object3D()
    //
    //     object.position.set(30, 1.2, 30)
    //
    //     object.rotation.y = 0
    //
    //     object.add(mesh)
    //     maze.add(object)
    // }

    {
        // const light = new THREE.SpotLight(0xffffff);
        // // const light = new THREE.DirectionalLight(0xffffff, 1, 100);
        // light.position.set(w, 10, h);
        // light.castShadow = true;
        // maze.add(light);
        //
        // //Set up shadow properties for the light
        // light.shadow.mapSize.width = 512;
        // light.shadow.mapSize.height = 512;
        // light.shadow.camera.near = 0.5;
        // light.shadow.camera.far = 50;
        //
        // const helper = new THREE.CameraHelper(light.shadow.camera);
        // maze.add(helper);
        // const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight.color.setHSL(0.1, 1, 0.95);
        // dirLight.position.set(-1, 1.75, 1);
        // dirLight.position.multiplyScalar(5);
        // dirLight.castShadow = true;
        // dirLight.shadow.mapSize.width = 1024;
        // dirLight.shadow.mapSize.height = 1024;
        // dirLight.name = 'dirLight';
        // const d = 50;
        // dirLight.shadow.camera.left = -d;
        // dirLight.shadow.camera.right = d;
        // dirLight.shadow.camera.top = d;
        // dirLight.shadow.camera.bottom = -d;
        // dirLight.shadow.camera.far = 3500;
        // dirLight.shadow.bias = -0.0001;
        //
        // maze.add(dirLight);
        //
        // maze.add(new THREE.CameraHelper(dirLight.shadow.camera));
    }

    return maze
}
