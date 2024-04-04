<script>
  import Reveal from "reveal.js";
  import Markdown from "reveal.js/plugin/markdown/markdown.esm";
  import Highlight from "reveal.js/plugin/highlight/highlight.esm";
  import Speaker from "reveal.js/plugin/notes/notes.esm";
  import { onMount } from "svelte";
  import "reveal.js/dist/reveal.css";
  import "reveal.js/dist/theme/white.css";
  import "highlight.js/styles/atom-one-dark.css";
  import "./deck.css";

  export let centered = false;
  export let url;

  onMount(() => {
    Reveal.initialize({
      center: centered,
      plugins: [Markdown, Highlight, Speaker],
      progress: false,
      slideNumber: true,
      hash: true,
    });
  });
</script>

<div class="reveal">
  <div class="slides">
    <section
      data-markdown
      data-separator="^---"
      data-separator-vertical="^\?\?\?"
    >
      <slot />
    </section>
  </div>
</div>
<div class="overlay">{url}</div>

<style>
  .overlay {
    opacity: 0.6;
    position: absolute;
    top: 0;
    right: 0;
    background: lightgray;
    padding: 10px;
    color: darkblue;
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
  }
</style>
