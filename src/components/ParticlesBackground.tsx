'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';

interface ParticlesProps {
    count?: number;
    color?: string;
}

const Particles = ({ count = 3000, color = "#ffffff" }: ParticlesProps) => {
    const points = useRef<THREE.Points>(null);

    // Generate random positions and initial velocities
    const [positions, velocities, originalPositions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Create a random position in a sphere or large cube
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return [positions, velocities, originalPositions];
    }, [count]);

    const mouse = useRef(new THREE.Vector2(0, 0));
    const targetMouse = useRef(new THREE.Vector2(0, 0));

    useFrame((state) => {
        if (!points.current) return;

        // Smooth mouse movement
        targetMouse.current.x = (state.pointer.x * state.viewport.width) / 2;
        targetMouse.current.y = (state.pointer.y * state.viewport.height) / 2;

        mouse.current.lerp(targetMouse.current, 0.05);

        const positionsArray = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Basic drift
            positionsArray[i3] += velocities[i3];
            positionsArray[i3 + 1] += velocities[i3 + 1];
            positionsArray[i3 + 2] += velocities[i3 + 2];

            // Keep bounds bounds
            if (Math.abs(positionsArray[i3]) > 10) velocities[i3] *= -1;
            if (Math.abs(positionsArray[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
            if (Math.abs(positionsArray[i3 + 2]) > 10) velocities[i3 + 2] *= -1;

            // Mouse attraction / repulsion
            const dx = mouse.current.x - positionsArray[i3];
            const dy = mouse.current.y - positionsArray[i3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If close to cursor, attract slightly and add some noise
            if (dist < 4) {
                const force = (4 - dist) / 4;
                positionsArray[i3] += dx * force * 0.02;
                positionsArray[i3 + 1] += dy * force * 0.02;
            } else {
                // Slowly return to original floating behavior near original pos
                positionsArray[i3] = MathUtils.lerp(positionsArray[i3], originalPositions[i3] + Math.sin(state.clock.elapsedTime + i) * 0.5, 0.01);
                positionsArray[i3 + 1] = MathUtils.lerp(positionsArray[i3 + 1], originalPositions[i3 + 1] + Math.cos(state.clock.elapsedTime + i) * 0.5, 0.01);
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;
        points.current.rotation.y = state.clock.elapsedTime * 0.05;
        points.current.rotation.x = state.clock.elapsedTime * 0.02;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const ParticlesBackground = ({ count = 3000, color = "#ffffff" }: ParticlesProps) => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    <Particles count={count} color={color} />
                </Suspense>
            </Canvas>
        </div>
    );
};
