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
            timezone = ''
        }
            
    }

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
    <div class="mb-8">Time in <span class="font-bold ">{cityName ? `${cityName}, ` : ''} {countryName}</span> now:</div>
    <button class="cursor-pointer" on:click={() => format12H = !format12H}>
        {#if format12H}
            <div class="font-RubikMono text-[13vw] md:text-[10vw]">
                {now.toFormat('h:mm:ss')}<span class="font-RubikMono text-[3vw]">{now.toFormat('a')}</span>
            </div>
        {:else}
            <div class="font-RubikMono text-[13vw] md:text-[10vw]">{now.toFormat('HH:mm:ss')}</div>
        {/if}
    </button>
    <div class="mt-8 text-2xl md:text-3xl font-light">{now.toLocaleString(DateTime.DATE_HUGE)}</div>
</div>
{:else}
    <div class="h-screen grid place-content-center justify-self-center text-center">
        <div class="font-RubikMono text-9xl">404</div>
        <div class="mb-10 text-7xl font-thin">Bad Timing</div>
        <a href="/" class="max-w-sm py-2 px-5 rounded bg-slate-900 text-slate-300 dark:bg-slate-300 dark:text-slate-900">
            To Good Times
            <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M22 8v2c2.206 0 4 1.794 4 4s-1.794 4-4 4H10v-5l-6 6l6 6v-5h12c3.309 0 6-2.691 6-6s-2.691-6-6-6"/></svg>
        </a>
    </div>
{/if}