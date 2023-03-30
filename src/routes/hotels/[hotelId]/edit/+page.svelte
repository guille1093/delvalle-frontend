<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { Button} from "flowbite-svelte";
	import {es} from "date-fns/locale";
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	export let data;
	export let form;


	let minDate = new Date();
	let maxDate = new Date();
	let minDateRetorno = new Date();
	let fechasalida = new Date(data.hotel.fechasalida)
	let fecharetorno = new Date(data.hotel.fecharetorno)
	let dateFnsLocale = es;
	maxDate.setDate(maxDate.getDate() + 600);
	// $: fecharetorno;
	// $: fecharetorno.setDate(fechasalida.getDate() + 1);
	$: locale = localeFromDateFnsLocale(dateFnsLocale);
	$: minDateRetorno.setDate(fechasalida.getDate() + 1);


	let loading = false;


	const submitUpdatehotel = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>



<!-- Modal content -->
<div class="relative p-4 w-full max-w-8xl h-full md:h-auto">
	<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
		<!-- Modal header -->
		<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				Actualizar {data.hotel.nombre}
			</h3>
			<button type="button" on:click={() => (window.location.href = '/hotels')} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			</button>
		</div>
		<!-- Modal body -->
		<form method="POST" action="?/updatehotel" enctype="multipart/form-data" use:enhance={submitUpdatehotel}>
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Input
							id="nombre"
							label="Nombre"
							value={form?.data?.nombre ?? data.hotel.nombre}
							errors={form?.errors?.nombre}
							placeholder="Nombre del paquete" />
				</div>
				<div>
					<Input id="precio" label="Tarifa" value={form?.data?.precio ?? data.hotel.precio} errors={form?.errors?.precio} placeholder="Precio del paquete" type="number" />
				</div>
				<div class="mt-1">
					<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pais</span>
						<div class="relative ">
							<select
									id="pais"
									name="pais"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.pais ?? data.hotel.pais}
							>
								{#each data.nacionalidades as nacionalidad}
									<option value={nacionalidad.destpais}>{nacionalidad.destpais} ({nacionalidad.codpais})</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div>
					<Input id="direccion" label="Dirección" value={form?.data?.direccion ?? data.hotel.direccion} errors={form?.errors?.direccion} placeholder="Dirección del hotel" />
				</div>
				<div>
					<Input id="telefono" label="Teléfono" value={form?.data?.telefono ?? data.hotel.telefono} errors={form?.errors?.telefono} placeholder="Teléfono del hotel" />
				</div>
				<div>
					<Input id="email" label="Email" value={form?.data?.email ?? data.hotel.email} errors={form?.errors?.email} placeholder="Email del hotel" />
				</div>
				<div class="form-control w-full max-w-lg mb-2">
					<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desde</span>
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
					<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasta</span>
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
					<div class="form-control w-full max-w-lg">
						<label for="thumbnail" class="label font-medium pb-1">
							<span class="label-text">Imagen</span>
						</label>
						{#if data.hotel.thumbnail}
							<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
								<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
									<button formaction="?/deleteThumbnail" class="btn bg-blue-600 btn-sm btn-circle">
										<Icon src={Trash} class="w-5 h-5 text-white bg-blue-600" />
									</button>
								</label>
								<div class="w-20 rounded">
									<img
											src={getImageURL(
									data.hotel.collectionId,
									data.hotel.id,
									data.hotel.thumbnail,
									'80x80'
								)}
											alt="hotel thumbnail"
									/>
								</div>
							</label>
						{/if}
						<input
								type="file"
								name="thumbnail"
								id="thumbnail"
								class="file-input file-input-bordered w-full max-w-lg mt-2"
						/>
						{#if form?.errors?.thumbnail}
							{#each form?.errors?.thumbnail as error}
								<label for="thumbnail" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
								</label>
							{/each}
						{/if}
					</div>
				</div>

				<div class="sm:col-span-2">
					<TextArea rows="4" id="observaciones" label="Descripción" placeholder="Ingrese observaciones o detalles extra" value={form?.data?.observaciones ?? data.hotel.observaciones} errors={form?.errors?.observaciones}/>
				</div>
			</div>
			<Button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
				<svg class="mr-1 -ml-1 w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				Guardar cambios
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