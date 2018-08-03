const SIZE = 64
const OPACITY_AVAILABLE = [0.2, 0.5, 0.8, 1]
const RADIUS_AVAILABLE = [
    2,
    3,
    4,
    5,

    6,
    7,
    8,
    10,

    12,
    14,
    16,
    18,

    22,
    26,
    30,
    40,
]

const COLOR_PALETTE = []

// prettier-ignore
for(let r=0;r<256;r+= 50)
for(let v=0;v<256;v+= 50)
for(let b=0;b<256;b+= 42)
    COLOR_PALETTE.push([r,v,b]);

const around = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },

    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
]

// materials
const wall = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
const lat = new THREE.MeshPhongMaterial({ color: 0xc8c8c8 })
const ceiling = new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
