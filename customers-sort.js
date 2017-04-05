const CUSTOMERS = require('./customers.json')

const RADS = (Math.PI / 180)
const EARTH_RADIUS = 6371
const HQ_LAT = 53.3393
const HQ_LONG = -6.2576841
const TARGET_DISTANCE_AWAY = 100

function getDistanceInKm(latBase, longBase, lat, long) {
    const angle = 0.5 - Math.cos((lat - latBase) * RADS) / 2 +
          Math.cos(latBase * RADS) * Math.cos(lat * RADS) *
          (1 - Math.cos((longBase - long) * RADS)) / 2

    return EARTH_RADIUS * (Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle)))
}

const getNearestByDistance = function (records, distance) {
    const nearest = []

    for (let i = 0, len = records.customers.length; i < len; i++) {
        const custLat = parseFloat(records.customers[i].latitude)
        const custLong = parseFloat(records.customers[i].longitude)

        const customerDistanceAway = getDistanceInKm(HQ_LAT, HQ_LONG, custLat, custLong)

        if (customerDistanceAway <= distance) {
            nearest.push({name: records.customers[i].name,
                user_id: records.customers[i].user_id,
                dist_away: customerDistanceAway + ' km'
            })
        }
    }

    nearest.sort((first, second) => {
        return parseInt(first.user_id, 10) - parseInt(second.user_id, 10)
    })

    return nearest
}

console.log('Customers within 100km are the following: ' + JSON.stringify(getNearestByDistance(CUSTOMERS, TARGET_DISTANCE_AWAY), null, 2))
