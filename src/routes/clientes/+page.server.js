import { serialNPJ } from '$lib/utils.js';
import { error, redirect } from '@sveltejs/kit';
import { formatDate } from '$lib/utils.js';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getClientes = async () => {
		try {
			const clientes = serialNPJ(await locals.pb.collection('clientes').getFullList(undefined, {}));

			//formatear la fecha de nacimiento
			clientes.forEach((cliente) => {
				cliente.fechanacimiento = formatDate(cliente.fechanacimiento);
			});

			return clientes;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		clientes: getClientes()
	};
};

export const actions = {
	deleteCliente: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('clientes').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		redirect(303, '/clientes');
	}
};
