<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
	let sexos = [
		{ id: 1, nombre: 'Femenino' },
		{ id: 2, nombre: 'Masculino' },
		{ id: 3, nombre: 'Otro' },
	];
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<h3 class="text-3xl font-bold dark:text-gray-200">Nuevo cliente</h3>
			<p class="mt-2 text-lg dark:text-gray-200">Ingrese los datos necesarios</p>
			<div class="grid gap-4 mb-4 sm:grid-cols-2 w-full">
				<Input
					id="nombre"
					label="Nombre"
					placeholder="Ingrese el nombre del cliente"
					value={form?.data?.nombre}
					errors={form?.errors?.nombre}
				/>
				<Input
					id="apellido"
					label="Apellido"
					placeholder="Ingrese el apellido del cliente"
					value={form?.data?.apellido}
					errors={form?.errors?.apellido}
				/>
				<Input
					id="dni"
					label="DNI"
					placeholder="Ingrese el DNI del cliente sin puntos"
					value={form?.data?.dni}
					errors={form?.errors?.dni}
				/>
				<Input
					id="email"
					label="Email"
					placeholder="cliente@mail.com"
					value={form?.data?.email}
					errors={form?.errors?.email}
				/>
				<Input
					id="telefono"
					label="Telefono"
					placeholder="Ingrese el telefono del cliente"
					value={form?.data?.telefono}
					errors={form?.errors?.telefono}
				/>
				<Input
					id="domicilio"
					label="Domicilio"
					placeholder="Ingrese el domicilio del cliente"
					value={form?.data?.domicilio}
					errors={form?.errors?.domicilio}
				/>
				<!--nacionalidad-->
				<Input
					id="nacionalidad"
					label="Nacionalidad"
					placeholder="Seleccione la nacionalidad del cliente"
					value={form?.data?.nacionalidad}
					errors={form?.errors?.nacionalidad}
				/>
				<!--			fecha nacimiento-->
				<Input
					id="fechanacimiento"
					label="Fecha de nacimiento"
					placeholder="DD/MM/AAAA"
					value={form?.data?.fechanacimiento}
					errors={form?.errors?.fechanacimiento}
				/>
				<!--ocupacion -->
				<Input
					id="ocupacion"
					label="Ocupación"
					placeholder="Ingrese la ocupación del cliente"
					value={form?.data?.ocupacion}
					errors={form?.errors?.ocupacion}
				/>
				<div class="form-control w-full max-w-lg mb-2">
					<label class="label font-medium pb-1">
						<span class="label-text dark:text-gray-200">Sexo</span>
					</label>
					<div class="relative ">
						<select
							id="sexo"
							name="sexo"
							class="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							value="Seleccione el sexo del cliente"
							placeholder="Seleccione el sexo del cliente"
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
			</div>

			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Crear nuevo cliente</button>
			</div>
		</form>
	</div>
</div>
