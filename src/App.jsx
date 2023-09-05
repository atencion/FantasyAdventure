import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ScrollControls, useScroll, SpotLight, Text, Backdrop, Box } from '@react-three/drei'
import { getProject, val } from '@theatre/core'
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'
import { BlendFunction, BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import { Scanline, EffectComposer, Bloom, Noise, ChromaticAberration, TiltShift2, DepthOfField } from '@react-three/postprocessing'

import FantasyBook from './modelComponents/FantasyBook'
import InnerBall from './modelComponents/InnerBall'
import Parrot  from './modelComponents/Parrot'
import Suzanne from './modelComponents/Suzanne'
import Fox from './modelComponents/Fox'
import Tv from './modelComponents/Tv'
import ACube from './modelComponents/ACube'

import flyThroughState from './fly.json'

// BRANCH 1.5  test FINAL Merged
// AHORA EN GIT TODO OK
// aca terminan los imports

function App() {
  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )
  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        {/* <OrbitControls/> */}
        <ScrollControls pages={5} damping={0.2} maxSpeed={0.5}>
          <SheetProvider sheet={sheet}>
            <Scene />
            
          </SheetProvider>
        </ScrollControls>
 {/*Ahora los efectos*/}
        <EffectComposer disableNormalPass multisampling={4}>
          <Noise 
          premultiply // enables or disables noise premultiplication
          blendFunction={BlendFunction.SCREEN} // blend mode
          />
          {/* <ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.003, 0.003]} // color offset
          /> */}
        <DepthOfField
    focusDistance={0.01} // where to focus
    focalLength={0.03} // focal length
    bokehScale={5} // bokeh size
  />
    <Scanline
    blendFunction={BlendFunction.OVERLAY} // blend mode
    density={2.25} // scanline density
  />

       {/*<TiltShift2 blur={1.5} />*/}
      {/* <Noise opacity={0.02} /> */}
   <Bloom
    intensity={1.0} // The bloom intensity.
    blurPass={undefined} // A blur pass.
    kernelSize={KernelSize.LARGE} // blur kernel size
    luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
    mipmapBlur={false} // Enables or disables mipmap blur.
    resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
    resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
  />

    </EffectComposer>        

      </Canvas>
    </>
  )
}

export default App

//
//

function Scene() {
  const sheet = useCurrentSheet()
  const scroll = useScroll()
  //sheet.sequence.play()

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length)
    // La hago durar 7 segundos a manopla
    // const sequenceLength = 7;
    // console.log(sequenceLength);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength
  })

  return (
    <>
      <color attach='background' args={['black']} />

      {/* <ambientLight /> */}
      <e.pointLight theatreKey='bluelight' distance={60} intensity={4} color="lightblue" />
    <e.spotLight theatreKey='redlight' intensity={1.5} position={[0, 0, 2000]} penumbra={1} color="red" />
    <e.pointLight theatreKey='teerlight' distance={60} intensity={4} color="lightblue" />
      <FantasyBook />
      {/* <ACube /> */}
      <meshStandardMaterial color="blue" />
    
      {/* <Backdrop receiveShadow scale={[3, 3, 3]} floor={1.5} position={[-15, 1, 20]}>
        <meshPhysicalMaterial roughness={1} color="#efefef" />
      </Backdrop> */}
      <Parrot scale={2} position={[-3, -3, 10]}/>
      <Parrot scale={1} position={[-10, 0, 25]}/>
      <Suzanne scale={1} position={[-7, 0, 7]} rotation={[1, 0, 0]}/>
      <Fox scale={0.6} position={[-10, -0.7, 10]}/>
      <Tv scale={3} position={[-3, 0, 0]}/>
      <InnerBall />
      <e.group 
        scale={4}
        theatreKey='grupete1'
            >
        <Text color="white" anchorX="center" anchorY="middle" scale={3}>
          Cami Lucio Bruno León 
        </Text>

        </e.group>

      <e.mesh theatreKey='bola'>
      <sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    </e.mesh>
      <PerspectiveCamera
        theatreKey='Camera 2'
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  )
}
