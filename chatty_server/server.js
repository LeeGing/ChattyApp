const express = require('express');
const SocketServer = require('ws').Server;
const ws = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Sends all received messages to all clients.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

//Updates the counter for users online.
function updateUserCount() {
  const userCount = { type: "count", userCount: wss.clients.size};
  wss.broadcast(JSON.stringify(userCount));
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  updateUserCount();

  ws.on('message', (message) => {
    console.log('Got a message!');
    const receivedMessage = JSON.parse(message);

    if(receivedMessage.type === 'postMessage') {
      console.log("Message Text", message);
      const newReceivedMessage = {
        type:'incomingMessage',
        id: uuidv1(),
        username: receivedMessage.username,
        content: receivedMessage.content
      };
    console.log (newReceivedMessage);
    wss.broadcast(JSON.stringify(newReceivedMessage));
    } else if (receivedMessage.type === 'postNotification'){
      const newReceivedMessage ={
        type: 'incomingNotification',
        id: uuidv1(),
        username: receivedMessage.username,
        content: receivedMessage.content
      };
    wss.broadcast(JSON.stringify(newReceivedMessage));
    // console.log("UUID: "  + receivedMessageUUID + "User: " + receivedMessage.username + " " + "said " +receivedMessage.content);
    };
   });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    updateUserCount();
  });

});
