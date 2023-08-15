const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.json());

let connectionCount = 0;
let recentTexts = [];

app.get('/', (req, res) => {
    res.send('Backend is up and running!');
});

app.post('/submit', async(req, res) => {
    connectionCount++;
    recentTexts.unshift(req.body.text);
    if (recentTexts.length > 2) {
        recentTexts = recentTexts.slice(0, 2);
    }

    const ngrams = await fetchDjangoAPI(recentTexts);

    res.json({ response: `Connection count: ${connectionCount}, Ngrams: ${ngrams}` });
});

async function fetchDjangoAPI(texts) {
    try {
        const res = await fetch('http://your-django-api-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texts }),
        });
        const data = await res.json();
        return data.ngrams;
    } catch (error) {
        console.error('Error fetching Django API:', error);
        return '';
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});