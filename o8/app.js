/* ============================================================
   PERUGO.PE — Propuesta o8 · "Nada librado al azar"
   Bilingüe ES/EN. Sin librerías. Ningún dato sale de la página:
   el formulario solo arma un mensaje de WhatsApp.
   ============================================================ */

const WA = '51954708174';
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ------------------------------------------------------------
   RED DE SEGURIDAD — fotos que no cargan y navegadores antiguos
   ------------------------------------------------------------ */
(function net(){
  const PH = label => 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">' +
    '<rect width="1200" height="900" fill="#E4E0D8"/>' +
    '<rect x="40" y="40" width="1120" height="820" fill="none" stroke="#C6C0B4"/>' +
    '<text x="600" y="460" text-anchor="middle" font-family="Georgia,serif" font-size="46" fill="#8C877E">' +
    String(label || 'Perú').replace(/[<>&]/g, '') + '</text>' +
    '<text x="600" y="506" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#A8A299">' +
    'fotografía pendiente</text></svg>');
  const fix = im => { if (im.dataset.ph) return; im.dataset.ph = '1'; im.src = PH(im.alt); };
  const wire = () => $$('img').forEach(im => {
    if (im.dataset.ph || im.dataset.wired) return;
    im.dataset.wired = '1';
    if (im.complete && im.naturalWidth === 0) return fix(im);
    im.addEventListener('error', () => fix(im), { once:true });
  });
  wire();
  [300, 1200, 3000].forEach(t => setTimeout(wire, t));
  if (!('IntersectionObserver' in window)) {
    setTimeout(() => $$('.rev').forEach(el => el.classList.add('in')), 500);
  }
})();

/* ------------------------------------------------------------
   FOTOGRAFÍA (referencia — se reemplaza con material del cliente)
   ------------------------------------------------------------ */
const IMG = {
  machu:'https://www.muchbetteradventures.com/magazine/content/images/2023/10/machu-picchu-2.jpg',
  dunas:'https://backiee.com/static/wallpapers/1920x1080/267116.jpg',
  selva:'https://www.ytuqueplanes.com/imagenes/fotos/novedades/vista-aerea-tambopata.jpg'
};

/* ------------------------------------------------------------
   DICCIONARIO ES / EN
   ------------------------------------------------------------ */
