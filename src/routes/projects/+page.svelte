<script>
	//imports
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button} from 'flowbite-svelte';
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

<div class="w-full h-screen dark:bg-gray-900">
	<Button href="/projects/new" class="ml-4">
		<svg
			class="h-3.5 w-3.5 mr-2"
			fill="currentColor"
			viewbox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				clip-rule="evenodd"
				fill-rule="evenodd"
				d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
			/>
		</svg>
		Nuevo paquete
	</Button>
	<TableSearch placeholder="Buscar" hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell><i class='bx bx-map-alt mr-2'></i>       Destino </TableHeadCell>
			<TableHeadCell><i class='bx bx-calendar mr-2' ></i>     Salida  </TableHeadCell>
			<TableHeadCell><i class='bx bx-calendar-check mr-2'></i>Retorno </TableHeadCell>
			<TableHeadCell><i class='bx bx-fork mr-2'></i>          Regimen </TableHeadCell>
			<TableHeadCell><i class='bx bx-check-square mr-2'></i>  Estado  </TableHeadCell>
			<TableHeadCell><i class="bx bx-edit mr-2"></i>          Acciones</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as item}
				<TableBodyRow>
					<TableBodyCell>
						<div class="text-base font-semibold">
							<a href="/projects/{item.id}">{item.nombre} </a>
						</div>
						<div class="font-normal text-gray-500">
							<a href="/projects/{item.id}">$ {pesoARLocale.format(item.precio)}</a>
						</div>
					</TableBodyCell>
					<TableBodyCell>{item.fechasalida}</TableBodyCell>
					<TableBodyCell>{item.fecharetorno}</TableBodyCell>
					<TableBodyCell>{item.regimen}</TableBodyCell>
					<TableBodyCell>{item.estado}</TableBodyCell>
					<TableBodyCell>
						<a
							class="bx bx-edit text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							href="/projects/{item.id}/edit"> </a>
						<Modal label={item.id} checked={modalOpen}>
							<span
								slot="trigger"
								class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 bx bx-trash ml-2"></span>
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
								<form action="?/deleteProject" method="POST" use:enhance={submitDeleteproject}>
									<input type="hidden" name="id" value={item.id} />
									<Button class="mb-0" type="submit" color="red" disabled={loading}>Eliminar</Button
									>
								</form>
							</div>
						</Modal>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
