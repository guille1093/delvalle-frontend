<script>
	//Imports
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	import {es} from "date-fns/locale";
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import toast from "svelte-french-toast";
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

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={enhanceNew}
		>
			<h3 class="text-3xl font-bold dark:text-gray-200">Nuevo cliente</h3>
			<p class="mt-2 text-lg dark:text-gray-200">Ingrese los datos necesarios</p>
			<div class="grid gap-4 mb-4 sm:grid-cols-2 w-full">
				<Input
					id="nombre"
					label="Nombre"
					placeholder="Ingrese el nombre del cliente"
					value={form?.data?.nombre}
					errors={formerrors?.nombre}
				/>
				<Input
					id="apellido"
					label="Apellido"
					placeholder="Ingrese el apellido del cliente"
					value={form?.data?.apellido}
					errors={formerrors?.apellido}
				/>
				<Input
					id="dni"
					label="DNI"
					placeholder="Ingrese el DNI del cliente sin puntos"
					value={form?.data?.dni}
					errors={formerrors?.dni}
				/>
				<Input
					id="email"
					label="Email"
					placeholder="cliente@mail.com"
					value={form?.data?.email}
					errors={formerrors?.email}
				/>
				<Input
					id="telefono"
					label="Telefono"
					placeholder="Ingrese el telefono del cliente"
					value={form?.data?.telefono}
					errors={formerrors?.telefono}
				/>
				<Input
					id="domicilio"
					label="Domicilio"
					placeholder="Ingrese el domicilio del cliente"
					value={form?.data?.domicilio}
					errors={formerrors?.domicilio}
				/>
				<!--nacionalidad-->
				<div class="form-control w-full max-w-lg mb-2">
						<span class="label-text dark:text-gray-200">Nacionalidad</span>
					<div class="relative ">
						<select id="nacionalidad" name ="nacionalidad" class="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={form?.data?.nacionalidad ?? 'ARGENTINA'}>
							{#each data.nacionalidades as nacionalidad}
								<option value={nacionalidad.destpais}
									>{nacionalidad.destpais} ({nacionalidad.codpais})</option
								>
							{/each}
						</select>
					</div>
				</div>
				<!--			fecha nacimiento-->
				<div class="form-control w-full max-w-lg mb-2">
					<label for="fechanacimiento" class="label font-medium pb-1">
						<span class="label-text dark:text-gray-200">Fecha de nacimiento</span>
					</label>
					<input id="fechanacimiento" name="fechanacimiento" value={fechaNacimiento} type="text" class="input hidden"/>
					<div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
						<DateInput {locale} bind:value={fechaNacimiento} format="dd/MM/yyyy" placeholder={minDate} min={minDate} max={maxDate}/>
					</div>
				</div>
				{#if formerrors?.fechanacimiento}
					{#each formerrors?.fechanacimiento as error}
						<div class="text-red-500 text-sm font-medium">{error}</div>
					{/each}
				{/if}
				<!-- ocupacion -->
				<Input
					id="ocupacion"
					label="Ocupación"
					placeholder="Ingrese la ocupación del cliente"
					value={form?.data?.ocupacion}
					errors={form?.errors?.ocupacion}
				/>
<!--				lugar ascenso-->
				<Input
					id="lugarascenso"
					label="Lugar de ascenso"
					placeholder="Ingrese el lugar de ascenso del cliente"
					value={form?.data?.lugarascenso}
					errors={form?.errors?.lugarascenso}
				/>
				<!-- sexo -->
				<div class="form-control w-full max-w-lg mb-2">
					<label class="label font-medium pb-1">
						<span class="label-text dark:text-gray-200">Sexo</span>
					</label>
					<div class="relative ">
						<select
							id="sexo"
							name="sexo"
							class="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							value="{form?.data?.sexo ?? 'MASCULINO'}"
							placeholder="Seleccione el sexo del cliente"
						>
							{#each sexos as sexo}
								<option value={sexo.nombre}>{sexo.nombre}</option>
							{/each}
						</select>
					</div>
				</div>
				{#if formerrors?.sexo}
					{#each formerrors?.sexo as error}
						<div class="text-red-500 text-sm font-medium">{error}</div>
					{/each}
				{/if}
				<!--			nombremadre-->
				<Input
					id="nombremadre"
					label="Nombre de la madre"
					placeholder="Ingrese el nombre de la madre del cliente"
					value={form?.data?.nombremadre}
					errors={form?.errors?.nombremadre}
				/>
				<!--			apellido madre-->
				<Input
					id="apellidomadre"
					label="Apellido de la madre"
					placeholder="Ingrese el apellido de la madre del cliente"
					value={form?.data?.apellidomadre}
					errors={form?.errors?.apellidomadre}
				/>
				<!--			Observaciones-->
				<TextArea
					id="observaciones"
					label="Observaciones"
					placeholder="Ingrese las observaciones del cliente"
					value={form?.data?.observaciones}
					errors={form?.errors?.observaciones}
				/>
			</div>

			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Crear nuevo cliente</button>
			</div>
		</form>
	</div>
</div>

<style>
	:global(body) {
		--date-picker-foreground: #f7f7f7;
		--date-picker-background: #1f2937;
		--date-picker-highlight-border: #2563eb;
		--date-picker-highlight-shadow: #2563eb;
		--date-picker-selected-color: #f7f7f7;
		--date-picker-selected-background: #2563eb;
	}
</style>
