<!-- src/components/Popup.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    export let selectedText = '';
    const dispatch = createEventDispatcher();
    let showOptions = false;
  
    function handleWikipedia() {
      showOptions = true;
    }
  
    function handleShortDescription() {
      dispatch('shortDescription', { selectedText });
    }
  
    function handleFullArticle() {
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(selectedText)}`;
      window.open(url, '_blank');
      dispatch('close');
    }
  
    function handleAIChat() {
      window.open(`/#/basics?query=${encodeURIComponent(selectedText)}`, '_blank');
      dispatch('close');
    }
  </script>
  
  <div class="popup">
    {#if !showOptions}
      <p>You selected <strong>{selectedText}</strong>.</p>
      <button on:click={handleWikipedia}>Wikipedia</button>
      <button on:click={handleAIChat}>AI Chat Bot</button>
      <button on:click={() => dispatch('close')}>Close</button>
    {:else}
      <p>Do you want a short description or the full article?</p>
      <button on:click={handleShortDescription}>Short Description</button>
      <button on:click={handleFullArticle}>Full Article</button>
    {/if}
  </div>
  
  <style>
    .popup {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border: 1px solid #ccc;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    .popup button {
      margin-right: 0.5rem;
    }
  </style>
  