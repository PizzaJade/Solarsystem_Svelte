<script>
import { push } from "svelte-spa-router";
import { onMount } from 'svelte';
    import axios from 'axios';
    let messages = [];
    let userMessage = '';

    const sendMessage = async () => {
        if (userMessage.trim() === '') return;
        messages = [...messages, { role: 'user', content: userMessage }];
        userMessage = '';

        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n') + '\nAI:',
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.9,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_OPENAI_API_KEY`
                }
            });
            messages = [...messages, { role: 'ai', content: response.data.choices[0].text.trim() }];
        } catch (error) {
            console.error('Error communicating with OpenAI API', error);
            messages = [...messages, { role: 'ai', content: 'Error communicating with AI' }];
        }
    };
</script>
<style>
    .chat {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto;
    }
    .messages {
        flex-grow: 1;
        overflow-y: auto;
        padding: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        height: 300px;
    }
    .message {
        margin-bottom: 10px;
    }
    .user {
        text-align: right;
    }
    .input {
        display: flex;
    }
    input {
        flex-grow: 1;
        padding: 10px;
    }
    button {
        padding: 10px;
    }
</style>

<div class="chat">
    <div class="messages">
        {#each messages as { role, content }}
            <div class="message {role}">
                <strong>{role}:</strong> {content}
            </div>
        {/each}
    </div>
    <div class="input">
        <input bind:value={userMessage} placeholder="Type your message..." on:keypress="{(e) => e.key === 'Enter' && sendMessage()}">
        <button on:click={sendMessage}>Send</button>
    </div>
</div>