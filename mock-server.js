import http from 'http';

const PORT = 8000;

const opportunities = [];

const portfolios = [];

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost:8000'}`);

  console.log(`[API Server] ${req.method} ${url.pathname}`);

  if (req.method === 'GET' && (url.pathname === '/api/opportunities' || url.pathname === '/api/opportunity')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: opportunities }));
    return;
  }

  if (req.method === 'GET' && (url.pathname === '/api/portfolios' || url.pathname === '/api/portfolio')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: portfolios }));
    return;
  }

  if (req.method === 'POST' && (url.pathname === '/api/job-applications' || url.pathname === '/api/job-application')) {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Job application received successfully.' }));
    return;
  }

  if (req.method === 'POST' && (url.pathname === '/api/resumes' || url.pathname === '/api/resume')) {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Resume uploaded successfully.' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, message: 'Endpoint not found.' }));
});

server.listen(PORT, () => {
  console.log(`Los Colinas API Server running on http://localhost:${PORT}/api`);
});
