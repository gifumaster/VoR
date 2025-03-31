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
    grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
    gap: 1rem;
    padding: 1rem;
    padding-top:0;
    width: 100%;
    justify-content: center;
    align-content: start;    /* グリッド全体を上寄せ */
    align-items: start;      /* 個々のカードを上寄せ */
  }
</style>