<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { Icon, Pencil } from 'svelte-hero-icons';
    import { Input } from '$lib/components';
    import { getImageURL } from '$lib/utils';
    import {AccordionItem, Accordion, Button} from 'flowbite-svelte';
    import toast from "svelte-french-toast";

    export let data;
    export let form;
    let loading;

    $: loading = false;
    const showPreview = (event) => {
        const target = event.target;
        const files = target.files;

        if (files.length > 0) {
            const src = URL.createObjectURL(files[0]);
            const preview = document.getElementById('avatar-preview');
            preview.src = src;
        }
    };

    let formerrors
    const enhanceForm = () => {
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    if (result.data.error) {
                        formerrors = result.data.errors;
                        toast.error("Error al actualizar", { duration: 7000});
                        break;
                    }
                    await invalidateAll();
                    toast.success("Cambios guardados exitosamente");
                    formerrors = null;
                    break;
                case 'error':
                    console.log(result);
                    console.log(result.errors);
                    toast.error("Error al actualizar");
                    break;
                default:
                    await applyAction(result);
            }
        };
    };


</script>



<!-- Modal content -->
<div class="relative p-4 w-full max-w-8xl h-max">
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Ajustes de cuenta
            </h3>
        </div>
        <!-- Modal body -->
        <div class="flex flex-col w-full h-full">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <h3>
                    <span class="text-gray-500 dark:text-gray-400">Bienvenido {data.user.name} {data.user.apellido}</span>
                    <p class="text-sm font-thin text-gray-500 dark:text-gray-400">ID: {data.user.id}</p>
                    <p class="text-sm font-thin text-gray-500 dark:text-gray-400">DNI: {data.user.dni}</p>
                </h3>
                <div class="sm:col-span-2">
                    <Accordion
                            activeClasses="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
                            inactiveClasses="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                        <AccordionItem class="">
                            <span slot="header"><i class="bx bx-user-circle mr-2 text-blue-600"></i>Perfil</span>
                            <div class="mt-4">
                                <form
                                        action="?/updateProfile"
                                        method="POST"
                                        class="flex flex-col space-y-2 w-full sm:grid-cols-2"
                                        enctype="multipart/form-data"
                                        use:enhance={enhanceForm}
                                >
                                    <div class="form-control w-full max-w-lg">
                                        <label for="avatar" class="label font-medium pb-1">
                                            <span class="label-text dark:text-gray-200">Imagen de perfil</span>
                                        </label>
                                        <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
                                            <label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm bg-blue-600">
						<Icon src={Pencil} class="w-4 h-4" />
					</span>
                                            </label>
                                            <div class="w-32 rounded-full">
                                                <img
                                                        src={data.user?.avatar
						                            	? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							                            : `https://ui-avatars.com/api/?name=${data.user?.name}`}
                                                        alt="user avatar"
                                                        id="avatar-preview"
                                                />
                                            </div>
                                        </label>
                                        <input
                                                type="file"
                                                name="avatar"
                                                id="avatar"
                                                value=""
                                                accept="image/*"
                                                hidden
                                                on:change={showPreview}
                                                disabled={loading}
                                        />
                                        {#if formerrors?.avatar}
                                            {#each formerrors?.avatar as error}
                                                <label for="avatar" class="label py-0 pt-1">
                                                    <span class="label-text-alt text-error">
							                                {error}
						                            </span>
                                                </label>
                                            {/each}
                                        {/if}
                                    </div>
                                    <Input
                                            id="name"
                                            label="Nombre"
                                            value={form?.data?.name ?? data?.user?.name}
                                            disabled={loading}
                                            errors={formerrors?.name}
                                            placeholder="Nombre"
                                    />
                                    <Input
                                            id="apellido"
                                            label="Apellido"
                                            value={form?.data?.apellido ?? data?.user?.apellido}
                                            disabled={loading}
                                            errors={formerrors?.apellido}
                                            placeholder="Apellido"
                                    />
                                    <div class="w-full max-w-lg pt-3">
                                        <Button class="w-full max-w-lg" type="submit" disabled={loading}>
                                            Actualizar perfil
                                        </Button>
                                    </div>
                                </form>
                            </div>



                        </AccordionItem>
                        <AccordionItem>
                            <span slot="header"><i class="bx bx-at mr-2 text-blue-600"></i>Email</span>
                            <div>
                                <form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={enhanceForm}>
                                    <Input
                                            id="email"
                                            type="email"
                                            label="Actualice su email"
                                            required={true}
                                            value={form?.data?.email}
                                            disabled={loading}
                                            errors={formerrors?.email}
                                    />
                                    <Button type="submit" class="w-1/2" disabled={loading}>Actualizar email</Button
                                    >
                                </form>
                            </div>
                        </AccordionItem>
                        <AccordionItem>
                            <span slot="header"><i class="bx bx-lock mr-2 text-blue-600"></i>Contraseña</span>
                            <div>
                                <form action="?/updatePassword" method="POST" class="space-y-2">

                                    <Input
                                            id="oldPassword"
                                            label="Old Password"
                                            type="password"
                                            required
                                            errors={form?.errors?.oldPassword}
                                    />
                                    <Input
                                            id="password"
                                            label="New Password"
                                            type="password"
                                            required
                                            errors={form?.errors?.password}
                                    />
                                    <Input
                                            id="passwordConfirm"
                                            label="Confirm New Password"
                                            type="password"
                                            required
                                            errors={form?.errors?.passwordConfirm}
                                    />
                                    <Button type="submit" class="w-1/2" disabled={loading}>Actualizar contraseña</Button
                                    >
                                </form>
                            </div>
                        </AccordionItem>
                        <AccordionItem>
                            <span slot="header"><i class="bx bx-key mr-2 text-blue-600"></i>Nombre de usuario</span>
                            <form
                                    action="?/updateUsername"
                                    method="POST"
                                    class="space-y-2"
                                    use:enhance={enhanceForm}
                            >
                                <Input
                                        id="username"
                                        type="text"
                                        label="Actualice su nombre de usuario"
                                        required={true}
                                        value={form?.data?.username ?? data?.user?.username}
                                        errors={formerrors?.username}
                                        disabled={loading}
                                />
                                <Button type="submit" class="w-1/2" disabled={loading}
                                >Actualizar nombre usuario</Button
                                >
                            </form>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</div>

