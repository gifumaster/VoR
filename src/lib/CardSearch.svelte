<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let searchQuery = '';
  let selectedStat = '';
  let selectedRarity = '';

  const statOptions = [
    { value: '', label: 'フィルタ' },
    { value: 'addHpRate', label: 'HP' },
    { value: 'addHpDrainRate', label: 'HP吸収' },
    { value: 'addDamageRate', label: 'ダメージ' },
    { value: 'addBulletAmount', label: '弾数' },
    { value: 'addBulletSpeedRate', label: '弾速' },
    { value: 'addBulletBounds', label: '跳弾回数' },
    { value: 'addBulletAmountPerShot', label: '同時発射数' },
    { value: 'addReloadSpeedRate', label: 'リロード速度(-)' },
    { value: 'addReloadSpeedSeconds', label: 'リロード速度(+)' },
    { value: 'addShieldCoolTimeRate', label: 'シールドCD(-)' },
    { value: 'addShieldCoolTimeSeconds', label: 'シールドCD(+)' },
    { value: 'addFireRate', label: '連射速度' },
    { value: 'addMovingSpeedRate', label: '移動速度' },
    { value: 'addJumpHeightRate', label: 'ジャンプ力' },
    { value: 'addNumberOfJump', label: 'ジャンプ回数' },
    { value: 'addAbillity', label: '特殊能力' }
  ];

  const rarityOptions = [
    { value: '', label: 'レアリティ:全て' },
    { value: '1', label: 'コモン' },
    { value: '2', label: 'レア' },
    { value: '3', label: 'エピック' }
  ];

  function handleSearch() {
    dispatch('search', { 
      query: searchQuery,
      statFilter: selectedStat,
      rarityFilter: selectedRarity
    });
  }
</script>

<div class="search-container">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="カード名を検索..."
    on:input={handleSearch}
  />
  <select 
    bind:value={selectedStat}
    on:change={handleSearch}
  >
    {#each statOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <select 
    bind:value={selectedRarity}
    on:change={handleSearch}
  >
    {#each rarityOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>

  <a href="https://vrchat.com/home/world/wrld_09e6752e-f412-4794-8c07-92d65af0f759/info" target="_blank">VoR</a>
</div>

<style>
  .search-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  input {
    padding: 0.5rem;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
</style>