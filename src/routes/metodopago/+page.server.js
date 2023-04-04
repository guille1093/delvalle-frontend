import { serialNPJ } from '$lib/utils.js';
import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getmetodopagos = async () => {
		try {
			const metodopagos = serialNPJ(await locals.pb.collection('metodopago').getFullList(undefined, {}));
			//formateamos la fecha de creacion y actualizacion con el formato dd/mm/yyyy hh:mm:ss
			metodopagos.forEach((metodopago) => {
				metodopago.created = new Date(metodopago.created).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
				metodopago.updated = new Date(metodopago.updated).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
			});


			return metodopagos;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		metodopagos: getmetodopagos()
	};
};

export const actions = {
	deletemetodopago: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('metodopago').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		//throw redirect(303, `/metodopago`);
	}
};
