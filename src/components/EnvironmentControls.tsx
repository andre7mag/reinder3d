import { useState } from 'react';
import { Sun, Moon, CloudSun, Droplets } from 'lucide-react';

const environments = {
  studio: {
    name: 'Estúdio',
    icon: Sun,
    intensity: 1,
    preset: 'studio'
  },
  jewelry: {
    name: 'Joalheria',
    icon: CloudSun,
    intensity: 0.8,
    preset: 'city'
  },
  evening: {
    name: 'Noturno',
    icon: Moon,
    intensity: 0.6,
    preset: 'sunset'
  },
  showroom: {
    name: 'Vitrine',
    icon: Droplets,
    intensity: 1.2,
    preset: 'dawn'
  }
};

interface EnvironmentControlsProps {
  onEnvironmentChange: (env: string, intensity: number) => void;
}

export default function EnvironmentControls({ onEnvironmentChange }: EnvironmentControlsProps) {
  const [selectedEnv, setSelectedEnv] = useState('studio');
  const [intensity, setIntensity] = useState(1);

  const handleEnvironmentChange = (envKey: string) => {
    setSelectedEnv(envKey);
    const env = environments[envKey as keyof typeof environments];
    setIntensity(env.intensity);
    onEnvironmentChange(env.preset, env.intensity);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium mb-2">Ambiente</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(environments).map(([key, env]) => {
          const Icon = env.icon;
          return (
            <button
              key={key}
              onClick={() => handleEnvironmentChange(key)}
              className={`flex items-center justify-center p-2 rounded-lg transition ${
                selectedEnv === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="text-sm">{env.name}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Intensidade da Luz</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={intensity}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setIntensity(value);
            onEnvironmentChange(environments[selectedEnv as keyof typeof environments].preset, value);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}