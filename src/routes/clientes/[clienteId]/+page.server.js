import { serialNPJ } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { formatDate} from "$lib/utils.js";
import { formatDateToGMT} from "$lib/utils";

export const load = ({ locals, params }) => {
  const getCliente = async (clienteId) => {
    try {
      const cliente = serialNPJ(await locals.pb.collection('clientes').getOne(clienteId));
      //formateamos la fecha de nacimiento
      cliente.fechanacimiento = formatDate(cliente.fechanacimiento);
      cliente.created = formatDateToGMT(cliente.created);
      cliente.updated = formatDateToGMT(cliente.updated);
      return cliente;
    } catch (err) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
  };

  return {
    cliente: getCliente(params.clienteId)
  };
};
