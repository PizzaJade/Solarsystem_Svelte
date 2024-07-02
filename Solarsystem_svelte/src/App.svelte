<script>
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Explore from './routes/Explore.svelte';
  import Basics from './routes/Basics.svelte';
  import Quiz from './routes/Quiz.svelte';
  import Popup from './components/Popup.svelte';
  import { push } from 'svelte-spa-router';

  const routes = {
    '/': Home,
    '/explore/': Explore,
    '/basics': Basics,
    '/quiz': Quiz,
  };

  let selectedText = '';
  let showPopup = false;

  function handleMouseUp() {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      selectedText = selection;
      showPopup = true;
    } else {
      showPopup = false;
    }
  }

  function handleShortDescription(event) {
    const { selectedText } = event.detail;
    push(`/explore?query=${encodeURIComponent(selectedText)}`);
    showPopup = false;
  }

  window.addEventListener('mouseup', handleMouseUp);

  function getCurrentRoute() {
    return window.location.hash;
  }
</script>

<main>
  <h1>Learn Solar System</h1>
  <nav>
    <a href="/#/" class:selected="{getCurrentRoute() === '#/' ? 'active' : ''}">Home</a>
    <a href="/#/explore/" class:selected="{getCurrentRoute().startsWith('#/explore') ? 'active' : ''}">Explore</a>
    <a href="/#/basics/" class:selected="{getCurrentRoute().startsWith('#/basics') ? 'active' : ''}">Ask AI Chat Bot</a>
    
  </nav>
  <Router {routes} />
  {#if showPopup}
    <Popup {selectedText} on:close={() => showPopup = false} on:shortDescription={handleShortDescription} />
  {/if}
</main>

<style>
  main { text-align: left; padding: 2rem; }
  nav { margin-bottom: 1rem; }
  nav a {
    margin: 0 1rem;
    text-decoration: none;
    cursor: pointer;
    color: #0070f3;
    font-size: 1.2rem;
  }
  nav a:hover, nav a.active {
    text-decoration: underline;
  }
  nav a.active {
    border-bottom: 2px solid #0070f3;
  }

  @media (max-width: 600px) {
    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    nav a {
      margin-bottom: 0.5rem;
    }
  }
</style>
