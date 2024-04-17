/*
distance : distance effectué par le véhicule durant un trajet
facteurEmision : Emission CO2(kg/km)
consoLitreParCentKm : consomation litre carburant pour cent km
*/
const calculateScoreTrajet = ( distance=0, facteurEmision=0, consoLitreParCentKm=0) => {
    if(!distance){
        distance = 0
    } 
    if(!facteurEmision){
        facteurEmision = 0
    }
    if(!consoLitreParCentKm){
        consoLitreParCentKm = 0
    }
    return consoLitreParCentKm*facteurEmision*distance
} 

module.exports = { calculateScoreTrajet }