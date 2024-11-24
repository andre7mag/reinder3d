import { useState } from 'react';
import { Diamond, Gem } from 'lucide-react';

export const materialProperties = {
  gold: {
    color: '#FFD700',
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  },
  roseGold: {
    color: '#B76E79',
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  },
  whiteGold: {
    color: '#F0F2F5',
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  },
  diamond: {
    color: '#FFFFFF',
    metalness: 0.1,
    roughness: 0.01,
    transmission: 0.8,
    thickness: 0.5,
    envMapIntensity: 3,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 1,
    ior: 2.42,
    specularIntensity: 2,
    specularColor: '#FFFFFF',
    attenuationColor: '#FFFFFF',
    attenuationDistance: 1,
  },
  sapphire: {
    color: '#0033AA',
    metalness: 0.1,
    roughness: 0.01,
    transmission: 0.7,
    thickness: 0.5,
    envMapIntensity: 2.5,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 1,
    ior: 1.77,
    specularIntensity: 1.5,
    specularColor: '#A5C8FF',
    attenuationColor: '#0033AA',
    attenuationDistance: 1,
  },
  ruby: {
    color: '#CC0000',
    metalness: 0.1,
    roughness: 0.01,
    transmission: 0.7,
    thickness: 0.5,
    envMapIntensity: 2.5,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 1,
    ior: 1.77,
    specularIntensity: 1.5,
    specularColor: '#FFB0B0',
    attenuationColor: '#CC0000',
    attenuationDistance: 1,
  },
};

type MaterialSelectorProps = {
  selectedMaterial: string;
  onMaterialChange: (material: string) => void;
  hasGems: boolean;
};

export default function MaterialSelector({ selectedMaterial, onMaterialChange, hasGems }: MaterialSelectorProps) {
  const [showGemMaterials, setShowGemMaterials] = useState(false);

  const metalMaterials = ['gold', 'roseGold', 'whiteGold'];
  const gemMaterials = ['diamond', 'sapphire', 'ruby'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Material Base</label>
        <div className="grid grid-cols-3 gap-2">
          {metalMaterials.map((mat) => (
            <button
              key={mat}
              onClick={() => onMaterialChange(mat)}
              className={`px-3 py-2 rounded-lg text-sm transition ${
                selectedMaterial === mat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {mat === 'gold' ? 'Ouro' : 
               mat === 'roseGold' ? 'Ouro Rosé' : 
               'Ouro Branco'}
            </button>
          ))}
        </div>
      </div>

      {hasGems && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Material das Gemas</label>
            <button
              onClick={() => setShowGemMaterials(!showGemMaterials)}
              className={`p-2 rounded-lg transition ${
                showGemMaterials ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {showGemMaterials ? <Diamond className="w-4 h-4" /> : <Gem className="w-4 h-4" />}
            </button>
          </div>

          {showGemMaterials && (
            <div className="grid grid-cols-3 gap-2">
              {gemMaterials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => onMaterialChange(mat)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    selectedMaterial === mat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {mat === 'diamond' ? 'Diamante' : 
                   mat === 'sapphire' ? 'Safira' : 
                   'Rubi'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}