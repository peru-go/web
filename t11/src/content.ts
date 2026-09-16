export const siteUrl = 'https://tactica11-futbol.phillyps-bravo-proni.chatgpt.site';
export const services = [
  { number: '01', title: 'Logística de delegaciones', text: 'Coordinamos el recorrido de tu equipo desde su llegada al Perú hasta el retorno a su país. Cada etapa se organiza alrededor de las necesidades del encuentro.', details: ['Llegada y salida de la delegación', 'Coordinación entre ciudades', 'Itinerario de la visita'] },
  { number: '02', title: 'Preparación del encuentro', text: 'Ordenamos las tareas previas y los detalles de la jornada. Acordamos contigo qué se necesita, quién lo coordina y en qué momento debe estar listo.', details: ['Planificación previa al partido', 'Organización de tiempos y responsables', 'Preparación de los detalles acordados'] },
  { number: '03', title: 'Coordinación de principio a fin', text: 'Damos continuidad a la operación durante la visita. El partido es el centro de la experiencia, pero la logística también empieza antes y continúa después.', details: ['Seguimiento del itinerario', 'Comunicación con la delegación', 'Coordinación del retorno'] },
];
export const faqs = [
  { question: '¿Qué hace una empresa de logística deportiva?', answer: 'Organiza y coordina lo que una delegación necesita alrededor de su actividad deportiva. En TÁCTICA 11 enfocamos ese trabajo en el fútbol: la llegada, el recorrido entre ciudades, la preparación del encuentro y el retorno, según el alcance acordado con cada equipo.' },
  { question: '¿Apoyan a equipos que llegan del extranjero?', answer: 'Sí. Apoyamos a Montevideo City Torque desde su llegada al Perú para su encuentro ante Cienciano en Cusco. La coordinación incluyó el recorrido Lima–Cusco–Lima y el retorno a su país.' },
  { question: '¿En qué ciudades tienen experiencia?', answer: 'Nuestra experiencia con Montevideo City Torque incluyó Lima y Cusco. Si tu equipo necesita otra ruta o sede, escríbenos para revisar el itinerario y confirmar qué podemos coordinar.' },
  { question: '¿Qué información necesitan para preparar una propuesta?', answer: 'La fecha del partido, la ciudad o cancha, la cantidad de integrantes, las fechas de llegada y retorno y el apoyo que necesita la delegación. Si todavía no tienes todo definido, podemos empezar con la información disponible.' },
  { question: '¿Todos los encuentros incluyen los mismos servicios?', answer: 'No. El alcance se define según el itinerario y las necesidades de cada equipo. Antes de comenzar, confirmamos contigo los servicios incluidos, los responsables y las condiciones de la coordinación.' },
  { question: '¿Con cuánto tiempo de anticipación debemos contactarlos?', answer: 'Lo ideal es conversar cuando conozcas la fecha y el destino del encuentro. Si la visita está próxima, comparte tu itinerario por WhatsApp para que podamos revisar la disponibilidad y las prioridades.' },
];
export interface GalleryPhoto { src: string; alt: string; caption: string; category: 'Llegada' | 'Delegación' | 'Encuentro' | 'Retorno'; }
// Añadir únicamente fotografías reales autorizadas de la experiencia indicada.
export const galleryPhotos: GalleryPhoto[] = [];
