import { error, redirect } from '@sveltejs/kit';
import { serialNPJ, validateData} from '$lib/utils';
import { editarMetodoPago } from '$lib/models/metodoPagoModelo';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
	const getmetodopago = async (metodopagoId) => {
		try {
			const metodopago = serialNPJ(await locals.pb.collection('metodopago').getOne(metodopagoId));


			console.log('metodopago: ', metodopago);
			return metodopago;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}


	return {
		metodopago: getmetodopago(params.metodopagoId),
	}
};

export const actions = {
	updatemetodopago: async ({ request, locals, params }) => {
		const body = await request.formData();

		const { formData, errors } = await validateData(body, editarMetodoPago);
		const { ...rest } = formData;

		if (errors) {
			console.log('errors form: ', errors);
			console.log('rest: ', rest);
			return {
				data: rest,
				error: true,
				errors: errors.fieldErrors
			};
		}
		console.log('formData: ', formData)
		try {
			await locals.pb.collection('metodopago').update(params.metodopagoId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/metodopago`);
	},
};
