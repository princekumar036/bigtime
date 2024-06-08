<script lang="ts">
    import "../../app.css";
    import { page } from '$app/stores';
    import { DateTime } from 'luxon'
    import Search from "$lib/Search.svelte";
    import Nav from "$lib/Nav.svelte";

    const timezone = $page.data.timezone
    const city = $page.data.city
    const country = $page.data.country_name

    let is12H:boolean = true
    let now = DateTime.now().setZone(timezone)
    if (timezone) {
        now = DateTime.now().setZone(timezone)
        setInterval(() => {
            now = DateTime.now().setZone(timezone);
        })
    }
</script>

<svelte:head>
    <title>{city ? city : country} {is12H ? now.toFormat('h:mm a') : now.toFormat('HH:mm')}</title> 
</svelte:head>

<slot />

<!-- <Search /> -->

{#if timezone}
<div class="h-[90vh] grid place-content-center text-center">
    <div class="mb-8 md:mb-2">Time in <span class="font-bold ">{city ? `${city}, ` : ''} {country}</span> now:</div>
    <button class="cursor-pointer" on:click={() => is12H = !is12H}>
        <div class="font-RubikMono text-[13vw] xl:text-[10vw]">
            {#if is12H}
                {now.toFormat('h:mm:ss')}<span class="font-RubikMono text-[3vw]">{now.toFormat('a')}</span>
            {:else}
                {now.toFormat('HH:mm:ss')}
            {/if}
        </div>
    </button>
    <div class="mt-8 md:mt-2 text-2xl md:text-3xl">{now.toLocaleString(DateTime.DATE_HUGE)}</div>
</div>
{:else}
<div class="h-[90vh] grid place-content-center justify-self-center text-center">
    <div class="font-RubikMono text-9xl">404</div>
    <div class="mb-10 text-7xl font-thin">Bad Timing</div>
    <a href="/" class="max-w-sm py-2 px-5 rounded bg-lpm text-lbg dark:bg-dpm dark:text-dbg md:text-xl md:font-bold">
        To Good Times
        <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" />
        </svg>
    </a>
</div>
{/if}