const T = {
  es:{
    journeyLabel:'ENCUENTRA TU INSPIRACIÓN',
    value3:'Más cultura, una caminata más corta o unos días para desconectar. Diseñamos la ruta alrededor de ti.',
    value3H:'Tu ritmo. Tus intereses.',
    value2:'Guías locales, alojamientos definidos contigo y tiempos de traslado bien pensados. Sabes qué incluye tu propuesta antes de reservar.',
    value2H:'Calidad en cada elección.',
    value1:'Te esperamos con tu nombre en llegadas. Traslados privados y un contacto que conoce tu viaje desde el primer día.',
    value1H:'La tranquilidad de llegar.',
    valueIntro:'Tu inversión está en lo que hace la diferencia: tiempo para ti, atención personal y cada detalle coordinado.',
    valueH:'Un viaje extraordinario.<br>Un cuidado que se siente.',
    valueLabel:'LA DIFERENCIA PERUGO',
    openingLabel:'EL VIAJE ES TUYO. EL CUIDADO, NUESTRO.',
    markSub:'Viajes privados · Perú',
    navProtocolo:'Nuestro cuidado', navMetodo:'Cómo trabajamos', navViajes:'Experiencias', navVoces:'Viajeros',
    navCta:'Planifiquemos tu viaje',
    heroKicker:'VIAJES PRIVADOS · EXPERIENCIAS A TU MEDIDA',
    heroL1:'Perú se siente.', heroL2:'Vívelo a tu manera.',
    heroSub:'Entre los Andes, el océano y la Amazonía. Un viaje diseñado solo para ti.',
    heroCta:'Encuentra tu próxima experiencia',
    hf1:'5 años operando', hf2:'Un solo interlocutor, todo el viaje',
    hf3:'Traslados privados en cada tramo', hf4:'Español · English',
    lede:'Caminar entre montañas. Sentir el océano. Despertar con la selva. Tú eliges lo que te mueve; nosotros hacemos que el viaje fluya.',
    protoH:'El cuidado está en los detalles.',
    protoLede:'De tu llegada a tu vuelo de regreso: así cuidamos cada etapa de tu viaje.',
    protoNote:'Esto no es una promesa de marketing: es la forma en que trabajamos todos los viajes, sin excepción.',
    metH:'Cómo<br>trabajamos',
    metLede:'Sin cotizadores automáticos ni formularios eternos. Una conversación, una propuesta escrita y los ajustes que hagan falta hasta que el viaje sea tuyo.',
    metCta:'Empezar la conversación',
    viaH:'¿Dónde comienza tu próximo recuerdo?',
    viaLede:'Tres formas de inspirarte. Un viaje que haremos tuyo.',
    viaNote:'No publicamos precios. Cada viaje se cotiza según tus fechas, tu grupo y tu ritmo, y la propuesta te llega por escrito antes de que decidas nada.',
    vocH:'Lo dicen ellos,<br>no nosotros',
    quote:'En Perú todos me hablaban de un <em>punto de encuentro</em>. Yo lo que quería era que alguien me recogiera del aeropuerto, porque llegaba a un país que no conocía y necesitaba sentirme segura.',
    quoteWho:'Una viajera, antes de ser clienta',
    quoteNote:'Esta frase cambió cómo trabajamos. El protocolo de arriba nació de ella.',
    slot:'Reseña verificada', slotPend:'pendiente de cargar',
    vocNote:'Los tres espacios de arriba están reservados para reseñas reales de Google y TripAdvisor, con nombre y fecha. Preferimos dejarlos vacíos antes que llenarlos con testimonios inventados.',
    conH:'Cuéntanos<br>tu viaje',
    conLede:'Respondemos el mismo día con una primera propuesta de ruta. Sin compromiso y sin llamadas de venta.',
    conWa:'O escríbenos directo',
    cm1:'Jr. Jorge Chávez 1009 · Breña 15083 · Lima, Perú', cm2:'hola@perugo.pe',
    fNombre:'Tu nombre', fPais:'¿Desde dónde nos escribes?', fCuando:'¿Cuándo viajas?',
    fQuien:'¿Con quién?', fDias:'¿Cuántos días tienes?', fContacto:'WhatsApp o correo',
    fNotas:'¿Algo que debamos saber?', fSend:'Enviar por WhatsApp',
    fFine:'Revisa tu mensaje en WhatsApp antes de enviarlo. No guardamos tus datos en esta página.',
    phCuando:'Julio 2027 · o fechas flexibles', phContacto:'+1 555 000 0000',
    phNotas:'Llegamos de madrugada, mis padres caminan poco, queremos ir sin prisa…',
    q1:'Solo / sola', q2:'En pareja', q3:'En familia', q4:'Con amigos', q5:'Grupo grande',
    d1:'Menos de 5', d2:'5 a 8', d3:'9 a 14', d4:'Más de 14', d5:'Aún no lo sé',
    ftAbout:'Operador local de turismo receptivo. Diseñamos y coordinamos viajes por todo el Perú, de principio a fin.',
    ftNav:'Navegar', ftCont:'Contacto', ftIndex:'← Índice de propuestas', ftUp:'Arriba ↑',
    steps:[
      ['Antes de que subas al avión','Recibes el itinerario completo por escrito: horarios, traslados, hoteles, quien te recoge y a qué hora. Con lo que conviene saber sobre la altura de Cusco y qué llevar.','Nada se confirma de palabra.'],
      ['Tu vuelo despega','Seguimos el número de tu vuelo. Si se retrasa, el conductor espera. Si se adelanta, también.','Sin cargo por espera.'],
      ['Llegas a Lima o a Cusco','Alguien te espera en la puerta de llegadas con tu nombre. Vehículo privado identificado, nunca un taxi de la calle.','Nunca un punto de encuentro.'],
      ['Durante todo el viaje','Un solo número de WhatsApp y una sola persona: la misma que armó tu itinerario. No una central que rota.','Respondemos el mismo día.'],
      ['Si algo cambia','Tren cancelado, paro, clima. Te enteras por nosotros y con la alternativa ya resuelta, no con el problema encima.','Lo resolvemos nosotros, no tú.'],
      ['El día de la salida','El traslado al aeropuerto se coordina con tu vuelo real, no con una hora fija de tabla.','Hasta la puerta de embarque.']
    ],
    fases:[
      ['Conversamos','Nos cuentas tus fechas, cuántos días tienes, con quién viajas y qué te gustaría ver. En español o en inglés.'],
      ['Propuesta escrita','Te llega una ruta completa con los tiempos reales de traslado, para que ningún día se te vaya en la carretera.'],
      ['Ajustamos contigo','Un día más en Cusco, menos caminata, otro tipo de hotel. Cambias lo que quieras hasta que la ruta sea tuya.'],
      ['Confirmamos y viajas','Cerramos reservas y te entregamos el itinerario definitivo con todos los contactos y horarios.']
    ],
    viajes:[
      ['Perú Clásico','8 a 10 días','La emoción de ver Machu Picchu. El Valle Sagrado a tu ritmo. Cusco, con tiempo para perderte en sus historias.',
        [['Traslados privados','en cada tramo'],['Guías locales','Lima y Cusco'],['Vuelos internos','coordinados'],['Ritmo','sin días perdidos en carretera']], IMG.machu],
      ['Desierto y Océano','3 a 5 días','Navega junto a la vida del Pacífico. Recorre dunas al atardecer. Descubre Paracas y Huacachina.',
        [['Transporte privado','Lima – Paracas – Ica'],['Navegación','Islas Ballestas'],['Opcional','sobrevuelo de Nazca'],['Ideal para','sumar a Cusco']], IMG.dunas],
      ['Amazonía','4 a 5 días','Despierta con los sonidos de Tambopata. Navega el río y descubre la selva con un guía naturalista.',
        [['Lodge','pensión completa'],['Guía','naturalista'],['Traslados','fluviales y terrestres'],['Ideal para','cerrar el viaje sin prisa']], IMG.selva]
    ]
  },

  en:{
    journeyLabel:'FIND YOUR INSPIRATION',
    value3:'More culture, a shorter walk or a few days to unwind. We design the route around you.',
    value3H:'Your pace. Your interests.',
    value2:'Local guides, accommodation chosen with you and carefully planned transfers. Know what your proposal includes before booking.',
    value2H:'Quality in every choice.',
    value1:'We meet you at arrivals with your name. Private transfers and a contact who knows your journey from day one.',
    value1H:'Peace of mind on arrival.',
    valueIntro:'Your investment goes into what makes a difference: time for yourself, personal attention and every detail coordinated.',
    valueH:'An extraordinary journey.<br>Care you can feel.',
    valueLabel:'THE PERUGO DIFFERENCE',
    openingLabel:'YOUR JOURNEY. OUR CARE.',
    markSub:'Private journeys · Peru',
    navProtocolo:'Our care', navMetodo:'How we work', navViajes:'Experiences', navVoces:'Travellers',
    navCta:'Plan your journey',
    heroKicker:'PRIVATE JOURNEYS · TAILORED EXPERIENCES',
    heroL1:'Feel Peru.', heroL2:'Make it your own.',
    heroSub:'Between the Andes, the ocean and the Amazon. A journey designed just for you.',
    heroCta:'Find your next experience',
    hf1:'5 years operating', hf2:'One point of contact, the whole trip',
    hf3:'Private transfers on every leg', hf4:'Español · English',
    lede:'Walk among mountains. Feel the ocean. Wake up with the rainforest. Choose what moves you; we make your journey flow.',
    protoH:'Care is in the details.',
    protoLede:'From your arrival to your flight home: how we care for every stage of your journey.',
    protoNote:'This is not a marketing promise: it is how we run every single journey, without exception.',
    metH:'How<br>we work',
    metLede:'No instant quote engines, no endless forms. One conversation, a written proposal, and as many revisions as it takes until the journey is yours.',
    metCta:'Start the conversation',
    viaH:'Where does your next memory begin?',
    viaLede:'Three ways to find inspiration. A journey we will make yours.',
    viaNote:'We do not publish prices. Every journey is quoted around your dates, your group and your pace, and the proposal reaches you in writing before you decide anything.',
    vocH:'Their words,<br>not ours',
    quote:'Everyone in Peru kept talking to me about a <em>meeting point</em>. What I wanted was for someone to pick me up at the airport, because I was landing in a country I did not know and I needed to feel safe.',
    quoteWho:'A traveller, before she was a client',
    quoteNote:'That sentence changed how we work. The protocol above came out of it.',
    slot:'Verified review', slotPend:'to be added',
    vocNote:'The three spaces above are reserved for real Google and TripAdvisor reviews, with names and dates. We would rather leave them empty than fill them with invented testimonials.',
    conH:'Tell us about<br>your journey',
    conLede:'We answer the same day with a first route proposal. No commitment and no sales calls.',
    conWa:'Or message us directly',
    cm1:'Jr. Jorge Chávez 1009 · Breña 15083 · Lima, Peru', cm2:'hola@perugo.pe',
    fNombre:'Your name', fPais:'Where are you writing from?', fCuando:'When are you travelling?',
    fQuien:'Who is coming?', fDias:'How many days do you have?', fContacto:'WhatsApp or email',
    fNotas:'Anything we should know?', fSend:'Send via WhatsApp',
    fFine:'Review your message in WhatsApp before sending it. This page does not store your data.',
    phCuando:'July 2027 · or flexible dates', phContacto:'+1 555 000 0000',
    phNotas:'We land at dawn, my parents cannot walk much, we want to take it slowly…',
    q1:'Solo', q2:'As a couple', q3:'With family', q4:'With friends', q5:'Large group',
    d1:'Fewer than 5', d2:'5 to 8', d3:'9 to 14', d4:'More than 14', d5:'Not sure yet',
    ftAbout:'Local inbound travel operator. We design and run journeys across Peru, from start to finish.',
    ftNav:'Navigate', ftCont:'Contact', ftIndex:'← Back to proposals', ftUp:'Top ↑',
    steps:[
      ['Before you board','You receive the full itinerary in writing: times, transfers, hotels, who is picking you up and when. Plus what to know about Cusco’s altitude and what to pack.','Nothing is confirmed verbally.'],
      ['Your flight takes off','We track your flight number. If it is delayed, the driver waits. If it lands early, so do we.','No waiting charges.'],
      ['You land in Lima or Cusco','Someone is waiting at the arrivals gate with your name. A marked private vehicle, never a street taxi.','Never a meeting point.'],
      ['Throughout the journey','One WhatsApp number and one person: the same one who built your itinerary. Not a rotating call centre.','We answer the same day.'],
      ['If something changes','Cancelled train, strike, weather. You hear it from us, with the alternative already solved, not with the problem in your lap.','We fix it, not you.'],
      ['On departure day','The airport transfer is set around your actual flight, not a fixed time on a spreadsheet.','All the way to the gate.']
    ],
    fases:[
      ['We talk','You tell us your dates, how many days you have, who is travelling and what you would like to see. In Spanish or English.'],
      ['A written proposal','You get a complete route with real transfer times, so no day of yours disappears on the road.'],
      ['We adjust with you','One more day in Cusco, less walking, a different kind of hotel. Change whatever you want until the route is yours.'],
      ['We confirm and you travel','We close the bookings and hand you the final itinerary with every contact and time on it.']
    ],
    viajes:[
      ['Classic Peru','8 to 10 days','The wonder of Machu Picchu. The Sacred Valley at your pace. Time to discover the stories of Cusco.',
        [['Private transfers','on every leg'],['Local guides','Lima and Cusco'],['Domestic flights','coordinated'],['Pace','no days lost on the road']], IMG.machu],
      ['Desert & Ocean','3 to 5 days','Sail among Pacific wildlife. Explore dunes at sunset. Discover Paracas and Huacachina.',
        [['Private transport','Lima – Paracas – Ica'],['Boat trip','Ballestas Islands'],['Optional','Nazca flyover'],['Best as','an add-on to Cusco']], IMG.dunas],
      ['The Amazon','4 to 5 days','Wake up to the sounds of Tambopata. Follow the river and discover the rainforest with a naturalist guide.',
        [['Lodge','full board'],['Guide','naturalist'],['Transfers','river and road'],['Best as','an unhurried finish']], IMG.selva]
    ]
  }
};

