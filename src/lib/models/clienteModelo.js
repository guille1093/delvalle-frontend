import { z } from 'zod';

const clienteModelo = z.object({
	dni: z
		.string({ required_error: 'EL DNI ES OBLIGATORIO' })
		.min(7, { message: 'DNI INVALIDO' }).max(8, { message: 'DNI INVALIDO' }),
	nombre: z
		.string({ required_error: 'EL NOMBRE ES OBLIGATORIO' })
		.regex(/^[a-zA-Z\s]*$/, { message: 'EL NOMBRE SOLO PUEDE CONTENER LETRAS' })
		.min(2, { message: 'EL NOMBRE ES OBLIGATORIO' })
		.max(64, { message: 'EL NOMBRE NO PUEDE TENER MAS DE 64 CARACTERES' }),
	apellido: z
		.string({ required_error: 'EL APELLIDO ES OBLIGATORIO' })
		.regex(/^[a-zA-Z\s]*$/, { message: 'EL APELLIDO SOLO PUEDE CONTENER LETRAS' })
		.min(1, { message: 'EL APELLIDO ES OBLIGATORIO' })
		.max(64, { message: 'EL APELLIDO NO PUEDE TENER MAS DE 64 CARACTERES' }),
	fechanacimiento: z
		.string()
		.regex(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, {
			message: 'LA FECHA DEBE TENER EL FORMATO DD/MM/YYYY'
		})
		.min(10, { message: 'LA FECHA DEBE TENER EL FORMATO DD/MM/YYYY' })
		.max(10, { message: 'LA FECHA DEBE TENER EL FORMATO DD/MM/YYYY' }),
	nombremadre: z
		.string()
		.regex(/^[a-zA-Z\s]*$/, { message: 'EL NOMBRE DE LA MADRE SOLO PUEDE CONTENER LETRAS' })
		.max(64, { message: 'EL NOMBRE DE LA MADRE NO PUEDE TENER MAS DE 64 CARACTERES' }),
	apellidomadre: z
		.string()
		.regex(/^[a-zA-Z\s]*$/, { message: 'EL APELLIDO DE LA MADRE SOLO PUEDE CONTENER LETRAS' })
		.max(64, { message: 'EL APELLIDO DE LA MADRE NO PUEDE TENER MAS DE 64 CARACTERES' }),
	domicilio: z
		.string()
		.regex(/^[a-zA-Z0-9\s]*$/, { message: 'EL DOMICILIO SOLO PUEDE CONTENER LETRAS Y NUMEROS' })
		.max(64, { message: 'EL DOMICILIO NO PUEDE TENER MAS DE 64 CARACTERES' }),
	telefono: z
		.string()
		.max(16, { message: 'EL TELEFONO NO PUEDE TENER MAS DE 16 DIGITOS' }),
	email: z
		.string(),
	ocupacion: z
		.string()
		.max(64, { message: 'LA OCUPACION NO PUEDE TENER MAS DE 64 CARACTERES' }),
	nacionalidad: z
		.string({ required_error: 'LA NACIONALIDAD ES OBLIGATORIA' })
		.min(1, { message: 'LA NACIONALIDAD ES OBLIGATORIA' })
		.max(64, { message: 'LA NACIONALIDAD NO PUEDE TENER MAS DE 64 CARACTERES' }),
	sexo: z
		.string({ required_error: 'EL SEXO ES OBLIGATORIO' })
		.regex(/^[a-zA-Z\s]*$/, { message: 'EL SEXO SOLO PUEDE CONTENER LETRAS' })
		.min(1, { message: 'EL SEXO ES OBLIGATORIO' })
		.max(64, { message: 'EL SEXO NO PUEDE TENER MAS DE 64 CARACTERES' }),
	observaciones: z
		.string()
		.max(500, { message: 'LAS OBSERVACIONES NO PUEDEN TENER MAS DE 300 CARACTERES' }),
	lugarascenso: z
		.string()
		.max(64, { message: 'EL LUGAR DE ASECENSO NO PUEDE TENER MAS DE 64 CARACTERES' })
});

export const actualizarCliente = clienteModelo;
export const crearCliente = clienteModelo
