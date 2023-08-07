const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client Connected');
  ws.on('message', (message) => {
      const data = message.toString();
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
