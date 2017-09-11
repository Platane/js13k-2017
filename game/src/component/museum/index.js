import * as material from '../material';
import { world } from '../../logic';
import { generatePaintings } from './painting';

import type { WorldGrid } from '../../type';

const generateMazeObject = (world: WorldGrid) => {
    const maze = new THREE.Object3D();

    const mat = material.wall;

    const w = world.length;
    const h = world[0].length;

    const floor = new THREE.MeshLambertMaterial();
    {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        for (let i = 16; i--; ) {
            ctx.beginPath();
            ctx.rect(i, 0, 1, 1);

            const h = 32 + (0 | (8 * Math.random()));
            const l = 22 + (0 | (20 * Math.random()));

            ctx.fillStyle = `hsl(${h}, 55%, ${l}%)`;
            ctx.fill();
        }

        const texture = new THREE.Texture(
            canvas,
            THREE.UVMapping,
            THREE.RepeatWrapping,
            THREE.NearestFilter,
            THREE.NearestFilter
        );
        texture.needsUpdate = true;
        texture.repeat.set(10, 1);

        floor.map = texture;
    }

    // floor
    {
        const geom = new THREE.PlaneBufferGeometry(w, h);
        const mesh = new THREE.Mesh(geom, floor);
        mesh.position.set(w / 2, 0, h / 2);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        maze.add(mesh);
    }

    // wall
    {
        const geom = new THREE.BoxBufferGeometry(1, 3.2, 1);
        const geomlat = new THREE.BoxBufferGeometry(1.01, 0.2, 1.01);

        for (let x = world.length; x--; )
            for (let y = world[0].length; y--; )
                if (world[x][y]) {
                    const mesh = new THREE.Mesh(geom, mat);
                    mesh.position.set(x + 0.5, 0.8, y + 0.5);

                    mesh.castShadow = true;
                    mesh.receiveShadow = false;
                    maze.add(mesh);

                    const mesh2 = new THREE.Mesh(geomlat, material.lat);
                    mesh2.position.set(x + 0.5, 0.05, y + 0.5);
                    maze.add(mesh2);
                }
    }

    // rect
    {
        const m = [
            new THREE.BoxBufferGeometry(w, 3, 1),
            new THREE.BoxBufferGeometry(w, 3, 1),
            new THREE.BoxBufferGeometry(1, 3, h),
            new THREE.BoxBufferGeometry(1, 3, h)
        ].map(geom => new THREE.Mesh(geom, mat));

        m[0].position.set(w / 2, 1.5, h + 0.5);
        m[1].position.set(w / 2, 1.5, -0.5);
        m[2].position.set(w + 0.5, 1.5, h / 2);
        m[3].position.set(-0.5, 1.5, h / 2);

        maze.add(...m);
    }

    // ceiling
    {
        const geom = new THREE.PlaneBufferGeometry(0.06, h);

        for (let x = 0; x < world.length; x += 3) {
            const mesh = new THREE.Mesh(geom, material.ceiling);

            mesh.rotation.x = Math.PI / 2;
            mesh.position.set(x + 0.03, 3.5, h / 2);

            maze.add(mesh);
        }
    }

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

    return maze;
};

AFRAME.registerComponent('museum', {
    init: function() {
        const container = this.el.object3D;

        container.add(generateMazeObject(world.worldGrid));

        this.p = generatePaintings(world.worldGrid);

        container.add(this.p.object);
    },
    tick: function() {
        this.p.update(world.tim);
    }
});
