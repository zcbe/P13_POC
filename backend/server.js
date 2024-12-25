const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Liste des messages pour la PoC
let messages = [];

// Route pour servir le frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Gestion des connexions via WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Envoi des messages existants à l'utilisateur
  socket.emit('previousMessages', messages);

  // Réception des messages et diffusion
  socket.on('sendMessage', (msg) => {
    messages.push(msg);
    io.emit('newMessage', msg); // Diffuse à tous les utilisateurs
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s’est déconnecté');
  });
});

// Démarrer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
