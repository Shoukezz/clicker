import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '../utils/gameUtils';
import { unlockSkin } from '../features/gameSlice';
import { SKIN_UNLOCK_CONDITIONS } from '../utils/gameUtils';

const AchievementSystem = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.game);

  useEffect(() => {
    // Check achievements
    ACHIEVEMENTS.forEach(achievement => {
      if (achievement.condition(gameState)) {
        // Handle achievement unlock
        console.log(`Achievement unlocked: ${achievement.name}`);
      }
    });

    // Check skin unlock conditions
    Object.entries(SKIN_UNLOCK_CONDITIONS).forEach(([skinId, condition]) => {
      if (condition(gameState)) {
        dispatch(unlockSkin(skinId));
      }
    });
  }, [gameState, dispatch]);

  return (
    <div className="achievement-system">
      <h2>Achievements</h2>
      <div className="achievements-grid">
        <AnimatePresence>
          {ACHIEVEMENTS.map(achievement => (
            <motion.div
              key={achievement.id}
              className={`achievement-item ${
                achievement.condition(gameState) ? 'unlocked' : 'locked'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="achievement-icon">
                {achievement.condition(gameState) ? '🏆' : '🔒'}
              </div>
              <div className="achievement-info">
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-reward">
                  Reward: {achievement.reward} credits
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AchievementSystem; 