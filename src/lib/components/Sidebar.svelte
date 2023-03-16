<script>
$: activeUrl = $page.url.pathname
import { page } from '$app/stores';
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
  title: 'Contratos',
  href: '/contratos',
  icon: 'bx bx-file'
},
{
  title: 'Ventas',
  href: '/ventas',
  icon: 'bx bx-dollar'
}
];
</script>

<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700" aria-label="Sidebar">
  <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
    <ul class="space-y-2">
      {#each navigation as navItem}
        <li>
          <a href="{navItem.href}" class="flex items-center p-2 text-base font-normal rounded-lg group {$page.url.pathname === navItem.href ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-600 text-gray-200'}">
            <i class="bx {navItem.icon} mr-2" ></i>
            <span class="ml-3">{navItem.title}</span>
          </a>
        </li>
      {/each}
    </ul>
    <ul class="pt-4 mt-4 border-t border-gray-700">
      <li>
        <form action="/logout" method="POST">
          <button type="submit" class="flex items-center p-2 text-white font-normal rounded-lg group bg-red-500 w-full"><i class="bx bx-log-out mr-2" ></i>Cerrar sesión</button>
        </form>
      </li>
    </ul>

  </div>
</aside>