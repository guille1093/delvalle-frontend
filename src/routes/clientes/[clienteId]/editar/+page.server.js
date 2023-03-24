import { error, redirect } from '@sveltejs/kit';
import {
	formatDatePicker,
	formatDateToDB,
	serialNPJ,
	validateData,
	formatDateToInputMoment
} from '$lib/utils';
import { actualizarCliente } from '$lib/models/clienteModelo';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
	const getCliente = async (clienteId) => {
		try {
			const cliente = serialNPJ(await locals.pb.collection('clientes').getOne(clienteId));
			//formateamos la fecha de nacimiento
			cliente.fechanacimiento = formatDatePicker(cliente.fechanacimiento);
			return cliente;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const getNacionalidades = async () => {
		try {
			return serialNPJ(await locals.pb.collection('nacionalidades').getFullList());
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		cliente: getCliente(params.clienteId),
		nacionalidades: getNacionalidades()
	};
};

export const actions = {
	updateCliente: async ({ request, locals, params }) => {
		const body = await request.formData();
		body.set('fechanacimiento', formatDateToInputMoment(body.get('fechanacimiento')));
		const { formData, errors } = await validateData(body, actualizarCliente);
		const { thumbnail, ...rest } = formData;
		console.log('formData: ', formData);

		if (errors) {
			return {
				data: rest,
				errors: errors.fieldErrors
			};
		}
		formData.fechanacimiento = formatDateToDB(formData.fechanacimiento);
		formData.sexo = formData.sexo.toString();
		try {
			await locals.pb.collection('clientes').update(params.clienteId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/clientes/${params.clienteId}`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('clientes').update(params.clienteId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
