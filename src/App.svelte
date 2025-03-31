<script lang="ts">
  import CardSearch from './lib/CardSearch.svelte';
  import CardGrid from './lib/CardGrid.svelte';
  import cardJson from "./assets/cards.json";

  let filteredCards = cardJson.cards;

  function handleSearch(event: CustomEvent<{ query: string, statFilter: string }>) {
    const { query, statFilter } = event.detail;
    const searchText = query.toLowerCase();

    filteredCards = cardJson.cards.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchText);
      
      if (!statFilter) {
        return nameMatch;
      }

      const hasSelectedStat = card[statFilter] !== undefined;
      return nameMatch && hasSelectedStat;
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
