<script>
	import '../app.postcss';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';

	export let data;
	$: activeUrl = $page.url.pathname
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Drawer,
		CloseButton,
	} from 'flowbite-svelte';

	import { sineIn } from 'svelte/easing';



	const navigation = [

		{
			title: 'Inicio',
			href: '/',
			icon: 'bx bx-home'
		},
		{
			title: 'Clientes',
			href: '/clientes',
			icon: 'bx bx-user'
		},
		{
			title: 'Paquetes',
			href: '/paquetes',
			icon: 'bx bx-package'
		},
		{
			title: 'Grupos familiares',
			href: '/grupofamiliar',
			icon: 'bx bx-group'
		},
		{
			title: 'Hoteles',
			href: '/hoteles',
			icon: 'bx bx-hotel'

		},
		{
			title: 'Metodos de pago',
			href: '/metodopago',
			icon: 'bx bx-credit-card'
		},
		{
			title: 'Personal',
			href: '/personal',
			icon: 'bx bx-user'
		},
		{
			title: 'Contratos',
			href: '/contratos',
			icon: 'bx bx-file'
		},
		{
			title: 'Ventas',
			href: '/ventas',
			icon: 'bx bx-dollar'
		},
		{
			title: 'Reportes',
			href: '/reportes',
			icon: 'bx bx-bar-chart-alt-2'
		},
		{
			title: 'Configuración',
			href: '/configuracion',
			icon: 'bx bx-cog'
		}
	];

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let breakPoint = 1024;
	let width;
	let backdrop = false;
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
	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};
	const toggleDrawer = () => {
		drawerHidden = false;
	};
	$: activeUrl = $page.url.pathname;
	let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
	let darkmodebtn =
			'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-2 top-12  md:top-3 md:right-2 z-50';
	let divClass = 'w-full md:block md:w-auto pr-8';
	let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';
</script>

<svelte:window bind:innerWidth={width} />
<Toaster />
{#if !data.user}
	<slot />
{:else}

<!--	<nav class="fixed top-0 z-50 w-full border-b bg-gray-100">-->
<!--		<div class="px-3 py-3 lg:px-5 lg:pl-3 bg-gray-100">-->
<!--			<div class="flex items-center justify-between">-->
<!--				<div class="flex items-center justify-start">-->
<!--					<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">-->
<!--						<span class="sr-only">Abrir barra lateral</span>-->
<!--						<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
<!--							<path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>-->
<!--						</svg>-->
<!--					</button>-->
<!--					<a href="/" class="flex ml-2 md:mr-24">-->
<!--						<img src="/images/image1.png" class="h-8 mr-3 bg-gray-100 rounded-lg" alt="Logo" />-->
<!--						<span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Bienvenido {data.user?.name}</span>-->
<!--					</a>-->
<!--				</div>-->
<!--				<div class="flex items-center">-->
<!--					<div class="flex items-center ml-3">-->
<!--						<div>-->
<!--							<button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">-->
<!--								<span class="sr-only">Open user menu</span>-->
<!--								<img class="w-8 h-8 rounded-full" src="{data.user?.avatar-->
<!--									? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)-->
<!--									: `https://ui-avatars.com/api/?name=${data.user?.name}`}" alt="user">-->
<!--&lt;!&ndash;								<img class="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name={data.user?.name}" alt="user">&ndash;&gt;-->
<!--							</button>-->
<!--						</div>-->
<!--						<div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">-->
<!--							<div class="px-4 py-3" role="none">-->
<!--								<p class="text-sm text-gray-900 dark:text-white" role="none">-->
<!--									{data.user?.name}-->
<!--								</p>-->
<!--								<p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">-->
<!--									{data.user?.email}-->
<!--								</p>-->
<!--							</div>-->
<!--							<ul class="py-1" role="none">-->
<!--								<li>-->
<!--									<a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>-->
<!--								</li>-->
<!--								<li>-->
<!--									<a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>-->
<!--								</li>-->
<!--								<li>-->
<!--									<a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>-->
<!--								</li>-->
<!--								<li>-->
<!--									<a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</nav>-->

