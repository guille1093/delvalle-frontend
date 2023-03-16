<script>
	import { getImageURL } from '$lib/utils';
	export let project;
	const items = [
		{
			name: 'Salida',
			icon: 'bx-calendar-heart',
			value: project.fecha_salida
		},
		{
			name: 'Llegada',
			icon: 'bx-calendar-check',
			value: project.fecha_llegada
		},
		{
			name: 'Dias',
			icon: 'bx-sun',
			value: project.cant_dias
		},
		{
			name: 'Noches',
			icon: 'bx-moon',
			value: project.cant_noches
		}
	];
</script>


<div class="w-full bg-gray-100 border border-gray-300 border-2 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 border border-gray-100 hoover:bg-blue-600">
	<a href="/projects/{project.id}">
		<img class="rounded-t-lg w-full h-[200px] object-cover" src="{getImageURL(project.collectionId, project.id, project.thumbnail)}" alt="" />
	</a>
	<div class="p-5">
		<a href="/projects/{project.id}">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.nombre}</h5>
		</a>
		<div class="flex items-baseline text-gray-900 dark:text-white">
			<span class="text-3xl font-semibold">$</span>
			<span class="md:text-3xl text-5xl font-extrabold tracking-tight overflow-scroll">{project.precio}</span>
		</div>
		<!-- List -->
		<ul role="list" class="space-y-5 my-7">
			{#each items as item}
				<li class="flex space-x-3">
					<!-- Icon -->
					<a class="bx text-blue-600 {item.icon}"></a>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{item.name}: {item.value}</span>
				</li>
			{/each}
		</ul>
		<a href="/projects/{project.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			Mas detalles
			<svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		</a>
	</div>
</div>

