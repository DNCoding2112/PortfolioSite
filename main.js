import './style.css';

import * as THREE from 'three';

// import { OrbitControls } from 'three/examples/jsm/Addons.js';

//Creating Scene
const scene=new THREE.Scene();

//Creating Camera
const camera=new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//Creating Renderer
const renderer=new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
});

//Setting Size of Window
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

//Rendering
renderer.render(scene,camera);

//Creating Main Shape Torus
const geometry=new THREE.TorusGeometry(10,3,6,100);
const material=new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus=new THREE.Mesh(geometry,material);
scene.add(torus);

//Light that is like a tube light
const pointLight=new THREE.PointLight(0xffffff,200,50,2);
pointLight.position.set(5,5,5);

//Light that illuminates everything
const ambientLight=new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

//Light Position Marker, Grid Marker
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper,lightHelper);

//React to Mouse Movements
// const controls=new OrbitControls(camera, renderer.domElement);

//Stars in background
function addStar(){
  const geometry=new THREE.SphereGeometry(0.25,24,24);
  const material=new THREE.MeshStandardMaterial({color:0xffffff});
  const star=new THREE.Mesh(geometry, material);

  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

//Space background
const spaceTexture=new THREE.TextureLoader().load('./space.jpg');
scene.background=spaceTexture;

//Cube with face on it on all faces
const broTexture=new THREE.TextureLoader().load('./bro.jpg');

const bro=new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: broTexture}),
);

scene.add(bro);

//map->image on shape, normalmap->texture on shape
const moonTexture=new THREE.TextureLoader().load('./moon.jpg');
const normalTexture=new THREE.TextureLoader().load('./normal.jpg');
const moon=new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z=30;
moon.position.setX(-10);

bro.position.z=-5;
bro.position.x=2;

function moveCamera(){
  const t=document.body.getBoundingClientRect().top;
  moon.rotation.x+=0.05;
  moon.rotation.y+=0.075;
  moon.rotation.z+=0.05;

  bro.rotation.y+=0.01;
  bro.rotation.z+=0.01;
  
  camera.position.z=t*-0.01;
  camera.position.y=t*-0.0002;
  camera.position.x=t*0.002;
}

document.body.onscroll=moveCamera;

moveCamera();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.z+=0.01;
  moon.rotation.x+=0.005;
  // controls.update();
  renderer.render(scene,camera);
}

animate();