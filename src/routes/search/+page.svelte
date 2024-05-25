<script lang="ts">
    import locationTimezone from 'node-location-timezone';

    let query:string
    let results: Result[]

    interface Result {
        displayName: string;
        slug: string;
    }

    function search() {
        const iso = locationTimezone.findCountryByIso(query)

        const countries = locationTimezone.getCountries()
            .filter(result => result.name.toLowerCase().includes(query))
            .slice(0, 2)
            .map(country => ({ displayName: country.name, slug: country.name }))

        const cities = locationTimezone.getLocations()
            .filter( result => result.city.toLowerCase().startsWith(query) )
            .slice(0, 2)
            .map(city => ({ displayName: `${city.city}, ${city.country.name}`, slug: city.city }))
        
        if (iso) {
            results = [
                { displayName: `${iso.name} (${iso.iso2})`, slug: iso.name },
                ...countries,
                ...cities
            ]
        }
        else {
            results = [...countries, ...cities]
        }

        return results
    }

    $: search()
</script>

Search <br>
<input class="bg-transparent border" type="text" bind:value={query} on:input={search}>

<br><br>

Results: <br>


{#each results as result}
    <li><a href="/{result.slug.replace(/\s+/g, '-')}">{result.displayName}</a></li>
{/each}