# Router

## User

### se connecter

POST `/user/signin`

### S'inscrire

POST `/user/signup`

### avoir l'historique des trajets pour un user

POST `/user/trip/get`

### s'ajouter un vehicule

POST `/user/car/add`

### supprimer un user

POST `/user/delete/:id`

### modifier un user

POST `/user/update/:id`

## Trip

### Recuperer les trajets

GET `/trip/get`

### Creer un trajet

POST `/trip/create`

### Supprimer un trajet

POST `/trip/delete/:id`

### modifier un trajet

POST `/trip/update/:id`

### ajouter un passager

POST `/trip/passenger/add/:id`

### supprimer un passager

POST `/trip/passenger/remove/:id`

## Car

### recuperer les voitures

GET `/car/get/:id?`

### creer une voiture

POST `/car/create`

### supprimer une voiture

POST `/car/delete/:id`

### modifier une voiture

POST `/car/update/:id`