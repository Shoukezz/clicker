// Game constants
export const UPGRADE_TYPES = {
  CLICK_VALUE: 'clickValue',
  AUTO_CLICKER: 'autoClicker',
  PASSIVE_INCOME: 'passiveIncome',
  COMBO: 'combo'
};

export const UPGRADE_BASE_COSTS = {
  [UPGRADE_TYPES.CLICK_VALUE]: 10,
  [UPGRADE_TYPES.AUTO_CLICKER]: 50,
  [UPGRADE_TYPES.PASSIVE_INCOME]: 100,
  [UPGRADE_TYPES.COMBO]: 200
};

export const UPGRADE_COST_MULTIPLIER = 1.5;

// Helper functions
export const calculateUpgradeCost = (baseCost, level) => {
  return Math.floor(baseCost * Math.pow(UPGRADE_COST_MULTIPLIER, level));
};

export const calculatePrestigeReward = (credits, prestigeLevel) => {
  return Math.floor(credits / 1000) + prestigeLevel;
};

export const formatNumber = (number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return Math.floor(number).toString();
};

export const calculateTotalMultiplier = (bonuses, antiBonuses) => {
  const bonusMultiplier = bonuses.reduce((acc, bonus) => acc * bonus.multiplier, 1);
  const antiBonusMultiplier = antiBonuses.reduce((acc, anti) => acc * anti.multiplier, 1);
  return bonusMultiplier * antiBonusMultiplier;
};

// Achievement system
export const ACHIEVEMENTS = [
  {
    id: 'first_click',
    name: 'First Click',
    description: 'Click the button for the first time',
    condition: (state) => state.credits > 0,
    reward: 10
  },
  {
    id: 'first_upgrade',
    name: 'First Upgrade',
    description: 'Purchase your first upgrade',
    condition: (state) => Object.values(state.upgrades).some(upgrade => upgrade.level > 0),
    reward: 50
  },
  {
    id: 'rich',
    name: 'Rich',
    description: 'Accumulate 1000 credits',
    condition: (state) => state.credits >= 1000,
    reward: 100
  },
  {
    id: 'prestige_master',
    name: 'Prestige Master',
    description: 'Reach prestige level 5',
    condition: (state) => state.prestige >= 5,
    reward: 500
  }
];

// Skin unlock conditions
export const SKIN_UNLOCK_CONDITIONS = {
  dark: (state) => state.credits >= 1000,
  neon: (state) => state.prestige >= 3,
  gold: (state) => state.duiktcoins >= 100
}; 