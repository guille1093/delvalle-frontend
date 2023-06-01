<script>
	//Imports
	import '../app.postcss';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		DarkMode,
		Navbar,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		NavBrand,
		NavLi, NavUl
	} from 'flowbite-svelte';


	//Exports
	export let data;

	//Variables
	const navigation = [
		{
			title: 'Clientes',
			href: '/clientes',
			icon: 'bx bx-user'
		},
		{
			title: 'Paquetes',
			href: '/projects',
			icon: 'bx bx-package'
		},

		{
			title: 'Ventas',
			href: '/ventas',
			icon: 'bx bx-dollar'
		},

	];


	$: activeUrl = $page.url.pathname;

	let breakPoint = 1024;
	let width = 0;
	let activateClickOutside = true;
	let drawerHidden = false;

	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}
	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});

	let navClass = 'bg-white border-gray-200 py-2.5 dark:bg-gray-800';
	let navDivClass = 'flex flex-wrap justify-between items-center mx-auto max-w-8xl px-4';
	let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2 ml-2';
</script>

<svelte:window bind:innerWidth={width} />
<Toaster />
{#if !data.user}
	<slot />
{:else}


	<main>
		<div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
			<header class="sticky top-0 z-40 flex-none mx-auto w-full bg-white dark:bg-gray-900 not-printable">
				<Navbar let:hidden let:toggle fluid={false} {navClass} {navDivClass}>
					<NavBrand href="/">
						<img
								src="/images/image1.png"
								class="h-8 mr-3"
								alt="Del Valle Logo"
						/>
						<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Del Valle Turismo
          </span>
					</NavBrand>
					<div class="flex items-center lg:order-2">
									<Avatar
										id="avatar-menu"
										src={getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)}
										dot={{ placement: 'bottom-right', color: 'green' }}
										size="md"
									/>

								<Dropdown placement="bottom" triggeredBy="#avatar-menu">
									<DropdownHeader>
										<span class="block text-sm"> {data.user.name} {data.user.apellido}</span>
										<span class="block truncate text-sm font-medium"> {data.user.username} </span>
									</DropdownHeader>
									<DropdownItem href="/perfil">Editar perfil</DropdownItem>
									<DropdownItem>Seguridad</DropdownItem>
									<DropdownDivider />
									<DropdownItem class="bg-red-600 text-gray-200 hover:bg-red-800">
										<form action="/logout" method="POST">
											<button type="submit" class="w-full">Cerrar sesión</button>
										</form>
									</DropdownItem>
								</Dropdown>
						<DarkMode {btnClass} />
						<NavHamburger
								on:click={toggle}
								btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						/>
					</div>

					<NavUl
							{hidden}
							divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
							ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
					>
												<NavLi href="/">
																				<a href="/" class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url
																						.pathname === '/'
																						? 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700'
																						: 'bg-gray-100 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-600'} ">
																					<i class="bx bx-home mr-2"></i>
																					<span class="ml-3">Inicio</span>
																				</a>
												</NavLi>
												{#each navigation as navItem}
													<NavLi href={navItem.href} >
														<a href={navItem.href} class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url.pathname.includes(navItem.href.replace(/^\//, '')) ? 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-600'} ">
															<i class="bx {navItem.icon}"></i>
															<span class="ml-3">{navItem.title}</span>
														</a>
													</NavLi>
												{/each}
					</NavUl>
				</Navbar>
			</header>
			<div class="mx-auto max-w-8xl dark:bg-gray-900">
				<slot />
			</div>
		</div>
	</main>
{/if}

<style>
	@media print {
		.not-printable { display: none; }
	}
</style>
