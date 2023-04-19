<script>
    import {Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button} from "flowbite-svelte";

    const objects = [
        {
            type: "ALMACEN",
            company: "ARBOGAST MATERIALS",
            number: 15678,
            reference: "248-D",
            date: "2004-12-10",
            amount: 41345.98,
        },
        {
            type: "ALMACEN",
            company: "ARBOGAST MATERIALS",
            number: 26645,
            reference: "835-L",
            date: "2004-10-23",
            amount: 98748.98,
        },
        {
            type: "CLIENTE",
            company: "ARBOGAST MATERIALS",
            number: 28840,
            reference: "840-L",
            date: "2004-10-31",
            amount: 15434.15,
        },
        {
            type: "ALMACEN",
            company: "BORGUST CO",
            number: 9865,
            reference: "78-0-9873",
            date: "2004-09-15",
            amount: 11568.32,
        },
        {
            type: "ALMACEN",
            company: "BORGUST CO",
            number: 11064,
            reference: "78-0-0032",
            date: "2004-09-20",
            amount: 11568.32,
        },
        {
            type: "CLIENTE",
            company: "CARLOTON SUPPLY CORP",
            number: 56488,
            reference: "425175",
            date: "2004-12-31",
            amount: 78546.14,
        },
        {
            type: "ALMACEN",
            company: "CARLOTON SUPPLY CORP",
            number: 25784,
            reference: "54784T",
            date: "2005-01-15",
            amount: 5564.23,
        },
        {
            type: "CLIENTE",
            company: "CARLOTON SUPPLY CORP",
            number: 31459,
            reference: "21382MN",
            date: "2005-01-10",
            amount: 14064.25,
        },
        {
            type: "ALMACEN",
            company: "DENTON DISTRIBUTING",
            number: 758,
            reference: "25891MN",
            date: "2005-10-15",
            amount: 4078.55,
        },
        {
            type: "CLIENTE",
            company: "DENTON DISTRIBUTING",
            number: 54789,
            reference: "45891MT",
            date: "2005-10-20",
            amount: 54658.55,
        }
    ];


    const tableheaditems = [
        { titulo: "Cliente", icon: "bx-id-card" },
        { titulo: "Orden de trabajo", icon: "bx-check-square" },
        { titulo: "Nro pedido", icon: "bx-credit-card" },
        { titulo: "Fecha vencimiento", icon: "bx-calendar" },
        { titulo: "Monto", icon: "bx-dollar" },
        { titulo: "Tipo", icon: "bx-copy-alt" },
    ];
    let pesoARLocale = Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    console.log(objects);

    const getBgColor = (date) => {
    //if date is less than 5 feb 2005 from today, return bg-red-500
       if (new Date(date) < new Date("2005-02-01")) {
           return "bg-red-500";
       } else {
           return "bg-green-500";
       }
    };

    const itemsTotal = () => {
        let total = 0;
        objects.forEach((item) => {
            total += item.amount;
        });
        return pesoARLocale.format(total);
    };

    const cantidadPedidos = () => {
        let total = 0;
        objects.forEach((item) => {
            total += 1;
        });
        return total;
    };

    const cantidadPedidosAlmacen = () => {
        let total = 0;
        objects.forEach((item) => {
            if (item.type == "ALMACEN") {
                total += 1;
            }
        });
        return total;
    };

    const cantidadPedidosCliente = () => {
        let total = 0;
        objects.forEach((item) => {
            if (item.type == "CLIENTE") {
                total += 1;
            }
        });
        return total;
    };

    const cantidadPedidosVencidos = () => {
        let total = 0;
        objects.forEach((item) => {
            if (new Date(item.date) < new Date("2005-02-01")) {
                total += 1;
            }
        });
        return total;
    };

    const montoVencido = () => {
        let total = 0;
        objects.forEach((item) => {
            if (new Date(item.date) < new Date("2005-02-01")) {
                total += item.amount;
            }
        });
        return pesoARLocale.format(total);
    };


</script>

<div class="w-full items-center justify-center p-3 m-3">
    <h1 class="text-2xl mb-3 items-center w-full justify-center text-center dark:text-gray-200"><i class="bx bxs-coffee-bean text-blue-600 mr-4"></i>Reporte de pedidos de clientes en proceso</h1>
    <h2 class="dark:text-gray-200"><strong>Fecha: </strong> 1 feb 2005</h2>
</div>




