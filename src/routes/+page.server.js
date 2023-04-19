import { error, redirect } from '@sveltejs/kit';
import { serialNPJ, getImageURL } from '$lib/utils';

export const load = ({ locals }) => {

	if (!locals.user) {throw redirect(302, '/login');}




	const getProjects = async () => {
		try {
			const projects = serialNPJ(await locals.pb.collection('projects').getFullList(undefined));
			//use a foreach to add the image url to the project
			projects.forEach((project) => {
				project.image = getImageURL('projects', project.id, project.thumbnail);


			}
			);

			return projects;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const imgBlob = async (url) => {
		const response = await fetch(url);
		return await response.blob();
	}



	return {
		projects: getProjects()
	};
};
