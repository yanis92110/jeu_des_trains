const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { ajouterJoueur, supprimerJoueur, listerJoueurs } = require('./jeu/joueurs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Un joueur s\'est connecté :', socket.id);

    // Gérer la connexion d'un nouveau joueur
    socket.on('nouveauJoueur', (nom) => {
        ajouterJoueur(socket.id, nom);
        io.emit('miseAJourJoueurs', listerJoueurs());
    });

    // Gérer la déconnexion
    socket.on('disconnect', () => {
        supprimerJoueur(socket.id);
        io.emit('miseAJourJoueurs', listerJoueurs());
    });
});

app.get('/', (req, res) => {
    res.send('Serveur du jeu de plateau fonctionne');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});

listerJoueurs();