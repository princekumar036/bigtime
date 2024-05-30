
<script lang="ts">
    import "../app.css";
    import { page } from '$app/stores';
    import { DateTime } from 'luxon'
    import Search from "$lib/Search.svelte";

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

<slot />

<Search />

{#if timezone}
<div class="h-screen grid place-content-center text-center">
    <div class="mb-8">Time in <span class="font-bold ">{city ? `${city}, ` : ''} {country}</span> now:</div>
    <button class="cursor-pointer" on:click={() => is12H = !is12H}>
        <div class="font-RubikMono text-[13vw] md:text-[10vw]">
            {#if is12H}
                {now.toFormat('h:mm:ss')}<span class="font-RubikMono text-[3vw]">{now.toFormat('a')}</span>
            {:else}
                {now.toFormat('HH:mm:ss')}
            {/if}
        </div>
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

<style global>
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
</style>