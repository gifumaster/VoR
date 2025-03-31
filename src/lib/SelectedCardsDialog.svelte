<script lang="ts">
  import { selectedCardStore } from './stores/parameterStore';

  export let isOpen = false;

  function closeDialog() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="dialog-overlay" on:click={closeDialog}>
    <div class="dialog-content" on:click|stopPropagation>
      <div class="dialog-header">
        <h2>選択したカード</h2>
        <button class="close-button" on:click={closeDialog}>×</button>
      </div>
      <div class="card-list">
        {#if $selectedCardStore.length === 0}
          <p>カードが選択されていません</p>
        {:else}
          {#each $selectedCardStore as card}
            <div class="selected-card">
              <h3>{card.name}</h3>
              {#if card.addAbillity}
                <p class="ability">{card.addAbillity}</p>
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .dialog-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    color: black;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dialog-header h2 {
    margin: 0;
    color: #333;
  }

  .close-button {
    color:black;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }

  .card-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .selected-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
  }

  .selected-card h3 {
    margin: 0 0 0.5rem 0;
  }

  .ability {
    color: purple;
    margin: 0;
  }
</style>