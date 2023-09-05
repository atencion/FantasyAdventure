
import React from 'react'
// import { Box } from 'drei';
import { Box } from '@react-three/drei';

const ACube = () => {
  return (
    <Box args={[5, 5, 5]} position={[-15, 5, 20]}>
      <meshStandardMaterial color="orange" />
    </Box>
  )
}

export default ACube