<!--	<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-100 border-gray-300" aria-label="Sidebar">-->
<!--		<div class="h-full px-3 pb-4 overflow-y-auto bg-gray-100 mt-16">-->
<!--			<ul class="space-y-2">-->
<!--				{#each navigation as navItem}-->
<!--					<li>-->
<!--						<a href="{navItem.href}" class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url.pathname === navItem.href ? 'bg-blue-600 border border-gray-700 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}">-->
<!--							<i class="bx {navItem.icon} mr-2" ></i>-->
<!--							<span class="ml-3">{navItem.title}</span>-->
<!--						</a>-->
<!--					</li>-->
<!--				{/each}-->
<!--				<li>-->
<!--					<form action="/logout" method="POST">-->
<!--						<button type="submit" class="flex items-center w-full p-2 text-base font-normal rounded-lg group {'bg-gray-200 text-gray-900 hover:bg-red-600 hover:text-gray-200 hover:border-gray-700'}"><i class="bx bx-log-out mr-5" ></i>Cerrar sesión</button>-->
<!--					</form>-->
<!--				</li>-->
<!--			</ul>-->
<!--		</div>-->
<!--	</aside>-->

<!--	<div class="p-4 sm:ml-64">-->
<!--		<div class="mt-10">-->
<!--			<slot />-->
<!--		</div>-->
<!--	</div>-->

	<Navbar let:hidden let:toggle>
		<NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
		<NavBrand href="/" class="lg:ml-64">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
				<a href="/" class="flex ml-2 md:mr-24">
					<img src="/images/image1.png" class="h-8 mr-3 bg-gray-100 rounded-lg" alt="Logo" />
					<span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Bienvenido {data.user?.name}</span>
				</a>
		</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
<!--		<NavUl {hidden} {divClass} {ulClass}>-->
<!--			<NavLi href="/">Home</NavLi>-->
<!--			<NavLi href="/pages/about">About</NavLi>-->
<!--			<NavLi href="https://github.com/shinokada/flowbite-sveltekit-responsive-sidebar-layout"-->
<!--			>GitHub</NavLi-->
<!--			>-->
<!--		</NavUl>-->
	</Navbar>
	<DarkMode btnClass={darkmodebtn} />
	<Drawer
			transitionType="fly"
			{backdrop}
			{transitionParams}
			bind:hidden={drawerHidden}
			bind:activateClickOutside
			width="w-64"
			class="overflow-scroll pb-32"
			id="sidebar"
	>
		<div class="flex items-center">
			<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
		</div>
		<Sidebar asideClass="w-54">
			<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
				<SidebarGroup>
					<!--{#each navigation as navItem}-->
					<!--	<SidebarItem-->
					<!--			label={navItem.title}-->
					<!--			href={navItem.href}-->
					<!--			{spanClass}-->
					<!--			on:click={toggleSide}-->
					<!--			active={$page.url.pathname === navItem.href}-->
					<!--	/>-->
					<!--{/each}-->
								<ul class="space-y-2">
									{#each navigation as navItem}
										<li>
											<a href="{navItem.href}" class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url.pathname === navItem.href ? 'bg-blue-600 border border-gray-700 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200'} ">
												<i class="bx {navItem.icon} mr-2" ></i>
												<span class="ml-3">{navItem.title}</span>
											</a>
										</li>
									{/each}
									<li>
										<form action="/logout" method="POST">
											<button type="submit" class="flex items-center w-full p-2 text-base font-normal rounded-lg group {'bg-gray-200 text-gray-900 hover:bg-red-600 hover:text-gray-200 hover:border-gray-700'}"><i class="bx bx-log-out mr-5" ></i>Cerrar sesión</button>
										</form>
									</li>
								</ul>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Drawer>

	<div class="flex px-4 mx-auto w-full dark:bg-gray-900">
		<main class="lg:ml-72 w-full mx-auto dark:bg-gray-900">
			<slot />
		</main>
	</div>
{/if}



