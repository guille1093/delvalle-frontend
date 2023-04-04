import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z.string({ required_error: 'Email o nombre de usuario requeridos' }),
	password: z.string({ required_error: 'Contraseña requerida' })
});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'El nombre es obligatorio' })
			.regex(/^[a-zA-z\s]*$/, { message: 'El nombre solo puede contener letras y espacios' })
			.min(2, { message: 'El nombre debe poseer al menos 2 caracteres' })
			.max(64, { message: 'El nombre no debe tener mas de 64 caracteres' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Las contraseñas deben coincidir',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Las contraseñas deben coincidir',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif'
];

export const createProjectSchema = z.object({
	nombre: z
		.string({ required_error: 'Nombre del paquete requerido' })
		.min(1, { message: 'Nombre del paquete requerido' })
		.max(64, { message: 'Nombre del paquete no debe superar los 64 caracteres' })
		.trim(),
	precio: z
		.string({ required_error: 'Precio requerido' })
		.min(1, { message: 'Precio debe ser mayor o igual a 0' })
		.max(999999999, { message: 'Precio debe ser menor o igual a 999999999' }),
	cant_dias: z
		.string({ required_error: 'Cantidad de días requerida' })
		.min(1, { message: 'Cantidad de días debe ser mayor o igual a 1' })
		.max(999999999, { message: 'Cantidad de días debe ser menor o igual a 999999999' }),
	cant_noches: z
		.string({ required_error: 'Cantidad de noches requerida' })
		.min(1, { message: 'Cantidad de noches debe ser mayor o igual a 0' })
		.max(999999999, { message: 'Cantidad de noches debe ser menor o igual a 999999999' }),
	descripcion: z
		.string({ required_error: 'Descripcion requerida' })
		.max(512, { message: 'La descripcion no debe superar los 512 caracteres' })
		.trim(),
	estado: z
		.string({ required_error: 'Estado requerido' })
		.min(1, { message: 'Estado requerido' }),
	fechasalida: z
		.string({ required_error: 'Fecha de salida requerida' })
		.min(1, { message: 'Fecha de salida requerida' }),
	fecharetorno: z
		.string({ required_error: 'Fecha de retorno requerida' })
		.min(1, { message: 'Fecha de retorno requerida' }),
	hotel: z
		.string({ required_error: 'Hotel requerido' })
		.min(1, { message: 'Hotel requerido' }),
	regimen: z
		.string({ required_error: 'Regimen requerido' })
		.min(1, { message: 'Regimen requerido' }),
	pais_destino: z
		.string({ required_error: 'Pais de destino requerido' })
		.min(1, { message: 'Pais de destino requerido' }),
	thumbnail: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Thumbnail must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		}),
});

export const updateProjectSchema = createProjectSchema;

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'El nombre es obligatorio' })
		.min(1, { message: 'El nombre es obligatorio' })
		.max(64, { message: 'El nombre no debe superar los 64 caracteres' })
		.trim(),
	apellido: z
		.string({ required_error: 'El apellido es obligatorio' })
		.min(1, { message: 'El apellido es obligatorio' })
		.max(64, { message: 'El apellido no debe superar los 64 caracteres' })
		.trim(),
	dni: z
		.string({ required_error: 'El DNI es obligatorio' })
		.min(1, { message: 'El DNI es obligatorio' })
		.max(9, { message: 'El DNI no debe superar los 9 caracteres' })
		.regex(/^[0-9]*$/, { message: 'El DNI debe ser un numero' }),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		})
});

//clientes con
