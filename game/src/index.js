require('./component/tim');
require('./component/museum');

window.onload = () => {
    const { renderer } = document.getElementsByTagName('a-scene')[0];

    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
};
