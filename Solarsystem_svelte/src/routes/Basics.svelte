<!-- src/routes/Basics.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let query: string = '';
  let answer: string = '';
  let loading: boolean = false;
  let chatMessages: { role: 'user' | 'assistant', content: string }[] = [];
  let scrollToDiv: HTMLDivElement;

  function scrollToBottom() {
    setTimeout(() => {
      scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 100);
  }

  const handleSubmit = async () => {
    loading = true;
    chatMessages = [...chatMessages, { role: 'user', content: query }];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: chatMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();
      const [completion] = data.choices;
      answer = completion.message.content;
      chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
      query = '';
      scrollToBottom();
    }
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('query');
    if (queryParam) {
      query = queryParam;
      handleSubmit();
    }
  });
</script>

<div class="flex flex-col pt-4 w-full px-8 items-center gap-2">
  <div>
    <h1 class="text-2xl font-bold w-full text-center">Chatty</h1>
    <p class="text-sm italic">Powered by gpt-3.5-turbo</p>
  </div>
  <div class="h-[500px] w-full bg-gray-900 rounded-md p-4 overflow-y-auto flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      {#each chatMessages as message}
        <div class="chat {message.role === 'user' ? 'chat-end' : 'chat-start'} justify-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img src="https://ui-avatars.com/api/?name={message.role === 'user' ? 'Me' : 'B'}" alt="{message.role} avatar" />
            </div>
          </div>
          <div class="chat-header">
            {message.role === 'user' ? 'Me' : 'Bot'}
          </div>
          <div class="chat-bubble {message.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
            {message.content}
          </div>
        </div>
      {/each}
      {#if answer}
        <div class="chat chat-start justify-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img src="https://ui-avatars.com/api/?name=B" alt="assistant avatar" />
            </div>
          </div>
          <div class="chat-header">Bot</div>
          <div class="chat-bubble chat-bubble-secondary">{answer}</div>
        </div>
      {/if}
      {#if loading}
        <div class="chat chat-start justify-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img src="https://ui-avatars.com/api/?name=B" alt="assistant avatar" />
            </div>
          </div>
          <div class="chat-header">Bot</div>
          <div class="chat-bubble chat-bubble-secondary">Loading...</div>
        </div>
      {/if}
    </div>
    <div class="" bind:this={scrollToDiv} />
  </div>
  <form class="flex w-full rounded-md gap-4 bg-gray-900 p-4" on:submit|preventDefault={handleSubmit}>
    <input type="text" class="input input-bordered w-full" bind:value={query} />
    <button type="submit" class="btn btn-accent">Send</button>
  </form>
</div>

<style>
  .chat-start { justify-content: flex-start; }
  .chat-end { justify-content: flex-end; }

  .chat-image.avatar {
    margin-right: 10px;
  }

  .chat-bubble-primary {
    background-color: #0070f3;
    color: white;
  }

  .chat-bubble-secondary {
    background-color: #e2e2e2;
    color: black;
  }
</style>
