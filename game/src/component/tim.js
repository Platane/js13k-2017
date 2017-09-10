import { world, tick } from '../logic'

AFRAME.registerComponent('tim', {
    init: function() {
        {
            const geom = new THREE.BoxGeometry(0.1, 0.1, 0.1)
            const mat = new THREE.MeshLambertMaterial({ color: 0x2193ae })
            const mesh = new THREE.Mesh(geom, mat)

            this.el.object3D.add(mesh)
        }
    },
    tick: function() {
        const direction = this.el.children[0].object3D.rotation.y

        world.tim.direction.x = -Math.sin(direction)
        world.tim.direction.y = -Math.cos(direction)

        tick()

        this.el.object3D.position.set(
            world.tim.position.x,
            1,
            world.tim.position.y
        )
    },
})
