<script>
	import {Button} from "flowbite-svelte";
	import { getImageURL } from '$lib/utils';
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


<div class="min-w-screen min-h-screen">
	<section class="bg-white dark:bg-gray-900 top-0">
		<div class="px-4 mx-auto max-w-screen-xl grid grid-cols-2">


			<!-- Section: Design Block -->

					<section class="mb-32 text-gray-800 text-center md:text-left dark:bg-gray-800 dark:text-gray-200">
						<div class="block rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200">
							<div class="flex flex-wrap items-center">
								<div class="grow-0 shrink-0 basis-auto w-full">
									<div class="px-6 py-12 md:px-12">
										<h2 class="text-3xl font-bold mb-6 pb-2">{data.project.nombre}</h2>
										<p class="text-gray-500 mb-6 pb-2">
											{data.project.descripcion}
										</p>


										<!--Carrousel-->
										<div class="carousel w-[670px] h-[420px] top-0 inset-0">
											<div id="slide1" class="carousel-item relative w-full">
												<img class="w-full" src={data?.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail)
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.name}`} alt="paquete">
												<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
													<a href="#slide4" class="btn btn-circle">❮</a>
													<a href="#slide2" class="btn btn-circle">❯</a>
												</div>
											</div>
											<div id="slide2" class="carousel-item relative w-full">
												<img class="w-full" src={data?.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail)
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.name}`} alt="paquete">
												<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
													<a href="#slide1" class="btn btn-circle">❮</a>
													<a href="#slide3" class="btn btn-circle">❯</a>
												</div>
											</div>
											<div id="slide3" class="carousel-item relative w-full">
												<img class="w-full" src={data?.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail)
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.name}`} alt="paquete">
												<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
													<a href="#slide2" class="btn btn-circle">❮</a>
													<a href="#slide4" class="btn btn-circle">❯</a>
												</div>
											</div>
											<div id="slide4" class="carousel-item relative w-full">
												<img class="w-full" src={data?.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail)
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.name}`} alt="paquete">
												<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
													<a href="#slide3" class="btn btn-circle">❮</a>
													<a href="#slide1" class="btn btn-circle">❯</a>
												</div>
											</div>
										</div>
										<!--Carrousel-->

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
			<!-- Section: Design Block -->



		</div>
	</section>
</div>

