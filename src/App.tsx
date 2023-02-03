import './App.css'
import '@matterport/webcomponent';
import { MpSdk } from '@matterport/webcomponent';
import { useEffect } from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "matterport-viewer": any;
    }
  }
}

let sdkKey = "5n1rihzdbgxus7k1exfne27ac"

async function onSdkPlaying(sdk: MpSdk) {
  console.log('SDK Connected: ', sdk)
  // run your SDK code here
  var [sceneObject] = await sdk.Scene.createObjects(1);
  var logoNode = sceneObject.addNode("logoNode");
  var lightNode = sceneObject.addNode("lightNode");

  var logoInitialInputs = {
    url: "/assets/Matterport_Logo.gltf",
    visible: true,
    localScale: {
      x: 0.075,
      y: 0.075,
      z: 0.075,
    },
  };

  var directionalLightInitialInputs = {
    enabled: true,
    color: {
      r: 1,
      g: 1,
      b: 1,
    },
    intensity: 2,
    target: {
      x: 0,
      y: 0,
      z: 0,
    },
    debug: false,
  };

  var ambientLightInitialInputs = {
    intensity: 1,
    color: {
      r: 1,
      g: 1,
      b: 1,
    },
  }

  logoNode.addComponent(
    "mp.gltfLoader",
    logoInitialInputs
  );

  var lightComponent = lightNode.addComponent(
    "mp.directionalLight",
    directionalLightInitialInputs
  );

  lightNode.addComponent(
    "mp.ambientLight",
    ambientLightInitialInputs
  );

  sceneObject.start();
  logoNode.obj3D.position.set(0, 0, 0);
  lightComponent.light.target = logoNode.obj3D;

  const tick = function () {
    requestAnimationFrame(tick);
    logoNode.obj3D.rotation.y += 0.01;
  };
  tick();
}

function handleViewerPlaying(event) {
  console.log(event)
  const mpSdk = event.detail.mpSdk;
  
}

function App() {
  useEffect(() => {
    const viewer = document.querySelector<MatterportViewer>('matterport-viewer')
    viewer?.addEventListener('mpSdkPlaying', evt => {
      console.log(event)
      const mpSdk = evt.detail.mpSdk;
      onSdkPlaying(mpSdk)
    })
  }, [])

  return (
    <div className="App">
      <matterport-viewer m="j4RZx7ZGM6T" asset-base={'mp_bundle'} application-key={sdkKey} qs={1} log={0} />
    </div>
  )
}

export default App
