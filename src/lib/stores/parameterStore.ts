import { writable } from 'svelte/store';
import type { PlayerParameters } from '../../types/parameters';
import { calculateNewParameterValue } from '../../types/parameters';
import defaultJson from '../../assets/default.json';

function createParameterStore() {
  // 初期値をdefault.jsonから設定
  const initialState: PlayerParameters = {
    hp: defaultJson.hp,
    hpDrain: defaultJson.hpDrain,
    damege: defaultJson.damege,
    reloadSpeed: defaultJson.reloadSpeed,
    reloadSpeedRate: defaultJson.reloadSpeedRate,
    reloadSpeedSec: defaultJson.reloadSpeedSec,
    bulletSpeed: defaultJson.bulletSpeed,
    bulletAmount: defaultJson.bulletAmount,
    bulletBounds: defaultJson.bulletBounds,
    bulletAmountPerShot: defaultJson.bulletAmountPerShot,
    shieldCoolTime: defaultJson.shieldCoolTime,
    shieldCoolTimeRate: defaultJson.shieldCoolTimeRate,
    shieldCoolTimeSec: defaultJson.shieldCoolTimeSec,
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
        if (card.addHpDrainRate !== undefined) {
          newParams.hpDrain = calculateNewParameterValue(params.hpDrain, card.addHpDrainRate, 'hpDrain', false);
        }
        if (card.addDamageRate !== undefined) {
          newParams.damege = calculateNewParameterValue(params.damege, card.addDamageRate, 'damege', true);
        }
        if (card.addReloadSpeedRate !== undefined) {
          newParams.reloadSpeedRate = calculateNewParameterValue(params.reloadSpeedRate, card.addReloadSpeedRate, 'reloadSpeedRate', true);
        }
        if (card.addReloadSpeedSeconds !== undefined) {
          newParams.reloadSpeedSec = calculateNewParameterValue(params.reloadSpeedSec, card.addReloadSpeedSeconds, 'reloadSpeedSec', false);
        }
        newParams.reloadSpeed =  newParams.reloadSpeedSec * (newParams.reloadSpeedRate === 100 ? 1:  newParams.reloadSpeedRate/100);

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
          newParams.shieldCoolTimeRate = calculateNewParameterValue(params.shieldCoolTimeRate, card.addShieldCoolTimeRate, 'shieldCoolTimeRate', true);
        }
        if (card.addShieldCoolTimeSeconds !== undefined) {
          newParams.shieldCoolTimeSec = calculateNewParameterValue(params.shieldCoolTimeSec, card.addShieldCoolTimeSeconds, 'shieldCoolTimeSec', false);
        }        
        newParams.shieldCoolTime =  newParams.shieldCoolTimeSec * (newParams.shieldCoolTimeRate === 100 ? 1:  newParams.shieldCoolTimeRate/100);

        if (card.addFireRate !== undefined) {
          //正数の場合
          let m = undefined;
          if(card.addFireRate > 0){
            m = params.fireRate * -1 * (card.addFireRate / (100 + card.addFireRate));
          }else{
            m = params.fireRate * (-1* card.addFireRate / 100)
          }
          newParams.fireRate = calculateNewParameterValue(params.fireRate, m, 'fireRate', false);
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