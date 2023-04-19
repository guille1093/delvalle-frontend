<script>
    import { Button } from 'flowbite-svelte';
    export let fieldError;
    export let id;
</script>

{#if fieldError}
    {#each fieldError as error}
        <Button for="{id}" size="xs" color="blue" class="m-2 w-[300px]" pill={true}>{error}</Button>
    {/each}
{/if}