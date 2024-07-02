<script>
  import { URL, generateURL } from "./basics/constant.js";

  let payload;
  let searchValue;
  let payloadEmpty = false;

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      payload = data.parse?.text; // "<h1>...</h1><p>...</p>..." oder undefined

      if (payload) {
        payloadEmpty = false;
      } else {
        payloadEmpty = true;
      }

      console.log(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async function search() {
    let url = generateURL(searchValue);
    fetchData(url);
  }
</script>

<main>
  <h1 class="text-center">What do you want to know today?</h1>

  <input
    type="search"
    name="search"
    id="input-search"
    bind:value={searchValue}
    on:change={search}
  />

  {#if payload}
    {#await payload}
      <div aria-busy={true} style="width: 100%; height: 300px" class="debug">
        Loading...
      </div>
    {:then}
      <div class="content">
        {@html payload.replaceAll(
          /href="([^"]+)"/g,
          'href="https://en.wikipedia.org$1"'
        )}
      </div>
    {:catch error}
      <p class="error">{error.message}</p>
    {/await}
  {:else if payloadEmpty}
    <p class="error">No results found for {searchValue}</p>
  {/if}
</main>

<style>
  .content {
    margin-top: 20px;
  }
  .error {
    color: red;
  }

  main {
    padding: 2rem;
    max-width: 1680px;
    margin: 0 auto;
    overflow-x: hidden;
  }

  #wiki {
    margin-top: 20px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }
</style>