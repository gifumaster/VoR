import { writable } from 'svelte/store';
import type { PlayerParameters } from '../../types/parameters';
import { calculateNewParameterValue } from '../../types/parameters';
import defaultJson from '../../assets/default.json';

function createParameterStore() {
  // 初期値をdefault.jsonから設定
  const initialState: PlayerParameters = {
    hp: defaultJson.hp,
    damege: defaultJson.damege,
    reloadSpeed: defaultJson.reloadSpeed,
    bulletSpeed: defaultJson.bulletSpeed,
    bulletAmount: defaultJson.bulletAmount,
    bulletBounds: defaultJson.bulletBounds,
    bulletAmountPerShot: defaultJson.bulletAmountPerShot,
    shieldCoolTime: defaultJson.shieldCoolTime,
    fireRate: defaultJson.fireRate,
    movingSpeed: defaultJson.movingSpeed,
    jumpHeight: defaultJson.jumpHeight,
    numberOfJump: defaultJson.numberOfJump,
  };

  const { subscribe, update } = writable<PlayerParameters>(initialState);

  return {
    subscribe,
    applyCard: (card: any) => {
      update(params => {
        const newParams = { ...params };
        
        // カードの効果を適用
        if (card.addHpRate !== undefined) {
          newParams.hp = calculateNewParameterValue(params.hp, card.addHpRate, 'hp', true);
        }
        if (card.addDamageRate !== undefined) {
          newParams.damege = calculateNewParameterValue(params.damege, card.addDamageRate, 'damege', true);
        }
        if (card.addReloadSpeedRate !== undefined) {
          newParams.reloadSpeed = calculateNewParameterValue(params.reloadSpeed, card.addReloadSpeedRate, 'reloadSpeed', true);
        }
        if (card.addReloadSpeedSeconds !== undefined) {
          newParams.reloadSpeed = calculateNewParameterValue(params.reloadSpeed, card.addReloadSpeedSeconds, 'reloadSpeed', false);
        }
        if (card.addBulletSpeedRate !== undefined) {
          newParams.bulletSpeed = calculateNewParameterValue(params.bulletSpeed, card.addBulletSpeedRate, 'bulletSpeed', true);
        }
        if (card.addBulletAmount !== undefined) {
          newParams.bulletAmount = calculateNewParameterValue(params.bulletAmount, card.addBulletAmount, 'bulletAmount', false);
        }
        if (card.addBulletBounds !== undefined) {
          newParams.bulletBounds = calculateNewParameterValue(params.bulletBounds, card.addBulletBounds, 'bulletBounds', false);
        }
        if (card.addBulletAmountPerShot !== undefined) {
          newParams.bulletAmountPerShot = calculateNewParameterValue(params.bulletAmountPerShot, card.addBulletAmountPerShot, 'bulletAmountPerShot', false);
        }
        if (card.addShieldCoolTimeRate !== undefined) {
          newParams.shieldCoolTime = calculateNewParameterValue(params.shieldCoolTime, card.addShieldCoolTimeRate, 'shieldCoolTime', true);
        }
        if (card.addFireRate !== undefined) {
          newParams.fireRate = calculateNewParameterValue(params.fireRate, card.addFireRate, 'fireRate', true);
        }
        if (card.addMovingSpeedRate !== undefined) {
          newParams.movingSpeed = calculateNewParameterValue(params.movingSpeed, card.addMovingSpeedRate, 'movingSpeed', true);
        }
        if (card.addJumpHeightRate !== undefined) {
          newParams.jumpHeight = calculateNewParameterValue(params.jumpHeight, card.addJumpHeightRate, 'jumpHeight', true);
        }
        if (card.addNumberOfJump !== undefined) {
          newParams.numberOfJump = calculateNewParameterValue(params.numberOfJump, card.addNumberOfJump, 'numberOfJump', false);
        }

        return newParams;
      });
    },
    reset: () => {
      update(() => initialState);
    }
  };
}

export const parameterStore = createParameterStore();
export const selectedCardStore = writable<any[]>([]);