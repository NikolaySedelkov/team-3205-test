import app from "./src";

import path from 'path';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/assets/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});