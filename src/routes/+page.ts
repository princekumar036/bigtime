
export async function load({ fetch, params }) {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data
}