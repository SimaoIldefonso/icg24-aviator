// INIT THREE JS, SCREEN AND MOUSE EVENTS FOR THE START SCREEN

let sceneStart, cameraStart, rendererStart, containerStart;

function initStartScreen() {
  const WIDTH = window.innerWidth;
  const HEIGHT = 300; // Ajuste a altura conforme necessário

  sceneStart = new THREE.Scene();
  cameraStart = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
  cameraStart.position.set(0, 100, 200);

  rendererStart = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  rendererStart.setSize(WIDTH, HEIGHT);
  rendererStart.shadowMap.enabled = true;

  containerStart = document.getElementById('planeContainer');
  containerStart.appendChild(rendererStart.domElement);

  window.addEventListener('resize', handleWindowResizeStart, false);

  createLightsStart();
  createPlaneStart();
  animateStart();
}

function handleWindowResizeStart() {
  const WIDTH = window.innerWidth;
  const HEIGHT = 300; // Ajuste a altura conforme necessário
  rendererStart.setSize(WIDTH, HEIGHT);
  cameraStart.aspect = WIDTH / HEIGHT;
  cameraStart.updateProjectionMatrix();
}

function createLightsStart() {
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);
  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  sceneStart.add(hemisphereLight);
  sceneStart.add(shadowLight);
  sceneStart.add(ambientLight);
}

let airplaneStart;

function createPlaneStart() {
  airplaneStart = new AirPlane();
  airplaneStart.mesh.scale.set(0.5, 0.5, 0.5); // Aumentar a escala do avião
  airplaneStart.mesh.position.y = 50; // Ajuste a posição Y conforme necessário
  sceneStart.add(airplaneStart.mesh);
}

function animateStart() {
  requestAnimationFrame(animateStart);
  airplaneStart.propeller.rotation.x += 0.3;
  airplaneStart.pilot.updateHairs(); // Atualiza o cabelo do piloto
  rendererStart.render(sceneStart, cameraStart);
}

window.addEventListener('load', initStartScreen, false);
