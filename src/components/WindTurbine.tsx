import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WindTurbineProps {
  position: [number, number, number];
  isAnimating: boolean;
  activeSection: string;
}

const WindTurbine: React.FC<WindTurbineProps> = ({ position, isAnimating, activeSection }) => {
  const turbineRef = useRef<Mesh>(null);
  const bladesRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (isAnimating && bladesRef.current) {
      bladesRef.current.rotation.z += 0.05;
    }
    
    // Add slight bob animation
    if (turbineRef.current) {
      turbineRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const isHighlighted = activeSection === 'turbine';

  return (
    <group ref={turbineRef} position={position}>
      {/* Tower */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 4]} />
        <meshStandardMaterial color={isHighlighted ? "#3b82f6" : "#666666"} />
      </mesh>
      
      {/* Nacelle (housing) */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 1.2]} />
        <meshStandardMaterial color={isHighlighted ? "#60a5fa" : "#888888"} />
      </mesh>
      
      {/* Hub */}
      <mesh position={[0, 2.2, 0.6]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color={isHighlighted ? "#1d4ed8" : "#555555"} />
      </mesh>
      
      {/* Blades */}
      <group ref={bladesRef} position={[0, 2.2, 0.6]}>
        {/* Blade 1 */}
        <mesh rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 1.5, 0.1]} />
          <meshStandardMaterial 
            color={isHighlighted ? "#dbeafe" : "#cccccc"}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Blade 2 */}
        <mesh rotation={[0, 0, Math.PI * 2/3]} castShadow>
          <boxGeometry args={[0.02, 1.5, 0.1]} />
          <meshStandardMaterial 
            color={isHighlighted ? "#dbeafe" : "#cccccc"}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Blade 3 */}
        <mesh rotation={[0, 0, Math.PI * 4/3]} castShadow>
          <boxGeometry args={[0.02, 1.5, 0.1]} />
          <meshStandardMaterial 
            color={isHighlighted ? "#dbeafe" : "#cccccc"}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Base */}
      <mesh position={[0, -2.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
};

export default WindTurbine;