<script lang="ts">
  import CardSearch from './lib/CardSearch.svelte';
  import CardGrid from './lib/CardGrid.svelte';
  import cardJson from "./assets/cards.json";

  let filteredCards = cardJson.cards;

  interface Card {
    name: string;
    rarity: number;
    addHpRate?: number;
    addHpDraimRate?: number;
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
    [key: string]: string | number | undefined;
  }

  function handleSearch(event: CustomEvent<{ query: string, statFilter: string, rarityFilter: string }>) {
    const { query, statFilter, rarityFilter } = event.detail;
    const searchText = query.toLowerCase();

    filteredCards = (cardJson.cards as Card[]).filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchText);
      const statMatch = !statFilter || card[statFilter] !== undefined;
      const rarityMatch = !rarityFilter || (card.rarity === Number(rarityFilter));
      
      return nameMatch && statMatch && rarityMatch;
    });
  }
</script>

<main>
  <CardSearch on:search={handleSearch} />
  <CardGrid cards={filteredCards} />
</main>

<style>
  main {
    margin: 0 auto;
    padding: 6rem 2rem 2rem 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
