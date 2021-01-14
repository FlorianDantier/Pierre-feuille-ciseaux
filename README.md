# Site de jeu en ligne
Site web permettant de jouer à pierre feuille ciseaux en ligne.

# Installation
1. Avoir une version de Node.js à jour : https://nodejs.org/en/
2. Ouvrir deux consoles : Une pour le client, une pour le serveur
3. Dans la console pour le serveur :
    * Se rendre dans le répertoire SocketServer
    * Exécuter la commande : "npm install" pour installer toutes les dépendances.
    * Exécuter la commande : "npm run dev"
    * Le serveur est maintenant lancé sur le port 8080
4. Dans la console pour le client :
    * Se rendre dans le répertoire client.
    * Exécuter la commande : "npm install" pour installer toutes les dépendances.
    * Exécuter la commande "npm run start".
    * Le client est maintenant lancé sur le port 3000.
5. Normalement une fenêtre s'est ouverte dans votre navigateur web à l'adresse : localhost:3000
    * Si ce n'est pas le cas ouvrez la manuellement en tapant dans la barre d'adresse : localhost:3000
    
NB: Si problème avec la commande pour le serveur, annulez là puis relancez là, 
cela vient du fait que parfois node va chercher les fichiers js
compilé depuis les fichiers ts avant que ces derniers aient été entièrement ajoutés.