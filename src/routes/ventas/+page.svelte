<script>
	//imports
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Table, Button, Tooltip} from 'flowbite-svelte';
	import {redirect} from "@sveltejs/kit";
	let pesoARLocale = Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		minimumFractionDigits: 0
	});



	//exports
	export let data;

	//variables
	let searchTerm = '';
	let modalOpen;
	let loading = false;

	//constante
	const tableheaditems = [
		{id: 1, titulo: "Cod. venta", icon: "bx-card" },
		{id: 2, titulo: "Cliente", icon: "bx-calendar" },
		{id: 5, titulo: "Estado", icon: "bx-check-circle"},
		{id: 7, titulo: "Paquete", icon: "bx-box" },
		{id: 3, titulo: "Ultima modificación", icon: "bx-calendar" },
		{id: 4, titulo: "Creado", icon: "bx-calendar" },
		{id: 6, titulo: "Acciones", icon: "bx-edit" }
	]


	//enhance del formulario
	const submitDeleteventa = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Venta eliminada con exito');
					await update();
					break;
				case 'error':
					toast.error('No se pudo eliminar la venta. Intente nuevamente');
					break;
				default:
					await update();
			}
			loading = false;
			//wait 1.5 seconds before redirecting
			setTimeout(() => {
				redirect(300, '/venta');
			}, 1000);
			modalOpen = false;
		};
	};

	const getBgColor = (estado) => {
		switch (estado) {
			case 'Activo':
				return 'bg-lime-500';
			case 'Suspendido':
				return 'bg-yellow-300';
			case 'Inactivo':
				return 'bg-red-600';
			case 'Debe':
				return 'bg-orange-500';
			default:
				return '';
		}
	};

	//funcion para filtrar los paquetes
	$: filteredItems = data.ventas.filter((venta) => {
		const searchTerms = searchTerm.toLowerCase().split(' ');
		for (let i = 0; i < searchTerms.length; i++) {
			const term = searchTerms[i];
			if (
					//Todos los campos que se pueden filtrar
				venta.id.toLowerCase().indexOf(term) !== -1 ||
				venta.observaciones.toLowerCase().indexOf(term) !== -1 ||
				venta.updated.toLowerCase().indexOf(term) !== -1 ||
				venta.created.toLowerCase().indexOf(term) !== -1 ||
				venta.estado.toLowerCase().indexOf(term) !== -1  ||
				venta.cliente.nombre.toLowerCase().indexOf(term) !== -1 ||
				venta.cliente.apellido.toLowerCase().indexOf(term) !== -1 ||
				venta.paquetenombre.toLowerCase().indexOf(term) !== -1
			) {

				// si se encuentra un resultado, se establece el ID del venta
				// y se devuelve verdadero para incluir el resultado en la lista de resultados
				if (!filteredItems || filteredItems.length === 0) {
					filteredItems = [venta];

				} else if (filteredItems[0].id === venta.id) {
					filteredItems.push(venta);
				}

				return true;
			}
		}
		return false;
	});

	$: modalOpen = false;
</script>


<div class="w-full h-max dark:bg-gray-900">
	<section class="bg-gray-50 dark:bg-gray-900 flex items-center">
		<div class="max-w-screen-xl w-full">
			<!-- Start coding here -->
			<div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
				<div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
					<div class="w-full md:w-1/2">
						<form class="flex items-center">
							<label for="simple-search" class="sr-only">Search</label>
							<div class="relative w-full">
								<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
									</svg>
								</div>
								<input type="text" id="simple-search" bind:value={searchTerm} class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar" required="">
							</div>
						</form>
					</div>
					<Tooltip placement="top">
						Puede buscar por nombre, fechas, descuento y observaciones.
					</Tooltip>
					<div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
						<Button href="/ventas/new" class="ml-4 ">
							<svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
								<path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
							</svg>
							Nueva venta
						</Button>
						<Tooltip placement="bottom">
							Registre una nueva venta.
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	</section>

	<Table hoverable={true}>
		<TableHead>
			{#each tableheaditems as item}
				<TableHeadCell><i class="bx mr-2 mb-0 text-[20px] text-blue-600 {item.icon}"></i>{item.titulo}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as item}
				<TableBodyRow>
					<TableBodyCell>
						<div class="h-2.5">
							<a href="/ventas/{item.id}">{item.id} </a>
						</div>
					</TableBodyCell>
					<TableBodyCell><a href="/clientes/{item.cliente.id}">{item.cliente.nombre} {item.cliente.apellido}</a><p>{item.cliente.dni}</p></TableBodyCell>

					<TableBodyCell>
						<div class="flex items-center">
							<div class="flex-shrink-0 h-3 w-3 rounded-full {getBgColor(item.estado)}"></div>
							<div class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200">{item.estado}</div>
						</div>
						{#if item.estado = 'Debe' }
							<div class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200">{pesoARLocale.format(item.paquete.precio - item.pagado) }</div>
						{/if}
					</TableBodyCell>

					<TableBodyCell>{item.paquete.nombre}<p>{pesoARLocale.format(item.paquete.precio)}</p></TableBodyCell>

					<TableBodyCell>{item.updated}</TableBodyCell>

					<TableBodyCell>{item.created} </TableBodyCell>

					<TableBodyCell>
						<Modal label={item.id} checked={modalOpen}>
							<span
								slot="trigger"
								class="text-white bg-gray-400 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center mb-2 dark:bg-gray-700 dark:hover:bg-red-700 dark:focus:ring-red-900 bx bx-trash ml-2">
							</span>

							<div slot="heading">
								<h3 class="text-2xl">Eliminar {item.id}</h3>
								<p class="text-base font-normal mt-2">
									¿Esta seguro que desea eliminar esta venta?<br />
									<strong>Esta accion no se puede deshacer.</strong>
								</p>
							</div>
							<div slot="actions" class="flex w-full items-center justify-center space-x-2">
								<label
									for={item.id}
									class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									>Cancelar</label
								>
								<form action="?/deleteventa" method="POST" use:enhance={submitDeleteventa}>
									<input type="hidden" name="id" value={item.id} />
									<Button class="mb-0" type="submit" color="red" disabled={loading}>Eliminar</Button
									>
								</form>
							</div>
						</Modal>
						<a class="bx bx-edit text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded text-sm px-5 py-2.5 align-middle mr-1 mb-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								href="/venta/{item.id}/edit"> </a>
						<Tooltip placement="top">
							Editar {item.id}
						</Tooltip>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
