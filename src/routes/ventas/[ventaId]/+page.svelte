<script>
	
	import { Button,} from "flowbite-svelte";
	export let data;
	const created = new Date(data.venta.created).toLocaleString('es-AR');
	const updated = new Date(data.venta.updated).toLocaleString('es-AR');

	const createdMes = new Date(data.venta.created).toLocaleString('es-AR', { month: 'long' });
	const createdDia = new Date(data.venta.created).toLocaleString('es-AR', { day: 'numeric' });
	const createdAnio = new Date(data.venta.created).toLocaleString('es-AR', { year: 'numeric' });
  const precio = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(data.venta.paquete.precio);
	const precio_total = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(data.venta.paquete.precio * data.venta.cant_personas);
  const fechasalida = new Date(data.venta.paquete.fechasalida).toLocaleString('es-AR', { day: 'numeric' , month: 'long', year: 'numeric' });
	const fecharetorno = new Date(data.venta.paquete.fecharetorno).toLocaleString('es-AR', { day: 'numeric' , month: 'long', year: 'numeric' });


	const items = [
		{
			name: 'Nombre',
			icon: 'bx-user',
			value: data.venta.cliente.nombre
		},
			{
			name: 'Descuento',
			icon: 'bx-dollar',
			value: precio
		},
{
			name: 'Estado',
			icon: 'bx-check-circle',
			value: data.venta.estado
		},
		{
			name: 'Observaciones',
			icon: 'bx-comment-detail',
			value: data.venta.observaciones
		},
		{
			name: 'Creado',
			icon: 'bx-calendar',
			value: created
		},
		{
			name: 'Modificado',
			icon: 'bx-calendar-edit',
			value: updated
		}
	];
</script>

<!-- Section: Design Block -->




<!-- Section: Design Block -->

