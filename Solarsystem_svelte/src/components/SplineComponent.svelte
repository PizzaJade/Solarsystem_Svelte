<script>
    import { onMount } from 'svelte';
    import { Application } from '@splinetool/runtime';
  
    let canvas;
  
    onMount(() => {
      const app = new Application(canvas);
      app.load('https://prod.spline.design/ZXeQ8yYS8Se2gmms/scene.splinecode'); // Replace with your Spline scene URL
    });
  </script>
  
  <canvas bind:this={canvas} width="800" height="600"></canvas>
  
  <style>
    canvas {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
    }
  </style>