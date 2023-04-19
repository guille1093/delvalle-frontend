<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea, FieldError } from '$lib/components';
	import { Button} from "flowbite-svelte";
	import {es} from "date-fns/locale";
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import toast from "svelte-french-toast";
	import {invalidateAll} from "$app/navigation";
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


	let formerrors
	const enhanceNew = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result.data.error) {
						formerrors = result.data.errors;
						toast.error("Error al crear el hotel", { duration: 7000});
						break;
					}
					await invalidateAll();
					toast.success("hotel creado exitosamente");
					break;
				case 'error':
					console.log(result);
					console.log(result.errors);
					toast.error("Error al crear el hotel");
					break;
				default:
					await update();
			}
		};
	};



</script>

	<!-- Modal content -->
<div class="relative p-4 w-full max-w-8xl h-full md:h-auto">
<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
		<!-- Modal header -->
		<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				Nuevo Hotel
			</h3>
			<button type="button" on:click={() => (window.location.href = '/hotels')} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			</button>
		</div>
		<!-- Modal body -->
		<form action="?/create" method="POST" enctype="multipart/form-data" use:enhance={enhanceNew}>
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Input id="nombre" label="Nombre" value={form?.data?.nombre} errors={formerrors?.nombre} placeholder="Nombre del hotel" />
				</div>
				<div>
					<Input id="precio" label="Precio" value={form?.data?.precio} errors={formerrors?.precio} placeholder="Tarifa del hotel" type="number" />
				</div>
				<div class="mt-1">
					<div class="form-control w-full max-w-lg mb-2">
							<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pais</span>
						<div class="relative ">
							<select
									id="pais"
									name="pais"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.pais ?? 'ARGENTINA'}
							>
								{#each data.nacionalidades as nacionalidad}
									<option value={nacionalidad.destpais}>{nacionalidad.destpais} ({nacionalidad.codpais})</option>
								{/each}
							</select>
						</div>
					</div>
					{#if formerrors?.pais}
						{#each formerrors?.pais as error}
							<p class="label-text-alt text-error inline-block">
								{error}
							</p>
						{/each}
					{/if}
				</div>
<!--				direecion-->
				<div>
					<Input id="direccion" label="Dirección" value={form?.data?.direccion} errors={formerrors?.direccion} placeholder="Dirección del hotel" />
				</div>
				<div>
					<Input id="telefono" label="Teléfono" value={form?.data?.telefono} errors={formerrors?.telefono} placeholder="Teléfono del hotel" />
				</div>
				<div>
					<Input id="email" label="Email" value={form?.data?.email} errors={formerrors?.email} placeholder="Email del hotel" />
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
					<FieldError fieldError="{formerrors?.fechasalida}"></FieldError>
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
					<FieldError fieldError="{formerrors?.fecharetorno}"></FieldError>
				</div>

				<div class="sm:col-span-2">
					<Input id="thumbnail" label="Imagen" type="file" errors={formerrors?.thumbnail} />
				</div>

				<div class="sm:col-span-2">
					<TextArea rows="4" id="observaciones" label="Descripción" placeholder="Ingrese una breve descripción del hotel" value={form?.data?.observaciones} errors={form?.errors?.observaciones}/>
				</div>
			</div>
			<Button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
				<svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
				Crear hotel
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