<div class="min-h-screen">
	<section class="bg-white dark:bg-gray-900 not-printable">
		<div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
			<section class="mb-32 rounded-lg text-gray-800 text-center md:text-left dark:bg-gray-800 dark:text-gray-200">
				<div class="block rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-200">
					<div class="flex flex-wrap w-full items-center">
						<div class="grow-0 shrink-0 w-full basis-auto w-full lg:w-8/12 xl:w-[800px]">
							<div class="px-6 py-12 md:px-12">
								<h2 class="text-3xl font-bold mb-6 pb-2"><i class="bx bx-venta text-blue-600 mr-2 "></i>{data.venta.paquete.nombre}</h2>
								<p class="text-gray-500 mb-6 pb-2">
									{data.venta.observaciones}
								</p>
								<ul class="space-y-5 my-7">
									{#each items as item}
										<li class="flex space-x-3">
											<!-- Icon -->
											<i class="bx text-blue-600 {item.icon}" ></i>
											<span
												class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
											><strong>{item.name}:</strong> {item.value}</span
											>
										</li>
									{/each}
								</ul>
								<Button
									href="{data.venta.id}/edit"
								>
									Editar
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

	</section>

	<!-- Section: Design Block -->

	<section class="page">
		<div class="max-w-5xl mx-auto py-8 bg-white ">
			<article class="overflow-hidden">
				<div class="bg-[white] rounded-b-md">
					<div class="px-9 flex flex-col">
						<div class="text-slate-700 top-0">
							<div class="flex flex-row justify-between">
								<div>
									<img 	src="/images/image1.png" class="h-24 mr-3 justify-end" alt="Del Valle Logo" />
									<span class="text-xl font-extrabold tracking-tight uppercase font-body">
							Del Valle Turismo.
						</span>
									<p class="text-sm">
										Empresa de viajes y turismo.
									</p>
									<p class="mt-2">
										<i class="bx bx-id-card text-slate-700"></i> <strong> Legajo número: </strong> 18376
									</p>
									<p class="">
										<i class="bx bx-map text-slate-700"></i>
										<strong> Dirección: </strong>
										La Rioja 2203 - Posadas (3360) - Misiones.
									</p>
									<p class="">
										<i class="bx bx-phone-call text-slate-700"></i> <strong> Teléfonos: </strong> +54 (3764) 222333 / +54 (3764) 424450
									</p>
								</div>

								<div class="justify-end">
									<p class="uppercase"><strong>CONTRATO NRO. </strong>{data.venta.id} </p>
								</div>

							</div>


						</div>
					</div>

					<div class="flex flex-row justify-center px-9 py-9">
						<h1 class="underline text-3xl font-bold">CONTRATO DE EXCURSIÓN</h1>
					</div>

					<p class="px-9 tracking-widest text-justify">
						En la ciudad de <strong class="uppercase tracking-tight">Posadas, Provincia de Misiones,</strong> a los <strong class="uppercase tracking-tight">{createdDia}</strong>
						días del mes de <strong class="uppercase tracking-tight">{createdMes}</strong> del año <strong class="uppercase tracking-tight">{createdAnio}</strong>,
						entre la empresa de viajes y turismo <strong class="">DEL VALLE TURISMO</strong>, con domicilio en la calle
						<strong class="uppercase tracking-tight">La Rioja 2203</strong> de la ciudad de <strong class="uppercase tracking-tight">Posadas, Provincia de Misiones,</strong>
						y la parte contratante el Sr/a <strong class="uppercase tracking-tight"> {data.venta.cliente.nombre} {data.venta.cliente.apellido} </strong>,
						con DNI N° <strong class="uppercase tracking-tight"> {data.venta.cliente.dni} </strong>. <br/> Contrata una excursión para
						<strong class="uppercase tracking-tight"> {data.venta.cant_personas} </strong> persona/s <strong class="uppercase tracking-tight"> {data.venta.cant_personas} </strong>
						El precio es por persona en habitaciones dobles, triples o cuádruples, de <strong class="uppercase tracking-tight"> {precio} </strong>
						con el regimen de <strong class="uppercase tracking-tight">{data.venta.paquete.regimen} </strong>. <br/> Estando la salida prevista para el día
						<strong class="uppercase tracking-tight"> {fechasalida} </strong> y el regreso para el día <strong class="uppercase tracking-tight"> {fecharetorno} </strong>
						por <strong class="uppercase tracking-tight"> {data.venta.paquete.cant_noches} </strong> noches y <strong class="uppercase tracking-tight"> {data.venta.paquete.cant_dias} </strong> días.
						El precio total de la excursión es de <strong class="uppercase tracking-tight"> {precio_total} </strong>. <br/>

					</p>


					<div class="px-9 py-4">
						<div class="border-t border-slate-500">
							<div class="text-xs mt-2 font-light text-slate-700">
								<p class="text-justify">
									<strong class="uppercase font-bold">Incluye:</strong> Todos los servicios que estén expresamente detallados en el programa elegido.
									<br/>
									<strong class="uppercase font-bold">No Incluye:</strong> Extras en los hoteles, lavado, planchado, llamadas telefónicas, entradas a los parques y complejos turísticos, así como cualquier otro gasto de carácter personal. El organizador no se hace responsable por problemas de salud en general que padezca el viajero en el transcurso de la excursión, pudiendo este contratar, como servicio adicional, una asistencia de salud a su exclusivo cargo.
									<br/>
									<strong class="uppercase font-bold">Traslado:</strong> Desde La Empresa Turismo Valle Hermoso al destino elegido y viceversa, en ómnibus o minibús acondicionado para viajes especiales de larga distancia, provisto con Aire Acondicionado, TV, Video, butacas reclinables y/o semi cama, y coordinación permanente.
									<br/>
									<strong class="uppercase font-bold">Alojamiento:</strong> De acuerdo a la categoría del hotel según el programa elegido por el/los pasajeros.
									<br/>
									<strong class="uppercase font-bold">Responsabilidad:</strong> El pasajero cuenta con seguro de responsabilidad civil durante el viaje a cargo de la Empresa transportadora. El operador Turismo Valle Hermoso declina toda responsabilidad por cualquier daño o inconveniente que el/los pasajeros o sus pertenencias pudieran sufrir por huelgas, accidentes y sus consecuencias, enfermedades, robos o pérdidas o daños de equipajes u objetos personales, sean cuales fueren sus causas durante los días de la excursión contratada.
									<br/>
									<strong class="uppercase font-bold">Documentación:</strong> El operador Turismo Valle Hermoso declina toda responsabilidad en caso de ser rechazado por las autoridades Policiales, Migratorias y Aduaneras. Cualquier gasto que se origine correrá por cuenta del pasajero. En este caso, se aplicarán las condiciones establecidas para anulaciones o desistimiento voluntario sin derecho a ninguna indemnización.
									<br/>
									El pasajero deberá ir provisto de: DNI, Cédula de la Policía Federal o Pasaporte, según corresponda. ARGENTINOS CON DOBLE CIUDADANÍA deberán tener pasaporte argentino válido. EXTRANJEROS RESIDENTES EN EL PAÍS deben presentar el pasaporte del país de origen, cédula de identidad y visado si fuese necesario.
									<br/>
									<strong class="uppercase font-bold">DERECHO DE PERMANENCIA:</strong> El operador Turismo Valle Hermoso se reserva el derecho de hacer abandonar el tour en cualquier circunstancia o lugar a toda aquella persona que, por su conducta o modo de obrar, cause malestar al grupo y ponga en peligro el normal desarrollo de la excursión. Esta persona no tendrá derecho alguno a exigir indemnización por los servicios no utilizados.
									<br/>
									<strong class="uppercase font-bold">Cantidad Mínima:</strong> El operador Turismo Valle Hermoso se reserva el derecho de cancelar algunas salidas establecidas cuando no se complete la cantidad mínima de (35) treinta y cinco personas en ómnibus o en minibús (17) pasajeros inscritos. En este caso, se les reintegrará la totalidad del dinero abonado hasta la fecha, sin ningún tipo de interés u otro tipo de ajuste. La empresa comunicará 5 (cinco) días antes de la salida la suspensión del viaje.
									<br/>
									<strong class="uppercase font-bold">Cancelaciones:</strong> Una vez confirmados los servicios, la cancelación de los mismos sufrirá una retención del 10% del total de la excursión si esta se produce con una anticipación de 20 días o más a la fecha de salida. Si la cancelación se realiza entre 20 días y 10 días antes, la retención será del 20%. En caso de cancelación con menos de 10 días de anticipación, la retención será del 50% del valor total de la excursión. Si se produce una cancelación en menos de 5 (cinco) días, la retención será del 100%. Como alternativa, se podrá ceder o transferir a otra persona, con la condición de que no esté inscrita, o la Empresa otorgará una nota de crédito para otra excursión futura.
									<br/>
									<strong class="uppercase font-bold">COSTO DE LA EXCURSIÓN:</strong> El precio está expresado en dólares estadounidenses y está sujeto a modificación según la cotización del día. El costo no sufrirá variación una vez abonada la totalidad de la excursión.
									<br/>
									<strong class="uppercase font-bold">DE CONOCIMIENTO DEL PASAJERO:</strong> El simple hecho de inscribirse para tomar parte en los viajes detallados en el presente folleto implica la total conformidad, aceptación y conocimiento de todas y cada una de las condiciones generales mencionadas anteriormente. La Empresa Turismo Valle Hermoso.
									<br/>
									<strong class="uppercase font-bold">observaciones:</strong> {data.venta.observaciones}
									<br/>
								</p>
							</div>
						</div>
					</div>
				</div>


				<div class="px-9 mt-20 flex col-span-2 justify-evenly bottom-0">
					<div class="h-px w-44 bg-gray-400 bottom-0"></div>
					<div class="h-px w-44 bg-gray-400 bottom-0"></div>
					<div class="bottom-0 right-0">
						<p class="text-xs text-gray-400"> Página 1/1 </p>
					</div>
				</div>


			</article>
		</div>

	</section>
<!--	nro pagina 1/1-->


</div>


<style>

	@media print {
		@page {
size: legal}
		.not-printable { display: none; }
		.printable { display: block; }
	}
</style>

