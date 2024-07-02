<script>
    import { onMount } from "svelte";
    import Loader from "../components/Loader.svelte";
    import { Application } from '@splinetool/runtime';
  
    const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=EefLU0miJpovfcNmDQheGkcGHdleDgUH9HKFOvfH';
    let payload;
    let canvas;
  
    async function fetchAPOD() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log("APOD Data:", data);  // Log API response
        payload = data; // {..., ...}
      } catch (e) {
        console.error("Error fetching APOD:", e);
      } finally {
        console.log("APOD fetch complete");
      }
    }
  
    onMount(() => {
      fetchAPOD();
      const app = new Application(canvas);
      app.load('https://prod.spline.design/eAmDO6WNFznsIaZZ/scene.splinecode');
    });
  </script>
  
  <main>
    <section>
      <canvas bind:this={canvas} id="canvas3d" width="400" height="100"></canvas>
    </section>
  
    {#if payload}
      <section>
        <h2>{payload.title}</h2>
        <p>{payload.date}</p>
        <p>{payload.explanation}</p>
        <img src={payload.url} alt={payload.title} />
      </section>
    {:else}
      <div class="flex center-x-y">
        <Loader />
      </div>
    {/if}
  </main>
  
  <style>
    .flex {
      display: flex;
    }
  
    .center-x-y {
      justify-content: center;
      align-items: center;
    }
  
    main {
      padding: 1rem;
      text-align: center;
      color: white;
    }
  
    header {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 2rem;
    }
  
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
  
    .buttons-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  
    button {
      padding: 1rem;
      font-size: 1.2rem;
      border: none;
      border-radius: 8px;
      background-color: #1e90ff;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #1c86ee;
    }
  
    @media (max-width: 600px) {
      .buttons-container {
        grid-template-columns: 1fr;
      }
    }
  
    canvas {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
    }
  </style>