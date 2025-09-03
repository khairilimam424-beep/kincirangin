import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Zap, Droplet, Calculator } from 'lucide-react';

type Section = 'overview' | 'turbine' | 'energy' | 'physics';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'overview' as Section, label: 'Gambaran Umum', icon: Wind },
    { id: 'turbine' as Section, label: 'Kincir Angin', icon: Zap },
    { id: 'energy' as Section, label: 'Aliran Energi', icon: Droplet },
    { id: 'physics' as Section, label: 'Fisika', icon: Calculator },
  ];

  return (
    <nav className="absolute right-6 top-1/2 -translate-y-1/2 z-30">
      <motion.div 
        className="bg-white/20 backdrop-blur-lg rounded-2xl p-2 shadow-2xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-white hover:bg-white/20'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    className="w-2 h-2 bg-blue-600 rounded-full ml-auto"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navigation;