import { error, redirect } from "@sveltejs/kit";
import { serialize } from "object-to-formdata";
import { nuevaVentaModelo } from "$lib/models/ventaModelo";
import { validateData } from "$lib/utils";


/**
 * 
 * @param {*} param0
 * @returns
 */
export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}


	const getClientes = async () => {
		try {
			return structuredClone(await locals.pb.collection('clientes').getFullList(undefined, {}));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	const getPaquetes = async () => {
		try {
			return structuredClone(await locals.pb.collection('projects').getFullList(undefined, {}));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	return {
		clientes: getClientes(),
		paquetes: getPaquetes()
	}

};

/**
 * @param {*} { request, locals }
 * @returns {{error: boolean, data: {}, errors: {}}|{error: boolean, data: {}, errors: {}}|{error: boolean, data: {}, errors: {}}}
 */
export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();
		const { formData, errors } = await validateData(body, nuevaVentaModelo);
		const { ...rest } = formData;

		console.log('formData: ', formData);
		if (errors) {
			return {
				error: true,
				data: rest,
				errors: errors.fieldErrors
			};
		}

		formData.fecha = new Date().toISOString();
		formData.usuario = locals.pb.authStore.user.id;
		formData.pagado = '0';

		try {
			await locals.pb.collection('ventas').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		console.log('Venta creada exitosamente');

		throw redirect(303, '/ventas');
	}
};
