<script lang="ts">
  import CardItem from "./CardItem.svelte";

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
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
    gap: 1rem;
    padding: 1rem;
    padding-top: 0;
    width: 100%;
    max-width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-content: start;
    align-items: start;
  }

  @media screen and (min-width: 1920px) {
    .card-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
