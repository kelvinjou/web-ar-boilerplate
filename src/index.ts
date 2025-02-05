import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { createScene } from "./scene";
import {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
} from "./utils/domUtils";

import "./styles.css";

function initializeXRApp() {
  // TODO: Initialize XR features.
  const { devicePixelRatio, innerHeight, innerWidth } = window; // determining device dimensions
  const renderer = new WebGLRenderer({antialias: true, alpha: true })
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(devicePixelRatio);

    // enable XR functionality on renderer:
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer,
        { requiredFeatures: ['hit-test'] }));
    createScene(renderer); // passes scene from scene.ts to renderer
    displayIntroductionMessage();
};

async function start() {
  // TODO: Check for WebXR AR support, and start the app if WebXR is supported.
  const immersiveArSupported = await browserHasImmersiveArCompatibility();
  immersiveArSupported ? initializeXRApp() : displayUnsupportedBrowserMessage();
};

start();
