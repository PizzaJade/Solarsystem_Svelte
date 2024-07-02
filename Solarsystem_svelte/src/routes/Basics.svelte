<script lang="ts">
	import ChatMessage from './basics/ChatMessages.svelte';
  import ChatCompletionRequestMessage from 'openai';
	import { SSE } from 'sse.js';

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let scrollToDiv: HTMLDivElement;

	const astronomyTerms = ["nebula", "galaxy", "black hole", "supernova", "comet"];

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
				// Add your authentication token or other headers here
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

	const handleTermClick = (term: string) => {
		query = `Tell me about ${term}.`;
		handleSubmit();
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 1rem 2rem;
		gap: 1rem;
	}

	.header {
		text-align: center;
	}

	.header h1 {
		font-size: 2rem;
		font-weight: bold;
	}

	.header p {
		font-size: 1rem;
		font-style: italic;
	}

	.terms {
		display: flex;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.term-button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		background: none;
		cursor: pointer;
		border-radius: 0.25rem;
	}

	.term-button:hover {
		background-color: #f0f0f0;
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
</style>

<div class="container">
	<div class="header">
		<h1>Welcome to our Astronomy Exploration Site!</h1>
		<p>Select a word related to astronomy or the solar system to learn more about it.</p>
	</div>
	<div class="terms">
		{#each astronomyTerms as term}
			<button class="term-button" on:click={() => handleTermClick(term)}>{term}</button>
		{/each}
	</div>
	<div class="chat-box">
		<div class="flex flex-col gap-2">
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
		<input type="text" class="input" bind:value={query} />
		<button type="submit" class="button">Send</button>
	</form>
</div>
