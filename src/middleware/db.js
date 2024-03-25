const { default: mongoose } = require("mongoose");
const { db_url } = require("./../const/config")
const car = null
const user = null
const trip = null

const initDB = async () => {
        const connection = mongoose.createConnection()
        await mongoose.connect(db_url);
        await car = mongoose.model('cars', {
                modele: { type: String, required: true },
                capacite: { type: Number, required: true },
                energie: { type: String, required: true }})
        await user = mongoose.model('users',{
            nom: { type: String, required: true },
            prenom: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            photo: String,
            vehicules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voiture' }],
            motDePasse: { type: String, required: true },
            score: { type: Number, default: 0 }})
        await trip = mongoose.model('trips',{
            debut: { type: Date, required: true },
            fin: { type: Date, required: true },
            distance: { type: Number, required: true },
            conducteurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
            lieuDepart: String,
            lieuFin: String,
            passagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
        })
}
initDB()  

module.exports = { car, user, trip }
