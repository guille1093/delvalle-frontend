import { serialNPJ } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";

/**
 * Obtiene la lista de clientes y paquetes
 * @param locals
 * @returns {{clientes: Promise<[]>, paquetes: Promise<[]>}}
 */

/**
 * Valida que el usuario este logueado y obtiene la venta por su id
 * @param locals
 * @param params
 * @returns {{venta: Promise<*>}}
 */

export const load = ({ locals, params }) => {

	//validamos que el usuario este logueado
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	/**
	 * Obtiene una venta por su id
	 * @param ventaId
	 * @returns {Promise<*>}
	 */
	const getventa = async (ventaId) => {
		try {
			const [ventaRaw, clientesRaw, paquetesRaw] = await Promise.all([
				locals.pb.collection('ventas').getOne(ventaId),
				locals.pb.collection('clientes').getFullList(undefined, {}),
				locals.pb.collection('projects').getFullList(undefined, {})
			]);

			const venta = serialNPJ(ventaRaw);
			const clientes = clientesRaw.reduce((map, cliente) => {
				map[cliente.id] = cliente;
				return map;
			}, {});
			const paquetes = paquetesRaw.reduce((map, paquete) => {
				map[paquete.id] = paquete;
				return map;
			}, {});

			const cliente = clientes[venta.cliente];
			const paquete = paquetes[venta.paquete];

			venta.cliente = {
				dni: cliente.dni,
				nombre: cliente.nombre,
				apellido: cliente.apellido
			};

			venta.paquete = {
				nombre: paquete.nombre,
				precio: paquete.precio,
				regimen: paquete.regimen,
				cant_dias: paquete.cant_dias,
				cant_noches: paquete.cant_noches,
				fechasalida: paquete.fechasalida,
				fecharetorno: paquete.fecharetorno,
			};

			return venta;

		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		venta: getventa(params.ventaId)
	};
};