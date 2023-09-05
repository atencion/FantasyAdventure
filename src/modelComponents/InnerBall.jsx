import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'

//const actionNames = ['The Life']

const InnerBall = () => {
//  const model = useGLTF('./fantasyBook/fantasyBookModded-v1.glb')

//  const animations = useAnimations(model.animations, model.scene)

//  const action = animations.actions[actionNames[0]]

  useFrame(() => {
    //action.play()
  })

  return (
    <e.mesh theatreKey='bola INNER'>
      <sphereGeometry />
      <meshStandardMaterial color="green" />
  </e.mesh>
          
  )
}

export default InnerBall
