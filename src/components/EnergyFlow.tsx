import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface EnergyFlowProps {
  activeSection: string;
  isAnimating: boolean;
}

const EnergyFlow: React.FC<EnergyFlowProps> = ({ activeSection, isAnimating }) => {
  const particlesRef = useRef<Group>(null);

  useFrame((state) => {
    if (particlesRef.current && isAnimating && activeSection === 'energy') {
      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as any;
        mesh.position.x += 0.02;
        if (mesh.position.x > 6) {
          mesh.position.x = -6;
        }
        mesh.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01;
      });
    }
  });

  if (activeSection !== 'energy') return null;

  return (
    <group ref={particlesRef}>
      {/* Energy particles flowing from turbine to pond */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh 
          key={i}
          position={[-6 + i * 0.6, 1 + Math.sin(i) * 0.5, 0]}
        >
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial 
            color={`hsl(${60 + i * 10}, 80%, 60%)`}
            emissive={`hsl(${60 + i * 10}, 80%, 30%)`}
          />
        </mesh>
      ))}
    </group>
  );
};

export default EnergyFlow;