import { BufferGeometry, Vector3, Box3, Matrix4 } from 'three';

interface GemFeatures {
  shape: string;
  cut: string;
  settingType: string;
  size: {
    width: number;
    height: number;
    depth: number;
  };
  orientation: {
    tilt: number;
    rotation: number;
  };
}

interface GemData {
  indices: number[];
  center: Vector3;
  features: GemFeatures;
  vertices: Vector3[];
  normal: Vector3;
}

export function analyzeGeometry(geometry: BufferGeometry): {
  gems: GemData[];
  shapes: Set<string>;
} {
  const positions = geometry.attributes.position.array;
  const normals = geometry.attributes.normal?.array;
  const vertexCount = geometry.attributes.position.count;
  const gems: GemData[] = [];
  const shapes = new Set<string>();

  // Matriz de transformação para análise em espaço local
  const localMatrix = new Matrix4();

  // Análise por grupos de vértices
  for (let i = 0; i < vertexCount; i += 3) {
    const vertices: Vector3[] = [];
    const vertexNormals: Vector3[] = [];

    // Coleta vértices e normais
    for (let j = 0; j < 3; j++) {
      vertices.push(new Vector3(
        positions[(i + j) * 3],
        positions[(i + j) * 3 + 1],
        positions[(i + j) * 3 + 2]
      ));

      if (normals) {
        vertexNormals.push(new Vector3(
          normals[(i + j) * 3],
          normals[(i + j) * 3 + 1],
          normals[(i + j) * 3 + 2]
        ));
      }
    }

    // Calcula centro e normal média
    const center = new Vector3().addVectors(vertices[0], vertices[1]).add(vertices[2]).divideScalar(3);
    const normal = vertexNormals.length > 0
      ? new Vector3().addVectors(vertexNormals[0], vertexNormals[1]).add(vertexNormals[2]).normalize()
      : new Vector3(0, 1, 0);

    // Análise em espaço local para melhor detecção de características
    localMatrix.lookAt(center, center.clone().add(normal), new Vector3(0, 1, 0));
    const localVertices = vertices.map(v => v.clone().applyMatrix4(localMatrix));
    
    const box = new Box3().setFromPoints(localVertices);
    const size = box.getSize(new Vector3());

    // Detecta características da gema
    const features = analyzeGemFeatures(localVertices, size, normal);
    
    if (features) {
      gems.push({
        indices: [i, i + 1, i + 2],
        center,
        features,
        vertices: localVertices,
        normal
      });
      shapes.add(features.shape);
    }
  }

  return { gems, shapes };
}

function analyzeGemFeatures(vertices: Vector3[], size: Vector3, normal: Vector3): GemFeatures | null {
  // Análise de proporções
  const aspectRatio = size.x / size.y;
  const heightRatio = size.z / Math.max(size.x, size.y);
  
  // Detecta forma e lapidação
  let shape = 'Redonda';
  let cut = 'brilliant';

  if (aspectRatio > 1.8) {
    shape = 'Navete';
    cut = 'marquise';
  } else if (aspectRatio < 1.2 && aspectRatio > 0.8) {
    if (Math.abs(size.x - size.y) < 0.1) {
      shape = 'Redonda';
      cut = 'brilliant';
    } else {
      shape = 'Princesa';
      cut = 'princess';
    }
  } else if (heightRatio > 1.5) {
    shape = 'Gota';
    cut = 'pear';
  } else if (size.x > size.y * 1.2 && size.z < size.x * 0.8) {
    shape = 'Coração';
    cut = 'heart';
  }

  // Análise de orientação
  const tilt = Math.acos(normal.dot(new Vector3(0, 1, 0))) * (180 / Math.PI);
  const rotation = Math.atan2(normal.x, normal.z) * (180 / Math.PI);

  // Detecta tipo de cravação baseado na geometria
  const settingType = analyzeSettingType(vertices, size);

  return {
    shape,
    cut,
    settingType,
    size: {
      width: size.x,
      height: size.y,
      depth: size.z
    },
    orientation: {
      tilt,
      rotation
    }
  };
}

function analyzeSettingType(vertices: Vector3[], size: Vector3): string {
  const maxDistance = Math.max(...vertices.map(v => v.length()));
  const minDistance = Math.min(...vertices.map(v => v.length()));
  const distanceRatio = maxDistance / minDistance;

  if (distanceRatio > 2) {
    return 'prong';
  } else if (distanceRatio < 1.2) {
    return 'bezel';
  } else if (size.z < size.x * 0.3) {
    return 'pavé';
  } else {
    return 'channel';
  }
}