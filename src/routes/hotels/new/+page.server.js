import { error, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { crearHotel } from '$lib/models/hotelModelo';
import {formatDateToDB, formatDateToInputMoment, serialNPJ, validateData} from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	const getNacionalidades = async () => {
		try {
			return serialNPJ(await locals.pb.collection('nacionalidades').getFullList());
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		nacionalidades: getNacionalidades()
	};
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();
		body.set('fechasalida', formatDateToInputMoment(body.get('fechasalida')));
		body.set('fecharetorno', formatDateToInputMoment(body.get('fecharetorno')));
		console.log('body: ', body);
		console.log(typeof body.get('precio'));
		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, crearHotel);
		const { thumbnail, ...rest } = formData;


		//funcion que compara que la fecha de salida sea menor a la de retorno
		if (formData.fechasalida > formData.fecharetorno) {
			return {
				error: true,
				data: rest,
				errors: { fechasalida: 'La fecha de salida debe ser menor a la de retorno' }
			};
		}

		if (errors) {
			return {
				error: true,
				data: rest,
				errors: errors.fieldErrors
			};
		}
		formData.fechasalida = formatDateToDB(formData.fechasalida);
		formData.fecharetorno = formatDateToDB(formData.fecharetorno);
		try {
			await locals.pb.collection('hotels').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/hotels');
	}
};
