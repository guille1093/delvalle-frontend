<script>
	import { getImageURL } from '$lib/utils';
	export let data;
	const items = [
		{
			name: 'Destino',
			icon: 'bx-map',
			value: data.project.nombre
		},
		{
			name: 'Precio',
			icon: 'bx-dollar',
			value: data.project.precio
		},
		{
			name: 'Salida',
			icon: 'bx-calendar-heart',
			value: data.project.fecha_salida
		},
		{
			name: 'Llegada',
			icon: 'bx-calendar-check',
			value: data.project.fecha_llegada
		},
		{
			name: 'Dias',
			icon: 'bx-sun',
			value: data.project.cant_dias
		},
		{
			name: 'Noches',
			icon: 'bx-moon',
			value: data.project.cant_noches
		},
		{
			name: 'Hotel',
			icon: 'bx-bed',
			value: data.project.hotel
		},
		{
			name: 'Transporte',
			icon: 'bx-car',
			value: data.project.transporte
		},
		{
			name: 'Guia',
			icon: 'bx-user',
			value: data.project.guia
		},
		{
			name: 'Estado',
			icon: 'bx-check-circle',
			value: data.project.estado
		},
		{
			name: 'Creado',
			icon: 'bx-calendar',
			value: data.project.created
		},
		{
			name: 'Modificado',
			icon: 'bx-calendar-edit',
			value: data.project.updated
		}
	];
</script>


<!-- Section: Design Block -->
	<section class="mb-32">
		<div class="container w-full">
			<section class="mb-32 text-gray-800 text-center md:text-left">
				<div class="block rounded-lg shadow-lg bg-white">
					<div class="flex flex-wrap items-center">
						<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
							<div class="px-6 py-12 md:px-12">
								<h2 class="text-3xl font-bold mb-6 pb-2">{data.project.nombre}</h2>
								<p class="text-gray-500 mb-6 pb-2">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. A soluta corporis
									voluptate ab error quam dolores doloremque, quae consectetur.
								</p>
								<ul role="list" class="space-y-5 my-7">
									{#each items as item}
										<li class="flex space-x-3">
											<!-- Icon -->
											<a class="bx text-blue-600 {item.icon}"></a>
											<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"><strong>{item.name}:</strong> {item.value}</span>
										</li>
									{/each}
								</ul>
								<button type="button"
												class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
									Editar
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</section>
	<!-- Section: Design Block -->
<!-- Container for demo purpose -->

