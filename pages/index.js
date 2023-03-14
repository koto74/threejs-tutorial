import Head from 'next/head'
import Image from 'next/image'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { useEffect, useState } from 'react'

const Plane = (props) => {
    const ref = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props}))
    return (
        <mesh receiveShadow ref={ref}>
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
    )
}

const Cube = (props) => {
    const ref = useBox(() => ({ mass: 1, ...props}))
    return (
        <mesh castShadow ref={ref}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

export default function Home() {
    const [ready, set] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => set(true), 1000)
        return () => clearTimeout(timeout)
    }, [])
    return (
        <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
            <ambientLight />
            <spotLight position={[10, 10, 5]} angle={0.25} penumbra={0.5} castShadow />
            <Physics>
                <Plane />
                <Cube position={[0, 5, 0]} />
            </Physics>
        </Canvas>
    )
}
