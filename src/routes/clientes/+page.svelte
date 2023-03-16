<script>
    import toast from "svelte-french-toast";
    import { enhance } from '$app/forms';
    export let data;
    import { Modal } from '$lib/components';
    import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button } from 'flowbite-svelte';

    let searchTerm = '';
    let modalOpen;
    let loading = false;

    const submitDeletecliente = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    toast.success('cliente eliminado con exito');
                    await update();
                    break;
                case 'error':
                    toast.error('No se pudo eliminar el cliente. Intente nuevamente');
                    break;
                default:
                    await update();
            }
            loading = false;
        };
    };

    // $: filteredItems = data.clientes.filter(
    //     (cliente) => cliente.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
    //         cliente.apellido.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
    //         cliente.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
    //         cliente.telefono.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
    //         cliente.dni.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    // );

   $: filteredItems = data.clientes.filter((cliente) => {
       const searchTerms = searchTerm.toLowerCase().split(' ');
       for (let i = 0; i < searchTerms.length; i++) {
           const term = searchTerms[i];
           if (
               cliente.nombre.toLowerCase().indexOf(term) !== -1 ||
               cliente.apellido.toLowerCase().indexOf(term) !== -1 ||
               cliente.email.toLowerCase().indexOf(term) !== -1 ||
               cliente.telefono.toLowerCase().indexOf(term) !== -1 ||
               cliente.dni.toLowerCase().indexOf(term) !== -1 ||
               cliente.fechanacimiento.toLowerCase().indexOf(term) !== -1 ||
               cliente.nacionalidad.toLowerCase().indexOf(term) !== -1 ||
               cliente.domicilio.toLowerCase().indexOf(term) !== -1

           ) {
               // si se encuentra un resultado, se establece el ID del cliente
               // y se devuelve verdadero para incluir el resultado en la lista de resultados
               if (!filteredItems || filteredItems.length === 0) {
                   filteredItems = [cliente];
               } else if (filteredItems[0].id === cliente.id) {
                   filteredItems.push(cliente);
               }
               return true;
           }
       }
       return false;
   });

    $: modalOpen = false;
</script>

<div class="w-full h-full dark:bg-gray-900">
    <Button href="/clientes/nuevo" class="ml-4">
        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
        Nuevo Cliente
    </Button>
<TableSearch placeholder="Buscar" hoverable={true} bind:inputValue={searchTerm}>
    <TableHead>
        <TableHeadCell><a class="bx bx-user mr-2"    >  </a>Nombre</TableHeadCell>
        <TableHeadCell><a class="bx bx-id-card mr-2" >  </a>DNI   </TableHeadCell>
        <TableHeadCell><a class="bx bx-flag mr-2"    >  </a>Nacionalidad</TableHeadCell>
        <TableHeadCell><a class="bx bx-phone mr-2"   >  </a>Telefono</TableHeadCell>
        <TableHeadCell><a class="bx bx-calendar mr-2"> </a>Nacimiento</TableHeadCell>
        <TableHeadCell><a class="bx bx-edit mr-2"    >  </a>Acciones</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each filteredItems as item}
            <TableBodyRow>
                <TableBodyCell>
                    <div class="text-base font-semibold"><a href="/clientes/{item.id}">{item.apellido + ' ' + item.nombre} </a></div>
                    <div class="font-normal text-gray-500"><a href="/clientes/{item.id}">{item.email}</a></div>
                </TableBodyCell>
                <TableBodyCell>{item.dni}</TableBodyCell>
                <TableBodyCell>{item.nacionalidad}</TableBodyCell>
                <TableBodyCell>{item.telefono}</TableBodyCell>
                <TableBodyCell>{item.fechanacimiento}</TableBodyCell>
                <TableBodyCell>
                    <a class="bx bx-edit text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/clientes/{item.id}/editar"> </a>
                    <Modal label={item.id} checked={modalOpen}>
                        <span slot="trigger" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 bx bx-trash ml-2"></span>
                        <div slot="heading">
                            <h3 class="text-2xl">Eliminar a {item.nombre}</h3>
                            <p class="text-base font-normal mt-2">
                                ¿Esta seguro que desea eliminar este cliente?<br> <strong>Esta accion no se puede deshacer.</strong>
                            </p>
                        </div>
                        <div slot="actions" class="flex w-full items-center justify-center space-x-2">
                            <label for={item.id} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cancelar</label>
                            <form action="?/deleteCliente" method="POST" use:enhance={submitDeletecliente}>
                                <input type="hidden" name="id" value={item.id} />
                                <Button class="mb-0" type="submit" color="red" disabled={loading}>Eliminar</Button>
                            </form>
                        </div>
                    </Modal>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</TableSearch>
</div>