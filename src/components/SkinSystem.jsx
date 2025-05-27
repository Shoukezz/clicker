import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { unlockSkin, setCurrentSkin } from '../features/gameSlice';
import { useEffect } from 'react';

const SkinSystem = () => {
  const dispatch = useDispatch();
  const { unlockedSkins, currentSkin, credits } = useSelector(state => state.game);

  const skins = [
    {
      id: 'default',
      name: 'Default',
      cost: 0,
      colors: {
        '--primary-color': '#4a90e2',
        '--secondary-color': '#2c3e50',
        '--background-color': '#f5f6fa',
        '--text-color': '#2c3e50',
        '--button-hover': '#357abd',
        '--disabled-color': '#95a5a6',
        '--card-background': 'white',
        '--card-shadow': '0 2px 5px rgba(0, 0, 0, 0.1)'
      }
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      cost: 1000,
      colors: {
        '--primary-color': '#6c5ce7',
        '--secondary-color': '#2d3436',
        '--background-color': '#1e272e',
        '--text-color': '#ffffff',
        '--button-hover': '#5f4dd0',
        '--disabled-color': '#636e72',
        '--card-background': '#2d3436',
        '--card-shadow': '0 2px 5px rgba(0, 0, 0, 0.2)'
      }
    },
    {
      id: 'neon',
      name: 'Neon',
      cost: 5000,
      colors: {
        '--primary-color': '#00ff00',
        '--secondary-color': '#ff00ff',
        '--background-color': '#000000',
        '--text-color': '#ffffff',
        '--button-hover': '#00cc00',
        '--disabled-color': '#666666',
        '--card-background': '#1a1a1a',
        '--card-shadow': '0 2px 5px rgba(0, 255, 0, 0.2)'
      }
    },
    {
      id: 'gold',
      name: 'Gold',
      cost: 10000,
      colors: {
        '--primary-color': '#ffd700',
        '--secondary-color': '#b8860b',
        '--background-color': '#fff8dc',
        '--text-color': '#2c3e50',
        '--button-hover': '#ffcc00',
        '--disabled-color': '#d3d3d3',
        '--card-background': '#fff8dc',
        '--card-shadow': '0 2px 5px rgba(184, 134, 11, 0.2)'
      }
    }
  ];

  const applyTheme = (skin) => {
    Object.entries(skin.colors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  };

  const handleSkinSelect = (skin) => {
    if (unlockedSkins.includes(skin.id)) {
      dispatch(setCurrentSkin(skin.id));
      applyTheme(skin);
      localStorage.setItem('currentTheme', skin.id);
    } else if (credits >= skin.cost) {
      dispatch(unlockSkin(skin.id));
      dispatch(setCurrentSkin(skin.id));
      applyTheme(skin);
      localStorage.setItem('currentTheme', skin.id);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme) {
      const skin = skins.find(s => s.id === savedTheme);
      if (skin) {
        applyTheme(skin);
      }
    }
  }, []);

  return (
    <div className="skin-system">
      <h2>Skins</h2>
      <div className="skins-grid">
        {skins.map(skin => (
          <motion.div
            key={skin.id}
            className={`skin-item ${currentSkin === skin.id ? 'active' : ''} ${
              !unlockedSkins.includes(skin.id) ? 'locked' : ''
            }`}
            onClick={() => handleSkinSelect(skin)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="skin-preview"
              style={{
                backgroundColor: skin.colors['--primary-color'],
                borderColor: skin.colors['--secondary-color']
              }}
            />
            <div className="skin-info">
              <h3>{skin.name}</h3>
              {!unlockedSkins.includes(skin.id) && (
                <p className="cost">Cost: {skin.cost} credits</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkinSystem; 