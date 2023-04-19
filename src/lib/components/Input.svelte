<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let errors;
	import { Button} from "flowbite-svelte";

</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text dark:text-gray-200">{label}</span>
	</label>
	<input
		class={type === 'file'
			? 'file-input file-input-bordered w-full max-w-lg'
			: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'}
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<Button for="{id}" size="xs" color="blue" class="m-2  w-[300px]" pill={true}>{error}</Button>
		{/each}
	{/if}
</div>
