import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import WindTurbine from './components/WindTurbine';
import SaltPond from './components/SaltPond';
import EnergyFlow from './components/EnergyFlow';
import PhysicsPanel from './components/PhysicsPanel';
import Navigation from './components/Navigation';
import { Wind, Zap, Droplet, Calculator } from 'lucide-react';

type Section = 'overview' | 'turbine' | 'energy' | 'physics';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Energi Kincir Angin
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
            Transformasi Energi dalam Irigasi Tambak Garam
          </p>
        </motion.div>
      </header>

      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          
          {/* 3D Scene Components */}
          <WindTurbine 
            position={[-3, 0, 0]} 
            isAnimating={isAnimating}
            activeSection={activeSection}
          />
          <SaltPond 
            position={[3, -2, 0]} 
            activeSection={activeSection}
          />
          <EnergyFlow 
            activeSection={activeSection}
            isAnimating={isAnimating}
          />
          
          <OrbitControls 
            enablePan={false} 
            maxDistance={20} 
            minDistance={5}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Info Panels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full flex items-center justify-center">
          {activeSection === 'physics' && (
            <div className="pointer-events-auto">
              <PhysicsPanel />
            </div>
          )}
        </div>
      </div>

      {/* Section Content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {activeSection === 'overview' && (
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wind className="w-6 h-6 text-blue-600" />
                Transformasi Energi Angin
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kincir angin mengubah energi kinetik angin menjadi energi mekanik untuk menggerakkan pompa air. 
                Sistem ini menunjukkan rantai transformasi energi yang efisien dalam budaya tradisional pembuatan garam.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Wind className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Energi Angin</span>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Energi Mekanik</span>
                </div>
                <div className="text-center p-3 bg-cyan-50 rounded-lg">
                  <Droplet className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Energi Potensial</span>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Calculator className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Efisiensi</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'turbine' && (
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mekanisme Kincir Angin</h2>
              <p className="text-gray-700 mb-4">
                Baling-baling kincir menangkap energi kinetik angin dan mengubahnya menjadi gerakan rotasi. 
                Energi ini kemudian ditransmisikan melalui poros ke sistem pompa air.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isAnimating ? 'Pause' : 'Start'} Animation
                </button>
                <span className="text-sm text-gray-600">
                  Klik untuk mengontrol animasi kincir angin
                </span>
              </div>
            </div>
          )}

          {activeSection === 'energy' && (
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Aliran Energi</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Energi kinetik angin → Energi mekanik baling-baling</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Energi mekanik baling-baling → Energi mekanik poros</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-gray-700">Energi mekanik poros → Energi mekanik pompa</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Energi mekanik pompa → Energi potensial air</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;