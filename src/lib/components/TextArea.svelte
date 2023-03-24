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
		class="textarea textarea-bordered h-24 dark:text-gray-200 dark:bg-gray-800"
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