<div class="p-3 m-3">

            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form class="flex items-center">
                            <label for="simple-search" class="sr-only">Buscar</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar" required="">
                            </div>
                        </form>
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <Button type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <i class="bx bx-printer text-white mr-2"></i>
                            Imprimir
                        </Button>
                        <div class="flex items-center space-x-3 w-full md:w-auto">
                            <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                Ordenar por
                                <svg class="ml-2 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                            <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                    <li>
                                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                    </li>
                                </ul>
                                <div class="py-1">
                                    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                </div>
                            </div>
                            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                </svg>
                                Filtros
                                <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                            <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                    <li class="flex items-center">
                                        <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                    </li>
                                    <li class="flex items-center">
                                        <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                    </li>
                                    <li class="flex items-center">
                                        <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                    </li>
                                    <li class="flex items-center">
                                        <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                    </li>
                                    <li class="flex items-center">
                                        <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <Table hoverable={true}>
        <TableHead class="w-full">
            {#each tableheaditems as item}
                <TableHeadCell><i class="bx mr-2 mb-0 text-[20px] text-blue-600 {item.icon}"></i>{item.titulo}</TableHeadCell>
            {/each}
        </TableHead>
        <TableBody class="divide-y">
            {#each objects as item}
                <TableBodyRow>
                    <TableBodyCell>{item.company}</TableBodyCell>
                    <TableBodyCell class="text-end">{item.number}</TableBodyCell>
                    <TableBodyCell class="text-end">{item.reference}</TableBodyCell>
                    <TableBodyCell class="text-center">
                        <div class="flex items-center text-center">
                        <div class="flex-shrink-0 h-3 w-3 ml-0 rounded-full {getBgColor(item.date)}"></div>
                        <div class="ml-2 text-sm font-medium text-gray-900 justify-end dark:text-gray-200 text-center">{new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric'})}</div>
                        </div>
                    </TableBodyCell>
                    <TableBodyCell class="">{pesoARLocale.format(item.amount)}</TableBodyCell>
                    <TableBodyCell class="">{item.type}</TableBodyCell>
                </TableBodyRow>
            {/each}
            <TableBodyRow class="mt-4">
                <TableBodyCell class="dark:bg-gray-900 bg-gray-200">Nro. de clientes: 4</TableBodyCell>
                <TableBodyCell class="text-center dark:bg-gray-900 bg-gray-200"></TableBodyCell>
                <TableBodyCell class="dark:bg-gray-900 bg-gray-200">Nro. pedidos: {cantidadPedidos()}</TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200">
                    <div class="flex items-center text-center">
                        <div class="flex-shrink-0 h-3 w-3 ml-0 rounded-full bg-red-600"></div>
                        <div class="ml-2 text-sm font-medium text-gray-900 justify-end dark:text-gray-200 text-center">Nro. pedidos vencidos: {cantidadPedidosVencidos()} </div>
                    </div>
                </TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200">Monto total:            {itemsTotal()}</TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200">Total de pedidos en almacén: {cantidadPedidosAlmacen()}</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell class="dark:bg-gray-900 bg-gray-200"></TableBodyCell>
                <TableBodyCell class="dark:bg-gray-900 bg-gray-200"></TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200"></TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200">
                    <div class="flex items-center text-center">
                        <div class="flex-shrink-0 h-3 w-3 ml-0 rounded-full bg-green-500"></div>
                        <div class="ml-2 text-sm font-medium text-gray-900 justify-end dark:text-gray-200 text-center">Nro. pedidos al dia: 2</div>
                    </div>
                </TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200">Monto total vencido: {montoVencido()}</TableBodyCell>
                <TableBodyCell class=" dark:bg-gray-900 bg-gray-200">Total de pedidos a clientes: {cantidadPedidosCliente()}</TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Mostrando
                    <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                    de
                    <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
        <ul class="inline-flex items-stretch -space-x-px">
            <li>
                <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Anterior</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </a>
            </li>
            <li>
                <a href="#" aria-current="page" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#"  class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Siguiente</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
</div>


<section class="bg-white dark:bg-gray-900 rounded-lg mt-16 h-full">
    <h1 class="text-4xl mb-3 items-center w-full justify-center text-center dark:text-gray-200"><i class="bx bx-current-location text-blue-600 mr-4"></i>Seguimiento de paquetes</h1>
    <div class="w-3/4 items-center justify-center p-3 ml-[200px]">
        <div class="w-full mt-0 items-center justify-center">
            <div class="w-full">
                <form class="flex items-center">
                    <label for="simple-searc" class="sr-only">Buscar paquete</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        </div>
                        <input type="text" id="simple-searc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar paquete" required="">
                    </div>
                    <Button class="m-3">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </Button>
                </form>
            </div>
        </div>
    </div>
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center w-full lg:col-span-7 dark:text-gray-200">
            <h1 class="text-2xl ml-6">
                <strong>Información del paquete: </strong>
            </h1>
            <div class="bg-gray-900 rounded-lg mr-8 p-3" style="columns: 2; column-gap: 2em;">
                <p class="text-lg ml-6 "><strong class="dark:text-gray-400"><i class="bx bx-package mr-2 text-blue-600"></i>Paquete: </strong> 123456789</p>
                <p class="text-lg ml-6 "><strong class="dark:text-gray-400"><i class="bx bx-map mr-2 text-blue-600"></i>Delegación: </strong> Posadas</p>
                <p class="text-lg ml-6 "><strong class="dark:text-gray-400"><i class="bx bxs-truck mr-2 text-blue-600"></i>Camión: </strong> XYZ-123</p>
                <p class="text-lg ml-6 "><strong class="dark:text-gray-400"><i class="bx bx-arrow-to-bottom mr-2 text-blue-600"></i>Origen: </strong> Corrientes</p>
                <p class="text-lg ml-6"><strong class="dark:text-gray-400"><i class="bx bx-arrow-to-top mr-2 text-blue-600"></i>Destino: </strong> Apóstoles</p>
            </div>

            <div class="ml-7">
                <h1 class="text-2xl mb-3">
                    <strong>Historial: </strong>
                </h1>

                <ol class="relative border-l border-gray-200 dark:border-gray-700">
                    <li class="mb-10 ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </span>
                        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">11-abr-2023</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Posadas</time>
                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Ingreso al centro de distribución.</p>
                    </li>
                    <li class="mb-10 ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </span>
                        <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">10-abr-2023</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Corrientes</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Salida del centro de procesamiento.</p>
                    </li>
                    <li class="ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </span>
                        <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">08-abr-2023</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Corrientes</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Ingreso al centro de operaciones.</p>
                    </li>
                </ol>

            </div>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img class="rounded-lg h-[500px]" src="https://developers.google.com/static/maps/documentation/transportation-logistics/last-mile-fleet-solution/images/fleet_tracking_example.png" alt="mockup">

        </div>
    </div>
</section>