/* ------------------------------------------------------------
   RENDER + IDIOMA
   ------------------------------------------------------------ */

Object.assign(T.es, {"navLima": "Vive Lima", "navViajes": "Explora Perú", "limaLabel": "LIMA, MUCHO MÁS QUE EL COMIENZO", "limaH": "Una ciudad.<br>Mil maneras de sentirla.", "limaIntro": "Historia que se camina. Sabores que sorprenden. El Pacífico, desde otra perspectiva. ¿Qué Lima quieres vivir?", "fraileLocation": "CHORRILLOS · FRENTE AL PACÍFICO", "fraileLabel": "HAY LUGARES. Y HAY LEYENDAS.", "fraileH": "El mar guarda<br>una historia.", "fraileText": "En los acantilados de Chorrillos, la leyenda del Salto del Fraile habla de un amor separado y una despedida frente al océano. Ven a descubrir el lugar donde Lima se vuelve relato.", "fraileCaption": "Salto del Fraile<br>Una leyenda junto al Pacífico.", "fraileCta": "Incluyámoslo en tu viaje", "limaClosing": "Una mañana de historia. Una tarde sobre el mar. Una mesa que recordarás. Combinamos las experiencias a tu ritmo.", "limaCta": "Diseñemos mi día en Lima", "limaCards": [["colonial", "HISTORIA · CENTRO HISTÓRICO", "Camina entre siglos.", "Lima colonial", "Plaza Mayor, balcones y calles con historias. Descubre el corazón de Lima con un guía local.", "Plaza Mayor y arquitectura colonial de Lima"], ["parapente", "AVENTURA · COSTA VERDE", "Lima, desde el cielo.", "Parapente sobre el Pacífico", "Siente la libertad de volar junto a los acantilados y mirar la ciudad desde otra perspectiva.", "Parapentes sobre los acantilados de la Costa Verde", "Vuelo sujeto a clima y evaluación del operador."], ["religiosa", "FE · ARTE · TRADICIÓN", "Historias que trascienden.", "Lima religiosa", "San Francisco, Santo Domingo y el legado de los santos limeños. Un encuentro con la fe y el arte.", "Interior de una iglesia histórica de Lima"], ["gastronomia", "SABORES · GASTRONOMÍA PERUANA", "Perú también se saborea.", "Lima a la mesa", "Ceviche, cocina criolla y sabores que cuentan de dónde venimos. Armemos una ruta para tu paladar.", "Ceviche peruano acompañado de pisco sour"]], "limaCardCta": "Quiero vivirlo", "heroSub": "Historia, sabores y aventura en Lima. Andes y Amazonía más allá. Un Perú diseñado para ti."});
Object.assign(T.en, {"navLima": "Discover Lima", "navViajes": "Explore Peru", "limaLabel": "LIMA IS MORE THAN A STARTING POINT", "limaH": "One city.<br>A thousand ways to feel it.", "limaIntro": "History to walk through. Flavours to discover. A new perspective on the Pacific. Which Lima will you experience?", "fraileLocation": "CHORRILLOS · BY THE PACIFIC", "fraileLabel": "SOME PLACES HOLD LEGENDS.", "fraileH": "The sea holds<br>a story.", "fraileText": "On the cliffs of Chorrillos, the legend of Salto del Fraile tells of lovers separated and a farewell by the ocean. Discover a place where Lima becomes a story.", "fraileCaption": "Salto del Fraile<br>A legend by the Pacific.", "fraileCta": "Make it part of my journey", "limaClosing": "A morning of history. An afternoon above the sea. A meal to remember. We combine experiences around your pace.", "limaCta": "Design my day in Lima", "limaCards": [["colonial", "HISTORY · HISTORIC CENTRE", "Walk through centuries.", "Colonial Lima", "Plaza Mayor, balconies and storied streets. Discover the heart of Lima with a local guide.", "Plaza Mayor and colonial architecture in Lima"], ["parapente", "ADVENTURE · COSTA VERDE", "Lima, from the sky.", "Paragliding over the Pacific", "Feel the freedom of flying beside the cliffs and discover the city from a new perspective.", "Paragliders above the cliffs of Costa Verde", "Flight subject to weather and operator assessment."], ["religiosa", "FAITH · ART · TRADITION", "Stories that transcend.", "Sacred Lima", "San Francisco, Santo Domingo and the legacy of Lima’s saints. An encounter with faith and art.", "Interior of a historic church in Lima"], ["gastronomia", "FLAVOURS · PERUVIAN CUISINE", "Taste your way into Peru.", "Lima at the table", "Ceviche, Creole cooking and flavours that tell our stories. Let us design a route for your palate.", "Peruvian ceviche with a pisco sour"]], "limaCardCta": "Make it part of my trip", "heroSub": "History, flavour and adventure in Lima. The Andes and Amazon beyond. A Peru designed around you."});


