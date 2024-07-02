<script>
    import { onMount } from 'svelte';
    import { Application } from '@splinetool/runtime';
  
    let canvas1;
  
    onMount(() => {
      const app = new Application(canvas1);
      app.load('https://prod.spline.design/9z98vmHvo8BizvjS/scene.splinecode'); //Spline scene URL
    });
  </script>
  
  <canvas bind:this={canvas1} width="1000" height="600"></canvas>
  
  <style>
    canvas {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
    }
  </style>