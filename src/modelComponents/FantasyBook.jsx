import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const actionNames = ['The Life']

const FantasyBook = () => {
  const model = useGLTF('./fantasyBook/fantasyBookModded-v1.glb')

  const animations = useAnimations(model.animations, model.scene)

  const action = animations.actions[actionNames[0]]
  console.log(animations)  
  //action.stop()
  useFrame(() => {
    action.play()
  })

  return (
//    <mesh onClick={action.play()}>
    <mesh
    onClick={() => console.log("MAXXX")  }>
      <primitive object={model.scene} />
    </mesh>
          
  )
}

export default FantasyBook
