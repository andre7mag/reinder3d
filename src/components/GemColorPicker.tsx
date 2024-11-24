import { useState } from 'react';
import { Palette, Sparkles, CheckCircle2 } from 'lucide-react';

const gemShapeIcons = {
  'Redonda': '⭕',
  'Princesa': '⬛',
  'Navete': '◆',
  'Gota': '💧',
  'Coração': '♥️'
};

const predefinedGemColors = [
  { name: 'Diamante', color: '#FFFFFF', preset: { transmission: 0.9, ior: 2.42 } },
  { name: 'Safira', color: '#0033AA', preset: { transmission: 0.7, ior: 1.77 } },
  { name: 'Rubi', color: '#CC0000', preset: { transmission: 0.7, ior: 1.77 } },
  { name: 'Esmeralda', color: '#00A36C', preset: { transmission: 0.7, ior: 1.57 } },
  { name: 'Ametista', color: '#9966CC', preset: { transmission: 0.7, ior: 1.54 } },
  { name: 'Topázio', color: '#FFC87C', preset: { transmission: 0.7, ior: 1.62 } },
  { name: 'Água Marinha', color: '#7FFFD4', preset: { transmission: 0.7, ior: 1.58 } },
  { name: 'Turmalina Rosa', color: '#FF69B4', preset: { transmission: 0.7, ior: 1.62 } },
];

type GemColorPickerProps = {
  onColorChange: (color: string, preset: any) => void;
  detectedShapes: string[];
  selectedGem?: { position: any, shape: string } | null;
};

export default function GemColorPicker({ onColorChange, detectedShapes, selectedGem }: GemColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#FFFFFF');
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium mb-1">Gemas Detectadas</h3>
          <div className="flex flex-wrap gap-2">
            {detectedShapes.map((shape, index) => (
              <button
                key={index}
                onClick={() => setSelectedShape(shape)}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                  selectedShape === shape
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                }`}
              >
                <span className="mr-1">{gemShapeIcons[shape as keyof typeof gemShapeIcons]}</span>
                {shape}
                {selectedShape === shape && (
                  <CheckCircle2 className="w-3 h-3 ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className={`p-2 rounded-lg transition ${
            showPicker ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          title="Alterar cor das gemas"
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>

      {showPicker && (
        <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
          {selectedGem && (
            <div className="mb-4 p-2 bg-blue-900/30 rounded-lg">
              <p className="text-sm">
                Gema selecionada: {selectedGem.shape}
                <span className="ml-2">{gemShapeIcons[selectedGem.shape as keyof typeof gemShapeIcons]}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            {predefinedGemColors.map((gem) => (
              <button
                key={gem.name}
                onClick={() => onColorChange(gem.color, gem.preset)}
                className="group relative p-2 rounded-lg hover:bg-gray-700 transition"
                title={gem.name}
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-gray-600 group-hover:border-gray-400"
                  style={{ backgroundColor: gem.color }}
                />
                <span className="text-xs text-center block truncate">{gem.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Cor Personalizada</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  onColorChange(e.target.value, { transmission: 0.8, ior: 2.0 });
                }}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>

          {selectedShape && (
            <div className="mt-4 p-3 bg-blue-600/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Dica: Ajuste a intensidade da luz para melhor visualização</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}