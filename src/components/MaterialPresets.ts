import { Color } from 'three';

export const metalPresets = {
  gold: {
    name: 'Ouro 18k',
    variants: {
      polished: {
        color: '#FFD700',
        metalness: 0.95,
        roughness: 0.1,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
      },
      brushed: {
        color: '#FFD700',
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.4,
        reflectivity: 0.8,
      },
      matte: {
        color: '#FFD700',
        metalness: 0.85,
        roughness: 0.5,
        envMapIntensity: 1,
        clearcoat: 0,
        clearcoatRoughness: 0,
        reflectivity: 0.6,
      }
    }
  },
  roseGold: {
    name: 'Ouro Rosé 18k',
    variants: {
      polished: {
        color: '#B76E79',
        metalness: 0.95,
        roughness: 0.1,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
      },
      brushed: {
        color: '#B76E79',
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.4,
        reflectivity: 0.8,
      },
      matte: {
        color: '#B76E79',
        metalness: 0.85,
        roughness: 0.5,
        envMapIntensity: 1,
        clearcoat: 0,
        clearcoatRoughness: 0,
        reflectivity: 0.6,
      }
    }
  },
  whiteGold: {
    name: 'Ouro Branco 18k',
    variants: {
      polished: {
        color: '#F0F2F5',
        metalness: 0.95,
        roughness: 0.1,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
      },
      brushed: {
        color: '#F0F2F5',
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.4,
        reflectivity: 0.8,
      },
      matte: {
        color: '#F0F2F5',
        metalness: 0.85,
        roughness: 0.5,
        envMapIntensity: 1,
        clearcoat: 0,
        clearcoatRoughness: 0,
        reflectivity: 0.6,
      }
    }
  }
};

export const gemPresets = {
  diamond: {
    name: 'Diamante',
    color: '#FFFFFF',
    transmission: 0.95,
    thickness: 0.5,
    roughness: 0.01,
    ior: 2.42,
    dispersion: 0.0125,
    specularIntensity: 2,
    envMapIntensity: 3,
    clearcoat: 1,
    clearcoatRoughness: 0,
    attenuationColor: new Color('#FFFFFF'),
    attenuationDistance: 1,
    cuts: {
      brilliant: { facets: 57, crown: 34.5, pavilion: 40.75 },
      princess: { facets: 49, crown: 43, pavilion: 45 },
      emerald: { facets: 44, crown: 34, pavilion: 43 },
      oval: { facets: 56, crown: 34.5, pavilion: 40.75 },
      marquise: { facets: 56, crown: 34, pavilion: 41 },
      pear: { facets: 58, crown: 34, pavilion: 41 },
      heart: { facets: 59, crown: 34, pavilion: 41 }
    }
  },
  sapphire: {
    name: 'Safira',
    color: '#0033AA',
    transmission: 0.8,
    thickness: 0.6,
    roughness: 0.02,
    ior: 1.77,
    dispersion: 0.018,
    specularIntensity: 1.5,
    envMapIntensity: 2.5,
    clearcoat: 1,
    clearcoatRoughness: 0,
    attenuationColor: new Color('#0033AA'),
    attenuationDistance: 0.8
  },
  ruby: {
    name: 'Rubi',
    color: '#CC0000',
    transmission: 0.8,
    thickness: 0.6,
    roughness: 0.02,
    ior: 1.77,
    dispersion: 0.018,
    specularIntensity: 1.5,
    envMapIntensity: 2.5,
    clearcoat: 1,
    clearcoatRoughness: 0,
    attenuationColor: new Color('#CC0000'),
    attenuationDistance: 0.8
  },
  emerald: {
    name: 'Esmeralda',
    color: '#00A36C',
    transmission: 0.75,
    thickness: 0.7,
    roughness: 0.03,
    ior: 1.57,
    dispersion: 0.014,
    specularIntensity: 1.3,
    envMapIntensity: 2,
    clearcoat: 1,
    clearcoatRoughness: 0,
    attenuationColor: new Color('#00A36C'),
    attenuationDistance: 0.7
  }
};

export const settingTypes = {
  prong: {
    name: 'Garras',
    variants: ['4 garras', '6 garras', '8 garras'],
    description: 'Fixação por garras individuais'
  },
  bezel: {
    name: 'Cravação Inglesa',
    variants: ['completa', 'parcial'],
    description: 'Aro metálico envolvendo a gema'
  },
  channel: {
    name: 'Canal',
    variants: ['linear', 'curvo'],
    description: 'Gemas alinhadas em um canal'
  },
  pavé: {
    name: 'Pavê',
    variants: ['micropavê', 'pavê francês'],
    description: 'Múltiplas gemas pequenas próximas'
  },
  tension: {
    name: 'Tensão',
    variants: ['clássica', 'moderna'],
    description: 'Gema suspensa por pressão'
  }
};