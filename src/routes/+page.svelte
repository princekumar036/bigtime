<script lang="ts">
    import Clock from "$lib/Clock.svelte";
    import Search from "$lib/Search.svelte";

    export let data: any;
</script>

<Search />
<Clock {data} />