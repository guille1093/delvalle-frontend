import {z} from 'zod';

const metodoPagoModelo = z.object({
    nombre: z.string({required_error:'El nombre es obligatorio'} ).min(1, {message: 'El nombre es obligatorio'}).max(64, {message: 'El nombre no puede tener mas de 64 caracteres'}),
    descuento: z.string().max(3, {message: 'El descuento no puede tener mas de 3 caracteres'}).superRefine((val, ctx) => { {
        if (val) {
            if (val < 0 || val > 100) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'El descuento debe ser un numero entre 0 y 100'
                });
            }
        }
    }
}),
    estado: z.string({required_error:'El estado es obligatorio'}).min(1, {message: 'El estado es obligatorio'}),
    observaciones: z.string().max(255, {message: 'Las observaciones no pueden tener mas de 255 caracteres'})
});


export const crearMetodoPago = metodoPagoModelo;
export const editarMetodoPago = metodoPagoModelo;
