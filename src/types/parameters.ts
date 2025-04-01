export interface ParameterLimits {
  min: number;
  max: number | null;
}

export const PARAMETER_LIMITS: Record<string, ParameterLimits> = {
  hp: { min: 10, max: 1000 },
  hpDrain: { min: 0, max: null },
  damege: { min: 10, max: 1000 },
  reloadSpeedSec: { min: 0, max: null },
  reloadSpeedRate: { min: 10, max: null },
  bulletSpeed: { min: 10, max: 450 },
  bulletAmount: { min: 1, max: null },
  bulletBounds: { min: 0, max: null },
  bulletAmountPerShot: { min: 1, max: null },
  shieldCoolTimeSec: { min: 0, max: null },
  shieldCoolTimeRate: { min: 10, max: 100 },
  fireRate: { min: 0, max: 100 },
  movingSpeed: { min: 10, max: null },
  jumpHeight: { min: 10, max: null },
  numberOfJump: { min: 1, max: null }
};

export interface PlayerParameters {
  hp: number;
  hpDrain: number;
  damege: number;
  reloadSpeed: number;
  reloadSpeedSec: number;
  reloadSpeedRate: number;
  bulletSpeed: number;
  bulletAmount: number;
  bulletBounds: number;
  bulletAmountPerShot: number;
  shieldCoolTime: number;
  shieldCoolTimeSec: number;
  shieldCoolTimeRate: number;
  fireRate: number;
  movingSpeed: number;
  jumpHeight: number;
  numberOfJump: number;
}

export function clampParameter(value: number, paramName: keyof typeof PARAMETER_LIMITS): number {
  const limits = PARAMETER_LIMITS[paramName];
  if (value < limits.min) return limits.min;
  if (limits.max !== null && value > limits.max) return limits.max;
  return value;
}

export function calculateNewParameterValue(
  currentValue: number,
  modifier: number,
  paramName: keyof typeof PARAMETER_LIMITS,
  isPercentage: boolean = false,
  isMultiplicative: boolean = false,
): number {
  let newValue = currentValue;
  
  if (isMultiplicative) {
    newValue = currentValue * modifier
  } else if (isPercentage) {
    newValue = currentValue * (1 + modifier / 100);
  } else {
    newValue = currentValue + modifier;
  }
  return clampParameter(newValue, paramName);
}