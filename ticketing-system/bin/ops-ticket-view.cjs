#!/usr/bin/env node

const http = require('http');
const handler = require('serve-handler');
const path = require('path');
const fs = require('fs');

const distDir = path.join(__dirname, '..', 'dist');

function ensureBuilt() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist folder not found. Please run: npm run build');
    process.exit(1);
  }
}

function serve(port = process.env.PORT || 5173) {
  ensureBuilt();
  const server = http.createServer((request, response) => {
    // Single-page app fallback: serve 404.html which is a copy of index.html
    return handler(request, response, {
      public: distDir,
      rewrites: [
        { source: '**', destination: '/index.html' }
      ]
    });
  });

  server.listen(port, () => {
    console.log(`ops-ticket-view running at http://localhost:${port}`);
  });
}

serve();
