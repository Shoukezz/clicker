import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gameReducer, { incrementCredits, purchaseUpgrade, addBonus, removeBonus, addAntiBonus, removeAntiBonus, unlockSkin, setCurrentSkin, prestige, addCredits } from './features/gameSlice';
import { useGameState } from './hooks/useGameState';
import { motion } from 'framer-motion';
import BonusSystem from './components/BonusSystem';
import SkinSystem from './components/SkinSystem';
import AchievementSystem from './components/AchievementSystem';
import './styles/App.scss';
import './styles/BonusSystem.scss';
import './styles/SkinSystem.scss';
import './styles/AchievementSystem.scss';

const store = configureStore({
  reducer: {
    game: gameReducer
  }
});

const GameInterface = () => {
  const dispatch = useDispatch();
  const gameState = useGameState();

  const handleClick = () => {
    dispatch(incrementCredits());
  };

  const handleUpgrade = (type) => {
    dispatch(purchaseUpgrade({ type }));
  };

  const handlePrestige = () => {
    dispatch(prestige());
  };

  const handleAddMillion = () => {
    dispatch(addCredits(1000000));
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="resources">
          <span>Credits: {Math.floor(gameState.credits)}</span>
          <span>Duiktcoins: {gameState.duiktcoins}</span>
        </div>
        <button className="prestige-button" onClick={handlePrestige}>
          Prestige (Level {gameState.prestige})
        </button>
      </header>

      <main className="game-main">
        <motion.button
          className="click-button"
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
        >
          Click Me!
        </motion.button>

        <motion.button
          className="million-button"
          onClick={handleAddMillion}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get 1M Credits
        </motion.button>

        <section className="upgrades">
          <h2>Upgrades</h2>
          {Object.entries(gameState.upgrades).map(([type, upgrade]) => (
            <motion.button
              key={type}
              className="upgrade-button"
              onClick={() => handleUpgrade(type)}
              disabled={gameState.credits < upgrade.cost}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {type === 'clickValue' && `Click Value (${gameState.clickValue})`}
              {type === 'autoClicker' && `Auto Clicker (${gameState.autoClicker})`}
              {type === 'passiveIncome' && `Passive Income (${gameState.passiveIncome})`}
              {type === 'combo' && `Combo (${gameState.combo.toFixed(1)}x)`}
              <br />
              Cost: {upgrade.cost} credits
            </motion.button>
          ))}
        </section>

        <BonusSystem />
        <SkinSystem />
        <AchievementSystem />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GameInterface />
    </Provider>
  );
};

export default App;
