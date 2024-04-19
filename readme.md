# Eco'trip API
API en express.js pour gerer le systeme de covoiturage de l'application Eco'trip

## Fonctionnalité principales
- API RESTFul qui appelle sur une DB mongoDB

## Configuration requise
- node.js v21
- npm

## Instruction d'installation

### Via source 

- cloner le dépot : `git clone https://github.com/Vivien-Parsis/nodejs_api-project-back`
- dans le repertoire, pour installer les dependances : `npm install`
- pour le lancer le serveur : `npm start`
  
## Instruction d'installation

### Via docker

- cloner le dépot : `git clone https://github.com/Vivien-Parsis/nodejs_api-project-back`
- build : `docker run --rm -p 3000:3000 --name ecotrip_back ecotrip_back`
- lancer l'image : `docker run --rm -p 3000:3000 --name ecotrip_back ecotrip_back`

## Adresse

`http://localhost:3000`

## Route

[route disponible](/src/router/Router.md)

## Auteur

- Vivien PARSIS
- Adel LÊ
- Ben SHUM
- Ariel AMZALLAG