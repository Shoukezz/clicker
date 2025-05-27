import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCredits, purchaseUpgrade, setCurrentSkin, restoreState } from '../features/gameSlice';
import { saveGameState, loadGameState } from '../db';

export const useGameState = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.game);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await loadGameState();
        if (savedState) {
          const { id, ...stateToRestore } = savedState;
          console.log('Restoring state:', stateToRestore);
          dispatch(restoreState(stateToRestore));
        }
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    };

    loadState();
  }, [dispatch]);

  useEffect(() => {
    const saveState = async () => {
      try {
        const stateToSave = {
          credits: gameState.credits,
          duiktcoins: gameState.duiktcoins,
          clickValue: gameState.clickValue,
          autoClicker: gameState.autoClicker,
          passiveIncome: gameState.passiveIncome,
          combo: gameState.combo,
          upgrades: gameState.upgrades,
          activeBonuses: gameState.activeBonuses,
          activeAntiBonuses: gameState.activeAntiBonuses,
          unlockedSkins: gameState.unlockedSkins,
          currentSkin: gameState.currentSkin,
          prestige: gameState.prestige
        };
        console.log('Saving state:', stateToSave);
        await saveGameState(stateToSave);
      } catch (error) {
        console.error('Error saving game state:', error);
      }
    };

    saveState();
  }, [
    gameState.credits,
    gameState.duiktcoins,
    gameState.clickValue,
    gameState.autoClicker,
    gameState.passiveIncome,
    gameState.combo,
    gameState.upgrades,
    gameState.activeBonuses,
    gameState.activeAntiBonuses,
    gameState.unlockedSkins,
    gameState.currentSkin,
    gameState.prestige
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.autoClicker > 0) {
        dispatch(incrementCredits());
      }
      if (gameState.passiveIncome > 0) {
        dispatch(incrementCredits());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, gameState.autoClicker, gameState.passiveIncome]);

  return gameState;
}; 