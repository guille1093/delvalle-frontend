<script>
	//Imports
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	import {es} from "date-fns/locale";
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import toast from "svelte-french-toast";
	import { Button} from "flowbite-svelte";
	import {invalidateAll} from "$app/navigation";

	//Exports
	export let form;
	export let data;

	//Constantes
	const sexos = [
		{ id: 1, nombre: 'Femenino' },
		{ id: 2, nombre: 'Masculino' },
		{ id: 3, nombre: 'Otro' },
	];

	//Variables
	let minDate = new Date();
	minDate.setFullYear(minDate.getFullYear() - 100);
	let maxDate = new Date();
	maxDate.setDate(maxDate.getDate() - 1);
	let fechaNacimiento = new Date();
	let dateFnsLocale = es;
	$: locale = localeFromDateFnsLocale(dateFnsLocale);


	let formerrors
	const enhanceNew = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result.data.error) {
						formerrors = result.data.errors;
						toast.error("Error al crear el cliente", { duration: 7000});
						break;
					}
					await invalidateAll();
					toast.success("Cliente creado exitosamente");
					break;
				case 'error':
					console.log(result);
					console.log(result.errors);
					toast.error("Error al crear el cliente");
					break;
				default:
					await update();
			}
		};
	};

</script>




<div class="relative p-4 w-full max-w-8xl h-full md:h-auto">
	<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
		<!-- Modal header -->
		<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				Nuevo cliente
			</h3>
			<button type="button" on:click={() => (window.location.href = '/clientes')} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			</button>
		</div>
		<!-- Modal body -->
		<form action="?/create" method="POST" enctype="multipart/form-data" use:enhance={enhanceNew}>
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Input
							id="nombre"
							label="Nombre"
							placeholder="Ingrese el nombre del cliente"
							value={form?.data?.nombre}
							errors={formerrors?.nombre}
					/>
				</div>
				<div>
					<Input
							id="apellido"
							label="Apellido"
							placeholder="Ingrese el apellido del cliente"
							value={form?.data?.apellido}
							errors={formerrors?.apellido}
					/>
				</div>
				<div>
					<Input
							id="dni"
							label="DNI"
							placeholder="Ingrese el DNI del cliente"
							value={form?.data?.dni}
							errors={formerrors?.dni}
					/>
				</div>
				<div>
					<Input
							id="telefono"
							label="Teléfono"
							placeholder="Ingrese el teléfono del cliente"
							value={form?.data?.telefono}
							errors={formerrors?.telefono}
					/>
				</div>

				<div>
					<Input
							id="email"
							label="Email"
							placeholder="Ingrese el email del cliente"
							value={form?.data?.email}
							errors={formerrors?.email}
					/>
				</div>

				<div>
					<Input
							id="domicilio"
							label="Dirección"
							placeholder="Ingrese la dirección del cliente"
							value={form?.data?.domicilio}
							errors={formerrors?.domicilio}
					/>
				</div>

				<div>
					<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nacionalidad</span>
						<div class="relative ">
							<select id="nacionalidad" name ="nacionalidad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={form?.data?.nacionalidad ?? 'ARGENTINA'}>
								{#each data.nacionalidades as nacionalidad}
									<option value={nacionalidad.destpais}
									>{nacionalidad.destpais} ({nacionalidad.codpais})</option
									>
								{/each}
							</select>
						</div>
					</div>
				</div>

<!--				fechaNacimiento-->
<!--					<div class="form-control w-full max-w-lg mb-2">-->

<!--							<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</span>-->
<!--						<input id="fechanacimiento" name="fechanacimiento" value={fechaNacimiento} type="text" class="input hidden"/>-->
<!--						<div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">-->
<!--							<DateInput {locale} bind:value={fechaNacimiento} format="dd/MM/yyyy" placeholder={minDate} min={minDate} max={maxDate}/>-->
<!--						</div>-->
<!--				-->
<!--					</div>-->

				<div class="form-control w-full max-w-lg mb-2">
					<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</span>
					<input
							id="fechanacimiento"
							name="fechanacimiento"
							value={fechaNacimiento}
							type="text"
							class="input hidden"
					/>

					<div
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					>
						<DateInput
								{locale}
								bind:value={fechaNacimiento}
								format="dd/MM/yyyy"
								placeholder={minDate}
								min={minDate}
								max={maxDate}
						/>
					</div>
					{#if formerrors?.fechanacimiento}
						{#each formerrors?.fechanacimiento as error}
							<div class="text-red-500 text-sm font-medium">{error}</div>
						{/each}
					{/if}
				</div>

<!--				sexo-->
				<div class="form-control w-full max-w-lg mb-2">
					<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</span>
					<div class="relative ">
						<select id="sexo" name ="sexo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={form?.data?.sexo ?? 'Masculino'}>
							{#each sexos as sexo}
								<option value={sexo.nombre}>{sexo.nombre}</option
								>
							{/each}
						</select>
					</div>
				</div>

<!--				ocupacion-->
				<div>
					<Input
							id="ocupacion"
							label="Ocupación"
							placeholder="Ingrese la ocupación del cliente"
							value={form?.data?.ocupacion}
							errors={formerrors?.ocupacion}
					/>
				</div>

<!--				nombre madre-->
				<div>
					<Input
							id="nombremadre"
							label="Nombre de la madre"
							placeholder="Ingrese el nombre de la madre del cliente"
							value={form?.data?.nombremadre}
							errors={formerrors?.nombremadre}
					/>
				</div>

<!--				apellido madre-->
				<div>
					<Input
							id="apellidomadre"
							label="Apellido de la madre"
							placeholder="Ingrese el apellido de la madre del cliente"
							value={form?.data?.apellidomadre}
							errors={formerrors?.apellidomadre}
					/>
				</div>

<!--				lugar ascenso-->
				<div>
					<Input
							id="lugarascenso"
							label="Lugar de ascenso"
							placeholder="Ingrese el lugar de ascenso del cliente"
							value={form?.data?.lugarascenso}
							errors={formerrors?.lugarascenso}
					/>
				</div>



<!--				observaciones-->

				<div class="sm:col-span-2">
					<TextArea
							rows="3"
							id="observaciones"
							label="Observaciones"
							placeholder="Ingrese las observaciones del cliente"
							value={form?.data?.observaciones}
							errors={form?.errors?.observaciones}
					/>
				</div>
			</div>
			<Button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
				<svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
				Crear cliente
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
