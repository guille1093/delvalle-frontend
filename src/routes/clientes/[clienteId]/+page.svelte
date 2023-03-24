<script>
	export let data;
	const tableitems = [
		{
			title: 'Nombres',
			value: data.cliente.nombre
		},
		{
			title: 'Apellido',
			value: data.cliente.apellido
		},
		{
			title: 'DNI',
			value: data.cliente.dni
		},
		{
			title: 'Sexo',
			value: data.cliente.sexo
		},
		{
			title: 'Fecha nacimiento',
			value: data.cliente.fechanacimiento
		},
		{
			title: 'Domicilio',
			value: data.cliente.domicilio
		},
		{
			title: 'Teléfono',
			value: data.cliente.telefono
		},
		{
			title: 'Email',
			value: data.cliente.email
		},
		{
			title: 'Ocupación',
			value: data.cliente.ocupacion
		},
		{
			title: 'Nacionalidad',
			value: data.cliente.nacionalidad
		},
		{
			title: 'Nombre madre',
			value: data.cliente.nombremadre
		},
		{
			title: 'Apellido madre',
			value: data.cliente.apellidomadre
		},
		{
			title: 'Observaciones',
			value: data.cliente.observaciones
		}
	];
</script>

<div class="w-full h-screen md:w-9/12 mx-2 dark:bg-gray-900">
	<div class="bg-white p-3 shadow-sm rounded-sm dark:bg-gray-900">
		<div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
			<span class="text-green-500">
				<svg
					class="h-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			</span>
			<span class="tracking-wide dark:text-gray-200">Detalles cliente</span>
			<span class="text-xs pb-2 text-gray-500 font-normal"
				>(ID: {data.cliente.id})
				<a
					class="text-blue-500 text-xl m-3 pb-0 bx bx-edit"
					href="/clientes/{data.cliente.id}/editar"
				/></span
			>
		</div>
		<div class="text-gray-700 font-mono dark:bg-gray-900">
			<div class="grid md:grid-cols-1 text-sm dark:bg-gray-900">
				<div
					class="grid grid-cols-2 bg-green-200 border-2 border-white dark:border-gray-900 dark:bg-blue-600 dark:text-gray-200"
				>
					<div class="px-4 py-2 font-semibold">Fecha creación</div>
					<div class="px-4 py-2">{data.cliente.created}</div>
				</div>
				<div
					class="grid grid-cols-2 bg-green-200 border-2 border-white dark:border-gray-900 dark:bg-blue-600 dark:text-gray-200"
				>
					<div class="px-4 py-2 font-semibold">Fecha última modificación</div>
					<div class="px-4 py-2">{data.cliente.updated}</div>
				</div>
				{#each tableitems as item}
					<div
						class="grid grid-cols-2 bg-gray-100 border-2 border-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
					>
						<div class="px-4 py-2 font-semibold">{item.title}:</div>
						<div class="px-4 py-2">{item.value}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
