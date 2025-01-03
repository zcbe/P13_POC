const http = require('http'); // Serveur HTTP natif
const socketIo = require('socket.io'); // Socket.IO pour WebSocket
const fs = require('fs'); // Module pour lire les fichiers
const path = require('path'); // Module pour gérer les chemins de fichiers

// Créer un serveur HTTP natif
const server = http.createServer((req, res) => {
  // Gestion des routes
  if (req.url === '/' && req.method === 'GET') {
    // Servir le fichier HTML principal
    const filePath = path.join(__dirname, '../frontend/index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/static/') && req.method === 'GET') {
    // Servir les fichiers statiques depuis le dossier frontend/static/
    const filePath = path.join(__dirname, '../frontend', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Fichier non trouvé');
      } else {
        const ext = path.extname(filePath);
        const mimeTypes = {
          '.css': 'text/css',
          '.js': 'application/javascript',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(data);
      }
    });
  } else {
    // Réponse par défaut pour les autres routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page non trouvée');
  }
});

// Initialisation de Socket.IO avec le serveur HTTP
const io = socketIo(server);

// Stockage des messages en mémoire
let messages = [];

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Initialisation du rôle de l'utilisateur
  let role = 'client';

  // Réception du rôle de l'utilisateur
  socket.on('setRole', (userRole) => {
    role = userRole;
    console.log(`Le rôle attribué est : ${role}`);
  });

  // Envoi des messages existants
  socket.emit('previousMessages', messages);

  // Réception d'un message
  socket.on('sendMessage', (msg) => {
    const messageData = { role, msg };
    messages.push(messageData);
    io.emit('newMessage', messageData); // Diffusion à tous
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s’est déconnecté');
  });
});

// Démarrage du serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
