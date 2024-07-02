<script>
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte";
  import { Application } from '@splinetool/runtime';

  const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=EefLU0miJpovfcNmDQheGkcGHdleDgUH9HKFOvfH';
  let payload;
  let canvas;

  let showModal = false;

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

  function toggleModal() {
      showModal = !showModal;
  }
</script>

<main>
  <section class="welcome-content">
      <h2>Welcome to our Astronomy Exploration Site!</h2>
      <p>
          Embark on a cosmic journey as you explore the fascinating world of astronomy and our solar system. Whether you're a seasoned stargazer or a curious novice, our interactive platform is designed to enhance your understanding of the universe.
      </p>
      <p>
          For example, you can choose "Nebula" to dive into the mystifying clouds of gas and dust that birth stars. Each selection will unveil a wealth of information, stunning visuals, and engaging content to help you discover the wonders of the cosmos.
      </p>
      <p>Start exploring now and let the stars be your guide!</p>
  </section>

  {#if payload}
  <section class="apod-container debug">
      <div class="apod-text">
          <h1>Astronomy Picture of the Day</h1>
          <h2>{payload.title}</h2>
          <p>{payload.date}</p>
          <h3>Explanation:</h3>
          <p class="apod-explanation">{payload.explanation}</p>
      </div>
      <div class="apod-image">
          {#if payload.media_type === 'image'}
          <img src={payload.url} alt={payload.title} tabindex="0" role="button" aria-label="View full image" on:click={toggleModal} on:keydown={(e) => e.key === 'Enter' && toggleModal()} />
          {:else if payload.media_type === 'video'}
          <iframe src={payload.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="{payload.title}" aria-label="NASA video"></iframe>
          {/if}
      </div>
  </section>
  {:else}
  <div class="flex center-x-y">
      <Loader />
  </div>
  {/if}

  {#if showModal}
  <div class="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div class="modal-content">
          <button class="close" aria-label="Close modal" on:click={toggleModal}>&times;</button>
          <img src={payload.url} alt={payload.title} class="modal-image" id="modal-image" />
      </div>
  </div>
  {/if}

  <section class="apod-canvas">
      <canvas bind:this={canvas} id="canvas3d" width="300" height="100"></canvas>
      <p>Here is a cool Nebula in 3D! Feel free to move it with your mouse.</p>
  </section>
</main>

<footer>
  <section class="footer-content">
      <h2>Impressum</h2>
    
  </section>
  <section class="footer-content">
      <h2>Datenschutz</h2>
      
  </section>
  <section class="footer-content">
      <h2>Owner Information</h2>
     
  </section>
</footer>

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
      text-align: left;
      color: white;
  }

  header {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 2rem;
  }

  .apod-container {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 6rem;
      margin: 5rem auto 0;
      max-width: 1680px;
  }

  .apod-text {
      flex: 1;
      margin-right: 1rem;
  }

  .apod-text p:last-child {
      max-width: 70ch;
  }

  .apod-image {
      max-width: 400px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
  }

  .apod-image img, .apod-image iframe {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      cursor: pointer;
  }

  img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      cursor: pointer;
  }

  iframe {
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
      background-color: #5385b6;
  }

  @media (max-width: 600px) {
      .buttons-container {
          grid-template-columns: 1fr;
      }

      .apod-container {
          flex-direction: column;
      }

      .apod-text {
          margin-right: 0;
          margin-bottom: 1rem;
      }

      .apod-image {
          max-width: 100%;
      }
  }

  canvas {
      width: 100%;
      height: 100%;
      border: 1px solid #0a0707;
  }

  footer {
      background: rgba(0, 0, 0, 0.5);
      padding: 2rem;
      text-align: left;
  }

  .footer-content {
      margin-bottom: 1rem;
  }

  .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.9);
  }

  .modal-content {
      position: relative;
      margin: auto;
      padding: 0;
      max-width: 90%;
      max-height: 90%;
  }

  .modal-image {
      max-width: 100%;
      max-height: 100%;
  }

  .close {
      position: absolute;
      top: 10px;
      right: 25px;
      color: #fff;
      font-size: 35px;
      font-weight: bold;
      cursor: pointer;
      background: transparent;
      border: none;
  }

  .close:hover,
  .close:focus {
      color: #bbb;
      text-decoration: none;
      cursor: pointer;
  }
</style>
