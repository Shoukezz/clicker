import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credits: 0,
  duiktcoins: 0,
  clickValue: 1,
  autoClicker: 0,
  passiveIncome: 0,
  combo: 1,
  upgrades: {
    clickValue: { level: 0, cost: 10 },
    autoClicker: { level: 0, cost: 50 },
    passiveIncome: { level: 0, cost: 100 },
    combo: { level: 0, cost: 200 }
  },
  activeBonuses: [],
  activeAntiBonuses: [],
  unlockedSkins: [],
  currentSkin: 'default',
  prestige: 0
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementCredits: (state, action) => {
      const multiplier = state.activeBonuses.reduce((acc, bonus) => acc * bonus.multiplier, 1);
      const antiMultiplier = state.activeAntiBonuses.reduce((acc, anti) => acc * anti.multiplier, 1);
      state.credits += state.clickValue * multiplier * antiMultiplier * state.combo;
    },
    addCredits: (state, action) => {
      state.credits = action.payload;
    },
    setDuiktcoins: (state, action) => {
      state.duiktcoins = action.payload;
    },
    setPrestige: (state, action) => {
      state.prestige = action.payload;
    },
    purchaseUpgrade: (state, action) => {
      const { type } = action.payload;
      const upgrade = state.upgrades[type];
      if (state.credits >= upgrade.cost) {
        state.credits -= upgrade.cost;
        upgrade.level += 1;
        upgrade.cost = Math.floor(upgrade.cost * 1.5);
        
        switch(type) {
          case 'clickValue':
            state.clickValue = 1 + upgrade.level;
            break;
          case 'autoClicker':
            state.autoClicker = upgrade.level;
            break;
          case 'passiveIncome':
            state.passiveIncome = upgrade.level;
            break;
          case 'combo':
            state.combo = 1 + (upgrade.level * 0.1);
            break;
        }
      }
    },
    addBonus: (state, action) => {
      state.activeBonuses.push(action.payload);
    },
    removeBonus: (state, action) => {
      state.activeBonuses = state.activeBonuses.filter(bonus => bonus.id !== action.payload);
    },
    addAntiBonus: (state, action) => {
      state.activeAntiBonuses.push(action.payload);
    },
    removeAntiBonus: (state, action) => {
      state.activeAntiBonuses = state.activeAntiBonuses.filter(anti => anti.id !== action.payload);
    },
    unlockSkin: (state, action) => {
      if (!state.unlockedSkins.includes(action.payload)) {
        state.unlockedSkins.push(action.payload);
      }
    },
    setCurrentSkin: (state, action) => {
      state.currentSkin = action.payload;
    },
    prestige: (state) => {
      const duiktcoinsEarned = Math.floor(state.credits / 1000) + state.prestige;
      state.duiktcoins += duiktcoinsEarned;
      state.prestige += 1;
      state.credits = 0;
      state.upgrades = initialState.upgrades;
      state.clickValue = 1;
      state.autoClicker = 0;
      state.passiveIncome = 0;
      state.combo = 1;
    },
    restoreState: (state, action) => {
      state.credits = action.payload.credits || 0;
      state.duiktcoins = action.payload.duiktcoins || 0;
      state.clickValue = action.payload.clickValue || 1;
      state.autoClicker = action.payload.autoClicker || 0;
      state.passiveIncome = action.payload.passiveIncome || 0;
      state.combo = action.payload.combo || 1;
      state.upgrades = action.payload.upgrades || initialState.upgrades;
      state.activeBonuses = action.payload.activeBonuses || [];
      state.activeAntiBonuses = action.payload.activeAntiBonuses || [];
      state.unlockedSkins = action.payload.unlockedSkins || [];
      state.currentSkin = action.payload.currentSkin || 'default';
      state.prestige = action.payload.prestige || 0;
    }
  }
});

export const {
  incrementCredits,
  addCredits,
  setDuiktcoins,
  setPrestige,
  purchaseUpgrade,
  addBonus,
  removeBonus,
  addAntiBonus,
  removeAntiBonus,
  unlockSkin,
  setCurrentSkin,
  prestige,
  restoreState
} = gameSlice.actions;

export default gameSlice.reducer; 