import { useRef, useEffect, useMemo } from 'react';
import { Mesh, BufferGeometry, MeshPhysicalMaterial, Color } from 'three';
import { useLoader } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { materialProperties } from './MaterialSelector';
import { analyzeGeometry } from './GemAnalyzer';

interface Model3DProps {
  url: string;
  material: string;
  gemColor: string;
  gemPreset: {
    transmission: number;
    ior: number;
  };
  onGeometryAnalyzed: (hasGems: boolean, shapes: string[]) => void;
}

export default function Model3D({ url, material, gemColor, gemPreset, onGeometryAnalyzed }: Model3DProps) {
  const meshRef = useRef<Mesh>(null);
  const geometry = useLoader(STLLoader, url);

  // Material base
  const materials = useMemo(() => {
    const baseMaterial = new MeshPhysicalMaterial({
      ...materialProperties[material as keyof typeof materialProperties],
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });

    // Material para gemas
    const gemMaterial = new MeshPhysicalMaterial({
      color: new Color(gemColor),
      metalness: 0.1,
      roughness: 0.01,
      transmission: gemPreset.transmission,
      thickness: 0.5,
      envMapIntensity: 3,
      clearcoat: 1,
      clearcoatRoughness: 0,
      ior: gemPreset.ior,
      attenuationDistance: 0.5,
      attenuationColor: new Color(gemColor).multiplyScalar(0.5)
    });

    return [baseMaterial, gemMaterial];
  }, [material, gemColor, gemPreset]);

  useEffect(() => {
    if (meshRef.current && geometry) {
      const { gems, shapes } = analyzeGeometry(geometry);
      onGeometryAnalyzed(gems.length > 0, Array.from(shapes));
    }
  }, [geometry]);

  if (!geometry) return null;

  return (
    <Center>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={materials[0]}
        castShadow
        receiveShadow
      />
    </Center>
  );
}