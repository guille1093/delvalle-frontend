import { error, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import {formatDateToDB, formatDateToInputMoment, serialNPJ, validateData} from '$lib/utils';
import { crearCliente } from '$lib/models/clienteModelo.js';

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
		body.set('fechanacimiento', formatDateToInputMoment(body.get('fechanacimiento')));
		const { formData, errors } = await validateData(body, crearCliente);
		const {...rest } = formData;

		if (errors) {
			return {
				error: true,
				data: rest,
				errors: errors.fieldErrors
			};
		}

		let clientesRepetidos = [];
		try {
			clientesRepetidos = (
				await locals.pb.collection('clientes').getFullList(undefined, {
					filter: `dni = "${formData.dni}"`
				})
			).filter((cliente) => {
				return cliente.dni === formData.dni;
			});
		} catch (err) {
			clientesRepetidos = [];
		}

		if (clientesRepetidos.length > 0) {
			return {
				error: true,
				data: rest,
				errors: {
					dni: ['DNI en uso por otro cliente.']
				}
			};
		}
		formData.fechanacimiento = formatDateToDB(formData.fechanacimiento);
		console.log('Cliente a agregar: ', formData);
		try {
			await locals.pb.collection('clientes').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/clientes');
	}
};
