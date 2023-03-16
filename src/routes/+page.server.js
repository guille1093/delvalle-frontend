import {error, redirect} from "@sveltejs/kit";
import { serialNPJ } from "$lib/utils";

export const load = ({ locals }) => {
	const getProjects = async () => {
		try {
			const projects = serialNPJ(
				await locals.pb.collection("projects").getFullList(undefined),
			);
			return projects;
		} catch (err) {
			console.log("Error:", err);
			throw error(err.status, err.message);
		}
	};

	//redirect to login if not logged in
	if (!locals.user) {
		throw redirect(302, "/login");
	}

	return {
		projects: getProjects(),
	};
};
