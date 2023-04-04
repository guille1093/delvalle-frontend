<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, TextArea } from '$lib/components';
	import { Button} from "flowbite-svelte";
	import toast from "svelte-french-toast";
	export let data;
	export let form;
	$: console.log(form?.errors);
	
	const estados = [
		{ id: 1, nombre: 'Activo' },
		{ id: 2, nombre: 'Inactivo' },
		{ id: 3, nombre: 'Suspendido'}
	];

	let loading = false;

	let formerrors
	const submitUpdatemetodopago = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result.data.error) {
						console.log(result.errors);
						console.log(result);
						formerrors = result.data.errors;
						toast.error("Error al actualizar el metodo de pago", { duration: 7000});
						break;
					}
					console.log(result);
					await invalidateAll();
					toast.success("Metodo de pago actualizado ");
					break;
				case 'error':
					console.log(result);
					console.log(result.errors);
					toast.error("Error al actualizar el metodo de pago");
					break;
				default:
					await update();
			}

			loading = false;
		};
	};

</script>




<!-- Modal content -->
<div class="relative p-4 w-full max-w-8xl h-screen">
	<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
		<!-- Modal header -->
		<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				Actualizar {data.metodopago.nombre}
			</h3>
			<button type="button" on:click={() => (window.location.href = '/metodopago')} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			</button>
		</div>
		<!-- Modal body -->
		<form method="POST" action="?/updatemetodopago" enctype="multipart/form-data" use:enhance={submitUpdatemetodopago}>
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
				<div>
					<Input
							id="nombre"
							label="Nombre"
							value={form?.data?.nombre ?? data.metodopago.nombre}
							errors={formerrors?.nombre}
							placeholder="Nombre del metodo de pago" />
				</div>
				<div>
					<Input id="descuento" label="Descuento" value={form?.data?.descuento ?? data.metodopago.descuento} errors={formerrors?.descuento} placeholder="descuento del paquete" type="number" />
				</div>
				<div class="mt-1">
					<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</span>
						<div class="relative ">
							<select
									id="estado"
									name="estado"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.estado ?? 'Activo'}
							>
								{#each estados as estado}
									<option value={estado.nombre}>{estado.nombre}</option>
								{/each}
							</select>
						</div>
					</div>
					{#if formerrors?.estado}
						{#each formerrors?.estado as error}
							<p class="label-text-alt text-error inline-block">
								{error}
							</p>
						{/each}
					{/if}
				</div>



				<div class="sm:col-span-2">
					<TextArea rows="4" id="observaciones" label="Descripción" placeholder="Ingrese observaciones o detalles extra" value={form?.data?.observaciones ?? data.metodopago.observaciones} errors={form?.errors?.observaciones}/>
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