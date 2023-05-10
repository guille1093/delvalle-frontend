<script>
	//imports
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Table, Button, Tooltip} from 'flowbite-svelte';
	let pesoARLocale = Intl.NumberFormat('es-AR');


	//exports
	export let data;

	//variables
	let searchTerm = '';
	let modalOpen;
	let loading = false;

	//enhance del formulario
	const submitDeleteproject = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('paquete eliminado con exito');
					await update();
					break;
				case 'error':
					toast.error('No se pudo eliminar el paquete. Intente nuevamente');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	//funcion que toma como argumento un project.id y devuelve un color de bg segun el estado
	const getBgColor = (estado) => {
		switch (estado) {
			case 'Disponible':
				return 'bg-lime-500';
			case 'Pendiente':
				return 'bg-yellow-300';
			case 'No disponible':
				return 'bg-red-600';
			case 'Finalizado':
				return 'bg-gray-100';
			case 'En curso':
				return 'bg-blue-600';
			default:
				return '';
		}
	};

	//funcion para filtrar los paquetes
	$: filteredItems = data.projects.filter((project) => {
		const searchTerms = searchTerm.toLowerCase().split(' ');
		for (let i = 0; i < searchTerms.length; i++) {
			const term = searchTerms[i];
			if (
					//Todos los campos que se pueden filtrar
				project.nombre.toLowerCase().indexOf(term) !== -1 ||
				project.fechasalida.toLowerCase().indexOf(term) !== -1 ||
				project.fecharetorno.toLowerCase().indexOf(term) !== -1 ||
				project.cant_dias.toLowerCase().indexOf(term) !== -1 ||
				project.cant_noches.toLowerCase().indexOf(term) !== -1 ||
				project.regimen.toLowerCase().indexOf(term) !== -1 ||
				project.hotel.toLowerCase().indexOf(term) !== -1 ||
				project.transporte.toLowerCase().indexOf(term) !== -1 ||
				project.precio.toLowerCase().indexOf(term) !== -1 ||
				project.estado.toLowerCase().indexOf(term) !== -1 ||
				project.pais_destino.toLowerCase().indexOf(term) !== -1
			) {
				// si se encuentra un resultado, se establece el ID del project
				// y se devuelve verdadero para incluir el resultado en la lista de resultados
				if (!filteredItems || filteredItems.length === 0) {
					filteredItems = [project];
				} else if (filteredItems[0].id === project.id) {
					filteredItems.push(project);
				}
				return true;
			}
		}
		return false;
	});

	$: modalOpen = false;
</script>

<div class="min-w-screen min-h-screen dark:bg-gray-900">
	<section class="min-w-screen bg-gray-50 dark:bg-gray-900 flex items-center">
		<!-- Start coding here -->
		<div class="relative bg-white w-screen shadow-md dark:bg-gray-800 sm:rounded-lg">
			<div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">

				<form class="flex items-center w-full">
					<label for="simple-search" class="sr-only">Search</label>
					<div class="relative w-full">
						<div class="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
							</svg>
						</div>
						<input type="text" id="simple-search" bind:value={searchTerm} class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar" required="">
					</div>
				</form>
				<Tooltip placement="bottom">
					Puede buscar por nombre, fechas, destino, regimen y disponibilidad.
				</Tooltip>
				<div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
					<Button href="/clientes/nuevo" class="md:ml-4">
						<svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
						</svg>
						Nuevo paquete
					</Button>
					<Tooltip placement="top">
						Registre un nuevo paquete
					</Tooltip>
				</div>
			</div>
		</div>

	</section>
	<Table placeholder="Buscar" hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell><i class='bx text-blue-600 text-[20px] bx-map-alt mr-2'></i>       Destino </TableHeadCell>
			<TableHeadCell><i class='bx bx-calendar text-blue-600 text-[20px] mr-2' ></i>     Fechas  </TableHeadCell>
			<TableHeadCell><i class='bx bx-fork mr-2 text-blue-600 text-[20px]'></i>          Regimen </TableHeadCell>
			<TableHeadCell><i class='bx bx-check-square mr-2 text-blue-600 text-[20px]'></i>  Estado  </TableHeadCell>
			<TableHeadCell><i class="bx bx-edit mr-2 text-blue-600 text-[20px]"></i>          Acciones</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as item}
				<TableBodyRow>
					<TableBodyCell class="dark:hover:!bg-blue-800">
						<div class="text-base font-semibold">
							<i class="bx bx-location-plus text-blue-600 mr-2"></i><a href="/projects/{item.id}">{item.nombre} </a>
						</div>
						<div class="text-gray-600 dark:text-gray-300">
							<a class="font-thin text-lg" href="/projects/{item.id}">$ {pesoARLocale.format(item.precio)}</a>
						</div>
					</TableBodyCell>
					<TableBodyCell href="/projects/{item.id}">
							<div> <i class="dark:text-gray-400 font-normal mr-4">Salida:</i>{item.fechasalida}</div>
							<div> <i class="dark:text-gray-400 font-normal">Retorno: </i>{item.fecharetorno}</div>
					</TableBodyCell>
					<TableBodyCell>{item.regimen}</TableBodyCell>
					<TableBodyCell>
						<div class="flex items-center">
							<div class="flex-shrink-0 h-3 w-3 rounded-full {getBgColor(item.estado)}"></div>
							<div class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200">{item.estado}</div>

						</div>
					</TableBodyCell>
					<TableBodyCell>
						<Modal label={item.id} checked={modalOpen}>
							<span slot="trigger" class="text-white bg-gray-400 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-red-700 dark:focus:ring-red-900 bx bx-trash ml-2"></span>

							<div slot="heading">
								<h3 class="text-2xl">Eliminar a {item.nombre}</h3>
								<p class="text-base font-normal mt-2">
									¿Esta seguro que desea eliminar este paquete?<br />
									<strong>Esta accion no se puede deshacer.</strong>
								</p>
							</div>

							<div slot="actions" class="flex w-full items-center justify-center space-x-2">
								<label for={item.id} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cancelar</label>

								<form action="?/deleteProject" method="POST" use:enhance={submitDeleteproject}>
									<input type="hidden" name="id" value={item.id} />
									<Button class="mb-0" type="submit" color="red" disabled={loading}>Eliminar</Button
									>
								</form>
							</div>
						</Modal>
						<a
								class="bx bx-edit text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								href="/projects/{item.id}/edit"> </a>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
