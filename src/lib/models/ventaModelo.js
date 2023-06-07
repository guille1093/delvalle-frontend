import {z} from 'zod';

const ventaModelo = z.object({
    idcliente: z.string({required_error: 'EL ID DEL CLIENTE ES OBLIGATORIO'}),
    idpaquete: z.string({required_error: 'EL ID DEL PRODUCTO ES OBLIGATORIO'}),
    idusuario: z.string({required_error: 'EL ID DEL USUARIO ES OBLIGATORIO'}),
    fecha: z.string({required_error: 'LA FECHA ES OBLIGATORIA'}),
  pagado: z.string({required_error: 'EL PAGO ES OBLIGATORIO'}),
}
);

export const nuevaVentaModelo = ventaModelo;

