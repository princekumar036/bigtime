
// import { DateTime } from "luxon";
// import { normaliseName } from '$lib';
// import locationTimezone from 'node-location-timezone';

// let timezone = '', cityName = '', countryName = '', format12H = true;    
// // NO SLUG



// export async function load({ params }) {

//     // if (!params.slug) {
//     //     timezone = data.timezone
//     //     cityName = data.city
//     //     countryName = data.country_name
//     // }
//     // else {
//         // FIND COUNTRY AND CITY
//         const country = locationTimezone.getCountries()
//             .find(result => normaliseName(result.name) === normaliseName(params.slug))
    
//         const cityData = locationTimezone.getLocations()
//             .find(result => normaliseName(result.city) === normaliseName(params.slug))
    
//         // IF A COUNTRY FOUND
//         if (country) {
//             countryName = country.name
//             // COUNTRY HAS ONLY ONE TIMEZONE
//             if (country?.timezones?.length === 1) {
//                 timezone = country.timezones[0]
//             }
//             // COUNTRY HAS MULTIPLE TIMEZONE
//             else {
//                 // TIMEZONE OF COUNTRY'S CAPITAL CONSIDERED
//                 let capital = locationTimezone.findCapitalOfCountryIso(country?.iso2)
//                 cityName = capital.name
//                 timezone = capital.timezone
//             }
//         }
//         else if (cityData) {
//             cityName = cityData?.city
//             countryName = cityData?.country.name
//             timezone = cityData?.timezone
//         }
//         // NOTHING FOUND
//         else {
//             timezone = ''
//         }
            
//     // }

//     return {
//         timezone: timezone,
//         cityName: cityName,
//         countryName: countryName
//     }
// }