Object.assign(T.es,{"discoverLabel": "ELIGE LO QUE TE HACE FELIZ", "discoverH": "Un Perú para cada<br>forma de disfrutar.", "discoverIntro": "Playas, cataratas, montañas y sabores. ¿Dónde te imaginas?", "galleryNote": "Imágenes de referencia. Pronto, recuerdos de nuestros viajeros.", "galleryCta": "Quiero ser parte del viaje", "cardPick": "Lo quiero en mi viaje", "filters": ["Todo", "Mar", "Montaña", "Selva", "Lima"], "careLabel": "TÚ DISFRUTA. NOSOTROS ESTAMOS.", "careH": "Desde tu llegada,<br>estamos contigo.", "careIntro": "Te esperamos en el aeropuerto. Cuidamos los detalles. Tú vives el viaje.", "careTabs": ["Te esperamos", "Tu viaje, cuidado", "Siempre contigo"], "careDetails": [["Tu primera experiencia: sentirte esperado.", "Te buscamos en llegadas con tu nombre y coordinamos tu traslado privado.", "RECOJO EN EL AEROPUERTO", "PERUGO te espera"], ["Cada elección se hace contigo.", "Traslados privados y ruta acordada antes de viajar. Coordinamos las actividades con el operador y evaluamos clima, accesos y caminatas antes de salir.", "TU ITINERARIO", "A tu medida"], ["Disfruta. Tienes a quién llamar.", "Un contacto conoce tu viaje y coordina contigo las alternativas cuando cambian los planes.", "ATENCIÓN PERSONAL", "Durante todo el viaje"]], "methodLabel": "ASÍ LO HACEMOS", "methodH": "De imaginarlo<br>a estar viviéndolo.", "methodCta": "Empecemos a diseñar tu viaje", "methodSteps": [["Te escuchamos", "Qué te mueve. Con quién viajas."], ["Lo diseñamos", "Tu ruta, tus gustos, tu ritmo."], ["Te esperamos", "En llegadas, con tu nombre."], ["Te acompañamos", "Un contacto durante todo el viaje."]], "contactLabel": "TU PRÓXIMA HISTORIA", "contactH": "¿Qué te gustaría<br>vivir en Perú?", "contactIntro": "Una idea basta para empezar. El resto lo diseñamos contigo.", "contactDirect": "Hablemos por WhatsApp", "formH": "Diseñemos tu viaje.", "formIdea": "¿Qué te gustaría vivir?", "formPlaceholder": "Playa con mi pareja, cataratas con amigos, sabores de Lima…", "formSend": "Hagamos realidad mi viaje", "navProtocolo": "Siempre contigo"});
Object.assign(T.en,{"discoverLabel": "CHOOSE WHAT MAKES YOU HAPPY", "discoverH": "A Peru for every<br>way to enjoy yourself.", "discoverIntro": "Beaches, waterfalls, mountains and flavours. Where do you picture yourself?", "galleryNote": "Reference images. Soon, memories from our travellers.", "galleryCta": "Make me part of the journey", "cardPick": "Add to my journey", "filters": ["All", "Sea", "Mountains", "Rainforest", "Lima"], "careLabel": "ENJOY YOURSELF. WE ARE HERE.", "careH": "By your side,<br>from your arrival.", "careIntro": "We meet you at the airport. We care for the details. You enjoy the journey.", "careTabs": ["We meet you", "Carefully designed", "By your side"], "careDetails": [["Your first experience: feeling welcomed.", "We meet you at arrivals with your name and coordinate your private transfer.", "AIRPORT PICKUP", "PERUGO meets you"], ["Every choice is made with you.", "Private transfers and a route agreed before travel. We coordinate activities with the operator and assess weather, access and walks before setting out.", "YOUR ITINERARY", "Tailored to you"], ["Enjoy yourself. You have someone to call.", "One contact knows your journey and coordinates alternatives with you when plans change.", "PERSONAL ATTENTION", "Throughout your journey"]], "methodLabel": "HOW WE MAKE IT HAPPEN", "methodH": "From imagining it<br>to living it.", "methodCta": "Start designing your journey", "methodSteps": [["We listen", "What moves you. Who is coming."], ["We design", "Your route, your interests, your pace."], ["We meet you", "At arrivals, with your name."], ["We support you", "One contact throughout your trip."]], "contactLabel": "YOUR NEXT STORY", "contactH": "What would you love<br>to experience in Peru?", "contactIntro": "One idea is enough to start. We design the rest with you.", "contactDirect": "Talk to us on WhatsApp", "formH": "Design your journey.", "formIdea": "What would you love to experience?", "formPlaceholder": "A beach break, waterfalls with friends, flavours of Lima…", "formSend": "Make my journey happen", "navProtocolo": "By your side"});

