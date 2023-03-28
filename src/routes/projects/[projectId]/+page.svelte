<script>
	import {Button} from "flowbite-svelte";
	import moment from 'moment';
	export let data;
	const fechaS = moment(data.project.fechasalida).format('DD/MM/YYYY');
	const fechaR = moment(data.project.fecharetorno).format('DD/MM/YYYY');
	const created = moment(data.project.created).format('DD/MM/YYYY h:mm');
	const updated = moment(data.project.updated).format('DD/MM/YYYY h:mm');
	let pesoARLocale = Intl.NumberFormat('es-AR');
	const precio = pesoARLocale.format(data.project.precio);

	const items = [
		{
			name: 'Destino',
			icon: 'bx-map',
			value: data.project.nombre
		},
		{
			name: 'Precio',
			icon: 'bx-dollar',
			value: precio
		},
		{
			name: 'Salida',
			icon: 'bx-calendar-heart',
			value: fechaS
		},
		{
			name: 'Llegada',
			icon: 'bx-calendar-check',
			value: fechaR
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
			value: created
		},
		{
			name: 'Modificado',
			icon: 'bx-calendar-edit',
			value: updated
		}
	];
</script>

<!-- Section: Design Block -->
<section class="mb-32 dark:bg-gray-800 dark:text-gray-200">
	<div class="container w-full dark:bg-gray-800 dark:text-gray-200">
		<section class="mb-32 text-gray-800 text-center md:text-left dark:bg-gray-800 dark:text-gray-200">
			<div class="block rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200">
				<div class="flex flex-wrap items-center">
					<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
						<div class="px-6 py-12 md:px-12">
							<h2 class="text-3xl font-bold mb-6 pb-2">{data.project.nombre}</h2>
							<p class="text-gray-500 mb-6 pb-2">
								{data.project.descripcion}
							</p>
							<ul class="space-y-5 my-7">
								{#each items as item}
									<li class="flex space-x-3">
										<!-- Icon -->
										<i class="bx text-blue-600 {item.icon}" ></i>
										<span
											class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
											><strong>{item.name}:</strong> {item.value}</span
										>
									</li>
								{/each}
							</ul>
							<Button
								href="{data.project.id}/edit"
							>
								Editar
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</section>
<!-- Section: Design Block -->
