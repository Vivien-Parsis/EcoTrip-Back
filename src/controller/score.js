/*
distance : distance effectué par le véhicule durant un trajet
facteurEmision : Emission CO2(kg/km)
consoLitreParCentKm : consomation litre carburant pour cent km
*/
const calculateScoreTrajet = ( distance=0, facteurEmision=0, consoLitreParCentKm=0) => {
    return consoLitreParCentKm*facteurEmision*distance
} 

module.exports = { calculateScoreTrajet }