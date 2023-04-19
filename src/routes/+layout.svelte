<script>
	//Imports
	import '../app.postcss';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {DarkMode, Navbar, NavHamburger, Sidebar, SidebarGroup, SidebarWrapper, Drawer, CloseButton, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider} from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

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
			title: 'Grupos familiares',
			href: '/grupofamiliar',
			icon: 'bx bx-group'
		},
		{
			title: 'Hoteles',
			href: '/hotels',
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
			href: '/settings',
			icon: 'bx bx-cog'
		}
	];


	$: activeUrl = $page.url.pathname;


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
	// const toggleSide = () => {
	// 	if (width < breakPoint) {
	// 		drawerHidden = !drawerHidden;
	// 	}
	// };
	const toggleDrawer = () => {
		drawerHidden = false;
	};


	let darkmodebtn = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg z-50';
</script>

<svelte:window bind:innerWidth={width} />
<Toaster />
{#if !data.user}
	<slot />
{:else}
	<Navbar let:hidden let:toggle class="mr-0 dark:bg-gray-900">
		<NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />


		<div class="lg:flex lg:ml-64 dark:bg-gray-900">

			<h5 class="text-xl uppercase">
				{#if activeUrl === '/'}
					<i class="bx bx-home text-blue-600 mr-2"></i>
					<i>Inicio</i>
				{:else}
					{#each navigation as item}
						{#if activeUrl.includes(item.href.replace(/^\//, ''))}
							<i class="bx {item.icon} text-blue-600 mr-2"></i>
							<i>{item.title}</i>
						{/if}
					{/each}
				{/if}
			</h5>

		</div>
		<div class="flex items-end mr-0">
			<DarkMode class="p-2 mr-2" btnClass={darkmodebtn} />
			<Avatar
				id="avatar-menu"
				src={getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)}
				dot={{ placement: 'bottom-right', color: 'green' }}
				size="md"
			/>
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm"> {data.user.name} {data.user.apellido}</span>
				<span class="block truncate text-sm font-medium"> {data.user.username} </span>
			</DropdownHeader>
			<DropdownItem href="/perfil">Editar perfil</DropdownItem>
			<DropdownItem>Seguridad</DropdownItem>
			<DropdownDivider />
			<DropdownItem class="bg-red-600 text-gray-200">
				<form action="/logout" method="POST">
					<button type="submit" class="w-full">Cerrar sesión</button>
				</form>
			</DropdownItem>
		</Dropdown>
	</Navbar>

	<Drawer
		transitionType="fly"
		{backdrop}
		{transitionParams}
		bind:hidden={drawerHidden}
		bind:activateClickOutside
		width="w-[14rem]"
		class="overflow-hidden pb-32"
		id="sidebar"
	>
		<div class="flex items-center">
			<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
		</div>
		<Sidebar asideClass="w-[185px]">
			<SidebarWrapper divClass="py-4 rounded h-[100px]">
				<div class="flex items-center w-full justify-center"><img src="/images/image1.png" class="rounded-lg mb-2 dark:bg-blue-600 w-[80px]" alt="Logo" /></div>

				<SidebarGroup class="">
					<ul class="space-y-2">
						<li>
							<a href="/" class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url
									.pathname === '/'
									? 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700'
									: 'bg-gray-100 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-600'} ">
								<i class="bx bx-home mr-2"></i>
								<span class="ml-3">Inicio</span>
							</a>
						</li>
						{#each navigation as navItem}
							<li>
								<a
									href={navItem.href}
									class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url
										.pathname.includes(navItem.href.replace(/^\//, ''))
										? 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700'
										: 'bg-gray-100 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-600'} "
								>
									<i class="bx {navItem.icon} mr-2"></i>
									<span class="ml-3">{navItem.title}</span>
								</a>
							</li>
						{/each}
						<li>
							<form action="/logout" method="POST">
								<button type="submit" class="flex items-center w-full p-2 text-base font-normal rounded-lg group bg-gray-200 text-gray-900 hover:bg-red-600 hover:text-gray-200 hover:border-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-red-600"><i class="bx bx-log-out mr-5"></i>Cerrar sesión</button>
							</form>
						</li>
					</ul>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Drawer>

	<div class="flex w-full min-h-screen dark:bg-gray-900">
		<main class="lg:ml-[235px] lg:mr-2 w-full h-max dark:bg-gray-900">
			<slot/>
		</main>
	</div>
{/if}
