<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	import { Button} from "flowbite-svelte";
	import toast from "svelte-french-toast";
	import {invalidateAll} from "$app/navigation";
	import { FieldError} from "$lib/components/";
	import Svelecte from 'svelecte';

	export let form;
	export let data;



	let formerrors
	const enhanceNew = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result.data.error) {
						formerrors = result.data.errors;
						toast.error("Error al crear la venta", { duration: 7000});
						break;
					}
					await invalidateAll();
					toast.success("Venta creada exitosamente");
					break;
				case 'error':
					console.log(result);
					console.log(result.errors);
					toast.error("Error al crear la venta");
					break;
				default:
					await update();
			}
		};
	};



</script>

	<!-- Modal content -->
<div class="relative p-4 w-full max-w-8xl h-screen">
<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
		<!-- Modal header -->

		<div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
				Nueva venta
			</h3>
			<button type="button" on:click={() => (window.location.href = '/ventas')} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			</button>
		</div>

		<!-- Modal body -->

		<form action="?/create" method="POST" enctype="multipart/form-data" use:enhance={enhanceNew} >
			<div class="grid gap-4 mb-4 sm:grid-cols-2">
<!--				select de clientes-->
				<div>
					<div class="form-control w-full max-w-lg mb-2">
						<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cliente</span>
						<div class="relative ">
							<select
									id="cliente"
									name="cliente"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									value={form?.data?.cliente ?? ''}
							>
								{#each data.clientes as cliente}
									<option value={cliente.id}>{cliente.nombre}</option>
								{/each}
							</select>
					</div>
				</div>
					<FieldError fieldError="{formerrors?.cliente}"></FieldError>
			</div>

				<label for="cliente">Select a country</label>
				<Svelecte options="{data.clientes}"
									name="cliente"
									inputId="cliente"
									placeholder="Selecciona un cliente"
									valueField="id"
				></Svelecte>

			<div>
				<div class="form-control w-full max-w-lg mb-2">
					<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</span>
					<div class="relative ">
						<select
								id="paquete"
								name="paquete"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={form?.data?.paquete ?? ''}
						>
							{#each data.paquetes as paquete}
							<option value={paquete.id}>{paquete.nombre}</option>
							{/each}
						</select>
					</div>
				</div>
				<FieldError fieldError="{formerrors?.paquete}"></FieldError>
			</div>



<!--				textarea de obeservaciones-->
			<div class="form-control w-full max-w-lg mb-2">
				<span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</span>
				<div class="relative ">
					<textarea
							id="observaciones"
							name="observaciones"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							value={form?.data?.observaciones ?? ''}
					></textarea>
				</div>
				<FieldError fieldError="{formerrors?.observaciones}"></FieldError>
			</div>

			<Button type="submit" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
				<svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
				Crear metodo de pago
			</Button>
			</div>
		</form>

	</div>
</div>
