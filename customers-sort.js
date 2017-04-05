const CUSTOMERS = require('./customers.json')

const RADS = (Math.PI / 180)
const EARTH_RADIUS = 6371
const HQ_LAT = 53.3393
const HQ_LONG = -6.2576841
const TARGET_DISTANCE_AWAY = 100

function get_distance_in_km(lat_base, long_base, lat, long) {
    const angle = 0.5 - Math.cos((lat - lat_base) * RADS) / 2 +
          Math.cos(lat_base * RADS) * Math.cos(lat * RADS) *
          (1 - Math.cos((long_base - long) * RADS)) / 2

    return EARTH_RADIUS * (Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle)))
}

const get_nearest_by_distance_k = function (records, distance) {
    const nearest = []

    for (let i = 0, len = records.customers.length; i < len; i++) {
        const cust_lat = parseFloat(records.customers[i].latitude)
        const cust_long = parseFloat(records.customers[i].longitude)

        const customer_distance_away = get_distance_in_km(HQ_LAT, HQ_LONG, cust_lat, cust_long)

        if (customer_distance_away <= distance) {
            nearest.push({name: records.customers[i].name,
                user_id: records.customers[i].user_id,
                dist_away: customer_distance_away + ' km'
            })
        }
    }

    nearest.sort((first, second) => {
        return parseInt(first.user_id, 10) - parseInt(second.user_id, 10)
    })

    return nearest
}

console.log('Customers within 100km are the following: ' + JSON.stringify(get_nearest_by_distance_k(CUSTOMERS, TARGET_DISTANCE_AWAY), null, 2))
