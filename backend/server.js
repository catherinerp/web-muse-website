const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

async function fetchColormindPalette(baseColors) {
  try {
    const requestBody = JSON.stringify({ model: 'default', input: baseColors.concat(["N", "N"]) });
    const requestUrl = 'http://colormind.io/api/';
    console.log('Sending request to Colormind API:', requestBody);

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });

    const responseText = await response.text();
    console.log('Raw response from Colormind API:', responseText);

    if (!response.ok) {
      console.error(`Colormind API error, status: ${response.status}`);
      return [];
    }

    if (responseText.includes("<html>") || responseText.includes("<body>")) {
      console.error('Received an HTML error response instead of JSON.');
      return [];
    }

    const data = JSON.parse(responseText);
    console.log('Colormind API response:', data);
    return data.result || [];
  } catch (error) {
    console.error('Error fetching from Colormind:', error);
    return [];
  }
}

app.post('/api/generate-palette', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Received prompt:', prompt);

    const formattedPrompt = `Generate three RGB colors based on the theme '${prompt}'. Give exactly three RGB colors in format [[R, G, B], [R, G, B], [R, G, B]]. Return only the RGB values.`;

    console.log('Requesting Ollama...');
    const response = await fetch('http://127.0.0.1:4000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: formattedPrompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Ollama:', errorData);
      return res.status(500).json({ error: 'Failed to generate base colors' });
    }

    const data = await response.json();
    console.log('Ollama Response:', data);

    const generatedText = data.response?.trim();
    if (!generatedText) {
      return res.status(500).json({ error: 'No valid response from Ollama' });
    }

    // Extract RGB values
    const baseColors = (generatedText.match(/\[([0-9]{1,3}),\s?([0-9]{1,3}),\s?([0-9]{1,3})\]/g) || []).slice(0, 3);
    if (baseColors.length !== 3) {
      return res.status(500).json({ error: 'Could not extract three valid RGB colors' });
    }

    const rgbColors = baseColors.map(color => color.slice(1, -1).split(',').map(c => parseInt(c.trim(), 10)));
    console.log('Extracted Colors:', rgbColors);

    const extendedPalette = await fetchColormindPalette(rgbColors);
    
    res.json({
      palette: extendedPalette.length ? extendedPalette : rgbColors
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate color palette' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
