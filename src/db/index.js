import Dexie from 'dexie';

// Создаем экземпляр базы данных
const db = new Dexie('clickerGame');

// Определяем схему базы данных
db.version(1).stores({
  gameState: 'id, credits, duiktcoins, clickValue, autoClicker, passiveIncome, combo, upgrades, activeBonuses, activeAntiBonuses, unlockedSkins, currentSkin, prestige'
});

// Инициализация базы данных
db.open().catch(error => {
  console.error('Failed to open database:', error);
});

// Функции для работы с базой данных
export const saveGameState = async (state) => {
  try {
    // Проверяем, существует ли запись
    const existingState = await db.gameState.get(1);
    
    if (existingState) {
      // Обновляем существующую запись
      await db.gameState.update(1, state);
    } else {
      // Создаем новую запись
      await db.gameState.add({
        id: 1,
        ...state
      });
    }
    console.log('Game state saved successfully:', state);
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export const loadGameState = async () => {
  try {
    const state = await db.gameState.get(1);
    console.log('Game state loaded successfully:', state);
    return state;
  } catch (error) {
    console.error('Error loading game state:', error);
    return null;
  }
};

// Функция для очистки базы данных (для отладки)
export const clearDatabase = async () => {
  try {
    await db.gameState.clear();
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

export default db; 