let lang = 'es';
try { const s = localStorage.getItem('perugo-lang'); if (s === 'en' || s === 'es') lang = s; } catch (e) {}


Object.assign(T.es,{"limaExtraLabel": "UNA CIUDAD. MUCHAS HISTORIAS.", "limaExtraH": "¿Qué Lima te gustaría vivir?", "limaExtraIntro": "Colonial, religiosa, bohemia o junto al mar. Estas son algunas de sus caras. Elegimos contigo las que formarán tu día.", "limaMore": "También hay mercados, museos, cocina, Pachacámac y mucho más. La selección empieza por lo que te gusta.", "limaGuide": "Descubre más de Lima", "airportVideoLabel": "Conoce el aeropuerto · reproduce aquí", "careGuide": "Así cuidamos tu viaje ↗", "contactAction": "Cuéntanos tu idea ↗", "footerWhats": "Conversemos por WhatsApp ↗", "footerWifi": "Wi-Fi para compartir tus aventuras ↗", "footerAbout": "Conoce PERUGO", "wifiFootnote": "Wi-Fi contigo para compartir el viaje. La conexión depende de la cobertura del lugar.", "fFine": "Prepararemos tu mensaje en WhatsApp para que lo revises antes de enviarlo.", "formH": "Empecemos con una idea.", "formSend": "Conversemos por WhatsApp"});
Object.assign(T.en,{"limaExtraLabel": "ONE CITY. MANY STORIES.", "limaExtraH": "Which Lima would you like to discover?", "limaExtraIntro": "Colonial, spiritual, artistic or by the sea. These are just a few of its sides. Choose the ones that shape your day.", "limaMore": "There are markets, museums, cooking, Pachacámac and much more. Your interests start the selection.", "limaGuide": "Discover more of Lima", "airportVideoLabel": "Discover the airport · play here", "careGuide": "How we care for your journey ↗", "contactAction": "Tell us your idea ↗", "footerWhats": "Let’s talk on WhatsApp ↗", "footerWifi": "Wi-Fi to share your adventures ↗", "footerAbout": "Meet PERUGO", "wifiFootnote": "Wi-Fi with you to share the journey. Connection depends on local coverage.", "fFine": "We prepare your WhatsApp message so you can review it before sending.", "formH": "Start with one idea.", "formSend": "Let’s talk on WhatsApp"});
T.es.careTabs=['Te esperamos','Tu viaje, cuidado','Siempre contigo','Wi-Fi contigo'];
T.en.careTabs=['We meet you','Carefully designed','By your side','Wi-Fi with you'];
T.es.careDetails[0]=['Antes de llegar, ya sabes a quién buscar.','Seguimos tu vuelo y coordinamos contigo por WhatsApp. Te buscamos en llegadas con tu nombre y organizamos tu traslado privado.','TU LLEGADA, COORDINADA','PERUGO te espera'];
T.en.careDetails[0]=['Before arriving, you know who to look for.','We follow your flight, coordinate on WhatsApp, meet you at arrivals with your name and organise your private transfer.','YOUR ARRIVAL, COORDINATED','PERUGO meets you'];
T.es.careDetails.push(['Comparte lo que estás viviendo.','Te acompañamos con Wi-Fi para compartir tus aventuras y mantener el contacto. La señal depende de la cobertura de cada lugar.','CONEXIÓN DURANTE EL VIAJE','Wi-Fi contigo']);
T.en.careDetails.push(['Share what you are experiencing.','Wi-Fi helps you share your adventures and stay in touch. Signal depends on coverage at each destination.','CONNECTED ON YOUR JOURNEY','Wi-Fi with you']);

