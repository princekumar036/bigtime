<script lang="ts">
    import { DateTime } from "luxon";
    import { normaliseName } from '$lib';
    import locationTimezone from 'node-location-timezone';
    import { page } from '$app/stores';

    let timezone = '', cityName = '', countryName = '', format12H = true;
    export let data: any;
    
    // NO SLUG
    if (!$page.params.slug) {
        timezone = data.timezone
        cityName = data.city
        countryName = data.country_name
    }
    else {
        // FIND COUNTRY AND CITY
        const country = locationTimezone.getCountries()
            .find(result => normaliseName(result.name) === normaliseName($page.params.slug))

        const cityData = locationTimezone.getLocations()
            .find(result => normaliseName(result.city) === normaliseName($page.params.slug))

        // IF A COUNTRY FOUND
        if (country) {
            countryName = country.name
            // COUNTRY HAS ONLY ONE TIMEZONE
            if (country?.timezones?.length === 1) {
                timezone = country.timezones[0]
            }
            // COUNTRY HAS MULTIPLE TIMEZONE
            else {
                // TIMEZONE OF COUNTRY'S CAPITAL CONSIDERED
                let capital = locationTimezone.findCapitalOfCountryIso(country?.iso2)
                cityName = capital.name
                timezone = capital.timezone
            }
        }
        else if (cityData) {
            cityName = cityData?.city
            countryName = cityData?.country.name
            timezone = cityData?.timezone
        }
        // NOTHING FOUND
        else {

        }
            
    }

    // console.log('tz:',timezone)
    let now:any
    if (timezone) {
        now = DateTime.now().setZone(timezone)
        // console.log(now)
        setInterval(() => {
            now = DateTime.now().setZone(timezone);
        })
    }
</script>

{#if timezone}
<div class="h-screen grid place-content-center text-center">
    <div>Time in {cityName ? `${cityName}, ` : ''} {countryName} now:</div>
    <button class="cursor-pointer" on:click={() => format12H = !format12H}>
        {#if format12H}
            <div class="font-RubikMono text-[10vw]">
                {now.toFormat('h:mm:ss')}<span class="font-RubikMono text-[3vw]">{now.toFormat('a')}</span>
            </div>
        {:else}
            <div class="font-RubikMono text-[10vw]">{now.toFormat('HH:mm:ss')}</div>
        {/if}
    </button>
    <div class="text-3xl font-light">{now.toLocaleString(DateTime.DATE_HUGE)}</div>
</div>
{/if}


<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

    * {
        font-family: 'Rubik', sans-serif;
    }

    .font-RubikMono {
        font-family: "Rubik Mono One", monospace;
    }
</style>