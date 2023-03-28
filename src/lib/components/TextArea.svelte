<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'text';
	export let disabled = false;
	export let required = false;

	export let errors;
</script>

<div class="form-control">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text dark:text-gray-200">{label}</span>
	</label>
	<textarea
		class="block h-36 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}></textarea>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
