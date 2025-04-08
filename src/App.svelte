<script lang="ts">
  import CardSearch from "./lib/CardSearch.svelte";
  import CardGrid from "./lib/CardGrid.svelte";
  import PlayerStatus from "./lib/PlayerStatus.svelte";
  import cardJson from "./assets/cards.json";

  // 初期状態でレアリティ→カード名でソートされた配列を作成
  let filteredCards = [...cardJson.cards].sort((a, b) => {
    if (a.rarity !== b.rarity) {
      return a.rarity - b.rarity; // レアリティで降順ソート
    }
    return a.name.localeCompare(b.name); // レアリティが同じ場合はカード名で昇順ソート
  });

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

  function handleSearch(
    event: CustomEvent<{
      query: string;
      statFilter: string;
      rarityFilter: string;
    }>,
  ) {
    const { query, statFilter, rarityFilter } = event.detail;
    const searchText = query.toLowerCase();

    let filtered = cardJson.cards.filter((card: Card) => {
      const nameMatch = card.name.toLowerCase().includes(searchText);
      const statMatch =
        !statFilter || card[statFilter as keyof Card] !== undefined;
      const rarityMatch = !rarityFilter || card.rarity === Number(rarityFilter);

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
    } else {
      // statFilterが指定されていない場合は、レアリティ→カード名の順でソート
      filtered.sort((a: Card, b: Card) => {
        // まずレアリティで降順ソート
        if (a.rarity !== b.rarity) {
          return a.rarity - b.rarity;
        }
        // レアリティが同じ場合はカード名で昇順ソート
        return a.name.localeCompare(b.name);
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
    width: 100%;
    max-width: 1440px;
  }

  .content-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  :global(.content-wrapper > :first-child) {
    flex: 0 0 300px;
    width: 100%;
    max-width: 300px;
  }

  :global(.content-wrapper > :last-child) {
    flex: 1;
    min-width: 300px;
    max-width: 100%;
    align-self: flex-start;
  }

  @media screen and (max-width: 768px) {
    main {
      padding: 4rem 0.5rem 1rem 0.5rem;
    }

    .content-wrapper {
      flex-direction: column;
      align-items: center;
    }

    :global(.content-wrapper > :first-child) {
      max-width: 100%;
      margin-bottom: 1rem;
    }

    :global(.content-wrapper > :last-child) {
      max-width: 100%;
    }
  }
</style>
