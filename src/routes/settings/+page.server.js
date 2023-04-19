import {error, redirect} from '@sveltejs/kit';
import {validateData} from "$lib/utils.js";
import {updateEmailSchema, updatePasswordSchema, updateProfileSchema, updateUsernameSchema} from "$lib/schemas.js";
import {serialize} from "object-to-formdata";

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	// } else {
	// 	throw redirect(303, '/my/settings/profile');
	// }
	}
};

export const actions = {

	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return {
				error: true,
				errors: errors.fieldErrors
			};
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
			locals.pb.authStore.clear();
		} catch {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	},


	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

		if (errors) {
			return {
				error: true,
				data: formData,
				errors: errors.fieldErrors
			};
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return {
				error: true,
				data: formData,
				errors: errors.fieldErrors
			};
		}

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${formData.username}"`);
		} catch (err) {
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: formData.username });
					locals.user.username = username;
					return {
						success: true
					};
				} catch (err) {
					console.log('Error: ', err);
					throw error(err.status, err.message);
				}
			}
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},


	updateProfile: async ({ request, locals }) => {
		const body = await request.formData();
		const userAvatar = body.get('avatar');

		if (userAvatar.size === 0) {
			body.delete('avatar');
		}

		const { formData, errors } = await validateData(body, updateProfileSchema);
		const { avatar, ...rest } = formData;

		if (errors) {
			return {
				error: true,
				data: rest,
				errors: errors.fieldErrors
			};
		}

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id, serialize(formData));
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Error al actualizar el perfil');
		}

		return {
			success: true
		};
	}
};
