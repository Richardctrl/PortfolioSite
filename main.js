import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({canvas: document.querySelector('#bg'), });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);

//mesh standard reacts to light
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
//const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//introducing light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

//equal lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//update camera position based on mouse
const controls = new OrbitControls(camera, renderer.domElement);

//adding many random shapes
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x, y, z);
  scene.add(star);
}

//fill with 200 random shapes
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('Space.jpg');
scene.background = spaceTexture;

const richardTexture = new THREE.TextureLoader().load('thumbnail_IMG_20210810_184759099.jpg');
const richard = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({map: richardTexture}));

scene.add(richard);

const moonTexture = new THREE.TextureLoader().load('OfficePic.png');
const moon = new THREE.Mesh(new THREE.SphereGeometry(3,32,32), new THREE.MeshStandardMaterial({map: moonTexture}));

scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

//for scrolling
function moveCamera(){
  //finding out where user is when scrolling (get dimensions of viewport, distance from top of webpage)
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  richard.rotation.y += 0.01;
  richard.rotation.x += 0.01;

  //play with numbers
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

//use function when scrolling
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();