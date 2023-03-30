import {z} from 'zod';

const imageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'application/pdf'
];

//hotelModelo contiene nombre, pais, direccion, telefono, email, tarifa, estrellas, comprobante
const hotelModelo = z.object({
    nombre: z.string().min(1, {message: 'El nombre es obligatorio'}).max(64, {message: 'El nombre no puede tener mas de 64 caracteres'}),
    pais: z.string().min(1, {message: 'El pais es obligatorio'}).max(64, {message: 'El pais no puede tener mas de 64 caracteres'}),
    direccion: z.string().min(1, {message: 'La direccion es obligatoria'}).max(64, {message: 'La direccion no puede tener mas de 64 caracteres'}),
    telefono: z.string().min(1, {message: 'El telefono es obligatorio'}).max(64, {message: 'El telefono no puede tener mas de 64 caracteres'}),
    fechasalida: z.string().min(1, {message: 'La fecha de salida es obligatoria'}).max(64, {message: 'La fecha de salida no puede tener mas de 64 caracteres'}),
    fecharetorno: z.string().min(1, {message: 'La fecha de retorno es obligatoria'}).max(64, {message: 'La fecha de retorno no puede tener mas de 64 caracteres'}),
    email: z.string().max(64, {message: 'El email no puede tener mas de 64 caracteres'}).regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {message: 'El email no es valido'}),
    precio: z.string().min(1, {message: 'La tarifa es obligatoria'}).max(64, {message: 'La tarifa no puede tener mas de 64 caracteres'}),
    observaciones: z.string().max(512, {message: 'Las observaciones no pueden tener mas de 512 caracteres'}),
    thumbnail: z
        .instanceof(Blob)
        .optional()
        .superRefine((val, ctx) => {
            if (val) {
                if (val.size > 5242880) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'El archivo no debe superar los 5MB'
                    });
                }

                if (!imageTypes.includes(val.type)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Unsupported file type. Formatos soportados: jpeg, jpg, png, webp, svg, gif, pdf'
                    });
                }
            }
        }),
});

export const crearHotel = hotelModelo;
export const editarHotel = hotelModelo;
