const express = require('express');
const fs = require('fs');
const path = require('path');
const { deploymentAuthentication } = require('./middleware');
const { deployApplication } = require('./deploy');
const app = express();
require('dotenv').config()
const port = process.env.PORT;

// Status
app.get("/api/status", deploymentAuthentication, (req, res) => {
    res.json({ "status": "Online" });
});

// Status Shield
app.get("/api/status/badge", (req, res) => {
    res.json({ "schemaVersion": 1, "label": "Site Status", "message": "online", "color": "brightgreen" });
});

// Deployment
app.post("/api/deploy", deploymentAuthentication, (req, res) => {
    res.json({ "status": "Received" });
    deployApplication();
});

// Serve Vue Build
app.use(express.static(path.join(__dirname, 'dist')));

// Files
const distDir = path.join(__dirname, 'dist');
const vueIndexFile = path.join(distDir, 'index.html');
const fallbackFile = path.join(__dirname, 'fallback.html');

// Catch All
app.get('*', (req, res) => {
    const distExists = fs.existsSync(distDir);
    const indexExists = fs.existsSync(vueIndexFile);
    if (distExists && indexExists) {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    } else res.sendFile(fallbackFile);
});

// Start
app.listen(port, () => {
    console.log(`Serving Bot Website on port ${port}.`);
});
