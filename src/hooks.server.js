import PocketBase from 'pocketbase';
import { serialNPJ } from '$lib/utils';

//Este hook se ejecuta antes de cada request y se encarga de autenticar al usuario
export const handle = async ({ event, resolve }) => {
	console.log('handle', event);

	// Conectamos con la base de datos
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');

	// Cargamos la cookie de autenticación
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// Si la cookie es válida, la refrescamos y guardamos el usuario en locals
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serialNPJ(event.locals.pb.authStore.model);
		}
		// Si no es válida, la borramos
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	// Ejecutamos el resto de hooks y la ruta solicitada
	const response = await resolve(event);

	// Guardamos la cookie de autenticación
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
