import { serialNPJ } from '$lib/utils.js';
import { error, redirect } from '@sveltejs/kit';
import moment from 'moment';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getHotels = async () => {
		try {
			const hotels = serialNPJ(await locals.pb.collection('hotels').getFullList(undefined, {}));

			hotels.forEach((hotel) => {
				hotel.fechasalida = moment(hotel.fechasalida).format('DD/MM/YYYY');
				hotel.fecharetorno = moment(hotel.fecharetorno).format('DD/MM/YYYY');
			});


			return hotels;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		hotels: getHotels()
	};
};

export const actions = {
	deletehotel: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('hotels').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		redirect(303, `/hotels`);
	}
};
