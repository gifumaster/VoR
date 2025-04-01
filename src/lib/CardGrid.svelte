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
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: 1rem;
    padding: 1rem;
    padding-top: 0;
    width: 100%;
    max-width: calc(250px * 4 + 3rem); /* 4列の最大幅（カード幅×4 + gap×3）*/
    margin: 0 auto;
    justify-content: center;
    align-content: start;
    align-items: start;
  }

  /* 画面幅が狭い場合のカード幅調整 */
  @media (max-width: 1200px) {
    .card-grid {
      max-width: calc(250px * 3 + 2rem);
    }
  }

  @media (max-width: 900px) {
    .card-grid {
      max-width: calc(250px * 2 + 1rem);
    }
  }

  @media (max-width: 600px) {
    .card-grid {
      max-width: 250px;
    }
  }
</style>