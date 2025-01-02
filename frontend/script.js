// Connexion au serveur via Socket.IO
const socket = io();

// Variable pour stocker le rôle de l'utilisateur (par défaut "client")
let userRole = 'client';

// Fonction pour définir le rôle de l'utilisateur
function setRole(role) {
  userRole = role; // Met à jour le rôle localement
  socket.emit('setRole', role); // Envoie le rôle au serveur
  // Masque la sélection de rôle
  document.getElementById('roleSelection').style.display = 'none';
  // Affiche la section de chat
  document.getElementById('chat').style.display = 'block';
}

// Fonction pour afficher un message dans la section de chat
function appendMessage(data) {
  const messagesDiv = document.getElementById('messages'); // Conteneur des messages
  const messageElement = document.createElement('p'); // Crée un paragraphe pour le message
  // Ajoute le texte du message avec le rôle de l'expéditeur
  messageElement.textContent = `[${data.role}] : ${data.msg}`;
  // Ajoute une classe CSS basée sur le rôle pour styliser différemment client/support
  messageElement.classList.add(data.role);
  // Ajoute le message au conteneur
  messagesDiv.appendChild(messageElement);
  // Fait défiler automatiquement vers le bas pour afficher le dernier message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Écouteur pour recevoir l'historique des messages depuis le serveur
socket.on('previousMessages', (messages) => {
  // Parcourt chaque message de l'historique et l'affiche
  messages.forEach(appendMessage);
});

// Écouteur pour recevoir les nouveaux messages en temps réel
socket.on('newMessage', (data) => {
  // Affiche le nouveau message reçu
  appendMessage(data);
});

// Fonction pour envoyer un message au serveur
function sendMessage() {
  const messageInput = document.getElementById('messageInput'); // Champ de saisie
  const message = messageInput.value.trim(); // Récupère le texte en supprimant les espaces inutiles
  if (message) {
    socket.emit('sendMessage', message); // Envoie le message au serveur
    messageInput.value = ''; // Réinitialise le champ de saisie
  }
}
