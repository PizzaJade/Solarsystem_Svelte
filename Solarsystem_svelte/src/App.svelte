<script>
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";
  import Home from './routes/Home.svelte';
  import Explore from './routes/Explore.svelte';
  import Basics from './routes/Basics.svelte';
  import Quiz from './routes/Quiz.svelte';

  const routes = {
    "/": Home,
    "/explore/": Explore,
    "/basics": Basics,
    "/quiz": Quiz,
  };
</script>

<main>
  <h1>Learn Solarsystem</h1>
  
  <nav>
    <a href="/#/">Home</a>
    <a href="/#/explore/">Explore</a>
    <a href="/#/basics/">Ask AI Chat Bot</a>
    <a href="/#/quiz/" >Quiz</a>
  </nav>

  <Router {routes} />


  
</main>

<style>
  main {
    text-align: left;
    padding: 2rem;
  }
  nav {
    margin-bottom: 1rem;
  }
  nav a {
    margin: 0 1rem;
    text-decoration: none;
    cursor: pointer;
    color: #0070f3;
  }
  nav a:hover {
    text-decoration: underline;
  }
</style>