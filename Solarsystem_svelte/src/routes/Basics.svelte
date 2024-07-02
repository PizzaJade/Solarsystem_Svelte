<script lang="ts">
	import ChatMessage from './basics/ChatMessages.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let scrollToDiv: HTMLDivElement;

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
	}

	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer YOUR_API_TOKEN_HERE'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});

		query = '';

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e) => {
			scrollToBottom();
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
		scrollToBottom();
	}

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>
<main>
<div class="container">
	<div class="header">
		<h1>This is the AI Chat Bot</h1>
		<p>Ask anything about astronomy or the solar system to learn more about it.</p>
	</div>
	<div class="chat-box">
		<div class="message-container">
			<ChatMessage type="assistant" message="Hello, ask me anything you want!" />
			{#each chatMessages as message}
				<ChatMessage type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<ChatMessage type="assistant" message={answer} />
			{/if}
			{#if loading}
				<ChatMessage type="assistant" message="Loading.." />
			{/if}
		</div>
		<div bind:this={scrollToDiv}></div>
	</div>
	<form class="form" on:submit|preventDefault={handleSubmit}>
		<input type="text" class="input" bind:value={query} placeholder="Type your message here..." />
		<button type="submit" class="button">Send</button>
	</form>
</div>
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
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding: 1rem 2rem;
		gap: 1rem;
	}

	.header {
		text-align: left;
		width: 100%;
	}

	.header h1 {
		font-size: 2rem;
		font-weight: bold;
	}

	.header p {
		font-size: 1rem;
		font-style: italic;
	}

	.chat-box {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 600px;
		height: 500px;
		background-color: #1a1a1a;
		border-radius: 0.25rem;
		padding: 1rem;
		overflow-y: auto;
		gap: 1rem;
		color: white;
	}

	.message-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form {
		display: flex;
		width: 100%;
		gap: 1rem;
		background-color: #1a1a1a;
		padding: 1rem;
		border-radius: 0.25rem;
	}

	.input {
		flex-grow: 1;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		color: black;
	}

	.button {
		padding: 0.5rem 1rem;
		border: none;
		background-color: #007BFF;
		color: white;
		border-radius: 0.25rem;
		cursor: pointer;
	}

	.button:hover {
		background-color: #0056b3;
	}

  footer {
      background: rgba(0, 0, 0, 0.5);
      padding: 2rem;
      text-align: left;
  }

  .footer-content {
      margin-bottom: 1rem;
  }
</style>

