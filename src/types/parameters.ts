export interface ParameterLimits {
  min: number;
  max: number | null;
}

export const PARAMETER_LIMITS: Record<string, ParameterLimits> = {
  hp: { min: 10, max: null },
  hpDrain: { min: 0, max: null },
  damege: { min: 10, max: null },
  reloadSpeed: { min: 0.01, max: null },
  bulletSpeed: { min: 10, max: null },
  bulletAmount: { min: 1, max: null },
  bulletBounds: { min: 0, max: null },
  bulletAmountPerShot: { min: 1, max: null },
  shieldCoolTime: { min: 0.01, max: null },
  fireRate: { min: 10, max: 500 },
  movingSpeed: { min: 10, max: null },
  jumpHeight: { min: 10, max: null },
  numberOfJump: { min: 1, max: null }
};

export interface PlayerParameters {
  hp: number;
  hpDrain: number;
  damege: number;
  reloadSpeed: number;
  bulletSpeed: number;
  bulletAmount: number;
  bulletBounds: number;
  bulletAmountPerShot: number;
  shieldCoolTime: number;
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
  isPercentage: boolean = false
): number {
  let newValue = currentValue;
  
  if (isPercentage) {
    newValue = currentValue * (1 + modifier / 100);
  } else {
    newValue = currentValue + modifier;
  }
  return clampParameter(newValue, paramName);
}