<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;
  let selected = data.cliente.sexo;
	let sexos = [
		{ id: 1, nombre: 'Femenino' },
		{ id: 2, nombre: 'Masculino' },
		{ id: 3, nombre: 'Otro' },
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
<h3 class="text-3xl font-bold">Editar {data.cliente.nombre}</h3>
<div class="flex flex-col w-full h-full p-2">
	<div class="w-full ">
		<form
			method="POST"
			action="?/updateCliente"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateProject}
		>
			<div class="grid gap-4 mb-4 sm:grid-cols-2 w-full">
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
				<Input
					id="nacionalidad"
					label="Nacionalidad"
					value={form?.data?.nacionalidad ?? data.cliente.nacionalidad}
					errors={form?.errors?.nacionalidad}
				/>
				<!--			fecha nacimiento-->
<!--				<Input-->
<!--					id="fechanacimiento"-->
<!--					label="Fecha de nacimiento"-->
<!--					value={form?.data?.fechanacimiento ?? data.cliente.fechanacimiento}-->
<!--					errors={form?.errors?.fechanacimiento}-->
<!--				/>-->
				<div class="form-control w-full max-w-lg mb-2">
					<label class="label font-medium pb-1">
						<span class="label-text">Fecha de nacimiento</span>
					</label>
					<input datepicker datepicker-format="dd/mm/yyyy" id="fechanacimiento" name="fechanacimiento" value="{form?.data?.fechanacimiento ?? data.cliente.fechanacimiento}" type="text" class="input input-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="{data.cliente.fechanacimiento}">
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
						<span class="label-text">Sexo</span>
					</label>
					<div class="relative ">
						<select
							id="sexo"
							name="sexo"
							class="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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

			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Guardar cambios</button>
			</div>
		</form>
	</div>
</div>
