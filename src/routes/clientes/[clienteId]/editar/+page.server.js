import { error, invalid, redirect } from '@sveltejs/kit';
import { formatDate, serialNPJ, validateData } from "$lib/utils";
import { actualizarCliente } from '$lib/models/clienteModelo';
import { serialize } from 'object-to-formdata';
import {formatDateToDB} from "$lib/utils";

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
	const getCliente = async (clienteId) => {
		try {
			const cliente = serialNPJ(await locals.pb.collection('clientes').getOne(clienteId));
			//formateamos la fecha de nacimiento
			cliente.fechanacimiento = formatDate(cliente.fechanacimiento);
			return cliente;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		cliente: getCliente(params.clienteId)
	};
};

export const actions = {
	updateCliente: async ({ request, locals, params }) => {
		const body = await request.formData();
		const { formData, errors } = await validateData(body, actualizarCliente);
		const { thumbnail, ...rest } = formData;
		console.log('formData: ', formData);

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
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
