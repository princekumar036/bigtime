<script lang="ts">
    import search from "$lib/searchFns";
    import { clickOutside } from "$lib/clickOutside";

    let query:string
    let inputElement:HTMLInputElement
    let resultsElement:HTMLUListElement
    let results: any[] = []

    function showInput() {
        inputElement.classList.replace('w-0', 'w-full')
        inputElement.focus()
        results.length > 0 
            ? resultsElement.classList.remove('hidden') 
            : resultsElement.classList.add('hidden')
    }
    function hideInput() {
        inputElement.classList.replace('w-full', 'w-0')
        resultsElement.classList.add('hidden')
    }

    function showResults() {
        query === '' ? results = [] : results = search(query)
        results.length > 0 
            ? resultsElement.classList.remove('hidden') 
            : resultsElement.classList.add('hidden')
    }
    function divblur() {
        alert('blureed')
    }
</script>

<div class="fixed top-0 right-0 bg-slate-800 px-5" use:clickOutside on:click_outside={hideInput}>
    <div class=" flex justify-end  ">
        <input type="text" bind:value={query} bind:this={inputElement} on:input={showResults} class="bg-transparent outline-none w-0 text-xl font-Rubik py-3 transition-all" >
        <button class="" on:click={showInput}>
            <svg class="opacity-70" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
        </button>
        <a data-sveltekit-reload href="/" class="py-3 pl-5">
            <svg class="opacity-70" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z"/></svg>
          </a>
    </div>

    <ul bind:this={resultsElement} class="border-t hidden py-3">
        {#each results as result}
            <li class="my-1 py-1">
                <a data-sveltekit-reload class="block w-full" href="/{result.slug}">{result.displayName}</a>
            </li>
        {/each}
    </ul>
</div>