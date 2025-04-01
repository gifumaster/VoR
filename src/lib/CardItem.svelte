<script lang="ts">
  import { parameterStore, selectedCardStore } from './stores/parameterStore';
  let isClicked = false;
  let isDisabled = false;
  let showNote = false;
  
  export let name = '';
  export let addHpRate: number | undefined = undefined;
  export let addHpDrainRate: number | undefined = undefined;
  export let addDamageRate: number | undefined = undefined;
  export let addBulletAmount: number | undefined = undefined;
  export let addBulletSpeedRate: number | undefined = undefined;
  export let addBulletBounds: number | undefined = undefined;
  export let addBulletAmountPerShot: number | undefined = undefined;
  export let addReloadSpeedRate: number | undefined = undefined;
  export let addReloadSpeedSeconds: number | undefined = undefined;
  export let addFireRate: number | undefined = undefined;
  export let addShieldCoolTimeRate: number | undefined = undefined;
  export let addShieldCoolTimeSeconds: number | undefined = undefined;
  export let addNumberOfJump: number | undefined = undefined;
  export let addMovingSpeedRate: number | undefined = undefined;
  export let addJumpHeightRate: number | undefined = undefined;
  export let addAbillity: string | undefined = undefined;
  export let rarity: number | undefined = undefined;
  export let note: string | undefined = undefined;

  $: borderColor = rarity === 1 ? '#808080' :  // 灰色
                   rarity === 2 ? '#87CEEB' :  // 水色
                   rarity === 3 ? '#500050' :  // 紫色
                   '#ddd';  // デフォルトの色

  // 選択済みカード数の監視
  $: isDisabled = $selectedCardStore.length >= 30;

  async function handleCardSelect() {
    if (isDisabled) return;
    
    isClicked = true;
    
    // アニメーション完了を待つ
    await new Promise(resolve => setTimeout(resolve, 300));
    
    parameterStore.applyCard({
      addHpRate,
      addHpDrainRate,
      addDamageRate,
      addBulletAmount,
      addBulletSpeedRate,
      addBulletBounds,
      addBulletAmountPerShot,
      addReloadSpeedRate,
      addReloadSpeedSeconds,
      addFireRate,
      addShieldCoolTimeRate,
      addShieldCoolTimeSeconds,
      addMovingSpeedRate,
      addJumpHeightRate,
      addNumberOfJump,
      addAbillity
    });

    // 選択されたカードをストアに追加
    selectedCardStore.update(cards => [...cards, {
      name,
      addAbillity,
      rarity
    }]);
    
    isClicked = false;
  }

  function toggleNote(event: MouseEvent) {
    event.stopPropagation(); // カードの選択を防ぐ
    showNote = true;
  }

  function closeNote() {
    showNote = false;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
  class="card" 
  class:clicked={isClicked}
  class:disabled={isDisabled}
  style:border-color={borderColor} 
  on:click={handleCardSelect}
>
    <h3 style="color: {borderColor}">{name}</h3>
    <table class="stats">
      <tbody>
        <!-- プラスの効果を先に表示 -->
        {#if addHpRate !== undefined && addHpRate > 0}
          <tr><td>HP:</td><td>+{addHpRate}%</td></tr>
        {/if}
        {#if addHpDrainRate !== undefined && addHpDrainRate > 0}
          <tr><td>HP吸収:</td><td>+{addHpDrainRate}%</td></tr>
        {/if}
        {#if addDamageRate !== undefined && addDamageRate > 0}
          <tr><td>ダメージ:</td><td>+{addDamageRate}%</td></tr>
        {/if}
        {#if addBulletAmount !== undefined && addBulletAmount > 0}
          <tr><td>装弾数:</td><td>+{addBulletAmount}</td></tr>
        {/if}
        {#if addBulletSpeedRate !== undefined && addBulletSpeedRate > 0}
          <tr><td>弾速:</td><td>+{addBulletSpeedRate}%</td></tr>
        {/if}
        {#if addBulletBounds !== undefined && addBulletBounds > 0}
          <tr><td>跳弾回数:</td><td>+{addBulletBounds}</td></tr>
        {/if}
        {#if addBulletAmountPerShot !== undefined && addBulletAmountPerShot > 0}
          <tr><td>同時発射数:</td><td>+{addBulletAmountPerShot}</td></tr>
        {/if}
        {#if addFireRate !== undefined && addFireRate > 0}
          <tr><td>連射速度:</td><td>+{addFireRate}%</td></tr>
        {/if}
        {#if addMovingSpeedRate !== undefined && addMovingSpeedRate > 0}
          <tr><td>移動速度:</td><td>+{addMovingSpeedRate}%</td></tr>
        {/if}
        {#if addJumpHeightRate !== undefined && addJumpHeightRate > 0}
          <tr><td>ジャンプ力:</td><td>+{addJumpHeightRate}%</td></tr>
        {/if}
        {#if addNumberOfJump !== undefined && addNumberOfJump > 0}
          <tr><td>ジャンプ回数:</td><td>+{addNumberOfJump}</td></tr>
        {/if}
        {#if addReloadSpeedRate !== undefined && addReloadSpeedRate < 0}
          <tr><td>リロード速度:</td><td>{addReloadSpeedRate}%</td></tr>
        {/if}
        {#if addReloadSpeedSeconds !== undefined && addReloadSpeedSeconds < 0}
          <tr><td>リロード速度:</td><td>{addReloadSpeedSeconds} sec</td></tr>
        {/if}
        {#if addShieldCoolTimeRate !== undefined && addShieldCoolTimeRate < 0}
          <tr><td>シールドCD:</td><td>{addShieldCoolTimeRate}%</td></tr>
        {/if}
        {#if addShieldCoolTimeSeconds !== undefined && addShieldCoolTimeSeconds < 0}
          <tr><td>シールドCD:</td><td>{addShieldCoolTimeSeconds} sec</td></tr>
        {/if}

        <!-- マイナスの効果を後に表示 -->
        {#if addHpRate !== undefined && addHpRate < 0}
          <tr><td>HP:</td><td class="negative">{addHpRate}%</td></tr>
        {/if}
        {#if addHpDrainRate !== undefined && addHpDrainRate < 0}
          <tr><td>HP吸収:</td><td class="negative">{addHpDrainRate}%</td></tr>
        {/if}
        {#if addDamageRate !== undefined && addDamageRate < 0}
          <tr><td>ダメージ:</td><td class="negative">{addDamageRate}%</td></tr>
        {/if}
        {#if addBulletAmount !== undefined && addBulletAmount < 0}
          <tr><td>装弾数:</td><td class="negative">{addBulletAmount}</td></tr>
        {/if}
        {#if addBulletSpeedRate !== undefined && addBulletSpeedRate < 0}
          <tr><td>弾速:</td><td class="negative">{addBulletSpeedRate}%</td></tr>
        {/if}
        {#if addBulletBounds !== undefined && addBulletBounds < 0}
          <tr><td>跳弾回数:</td><td class="negative">{addBulletBounds}</td></tr>
        {/if}
        {#if addBulletAmountPerShot !== undefined && addBulletAmountPerShot < 0}
          <tr><td>同時発射数:</td><td class="negative">{addBulletAmountPerShot}</td></tr>
        {/if}
        {#if addFireRate !== undefined && addFireRate < 0}
          <tr><td>連射速度:</td><td class="negative">{addFireRate}%</td></tr>
        {/if}
        {#if addMovingSpeedRate !== undefined && addMovingSpeedRate < 0}
          <tr><td>移動速度:</td><td class="negative">{addMovingSpeedRate}%</td></tr>
        {/if}
        {#if addJumpHeightRate !== undefined && addJumpHeightRate < 0}
          <tr><td>ジャンプ力:</td><td class="negative">{addJumpHeightRate}%</td></tr>
        {/if}
        {#if addNumberOfJump !== undefined && addNumberOfJump < 0}
          <tr><td>ジャンプ回数:</td><td class="negative">{addNumberOfJump}</td></tr>
        {/if}
        {#if addReloadSpeedRate !== undefined && addReloadSpeedRate > 0}
          <tr><td>リロード速度:</td><td class="negative">{addReloadSpeedRate}%</td></tr>
        {/if}
        {#if addReloadSpeedSeconds !== undefined && addReloadSpeedSeconds > 0}
          <tr><td>リロード速度:</td><td class="negative">{addReloadSpeedSeconds} sec</td></tr>
        {/if}
        {#if addShieldCoolTimeRate !== undefined && addShieldCoolTimeRate > 0}
          <tr><td>シールドCD:</td><td class="negative">{addShieldCoolTimeRate}%</td></tr>
        {/if}
        {#if addShieldCoolTimeSeconds !== undefined && addShieldCoolTimeSeconds > 0}
          <tr><td>シールドCD:</td><td class="negative">{addShieldCoolTimeSeconds} sec</td></tr>
        {/if}
      </tbody>
    </table>
    {#if addAbillity}
      <p class="ability">
        {addAbillity}
      </p>
    {/if}
    {#if note}
      <button class="note-icon" on:click={toggleNote}>
        <span class="icon">ⓘ</span>
      </button>
    {/if}
  </div>

{#if showNote && note}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="note-overlay" on:click={closeNote}>
    <div class="note-dialog" on:click|stopPropagation>
      <h3>{name}</h3>
      <p>{note}</p>
      <button class="close-button" on:click={closeNote}>閉じる</button>
    </div>
  </div>
{/if}

<style>
  .card {
    border: 5px solid;
    border-radius: 8px;
    padding: 1rem;
    background-color: #fff;
    color: black;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    min-height:200px;
    max-height: 400px;  /* 最大高さを設定 */
    overflow-y: auto;   /* 内容が多い場合はスクロール可能に */
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
  }
  
  .card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  .card.clicked {
    animation: selectEffect 0.3s ease;
  }

  @keyframes selectEffect {
    0% {
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    50% {
      transform: scale(0.95);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
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

  .card.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .card.disabled:hover {
    transform: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .note-icon {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    font-size: 1.2rem;
    color: #666;
    transition: color 0.2s;
  }

  .note-icon:hover {
    color: #333;
  }

  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }

  .note-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .note-dialog {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    color: black;
    white-space: pre-wrap;
    text-align: left;
  }

  .note-dialog h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .note-dialog p {
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }

  .note-dialog .close-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .note-dialog .close-button:hover {
    background: #45a049;
  }
</style>