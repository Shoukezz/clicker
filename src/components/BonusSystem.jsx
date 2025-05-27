import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addBonus, removeBonus, addAntiBonus, removeAntiBonus } from '../features/gameSlice';

const BonusSystem = () => {
  const dispatch = useDispatch();
  const { activeBonuses, activeAntiBonuses } = useSelector(state => state.game);

  // Random bonus generation
  useEffect(() => {
    const bonusInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const bonusTypes = [
          { name: 'Double Click', multiplier: 2, duration: 30000 },
          { name: 'Triple Click', multiplier: 3, duration: 15000 },
          { name: 'Mega Click', multiplier: 5, duration: 5000 }
        ];
        const randomBonus = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];
        const bonus = {
          id: Date.now(),
          ...randomBonus
        };
        dispatch(addBonus(bonus));
        setTimeout(() => dispatch(removeBonus(bonus.id)), bonus.duration);
      }
    }, 30000);

    const antiBonusInterval = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance every 45 seconds
        const antiBonusTypes = [
          { name: 'Slow Click', multiplier: 0.5, duration: 20000 },
          { name: 'Virus', multiplier: 0.1, duration: 10000 },
          { name: 'DDoS', multiplier: 0, duration: 5000 }
        ];
        const randomAntiBonus = antiBonusTypes[Math.floor(Math.random() * antiBonusTypes.length)];
        const antiBonus = {
          id: Date.now(),
          ...randomAntiBonus
        };
        dispatch(addAntiBonus(antiBonus));
        setTimeout(() => dispatch(removeAntiBonus(antiBonus.id)), antiBonus.duration);
      }
    }, 45000);

    return () => {
      clearInterval(bonusInterval);
      clearInterval(antiBonusInterval);
    };
  }, [dispatch]);

  return (
    <div className="bonus-system">
      <div className="bonuses">
        <h2>Active Bonuses</h2>
        <AnimatePresence>
          {activeBonuses.map(bonus => (
            <motion.div
              key={bonus.id}
              className="bonus-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {bonus.name} (x{bonus.multiplier})
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="anti-bonuses">
        <h2>Active Anti-Bonuses</h2>
        <AnimatePresence>
          {activeAntiBonuses.map(anti => (
            <motion.div
              key={anti.id}
              className="anti-bonus-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {anti.name} (x{anti.multiplier})
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BonusSystem; 