// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const OPENAI_KEY = process.env.OPENAI_KEY;
  const messages = req.body.messages;

  if (!OPENAI_KEY) {
    return res.status(500).send({ error: 'API key not set' });
  }

  const chatRequestOpts = {
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.9,
    stream: false
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatRequestOpts)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
