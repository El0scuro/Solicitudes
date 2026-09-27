import axios from 'axios';
import { generarLlaves } from './generar-llaves-transporte';

const backendUrl = process.env.BACKEND_INTERNAL_URL;

//const INTERVALO = 30 * 24 * 60 * 60 * 1000;
const INTERVALO = 60 * 1000;

export async function iniciarSchedulerLlaves() {

    console.log('Scheduler de llaves iniciado');

    // Ejecutar cada 24 horas
    setInterval(async() => {

        console.log('Ejecutando rotación de llaves...');

        const metadatos = await axios.get(`${backendUrl}/hibrido_front/vencimiento`);

        //guardo la fecha actual
        const hoyDate = new Date();
        const fechaActual = hoyDate.toISOString().split('T')[0];

        if(!metadatos.data){ 
            
            //guardo la fecha de vencimiento
            const diasExtra = 30;
            const vencimientoDate = new Date();
            vencimientoDate.setDate(hoyDate.getDate() + diasExtra);
            const fechaVencimiento = vencimientoDate.toISOString().split('T')[0];

            const version = generarLlaves();

            await axios.post(`${backendUrl}/hibrido_front/metadatos_front`,
                {
                    version,
                    fechaActual,
                    fechaVencimiento
                }
            );
        }

        if(fechaActual >= metadatos.data){
            const version = generarLlaves();

            //guardo la fecha de vencimiento
            const diasExtra = 30;
            const vencimientoDate = new Date();
            vencimientoDate.setDate(hoyDate.getDate() + diasExtra);
            const fechaVencimiento = vencimientoDate.toISOString().split('T')[0];

            await axios.post(`${backendUrl}/hibrido_front/metadatos_front`,
                {
                    version,
                    fechaActual,
                    fechaVencimiento
                }
            );
        }
        

    }, INTERVALO);
}