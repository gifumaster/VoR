<script lang="ts">
  import CardSearch from './lib/CardSearch.svelte';
  import CardGrid from './lib/CardGrid.svelte';
  import PlayerStatus from './lib/PlayerStatus.svelte';
  import cardJson from "./assets/cards.json";

  let filteredCards = cardJson.cards;

  type Card = {
    name: string;
    rarity: number;
    addHpRate?: number;
    addHpDrainRate?: number;
    addDamageRate?: number;
    addBulletAmount?: number;
    addBulletSpeedRate?: number;
    addBulletBounds?: number;
    addBulletAmountPerShot?: number;
    addReloadSpeedRate?: number;
    addReloadSpeedSeconds?: number;
    addFireRate?: number;
    addShieldCoolTimeRate?: number;
    addMovingSpeedRate?: number;
    addJumpHeightRate?: number;
    addNumberOfJump?: number;
    addAbillity?: string;
  };

  function handleSearch(event: CustomEvent<{ query: string, statFilter: string, rarityFilter: string }>) {
    const { query, statFilter, rarityFilter } = event.detail;
    const searchText = query.toLowerCase();

    let filtered = cardJson.cards.filter((card: Card) => {
      const nameMatch = card.name.toLowerCase().includes(searchText);
      const statMatch = !statFilter || card[statFilter as keyof Card] !== undefined;
      const rarityMatch = !rarityFilter || (card.rarity === Number(rarityFilter));
      
      return nameMatch && statMatch && rarityMatch;
    });

    // フィルターが設定されている場合、その値でソート
    if (statFilter) {
      filtered.sort((a: Card, b: Card) => {
        const aValue = a[statFilter as keyof Card];
        const bValue = b[statFilter as keyof Card];
        
        // undefinedの値は後ろに
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;
        
        // 数値として降順にソート
        return Number(bValue) - Number(aValue);
      });
    }

    filteredCards = filtered;
  }
</script>

<main>
  <CardSearch on:search={handleSearch} />
  <div class="content-wrapper">
    <PlayerStatus />
    <CardGrid cards={filteredCards} />
  </div>
</main>

<style>
  main {
    margin: 0 auto;
    padding: 6rem 1rem 2rem 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap; /* フレックスアイテムを折り返し可能に */
  }

  :global(.content-wrapper > :first-child) {
    flex: 0 0 300px;
    max-width: 250px; /* ステータスパネルの最大幅を設定 */
  }

  :global(.content-wrapper > :last-child) {
    flex: 1;
    min-width: 250px; /* カードの最小幅 */
  }

  @media (max-width: 768px) {
    :global(.content-wrapper > :first-child) {
      flex: 1 1 100%;
      max-width: 100%;
    }

    :global(.content-wrapper > :last-child) {
      flex: 1 1 100%;
    }
  }
</style>
