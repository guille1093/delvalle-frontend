const { randomBytes } = await import('node:crypto');


export const serialNPJ = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = (name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

// function that tkes an url and returns the image blob
export const getImageBlob = async (url) => {
	const response = await fetch(url);
	return await response.blob();
}

//funcion que cambia el formato de una fecha de 1972-04-07 12:00:00.000Z a 07/04/1972
export const formatDate = (date) => {
	const dateArray = date.split('-');
	return `${dateArray[2].slice(0, 2)}/${dateArray[1]}/${dateArray[0]}`;
}

//funcion que cambia el formato de una fecha de 07/04/1972 a 1972-04-07 12:00:00.000Z
export const formatDateToDB = (date) => {
	const dateArray = date.split('/');
	return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]} 12:00:00`;
}

//funcion que cambia el formato de la fecha y hora de 2023-02-23 13:12:53.038Z a 23/02/2023 13:12 y resta 3 horas. tener en cuenta si el cambio se realiza en un horario donde haya que restar un dia
export const formatDateToGMT = (date) => {
	const dateArray = date.split(' ');
	const dateArray2 = dateArray[0].split('-');
	const dateArray3 = dateArray[1].split(':');
	dateArray3[0] = dateArray3[0] - 3;
	if (dateArray3[0] < 0) {
		dateArray3[0] = dateArray3[0] + 24;
		dateArray2[2] = dateArray2[2] - 1;
	}
	return `${dateArray2[2]}/${dateArray2[1]}/${dateArray2[0]} ${dateArray3[0]}:${dateArray3[1]}`;
}

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};
