<script context="module">
    export function preload(page) {
        const id = page.params.id;
        console.log(id)
        return {id}
    }
</script>

<script>
    export let id;
</script>
<style>

</style>
<svelte:head>
    <title>Sapper Auth0 | Callback - {id} </title>
</svelte:head>
<h2>Callback Works! {id.toString()}</h2>
