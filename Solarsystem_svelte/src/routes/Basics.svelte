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
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('query');
    if (queryParam) {
      query = queryParam;
      handleSubmit();
    }
  });
</script>

<div class="chat-container">
  <div class="chat-header">
    <h1>Chatty</h1>
    <p>Powered by GPT-3.5-turbo</p>
  </div>

  <div class="chat-window" on:scroll={scrollToBottom}>
    {#each chatMessages as message}
      <div class="chat-message {message.role}">
        <div class="avatar">
          <img src="https://ui-avatars.com/api/?name={message.role === 'user' ? 'Me' : 'Bot'}" alt="{message.role} avatar" />
        </div>
        <div class="message-content">
          <div class="message">{message.content}</div>
        </div>
      </div>
    {/each}

    {#if loading}
      <div class="chat-message assistant">
        <div class="avatar">
          <img src="https://ui-avatars.com/api/?name=Bot" alt="assistant avatar" />
        </div>
        <div class="message-content">
          <div class="message">Loading...</div>
        </div>
      </div>
    {/if}

    <div bind:this={scrollToDiv}></div>
  </div>

  <form class="chat-input" on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={query} placeholder="Type your message..." />
    <button type="submit">Send</button>
  </form>
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 100%;
    margin: 0 auto;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .chat-header {
    padding: 1rem;
    background-color: #0070f3;
    color: white;
    text-align: center;
  }

  .chat-header h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .chat-header p {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
  }

  .chat-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
  }

  .chat-message {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0.5rem 0;
  }

  .chat-message.user {
    justify-content: flex-end;
  }

  .chat-message.assistant {
    justify-content: flex-start;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
  }

  .avatar img {
    width: 100%;
    height: 100%;
  }

  .message-content {
    max-width: 70%;
  }

  .message {
    background-color: #e2e2e2;
    border-radius: 10px;
    padding: 0.75rem;
    color: #000;
  }

  .chat-message.user .message {
    background-color: #0070f3;
    color: #fff;
  }

  .chat-input {
    display: flex;
    padding: 1rem;
    background-color: #fff;
    border-top: 1px solid #ccc;
  }

  .chat-input input {
    flex-grow: 1;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right: 1rem;
  }

  .chat-input button {
    padding: 0.75rem 1.5rem;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .chat-input button:hover {
    background-color: #005bb5;
  }
</style>
