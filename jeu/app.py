from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

joueurs_connectes = {}

@socketio.on('nouveau_joueur')
def handle_new_player(nom):
    joueurs_connectes[request.sid] = nom
    print(f'{nom} a rejoint la partie.')
    socketio.emit('mise_a_jour_joueurs', joueurs_connectes)

@socketio.on('disconnect')
def handle_disconnect():
    nom = joueurs_connectes.pop(request.sid, None)
    if nom:
        print(f'{nom} s\'est déconnecté.')
        socketio.emit('mise_a_jour_joueurs', joueurs_connectes)

@app.route('/')
def index():
    return "Serveur du jeu de plateau fonctionne"

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3000)