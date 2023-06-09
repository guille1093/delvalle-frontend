import {z} from 'zod';

const ventaModelo = z.object({
    cliente: z.string({required_error: 'EL ID DEL CLIENTE ES OBLIGATORIO'}),
    paquete: z.string({required_error: 'EL ID DEL PRODUCTO ES OBLIGATORIO'}),
    usuario: z.string({required_error: 'EL ID DEL USUARIO ES OBLIGATORIO'}),
    fecha: z.string({required_error: 'LA FECHA ES OBLIGATORIA'}),
    pagado: z.string({required_error: 'EL PAGO ES OBLIGATORIO'}),
    observaciones: z.string(),
}
);

export const nuevaVentaModelo = ventaModelo;

