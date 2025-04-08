<script lang="ts">
  import { parameterStore, selectedCardStore } from "./stores/parameterStore";
  import SelectedCardsDialog from "./SelectedCardsDialog.svelte";

  // デフォルトのパラメータをインポート
  import defaultJson from "../assets/default.json";

  let isDialogOpen = false;

  function showSelectedCards() {
    isDialogOpen = true;
  }

  function resetAll() {
    parameterStore.reset();
    selectedCardStore.set([]);
  }
</script>

<div class="status-panel">
  <div class="header">
    <h3>ステータス</h3>
    <div class="button-group">
      <button class="show-cards-button" on:click={showSelectedCards}>
        {$selectedCardStore.length}枚選択
      </button>
      <button class="reset-button" on:click={resetAll}> リセット </button>
    </div>
  </div>
  <table class="stats">
    <tbody>
      <tr>
        <td>HP:</td>
        <td
          class:buff={$parameterStore.hp > defaultJson.hp}
          class:debuff={$parameterStore.hp < defaultJson.hp}
        >
          {Math.floor($parameterStore.hp)}
        </td>
      </tr>
      <tr>
        <td>ダメージ:</td>
        <td
          class:buff={$parameterStore.damege > defaultJson.damege}
          class:debuff={$parameterStore.damege < defaultJson.damege}
        >
          {Math.floor($parameterStore.damege)}
        </td>
      </tr>
      <tr>
        <td>HP吸収:</td>
        <td
          class:buff={$parameterStore.hpDrain > defaultJson.hpDrain}
          class:debuff={$parameterStore.hpDrain < defaultJson.hpDrain}
        >
          {Math.floor($parameterStore.hpDrain)} %
        </td>
      </tr>
      <tr>
        <td>装弾数:</td>
        <td
          class:buff={$parameterStore.bulletAmount > defaultJson.bulletAmount}
          class:debuff={$parameterStore.bulletAmount < defaultJson.bulletAmount}
        >
          {Math.floor($parameterStore.bulletAmount)}
        </td>
      </tr>
      <tr>
        <td>同時発射数:</td>
        <td
          class:buff={$parameterStore.bulletAmountPerShot >
            defaultJson.bulletAmountPerShot}
          class:debuff={$parameterStore.bulletAmountPerShot <
            defaultJson.bulletAmountPerShot}
        >
          {Math.floor($parameterStore.bulletAmountPerShot)}
        </td>
      </tr>
      <tr>
        <td>跳弾回数:</td>
        <td
          class:buff={$parameterStore.bulletBounds > defaultJson.bulletBounds}
          class:debuff={$parameterStore.bulletBounds < defaultJson.bulletBounds}
        >
          {Math.floor($parameterStore.bulletBounds)}
        </td>
      </tr>
      <tr>
        <td>リロード速度:</td>
        <td
          class:buff={$parameterStore.reloadSpeed < defaultJson.reloadSpeed}
          class:debuff={$parameterStore.reloadSpeed > defaultJson.reloadSpeed}
        >
          {Math.floor($parameterStore.reloadSpeed * 100) / 100}秒
        </td>
      </tr>
      <tr>
        <td>シールドCD:</td>
        <td
          class:buff={$parameterStore.shieldCoolTime <
            defaultJson.shieldCoolTime}
          class:debuff={$parameterStore.shieldCoolTime >
            defaultJson.shieldCoolTime}
        >
          {Math.floor($parameterStore.shieldCoolTime * 100) / 100}秒
        </td>
      </tr>
      <tr>
        <td>弾速:</td>
        <td
          class:buff={$parameterStore.bulletSpeed > defaultJson.bulletSpeed}
          class:debuff={$parameterStore.bulletSpeed < defaultJson.bulletSpeed}
        >
          {(18 * Math.floor($parameterStore.bulletSpeed)) / 100} ({Math.floor(
            $parameterStore.bulletSpeed,
          )}%)
        </td>
      </tr>
      <tr>
        <td>連射速度:</td>
        <td
          class:buff={$parameterStore.fireRate < defaultJson.fireRate}
          class:debuff={$parameterStore.fireRate > defaultJson.fireRate}
        >
          {Math.floor(100 * (1 / $parameterStore.fireRate)) / 100}/sec ({Math.floor(
            $parameterStore.fireRate * 100,
          ) / 100})
        </td>
      </tr>
      <tr>
        <td>移動速度:</td>
        <td
          class:buff={$parameterStore.movingSpeed > defaultJson.movingSpeed}
          class:debuff={$parameterStore.movingSpeed < defaultJson.movingSpeed}
        >
          {(5 * Math.floor($parameterStore.movingSpeed)) / 100} ({Math.floor(
            $parameterStore.movingSpeed,
          )}%)
        </td>
      </tr>
      <tr>
        <td>ジャンプ力:</td>
        <td
          class:buff={$parameterStore.jumpHeight > defaultJson.jumpHeight}
          class:debuff={$parameterStore.jumpHeight < defaultJson.jumpHeight}
        >
          {(8 * Math.floor($parameterStore.jumpHeight)) / 100} ({Math.floor(
            $parameterStore.jumpHeight,
          )}%)
        </td>
      </tr>
      <tr>
        <td>ジャンプ回数:</td>
        <td
          class:buff={$parameterStore.numberOfJump > defaultJson.numberOfJump}
          class:debuff={$parameterStore.numberOfJump < defaultJson.numberOfJump}
        >
          {Math.floor($parameterStore.numberOfJump)}回
        </td>
      </tr>
    </tbody>
  </table>

  <!-- アビリティ一覧を追加 -->
  {#if $selectedCardStore.some((card) => card.addAbillity)}
    <div class="abilities-section">
      <h3>アビリティ</h3>
      <ul class="abilities-list">
        {#each $selectedCardStore.filter((card) => card.addAbillity) as card}
          <li>
            <span class="ability-desc">{card.addAbillity}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <p class="notice">
    上限値を把握してないものもあります。<br />
    　連射速度はリロードを考えない場合、1秒間に何発撃てるかの表記を取っています。
    ()内の数値はゲーム上で表現されるFireRateです。
  </p>
</div>

<SelectedCardsDialog bind:isOpen={isDialogOpen} />

<style>
  .status-panel {
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    color: black;
    position: sticky;
    top: 7rem; /* ヘッダーの高さ + 余白 */
    max-height: calc(100vh - 8rem); /* ビューポートの高さから余白を引く */
    overflow-y: auto;
    align-self: flex-start;
    z-index: 10; /* z-indexを追加 */
  }

  @media screen and (max-width: 768px) {
    .status-panel {
      position: relative;
      top: 0;
      max-height: none;
      width: 100%;
      margin-bottom: 2rem;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
    color: #333;
  }

  .button-group {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
  }

  .reset-button {
    padding: 0.5rem 1rem;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .show-cards-button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .reset-button:hover {
    background-color: #ff5252;
  }

  .show-cards-button:hover {
    background-color: #45a049;
  }

  .stats {
    width: 100%;
    border-collapse: collapse;
  }

  .stats td {
    padding: 0.3rem 0;
    text-align: left;
  }

  .stats td:first-child {
    font-weight: bold;
    padding-right: 1rem;
  }

  .stats td:last-child {
    text-align: right;
  }

  .buff {
    color: blue;
  }

  .debuff {
    color: red;
  }

  .abilities-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  .abilities-section h3 {
    color: #333;
    margin: 0 0 0.5rem 0;
  }

  .abilities-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .abilities-list li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .ability-name {
    font-weight: bold;
    color: #333;
    margin-right: 0.5rem;
  }

  .ability-desc {
    color: purple;
  }

  .notice {
    color: gray;
    font-size: 0.8rem;
  }
</style>