T.es.navDestinations='Destinos';T.en.navDestinations='Destinations';
let careActive=0;
const ICONS=['<path d="m2 12 9-3V4l2-2 2 2v5l9 3v3l-9-2v6l3 2v2l-5-1-5 1v-2l3-2v-6l-9 2z"/>','<path d="M13 3 4 7v6c0 5 9 9 9 9s9-4 9-9V7z"/><path d="m9 12 3 3 5-6"/>','<path d="M5 4h16v13H9l-4 4zM9 8h8M9 12h5"/>'];
function renderCare(){const t=T[lang],d=t.careDetails[careActive];$('#care-tabs').innerHTML=t.careTabs.map((s,i)=>`<button type="button" data-care="${i}" aria-pressed="${careActive===i}">${s}<span aria-hidden="true">↗</span></button>`).join('');$('#care-detail').innerHTML=`<p class="eyebrow">${d[2]}</p><h3>${d[0]}</h3><p>${d[1]}</p>`;}

function renderLists(t){
 renderCare();
 $('#method-flow').innerHTML=t.methodSteps.map((s,i)=>`<article><svg viewBox="0 0 26 26" aria-hidden="true">${[ICONS[2],ICONS[1],ICONS[0],ICONS[2]][i]}</svg><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('');
}

function apply(l){
  lang = l;
  const t = T[l];
  document.documentElement.lang = l;
  $$('[data-i18n]').forEach(el => { if (t[el.dataset.i18n] !== undefined) el.innerHTML = t[el.dataset.i18n]; });
  $$('[data-ph]').forEach(el => { if (t[el.dataset.ph] !== undefined) el.placeholder = t[el.dataset.ph]; });
  $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
  $$('[data-lima-es]').forEach(el=>el.textContent=el.dataset[l==='en'?'limaEn':'limaEs']);
  $$('.destination-dropdown [data-en]').forEach(el=>{if(!el.dataset.es)el.dataset.es=el.textContent;el.textContent=el.dataset[l==='en'?'en':'es'];});
  renderLists(t);
  wireReveal();
  try { localStorage.setItem('perugo-lang', l); } catch (e) {}
}
$$('.lang button').forEach(b => b.onclick = () => apply(b.dataset.lang));

/* ------------------------------------------------------------
   REVEAL
   ------------------------------------------------------------ */
let io = null;
function wireReveal(){
  $$('.shell > *:not(.sec-num), .viaje, .steps li, .fases li, .slot').forEach(el => el.classList.add('rev'));
  if (!('IntersectionObserver' in window)) return $$('.rev').forEach(el => el.classList.add('in'));
  if (!io) io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold:.08, rootMargin:'0px 0px -50px' });
  $$('.rev:not(.in)').forEach(el => io.observe(el));
}

/* ------------------------------------------------------------
   NAV
   ------------------------------------------------------------ */
const nav = $('#nav'), hero = $('.hero');
const onScroll = () => {
  nav.classList.toggle('solid', scrollY > 40);
  nav.classList.toggle('on-dark', scrollY <= 40);
};
onScroll(); addEventListener('scroll', onScroll, { passive:true });

const mb = $('#menu-btn'), links = $('.nav-links');
mb.onclick = () => {
  const on = links.classList.toggle('open');
  mb.classList.toggle('on', on);
  mb.setAttribute('aria-expanded', on);
};
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') { links.classList.remove('open'); mb.classList.remove('on'); mb.setAttribute('aria-expanded', 'false'); }
});

/* ------------------------------------------------------------
   FORMULARIO → WHATSAPP
   ------------------------------------------------------------ */
$('#conv-form').addEventListener('submit', e=>{e.preventDefault();const msg=[lang==='es'?'Hola PERUGO, quiero planificar mi viaje.':'Hello PERUGO, I would like to plan my journey.',`${lang==='es'?'Nombre':'Name'}: ${$('#f-nombre').value.trim()}`,$('#f-notas').value.trim()].join('\n');window.open(wa(msg),'_blank','noopener');});
$('#arrival-play').addEventListener('click',()=>{
 const film=$('#arrival-film'), poster=$('#arrival-play');
 const frame=document.createElement('iframe');
 let loaded=false;
 frame.addEventListener('load',()=>{loaded=true;});
 frame.src='https://www.youtube.com/embed/KCYRbOU2tvc?autoplay=1&playsinline=1&rel=0';
 frame.title=lang==='es'?'Aeropuerto Jorge Chávez · video oficial':'Jorge Chávez Airport · official video';
 frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
 frame.referrerPolicy='strict-origin-when-cross-origin';
 frame.setAttribute('allowfullscreen','');
 film.replaceChildren(frame);
 setTimeout(()=>{if(!loaded && frame.isConnected){film.replaceChildren(poster);const label=poster.querySelector('.arrival-film-label');label.textContent=lang==='es'?'El video no pudo cargar. Pulsa para reintentar aquí.':'Video could not load. Tap to retry here.';}},12000);
});
$('#care-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-care]');if(b){careActive=Number(b.dataset.care);renderCare();}});


/* ------------------------------------------------------------
   VIDEO DE PORTADA
   Solo se muestra cuando el reproductor de Vimeo confirma que está
   listo. Si no carga, se queda la fotografía y no un recuadro gris.
   ------------------------------------------------------------ */
const video = $('#hero-video'), toggle = $('#video-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function videoLabel(){ toggle.textContent = lang === 'es' ? (video.paused ? 'Reproducir video' : 'Pausar video') : (video.paused ? 'Play video' : 'Pause video'); toggle.setAttribute('aria-pressed', String(video.paused)); }
video.addEventListener('playing', () => { video.classList.add('on'); toggle.disabled = false; videoLabel(); });
video.addEventListener('pause', videoLabel);
toggle.addEventListener('click', () => { if(video.paused) video.play().catch(()=>{}); else video.pause(); });
function startVideo(){
 if(!reducedMotion.matches) video.play().catch(()=>{});
}
video.addEventListener('error', () => {video.classList.remove('on');toggle.disabled=true;});
reducedMotion.addEventListener('change', () => { if(reducedMotion.matches) video.pause(); });
startVideo();
$$('.lang button').forEach(b => b.addEventListener('click', videoLabel));

addEventListener('load', () => document.body.classList.add('ready'));
setTimeout(() => document.body.classList.add('ready'), 900);

apply(lang);

document.addEventListener('click',e=>{document.querySelectorAll('.destination-menu[open]').forEach(menu=>{if(!menu.contains(e.target))menu.open=false})});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.destination-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})});
