<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	import { Button} from "flowbite-svelte";
	import {es} from "date-fns/locale";
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	export let form;
	export let data;

	let minDate = new Date();
	let maxDate = new Date();
	let minDateRetorno = new Date();
	let fechasalida = new Date();
	let fecharetorno = new Date();
	let dateFnsLocale = es;
	maxDate.setDate(maxDate.getDate() + 600);
	$: fecharetorno;
	$: fecharetorno.setDate(fechasalida.getDate() + 1);
	$: locale = localeFromDateFnsLocale(dateFnsLocale);
	$: minDateRetorno.setDate(fechasalida.getDate() + 1);

	const regimenes = [
		{ id: 1, name: 'Todo Incluido' },
		{ id: 2, name: 'Media Pensión' },
		{ id: 3, name: 'Pensión Completa' },
		{ id: 4, name: 'Solo Alojamiento' },
		{ id: 5, name: 'Sin Regimen' },
		{ id: 6, name: 'Alojamiento y Desayuno'},
		{ id: 7, name: 'Desayuno'},
	];

	const estados = [
		{ id: 1, name: 'Disponible' },
		{ id: 2, name: 'No disponible' },
		{ id: 3, name: 'Pendiente' },
		{ id: 4, name: 'Finalizado' },
		{ id: 5, name: 'En curso' },
	];



</script>

	<!-- Modal content -->
<div class="relative p-4 w-full max-w-8xl h-full md:h-auto">
<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
		<!-- Modal header -->
		<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				Nuevo paquete
			</h3>
			<button type="button" on:click={() => (window.location.href = '/projects')} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			</button>
		</div>
		<!-- Modal body -->
		<form action="?/create" method="POST" enctype="multipart/form-data" use:enhance>
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Input id="nombre" label="Nombre" value={form?.data?.nombre} errors={form?.errors?.nombre} placeholder="Nombre del paquete" />
				</div>
				<div>
					<Input id="precio" label="Precio" value={form?.data?.precio} errors={form?.errors?.precio} placeholder="Precio del paquete" type="number" />
				</div>
				<div class="mt-1">
					<div class="form-control w-full max-w-lg mb-2">
							<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pais destino</span>
						<div class="relative ">
							<select
									id="pais_destino"
									name="pais_destino"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.pais_destino}
							>
								{#each data.nacionalidades as nacionalidad}
									<option value={nacionalidad.destpais}>{nacionalidad.destpais} ({nacionalidad.codpais})</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div>
					<Input id="hotel" label="Hotel" value={form?.data?.hotel} errors={form?.errors?.hotel} placeholder="Seleccione el hotel" />
				</div>
				<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de salida</span>
					<input
							id="fechasalida"
							name="fechasalida"
							value={fechasalida}
							type="text"
							class="input hidden"
					/>

					<div
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					>
						<DateInput
								{locale}
								bind:value={fechasalida}
								format="dd/MM/yyyy"
								placeholder={minDate}
								min={minDate}
								max={maxDate}
						/>
					</div>
				</div>

				<div class="form-control w-full max-w-lg mb-2">
					<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de retorno</span>
					<input
							id="fecharetorno"
							name="fecharetorno"
							value={fecharetorno}
							type="text"
							class="input hidden"
					/>

					<div
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					>
						<DateInput
								{locale}
								bind:value={fecharetorno}
								format="dd/MM/yyyy"
								placeholder={minDate}
								min={minDateRetorno}
								max={maxDate}
						/>
					</div>
				</div>
				
				<div>
					<Input id="cant_dias" label="Dias" value={form?.data?.cant_dias} errors={form?.errors?.cant_dias} placeholder="Cantidad de dias" type="number" />
				</div>

				<div>
					<Input id="cant_noches" label="Noches" value={form?.data?.cant_noches} errors={form?.errors?.cant_noches} placeholder="Cantidad de noches" type="number"/>
				</div>

				<div class="mt-1">
					<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regimen</span>
						<div class="relative ">
							<select
									id="regimen"
									name="regimen"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.regimen}
							>
								{#each regimenes as regimen}
									<option value={regimen.name}>{regimen.name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

<!--				Estado-->
				<div class="mt-1">
					<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</span>
						<div class="relative ">
							<select
									id="estado"
									name="estado"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.estado}
							>
								{#each estados as estado}
									<option value={estado.name}>{estado.name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<div class="sm:col-span-2">
					<Input id="thumbnail" label="Imagen" type="file" errors={form?.errors?.thumbnail} />
				</div>

				<div class="sm:col-span-2">
					<TextArea rows="4" id="descripcion" label="Descripción" placeholder="Ingrese una breve descripción del paquete" value={form?.data?.descripcion} errors={form?.errors?.descripcion}/>
				</div>
			</div>
			<Button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
				<svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
				Crear paquete
			</Button>
		</form>
	</div>
</div>

<style>
	:global(body) {
		--date-picker-foreground: #f7f7f7;
		--date-picker-background: #374151;
		--date-picker-highlight-border: #2563eb;
		--date-picker-highlight-shadow: #2563eb;
		--date-picker-selected-color: #f7f7f7;
		--date-picker-selected-background: #2563eb;
	}
</style>