<script lang="ts">
  import CardItem from './CardItem.svelte';
  
  export let cards: Array<{
    name: string;
    addHpRate?: number;
    rarity?: number;
    // ...その他のプロパティ
  }>;
</script>

<div class="card-grid">
  {#each cards as card}
    <CardItem {...card} />
  {/each}
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 220px);
    grid-auto-flow: row;
    justify-content: start;
    align-content: start;
    max-width: 90vw;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
  }
</style>