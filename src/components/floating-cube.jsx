"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export function FloatingCube() {
  const meshRef = useRef(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#10b981" transparent opacity={0.6} wireframe />
    </mesh>
  )
}