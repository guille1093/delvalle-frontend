<script>
	import moment from 'moment';
	import { Card, Button, Toggle } from "flowbite-svelte";
	let hCard = false;
	export let data;
	const created = moment(data.metodopago.created).format('DD/MM/YYYY h:mm');
	const updated = moment(data.metodopago.updated).format('DD/MM/YYYY h:mm');
	let pesoARLocale = Intl.NumberFormat('es-AR', {});
	const precio = pesoARLocale.format(data.metodopago.descuento) + ' %';
	import { getImageURL } from '$lib/utils';

	const items = [
		{
			name: 'Nombre',
			icon: 'bx-user',
			value: data.metodopago.nombre
		},
			{
			name: 'Descuento',
			icon: 'bx-dollar',
			value: precio
		},
{
			name: 'Estado',
			icon: 'bx-check-circle',
			value: data.metodopago.estado
		},
		{
			name: 'Observaciones',
			icon: 'bx-comment-detail',
			value: data.metodopago.observaciones
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




<!-- Section: Design Block -->


<section class="bg-white dark:bg-gray-900">
	<div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
		<section class="mb-32 rounded-lg text-gray-800 text-center md:text-left dark:bg-gray-800 dark:text-gray-200">
			<div class="block rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200">
				<div class="flex flex-wrap w-full items-center">
					<div class="grow-0 shrink-0 w-full basis-auto w-full lg:w-8/12 xl:w-[800px]">
						<div class="px-6 py-12 md:px-12">
							<h2 class="text-3xl font-bold mb-6 pb-2"><i class="bx bx-metodopago text-blue-600 mr-2 "></i>{data.metodopago.nombre}</h2>
							<p class="text-gray-500 mb-6 pb-2">
								{data.metodopago.observaciones}
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
									href="{data.metodopago.id}/edit"
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


