import { error, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { crearMetodoPago } from '$lib/models/metodoPagoModelo';
import { validateData } from '$lib/utils';


/**
 * 
 * @param {*} param0
 * @returns
 */
export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

/**
 * @param {*} { request, locals }
 * @returns
 */
export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();
		const { formData, errors } = await validateData(body, crearMetodoPago);
		const { ...rest } = formData;

		console.log('formData: ', formData);
		if (errors) {
			return {
				error: true,
				data: rest,
				errors: errors.fieldErrors
			};
		}

		try {
			await locals.pb.collection('metodopago').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		console.log('Metodo de pago creado');

		throw redirect(303, '/metodopago');
	}
};
