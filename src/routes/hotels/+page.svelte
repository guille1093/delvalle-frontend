<script>
	//imports
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Tooltip} from 'flowbite-svelte';
	let pesoARLocale = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });


	//exports
	export let data;

	//variables
	let searchTerm = '';
	let modalOpen;
	let loading = false;

	//constante
	const tableheaditems = [
		{id: 1, titulo: "Hotel", icon: "bx-hotel" },
		{id: 2, titulo: "Fechas", icon: "bx-calendar" },
		{id: 3, titulo: "Tarifa", icon: "bx-dollar" },
		{id: 4, titulo: "Ubicación", icon: "bx-globe" },
		{id: 6, titulo: "Acciones", icon: "bx-edit" }
	]


	//enhance del formulario
	const submitDeletehotel = () => {
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

	//funcion para filtrar los paquetes
	$: filteredItems = data.hotels.filter((hotel) => {
		const searchTerms = searchTerm.toLowerCase().split(' ');
		for (let i = 0; i < searchTerms.length; i++) {
			const term = searchTerms[i];
			if (
					//Todos los campos que se pueden filtrar
				hotel.nombre.toLowerCase().indexOf(term) !== -1 ||
				hotel.fechasalida.toLowerCase().indexOf(term) !== -1 ||
				hotel.fecharetorno.toLowerCase().indexOf(term) !== -1 ||
				hotel.telefono.toLowerCase().indexOf(term) !== -1 ||
				hotel.email.toLowerCase().indexOf(term) !== -1 ||
				hotel.precio.toLowerCase().indexOf(term) !== -1 ||
				hotel.pais.toLowerCase().indexOf(term) !== -1 ||
				hotel.direccion.toLowerCase().indexOf(term) !== -1 ||
				hotel.observaciones.toLowerCase().indexOf(term) !== -1
			) {
				// si se encuentra un resultado, se establece el ID del hotel
				// y se devuelve verdadero para incluir el resultado en la lista de resultados
				if (!filteredItems || filteredItems.length === 0) {
					filteredItems = [hotel];
				} else if (filteredItems[0].id === hotel.id) {
					filteredItems.push(hotel);
				}
				return true;
			}
		}
		return false;
	});

	$: modalOpen = false;
</script>


<div class="w-full h-max dark:bg-gray-900">
	<Button href="/hotels/new" class="ml-4 ">
		<svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
		</svg>
		Nuevo Hotel
	</Button>
	<Tooltip placement="right">
		Registre un nuevo hotel para asociar a los paquetes
	</Tooltip>

	<TableSearch placeholder="Buscar" hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			{#each tableheaditems as item}
				<TableHeadCell><i class="bx mr-2 mb-0 text-[20px] text-blue-600 {item.icon}"></i>{item.titulo}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as item}
				<TableBodyRow>
					<TableBodyCell>
						<div class="text-base font-semibold max-w-[150px] ">
							<a href="/hotels/{item.id}">{item.nombre} </a>
						</div>
						<div class="font-normal dark:text-gray-400">
							<i class="bx bx-mail-send text-blue-600"></i>
							<a href="/hotels/{item.id}">{item.email}</a>
						</div>
						<div class="font-normal dark:text-gray-400">
							<i class="bx bx-phone-call text-blue-600"></i>
							<a href="/hotels/{item.id}">{item.telefono}</a>
						</div>
					</TableBodyCell>
					<TableBodyCell>
						<div> <i class="dark:text-gray-400 font-normal">Desde: </i>{item.fechasalida}</div>
						<div> <i class="dark:text-gray-400 font-normal">Hasta:  </i>{item.fecharetorno}</div>
					</TableBodyCell>
					<TableBodyCell>{pesoARLocale.format(item.precio)}</TableBodyCell>
					<TableBodyCell>
						<div>{item.pais}</div>
						<div class="max-w-[300px] overflow-y-scroll">
							<i class="text-xs dark:text-gray-400">{item.direccion}</i>
						</div>

					</TableBodyCell>
					<TableBodyCell>

						<Modal label={item.id} checked={modalOpen}>
							<span
								slot="trigger"
								class="text-white bg-gray-400 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center mb-2 dark:bg-gray-700 dark:hover:bg-red-700 dark:focus:ring-red-900 bx bx-trash ml-2">
							</span>

							<div slot="heading">
								<h3 class="text-2xl">Eliminar a {item.nombre}</h3>
								<p class="text-base font-normal mt-2">
									¿Esta seguro que desea eliminar este paquete?<br />
									<strong>Esta accion no se puede deshacer.</strong>
								</p>
							</div>
							<div slot="actions" class="flex w-full items-center justify-center space-x-2">
								<label
									for={item.id}
									class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									>Cancelar</label
								>
								<form action="?/deletehotel" method="POST" use:enhance={submitDeletehotel}>
									<input type="hidden" name="id" value={item.id} />
									<Button class="mb-0" type="submit" color="red" disabled={loading}>Eliminar</Button
									>
								</form>
							</div>
						</Modal>
						<a
								class="bx bx-edit text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded text-sm px-5 py-2.5 align-middle mr-1 mb-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								href="/hotels/{item.id}/edit"> </a>
						<Tooltip placement="top">
							Editar {item.nombre}
						</Tooltip>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
