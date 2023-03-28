import { serialNPJ } from '$lib/utils.js';
import { error, redirect } from '@sveltejs/kit';
import moment from 'moment';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getProjects = async () => {
		try {
			const projects = serialNPJ(await locals.pb.collection('projects').getFullList(undefined, {}));

			projects.forEach((project) => {
				project.fechasalida = moment(project.fechasalida).format('DD/MM/YYYY');
				project.fecharetorno = moment(project.fecharetorno).format('DD/MM/YYYY');
			});


			return projects;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		projects: getProjects()
	};
};

export const actions = {
	deleteProject: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('projects').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		redirect(303, `/projects`);
	}
};
