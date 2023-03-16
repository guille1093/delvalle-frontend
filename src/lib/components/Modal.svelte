<script>
	export let label;
	export let checked;
</script>

<label for={label}>
	<slot name="trigger" />
</label>

<input type="checkbox" id={label} class="modal-toggle" {checked} />
<label for={label} class="modal modal-bottom sm:modal-middle">
	<label for="" class="modal-box dark:bg-gray-900">
		<div class="font-bold text-xl text-center dark:bg-gray-900 dark:text-gray-200">
			<slot name="heading" />
		</div>
		<div class="my-2 dark:bg-gray-900">
			<slot />
		</div>
		<div class="modal-action justify-center dark:bg-gray-900">
			<slot name="actions" />
		</div>
	</label>
</label>
