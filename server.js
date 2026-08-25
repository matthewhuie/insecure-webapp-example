const http = require('http');
const fs = require('fs');

const PORT = 3000;
const FORWARD_URL = 'http://server.local/login';

http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(__dirname + '/public/index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('[!] Plaintext credentials received:', body);

      // Insecure: Forwarding credentials over plaintext HTTP
      const forwardReq = http.request(FORWARD_URL, { method: 'POST' }, () => {});
      forwardReq.on('error', () => {}); // Ignore network errors for dummy host
      forwardReq.write(body);
      forwardReq.end();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'received', payload: body }));
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
}).listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
