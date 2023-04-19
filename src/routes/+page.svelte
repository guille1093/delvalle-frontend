<script>
	import { ProjectCard } from '$lib/components';
	export let data;
</script>

<div class="flex flex-col flex-nowrap gap-3 dark:bg-gray-900 w-full">
	<h1 class="text-xl font-bold dark:bg-gray-900 dark:text-gray-200">Paquetes disponibles</h1>
	<div class="grid grid-cols-1 gap-2 dark:bg-gray-900 md:grid-cols-3 sm:grid-cols-2">
		{#each data.projects as project}
			<ProjectCard {project} />
		{/each}

	</div>

</div>



