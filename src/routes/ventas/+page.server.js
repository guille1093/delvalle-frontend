import { serialNPJ } from '$lib/utils.js';
import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getventas = async () => {
		try {
			const [ventasRaw, clientesRaw, paquetesRaw] = await Promise.all([
				locals.pb.collection('ventas').getFullList(undefined, {}),
				locals.pb.collection('clientes').getFullList(undefined, {}),
				locals.pb.collection('projects').getFullList(undefined, {})
			]);

			const ventas = serialNPJ(ventasRaw);
			const clientes = clientesRaw.reduce((map, cliente) => {
				map[cliente.id] = cliente;
				return map;
			}, {});
			const paquetes = paquetesRaw.reduce((map, paquete) => {
				map[paquete.id] = paquete;
				return map;
			}, {});

			ventas.forEach((venta) => {
				const cliente = clientes[venta.cliente];
				const paquete = paquetes[venta.paquete];

				venta.cliente = {
					id: cliente.id,
					dni: cliente.dni,
					nombre: cliente.nombre,
					apellido: cliente.apellido
				};

				venta.paquete = {
					nombre: paquete.nombre,
					precio: paquete.precio,
					created: paquete.created,
					updated: paquete.updated,
					id: paquete.id,
					fechasalida: paquete.fechasalida,
					fecharegreso: paquete.fecharegreso,
					estado: paquete.estado,
					observaciones: paquete.observaciones,
					cant_dias: paquete.cant_dias,
					cant_noches: paquete.cant_noches,
					regimen: paquete.regimen,
				};

				venta.created = new Date(venta.created).toLocaleDateString('es-ES', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				});

				venta.updated = new Date(venta.updated).toLocaleDateString('es-ES', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				});
			});

			return ventas;

		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		ventas: getventas()
	};
};

export const actions = {
	deleteventa: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('venta').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		//throw redirect(303, `/venta`);
	}
};
