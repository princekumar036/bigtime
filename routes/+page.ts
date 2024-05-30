
export async function load({ fetch, params }) {
    const response = await fetch('https://ipapi.co/json/')
    const ipapi = await response.json()
    return ipapi
}