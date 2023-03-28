import { error, redirect } from '@sveltejs/kit';
import {formatDatePicker, formatDateToDB, formatDateToInputMoment, serialNPJ, validateData} from '$lib/utils';
import { updateProjectSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}
	const getProject = async (projectId) => {
		try {
			const project = serialNPJ(await locals.pb.collection('projects').getOne(projectId));
			project.fechasalida = formatDatePicker(project.fechasalida);
			project.fecharetorno = formatDatePicker(project.fecharetorno);
			return project;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	const getNacionalidades = async () => {
		try {
			return serialNPJ(await locals.pb.collection('nacionalidades').getFullList());
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	return {
		project: getProject(params.projectId),
		nacionalidades: getNacionalidades()
	}
};

export const actions = {
	updateProject: async ({ request, locals, params }) => {
		const body = await request.formData();
		body.set('fechasalida', formatDateToInputMoment(body.get('fechasalida')));
		body.set('fecharetorno', formatDateToInputMoment(body.get('fecharetorno')));
		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return {
				data: rest,
				errors: errors.fieldErrors
			};
		}

		formData.fechasalida = formatDateToDB(formData.fechasalida);
		formData.fecharetorno = formatDateToDB(formData.fecharetorno);
		try {
			await locals.pb.collection('projects').update(params.projectId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/projects`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('projects').update(params.projectId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
