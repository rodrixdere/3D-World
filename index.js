import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield.js';
import { getFresnelMat } from './getFresnelMat.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();

const geometry = new THREE.IcosahedronGeometry(1, 15);

const material = new THREE.MeshPhongMaterial({
    map: loader.load("assets/00_earthmap1k.jpg"),
    specular: 0x222222,
    shininess: 15
});

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("assets/03_earthlights1k.jpg"),
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
});

const lightsMesh = new THREE.Mesh(geometry,lightsMat);
earthGroup.add(lightsMesh);

const ambientLight = new THREE.AmbientLight(0x222222); // luz tenue general
scene.add(ambientLight);

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("assets/06_earthcloudmaptrans4k.jpg"),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
});

const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003)
cloudsMesh.rotation.z = -23.4 * Math.PI / 180;
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();

const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1)
earthGroup.add(glowMesh);

const stars = new getStarfield({ numStars: 5000 });
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff, 0.3);
sunLight.position.set(5, 0, 5);
sunLight.castShadow = true;
scene.add(sunLight);


function animate() {
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0026;
    glowMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();





function handleWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

window.addEventListener('resize', handleWindowResize);