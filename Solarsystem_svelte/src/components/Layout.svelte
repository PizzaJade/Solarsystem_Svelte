<script>
    export let title = "Learn Solar System";
  </script>
  
  <header>
    <h1>{title}</h1>
    <nav>
      <a href="/#/">Home</a>
      <a href="/#/explore/">Explore</a>
      <a href="/#/basics/">Ask AI Chat Bot</a>
      <a href="/#/quiz/">Quiz</a>
    </nav>
  </header>
  
  <main>
    <slot />
  </main>
  
  <style>
    header {
      background-color: #0070f3;
      padding: 1rem;
      color: white;
    }
  
    nav {
      margin-top: 1rem;
      display: flex;
      justify-content: space-around;
    }
  
    nav a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
  
    nav a:hover {
      text-decoration: underline;
    }
  
    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
    }
  </style>
  