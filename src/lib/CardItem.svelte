<script lang="ts">
  export let name = '';
  export let addHpRate: number | undefined = undefined;
  export let addHpDraimRate: number | undefined = undefined;
  export let addDamageRate: number | undefined = undefined;
  export let addBulletAmount: number | undefined = undefined;
  export let addBulletSpeedRate: number | undefined = undefined;
  export let addBulletBounds: number | undefined = undefined;
  export let addBulletAmountPerShot: number | undefined = undefined;
  export let addReloadSpeedRate: number | undefined = undefined;
  export let addReloadSpeedSeconds: number | undefined = undefined;
  export let addFireRate: number | undefined = undefined;
  export let addShieldCoolTimeRate: number | undefined = undefined;
  export let addNumberOfJump: number | undefined = undefined;
  export let addMovingSpeedRate: number | undefined = undefined;
  export let addJumpHeightRate: number | undefined = undefined;
  export let addAbillity: string | undefined = undefined;
  export let rarity: number | undefined = undefined;

  $: borderColor = rarity === 1 ? '#808080' :  // 灰色
                   rarity === 2 ? '#87CEEB' :  // 水色
                   rarity === 3 ? '#500050' :  // 紫色
                   '#ddd';  // デフォルトの色
</script>

<div class="card" style:border-color={borderColor}>
  <h3 style="color: {borderColor}">{name}</h3>
  <table class="stats">
    <tbody>
      {#if addHpRate !== undefined}
        <tr><td>HP:</td><td class:negative={addHpRate < 0}>{addHpRate > 0 ? '+' : ''}{addHpRate}%</td></tr>
      {/if}
      {#if addHpDraimRate !== undefined}
        <tr><td>HP吸収:</td><td class:negative={addHpDraimRate < 0}>{addHpDraimRate > 0 ? '+' : ''}{addHpDraimRate}%</td></tr>
      {/if}
      {#if addDamageRate !== undefined}
        <tr><td>ダメージ:</td><td class:negative={addDamageRate < 0}>{addDamageRate > 0 ? '+' : ''}{addDamageRate}%</td></tr>
      {/if}
      {#if addBulletAmount !== undefined}
        <tr><td>弾数:</td><td class:negative={addBulletAmount < 0}>{addBulletAmount > 0 ? '+' : ''}{addBulletAmount}</td></tr>
      {/if}
      {#if addBulletSpeedRate !== undefined}
        <tr><td>弾速:</td><td class:negative={addBulletSpeedRate < 0}>{addBulletSpeedRate > 0 ? '+' : ''}{addBulletSpeedRate}%</td></tr>
      {/if}
      {#if addBulletBounds !== undefined}
        <tr><td>跳弾回数:</td><td class:negative={addBulletBounds < 0}>{addBulletBounds > 0 ? '+' : ''}{addBulletBounds}</td></tr>
      {/if}
      {#if addBulletAmountPerShot !== undefined}
        <tr><td>同時発射数:</td><td class:negative={addBulletAmountPerShot < 0}>{addBulletAmountPerShot > 0 ? '+' : ''}{addBulletAmountPerShot}</td></tr>
      {/if}
      {#if addReloadSpeedRate !== undefined}
        <tr><td>リロード速度:</td><td class:negative={addReloadSpeedRate > 0}>{addReloadSpeedRate > 0 ? '+' : ''}{addReloadSpeedRate}%</td></tr>
      {/if}
      {#if addReloadSpeedSeconds !== undefined}
        <tr><td>リロード速度:</td><td class:negative={addReloadSpeedSeconds > 0}>{addReloadSpeedSeconds > 0 ? '+' : ''}{addReloadSpeedSeconds} sec</td></tr>
      {/if}
      {#if addFireRate !== undefined}
        <tr><td>発射速度:</td><td class:negative={addFireRate < 0}>{addFireRate > 0 ? '+' : ''}{addFireRate}%</td></tr>
      {/if}
      {#if addShieldCoolTimeRate !== undefined}
        <tr><td>シールドCD:</td><td class:negative={addShieldCoolTimeRate > 0}>{addShieldCoolTimeRate > 0 ? '+' : ''}{addShieldCoolTimeRate}%</td></tr>
      {/if}
      {#if addMovingSpeedRate !== undefined}
        <tr><td>移動速度:</td><td class:negative={addMovingSpeedRate < 0}>{addMovingSpeedRate > 0 ? '+' : ''}{addMovingSpeedRate}%</td></tr>
      {/if}
      {#if addJumpHeightRate !== undefined}
        <tr><td>ジャンプ力:</td><td class:negative={addJumpHeightRate < 0}>{addJumpHeightRate > 0 ? '+' : ''}{addJumpHeightRate}%</td></tr>
      {/if}
      {#if addNumberOfJump !== undefined}
        <tr><td>ジャンプ回数:</td><td class:negative={addNumberOfJump < 0}>{addNumberOfJump > 0 ? '+' : ''}{addNumberOfJump}</td></tr>
      {/if}
    </tbody>
  </table>
  {#if addAbillity}
  <p class="ability">
    {addAbillity}
  </p>
{/if}
</div>

<style>
  .card {
    border: 5px solid;  /* 枠線を太くして目立たせる */
    border-radius: 8px;
    padding: 1rem;
    background-color: #fff;
    color: black;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  .stats {
    font-size: 0.9rem;
    width: 100%;
    text-align: left;
  }

  .stats td {
    padding: 0.2rem 0;
  }

  .stats td:first-child {
    text-align: left;
    white-space: nowrap;
    padding-right: 1rem;
  }

  .stats td:last-child {
    text-align: right;
    color: blue;
  }

  .stats td:last-child.negative {
    color: red;
  }

  .ability {
    color: purple;
    text-align: left;
  }
</style>