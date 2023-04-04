import { serialNPJ } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getmetodopago = async (metodopagoId) => {
		try {
			const metodopago = serialNPJ(await locals.pb.collection('metodopago').getOne(metodopagoId));
			return metodopago;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		metodopago: getmetodopago(params.metodopagoId)
	};
};
