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

    filteredCards = cardJson.cards.filter((card: Card) => {
      const nameMatch = card.name.toLowerCase().includes(searchText);
      const statMatch = !statFilter || card[statFilter as keyof Card] !== undefined;
      const rarityMatch = !rarityFilter || (card.rarity === Number(rarityFilter));
      
      return nameMatch && statMatch && rarityMatch;
    });
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
    min-width: 1440px;
  }

  .content-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    align-items: flex-start; /* コンテンツを上寄せに */
  }

  :global(.content-wrapper > :first-child) {
    flex: 0 0 300px;
  }

  :global(.content-wrapper > :last-child) {
    flex: 1;
    max-width: calc(100% - 300px - 2rem);
    align-self: flex-start; /* カードグリッドを上寄せに */
  }
</style>
