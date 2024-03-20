const { default: mongoose } = require("mongoose");
const { db_url } = require("./../const/config")

mongoose.connect(db_url)
        .then(() => console.log('Connecté avec succès à MongoDB'))
        .catch((err) => console.error('Erreur lors de la connexion à MongoDB :', err));
  
const car = mongoose.model('cars', {
    modele: { type: String, required: true },
    capacite: { type: Number, required: true },
    energie: { type: String, required: true },
})

const user = mongoose.model('users',{
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: String,
    vehicules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voiture' }],
    motDePasse: { type: String, required: true },
    score: { type: Number, default: 0 },
})

const trip = mongoose.model('trips',{
    debut: { type: Date, required: true },
    fin: { type: Date, required: true },
    distance: { type: Number, required: true },
    conducteurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
    lieuDepart: String,
    lieuFin: String,
    passagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
})

module.exports = { car, user, trip }