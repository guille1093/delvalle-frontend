import { serialNPJ } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const gethotel = async (hotelId) => {
		try {
			const hotel = serialNPJ(await locals.pb.collection('hotels').getOne(hotelId));
			return hotel;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		hotel: gethotel(params.hotelId)
	};
};
