import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Wind, Zap, Calculator } from 'lucide-react';

const PhysicsPanel: React.FC = () => {
  const [selectedEquation, setSelectedEquation] = useState(0);

  const equations = [
    {
      title: "Energi Kinetik Angin",
      formula: "E_k = ½mv²",
      description: "Energi kinetik yang dimiliki oleh massa udara yang bergerak",
      variables: [
        { symbol: "E_k", meaning: "Energi kinetik (Joule)" },
        { symbol: "m", meaning: "Massa udara (kg)" },
        { symbol: "v", meaning: "Kecepatan angin (m/s)" }
      ],
      icon: Wind
    },
    {
      title: "Daya Angin Tersedia",
      formula: "P = ½ρAv³",
      description: "Daya yang tersedia dari angin yang melewati kincir",
      variables: [
        { symbol: "P", meaning: "Daya (Watt)" },
        { symbol: "ρ", meaning: "Massa jenis udara (kg/m³)" },
        { symbol: "A", meaning: "Luas penampang baling-baling (m²)" },
        { symbol: "v", meaning: "Kecepatan angin (m/s)" }
      ],
      icon: Zap
    },
    {
      title: "Energi Potensial Air",
      formula: "E_p = mgh",
      description: "Energi potensial air yang dipompa ke ketinggian tertentu",
      variables: [
        { symbol: "E_p", meaning: "Energi potensial (Joule)" },
        { symbol: "m", meaning: "Massa air (kg)" },
        { symbol: "g", meaning: "Percepatan gravitasi (9.8 m/s²)" },
        { symbol: "h", meaning: "Ketinggian (m)" }
      ],
      icon: Calculator
    },
    {
      title: "Efisiensi Sistem",
      formula: "η = (E_out / E_in) × 100%",
      description: "Perbandingan energi keluaran dengan energi masukan",
      variables: [
        { symbol: "η", meaning: "Efisiensi (%)" },
        { symbol: "E_out", meaning: "Energi keluaran (Joule)" },
        { symbol: "E_in", meaning: "Energi masukan (Joule)" }
      ],
      icon: Calculator
    }
  ];

  const currentEquation = equations[selectedEquation];
  const Icon = currentEquation.icon;

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Persamaan Fisika</h2>
        </div>
      </div>

      {/* Equation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {equations.map((eq, index) => (
          <button
            key={index}
            onClick={() => setSelectedEquation(index)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
              ${selectedEquation === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {eq.title}
          </button>
        ))}
      </div>

      {/* Current Equation Display */}
      <motion.div
        key={selectedEquation}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{currentEquation.title}</h3>
          <div className="text-3xl font-mono font-bold text-blue-600 mb-3 text-center py-4">
            {currentEquation.formula}
          </div>
          <p className="text-gray-700 text-center">{currentEquation.description}</p>
        </div>

        {/* Variables */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 mb-3">Keterangan Variabel:</h4>
          {currentEquation.variables.map((variable, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-mono font-bold text-blue-600 text-lg min-w-[3rem]">
                {variable.symbol}
              </span>
              <span className="text-gray-700">=</span>
              <span className="text-gray-800">{variable.meaning}</span>
            </motion.div>
          ))}
        </div>

        {/* Example Calculation */}
        {selectedEquation === 1 && (
          <motion.div 
            className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h5 className="font-semibold text-gray-800 mb-2">Contoh Perhitungan:</h5>
            <p className="text-sm text-gray-700">
              Dengan ρ = 1.225 kg/m³, A = 2 m², dan v = 5 m/s:<br/>
              P = ½ × 1.225 × 2 × 5³ = ½ × 1.225 × 2 × 125 = <strong>153.125 Watt</strong>
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PhysicsPanel;