import { createPlaneMarker } from "./objects/PlaneMarker";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "./utils/hitTest";

import {
  AmbientLight,
  BoxBufferGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from "three";

export function createScene(renderer: WebGLRenderer) {
  // TODO: Create a scene and build a WebXR app!
  const scene = new Scene(); // initialize empty scene object
  const camera = new PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.02, // near plane value
    20 // far plane value
  )

  const geometry = new BoxBufferGeometry(1.5, 1.5, 1.5); // creates a cube where the geom changes by modding width, height, depth
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material); // create box mesh by passing geometry and material
  cube.position.z = -4; // how far away object is from you
  cube.position.y = -3;

  const edges = new EdgesGeometry(geometry);
  const edgeMaterial = new LineBasicMaterial({ color: 0x000000 });
  const wireframe = new LineSegments(edges, edgeMaterial);

  scene.add(cube); // add cube to scene
  scene.add(wireframe); // add cube to scene

  function renderLoop(timestamp: number, frame?: XRFrame) {

    cube.rotation.y += 0.01; // change cube's rotation slightly on every frame
    cube.rotation.x += 0.01;

    wireframe.position.copy(cube.position); // Keep wireframe in place by copying cube position to wireframe
    wireframe.rotation.copy(cube.rotation); 

    if (renderer.xr.isPresenting) {
        renderer.render(scene, camera);
    }
  }
  renderer.setAnimationLoop(renderLoop); // ensure renderLoop is called on every frame -> renders scene
}
