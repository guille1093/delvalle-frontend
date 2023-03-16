<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';
	export let form;
	let loading = false;

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Credenciales invalidas');
					await update();
					break;
				case 'error':
					toast.error('Credenciales invalidas');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<!-- component -->
<div class="bg-cover z-0" style="background-image: url('https://images.unsplash.com/photo-1672661164570-d5e7e0890a69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80');"><div class="bg-gradient-to-b from-blue-400 to-gray-900 opacity-70"></div>
<!--	<div class="absolute"><img style="opacity: 0.1; mix-blend-mode: darken" src="/images/london3.jpg" alt="bg"></div>-->
	<div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
		<div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
			<div class="self-start hidden lg:flex flex-col">
				<h1 class="mb-3 font-bold text-5xl text-black">Empresa de viajes y turismo Del Valle.</h1>
				<p class="text-2xl text-gray-900">Sistema de administración y control WEB.</p>
			</div>
		</div>
		<div class="flex justify-center self-center  z-10">
			<div class="p-12 bg-gray-200 mx-auto rounded-2xl w-max">
<!--				<div class="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0 z-10">-->
					<div class="p-6 sm:p-8 lg:p-2 space-y-8">
						<h2 class="text-2xl lg:text-3xl font-bold text-gray-900">
							<a href="/" class="text-2xl font-semibold flex justify-center items-center p-3">
								<img src="/images/image1.png" height="50px" width="200px" alt="Logo">
							</a>
							Inicie sesión
						</h2>
						<h3 class="text-gray-400">
							Ingrese sus credenciales para acceder al sistema
						</h3>
						<form
								action="?/login"
								method="POST"
								class="flex flex-col items-center space-y-2 w-full pt-4"
								use:enhance={submitLogin}
						>
							<Input
									type="email"
									id="email"
									label="Email"
									value={form?.data?.email ?? ''}
									errors={form?.errors?.email}
									disabled={loading}
							/>
							<Input
									type="password"
									id="password"
									label="Ingrese su contraseña"
									errors={form?.errors?.password}
									disabled={loading}
							/>
							<div class="w-full max-w-lg">
								<a
										href="/reset-password"
										class="font-medium text-gray-500 hover:cursor-pointer hover:underline"
								>
									Olvido su contraseña? </a
								>
							</div>

							<div class="w-full max-w-lg pt-2">
								<button type="submit" class="btn btn-info w-full" disabled={loading}>Iniciar sesión</button>
							</div>
							{#if form?.notVerified}
								<div class="alert alert-error shadow-lg w-full max-w-lg">
									<div>
										<svg
												xmlns="http://www.w3.org/2000/svg"
												class="stroke-current flex-shrink-0 h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
										><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
										>
										<span>Se cuenta debe estar habilitada para poder iniciar sesión.</span>
									</div>
								</div>
							{/if}
						</form>
					</div>
				</div>
				<div class="pt-5 text-center text-gray-400 text-xs">
				</div>
			</div>
		</div>
	</div>
