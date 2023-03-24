<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, TextArea } from '$lib/components';
	import { Button } from 'flowbite-svelte';
	import { getImageURL } from '$lib/utils';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { es } from 'date-fns/locale';
	export let data;
	export let form;
	let minDate = new Date();
	minDate.setFullYear(minDate.getFullYear() - 100);
	let maxDate = new Date();
	maxDate.setDate(maxDate.getDate() - 1);
	let fechaNacimiento = new Date(data.cliente.fechanacimiento);
	let dateFnsLocale = es;
	$: locale = localeFromDateFnsLocale(dateFnsLocale);

	let sexos = [
		{ id: 1, nombre: 'Femenino' },
		{ id: 2, nombre: 'Masculino' },
		{ id: 3, nombre: 'Otro' }
	];
	let loading = false;

	const submitUpdateProject = () => {
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


<div class="flex flex-col w-full h-full p-2">
	<form
		method="POST"
		action="?/updateCliente"
		class="space-y-2 items-center"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProject}
	>
		<div class="grid gap-4 mb-4 sm:grid-cols-2 w-full flex flex-col space-y-2">
			<h3 class="text-3xl font-bold dark:text-gray-200">Editar cliente</h3>
			<h5 class="dark:text-gray-200 text-lg font-sans">{data.cliente.nombre} {data.cliente.apellido} (DNI: {data.cliente.dni})</h5>

			<Input
				id="dni"
				label="DNI"
				value={form?.data?.dni ?? data.cliente.dni}
				errors={form?.errors?.dni}
			/>
			<Input
				id="nombre"
				label="Nombre"
				value={form?.data?.nombre ?? data.cliente.nombre}
				errors={form?.errors?.nombre}
			/>
			<Input
				id="apellido"
				label="Apellido"
				value={form?.data?.apellido ?? data.cliente.apellido}
				errors={form?.errors?.apellido}
			/>
			<Input
				id="email"
				label="Email"
				value={form?.data?.email ?? data.cliente.email}
				errors={form?.errors?.email}
			/>
			<Input
				id="telefono"
				label="Telefono"
				value={form?.data?.telefono ?? data.cliente.telefono}
				errors={form?.errors?.telefono}
			/>
			<Input
				id="domicilio"
				label="Domicilio"
				value={form?.data?.domicilio ?? data.cliente.domicilio}
				errors={form?.errors?.domicilio}
			/>
			<!--nacionalidad-->
			<div class="form-control w-full max-w-lg mb-2">
				<label class="label font-medium pb-1">
					<span class="label-text dark:text-gray-200">Nacionalidad</span>
				</label>
				<div class="relative ">
					<select
						id="nacionalidad"
						name="nacionalidad"
						class="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						value={form?.data?.nacionalidad ?? data.cliente.nacionalidad}
					>
						{#each data.nacionalidades as nacionalidad}
							<option value={nacionalidad.destpais}
								>{nacionalidad.destpais} ({nacionalidad.codpais})</option
							>
						{/each}
					</select>
				</div>
			</div>

			<div class="form-control w-full max-w-lg mb-2">
				<label for="fechanacimiento" class="label font-medium pb-1">
					<span class="label-text dark:text-gray-200">Fecha de nacimiento</span>
				</label>
				<input
					id="fechanacimiento"
					name="fechanacimiento"
					value={fechaNacimiento}
					type="text"
					class="input hidden"
				/>
				<!--					<Datepicker datepickerTitle="Seleccione la fecha de nacimiento" datepickerFormat="dd/mm/yyyy" id="fechanacimiento" name="fechanacimiento" value="{form?.data?.fechanacimiento ?? data.cliente.fechanacimiento}" placeholder="{data.cliente.fechanacimiento}"/>-->
				<div
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				>
					<DateInput
						{locale}
						bind:value={fechaNacimiento}
						format="dd/MM/yyyy"
						placeholder={data.cliente.fechanacimiento}
						min={minDate}
						max={maxDate}
					/>
				</div>
			</div>
			<!--ocupacion -->
			<Input
				id="ocupacion"
				label="Ocupacion"
				value={form?.data?.ocupacion ?? data.cliente.ocupacion}
				errors={form?.errors?.ocupacion}
			/>
			<!--			sexo-->
			<div class="form-control w-full max-w-lg mb-2">
				<label class="label font-medium pb-1">
					<span class="label-text dark:text-gray-200 ">Sexo</span>
				</label>
				<div class="relative ">
					<select
						id="sexo"
						name="sexo"
						class="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						value={form?.data?.sexo ?? data.cliente.sexo}
					>
						{#each sexos as sexo}
							<option value={sexo.nombre}>{sexo.nombre}</option>
						{/each}
					</select>
				</div>
			</div>
			<!--			nombremadre-->
			<Input
				id="nombremadre"
				label="Nombre de la madre"
				value={form?.data?.nombremadre ?? data.cliente.nombremadre}
				errors={form?.errors?.nombremadre}
			/>
			<!--			apellido madre-->
			<Input
				id="apellidomadre"
				label="Apellido de la madre"
				value={form?.data?.apellidomadre ?? data.cliente.apellidomadre}
				errors={form?.errors?.apellidomadre}
			/>
		</div>

		<div class="max-w-8xl mr-8">
			<TextArea
				id="observaciones"
				label="Observaciones"
				value={form?.data?.observaciones ?? data.cliente.observaciones}
				errors={form?.errors?.observaciones}
				class="w-full"
			/>
		</div>

		<div class="w-full p-4 items-center">
			<Button type="button" class="p-4 w-48" on:click={() => (window.location.href = '/clientes')}>
				Cancelar
			</Button>
			<Button type="submit" class="p-4 w-48">Guardar cambios</Button>
		</div>
	</form>
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
