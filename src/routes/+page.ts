
export async function load({ fetch, params }) {
    const response = await fetch('https://ipapi.co/json/')
    const geoip = await response.json()
    return geoip
    return {
        timezone: 'Europe/Helsinki',
        city: 'Helsinki',
        country_name: 'Finland'
    }
}