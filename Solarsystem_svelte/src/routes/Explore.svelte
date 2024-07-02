<script>
  import { onMount } from 'svelte';
  import { getQueryValue } from "../lib/js/functions.js";

  export let params;

  let payload = '';
  let searchValue = '';
  let payloadEmpty = false;
  let loading = false;
  let error = '';
  let images = [];

  async function fetchData(url) {
    try {
      loading = true;
      error = '';
      const response = await fetch(url);
      const data = await response.json();
      const page = Object.values(data.query.pages)[0];
      if (page.extract) {
        payload = page.extract;
        if (page.thumbnail) {
          images = [page.thumbnail.source];
        } else {
          images = [];
        }
      } else {
        payload = 'No summary available.';
        images = [];
      }
      payloadEmpty = !payload;

      console.log(payload);
    } catch (err) {
      error = 'Error fetching data';
      console.error(err);
    } finally {
      loading = false;
    }
  }

  let allowedWords = [
    
  ]

  async function search() {
    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*&titles=${encodeURIComponent(searchValue)}&piprop=thumbnail&pithumbsize=300`;
    fetchData(url);
  }

  onMount(() => {
    const query = getQueryValue(window.location.href)

    if (query) {
      searchValue = query;
      search();
    }
  });
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
  
  {#if loading}
    <div aria-busy={true} style="width: 100%; height: 300px" class="debug">
      Loading...
    </div>
  {:else if error}
    <p class="error">{error}</p>
  {:else if payload}
    <div class="content">
      {#each images as image}
        <p><img src={image} alt="Related image" /></p>
      {/each}
      <p>{payload}</p>
    </div>
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

  img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
</style>
