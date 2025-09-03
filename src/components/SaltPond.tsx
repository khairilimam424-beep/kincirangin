import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface SaltPondProps {
  position: [number, number, number];
  activeSection: string;
}

const SaltPond: React.FC<SaltPondProps> = ({ position, activeSection }) => {
  const waterRef = useRef<Mesh>(null);
  const pumpRef = useRef<Mesh>(null);

  useFrame((state) => {
    // Water animation
    if (waterRef.current) {
      waterRef.current.position.y = position[1] + 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
    
    // Pump animation
    if (pumpRef.current) {
      pumpRef.current.position.y = position[1] + 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const isHighlighted = activeSection === 'energy';

  return (
    <group position={position}>
      {/* Salt pond base */}
      <mesh receiveShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Water/brine */}
      <mesh ref={waterRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[2.8, 0.1, 1.8]} />
        <meshStandardMaterial 
          color={isHighlighted ? "#06b6d4" : "#4FC3F7"}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Salt crystals */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            0.15,
            (Math.random() - 0.5) * 1.5
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#F8F8FF" />
        </mesh>
      ))}
      
      {/* Water pump */}
      <mesh ref={pumpRef} position={[-1, 0.5, -0.8]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.4]} />
        <meshStandardMaterial color={isHighlighted ? "#ef4444" : "#666666"} />
      </mesh>
      
      {/* Pump handle */}
      <mesh position={[-1, 0.8, -0.8]}>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Irrigation channels */}
      <mesh position={[0, 0.05, -1.2]}>
        <boxGeometry args={[2.5, 0.05, 0.2]} />
        <meshStandardMaterial color="#4FC3F7" transparent opacity={0.6} />
      </mesh>
      
      <mesh position={[1.2, 0.05, 0]}>
        <boxGeometry args={[0.2, 0.05, 1.8]} />
        <meshStandardMaterial color="#4FC3F7" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export default SaltPond;