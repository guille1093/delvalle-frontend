import { error, invalid, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { formatDateToDB, validateData } from "$lib/utils";
import {crearCliente} from "$lib/models/clienteModelo.js";


export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();
		const { formData, errors } = await validateData(body, crearCliente);
		const { thumbnail, ...rest } = formData;
		formData.fechanacimiento = formatDateToDB(formData.fechanacimiento);

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		let filterparams = 'dni=' + formData.dni;
		console.log('filterparams: ', filterparams);

		//check if there is another client with the same DNI
		let clientesRepetidos = [];
		try {
			//TODO: Hace funcionar el getFirstListItem con query params HARAGAN DEL ORTO
			clientesRepetidos  = (await locals.pb.collection('clientes')
				.getFullList(undefined, {}))
				.filter((cliente) => {
				return cliente.dni === formData.dni;
			});
			console.log('DNI repetidos: ', clientesRepetidos );
		} catch (err) {
			console.log('Error: ', err);
			clientesRepetidos  = [];
		}


		if (clientesRepetidos .length > 0) {
			return invalid(400, {
				data: rest,
				errors: {
					dni: 'DNI en uso por otro cliente.'
				}
			});
		}



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
