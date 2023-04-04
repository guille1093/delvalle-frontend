import { error, redirect } from '@sveltejs/kit';
import {formatDatePicker, formatDateToDB, formatDateToInputMoment, serialNPJ, validateData} from '$lib/utils';
import { editarHotel } from '$lib/models/hotelModelo';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
	const gethotel = async (hotelId) => {
		try {
			const hotel = serialNPJ(await locals.pb.collection('hotels').getOne(hotelId));
			hotel.fechasalida = formatDatePicker(hotel.fechasalida);
			hotel.fecharetorno = formatDatePicker(hotel.fecharetorno);
			console.log('hotel: ', hotel);
			return hotel;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	const getNacionalidades = async () => {
		try {
			return serialNPJ(await locals.pb.collection('nacionalidades').getFullList());
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	return {
		hotel: gethotel(params.hotelId),
		nacionalidades: getNacionalidades()
	}
};

export const actions = {
	updatehotel: async ({ request, locals, params }) => {
		const body = await request.formData();
		body.set('fechasalida', formatDateToInputMoment(body.get('fechasalida')));
		body.set('fecharetorno', formatDateToInputMoment(body.get('fecharetorno')));
		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, editarHotel);
		const { thumbnail, ...rest } = formData;

		if (formData.fechasalida > formData.fecharetorno) {
			return {
				error: true,
				data: rest,
				errors: { fechasalida: ['La fecha de salida debe ser menor a la de retorno'] }
			};
		}

		if (errors) {
			return {
				error: true,
				data: rest,
				errors: errors.fieldErrors
			};
		}
		console.log('formData: ', formData)
		formData.fechasalida = formatDateToDB(formData.fechasalida);
		formData.fecharetorno = formatDateToDB(formData.fecharetorno);
		try {
			await locals.pb.collection('hotels').update(params.hotelId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/hotels`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('hotels').update(params.hotelId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
