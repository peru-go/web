import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Camera, X, Plus, Phone } from 'lucide-react';
import { services, faqs, galleryPhotos } from './content';

export default function Sections({ onContact }: { onContact: () => void }) {
  const [filter, setFilter] = useState('Todas');
  const [photo, setPhoto] = useState<number | null>(null);
  const lightbox = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (photo !== null) lightbox.current?.showModal(); else lightbox.current?.close(); }, [photo]);
  const visible = galleryPhotos.filter(item => filter === 'Todas' || item.category === filter);
  return <>
    <main id="contenido">
      <section id="nosotros" className="section-wrap intro-section" aria-labelledby="nosotros-title">
        <div><p className="section-label">01 / SOMOS TÁCTICA 11</p><h2 id="nosotros-title">El equipo<br/><em>detrás del equipo.</em></h2></div>
        <div className="intro-copy"><p className="large-copy">El fútbol se juega en la cancha.<br/>La tranquilidad se prepara antes.</p><p>Somos una empresa de logística deportiva enfocada en fútbol. Acompañamos a equipos y delegaciones en la organización de su visita, para que cada etapa tenga un plan y cada detalle tenga un responsable.</p><p>Desde la llegada hasta el regreso, conectamos los tiempos del viaje con las necesidades del encuentro. Así, el equipo puede concentrarse en lo que vino a hacer: jugar.</p><a href="#experiencias" className="text-link">Conoce una de nuestras experiencias <ArrowUpRight size={18}/></a></div>
      </section>

      <section id="servicios" className="services-section" aria-labelledby="services-title"><div className="section-wrap">
        <div className="section-heading"><div><p className="section-label">02 / QUÉ HACEMOS</p><h2 id="services-title">Tú marcas el objetivo.<br/><em>Nosotros organizamos el camino.</em></h2></div><p>Logística deportiva para equipos de fútbol que necesitan coordinar su llegada, su encuentro y su retorno.</p></div>
        <div className="services-grid">{services.map(service => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><ul>{service.details.map(detail => <li key={detail}><Check size={15} aria-hidden="true"/>{detail}</li>)}</ul></article>)}</div>
        <p className="scope-note">Cada delegación tiene necesidades distintas. El alcance se acuerda contigo antes de iniciar la coordinación.</p>
      </div></section>

      <section id="clientes" className="section-wrap clients-section" aria-labelledby="clients-title">
        <div><p className="section-label">03 / NUESTROS CLIENTES</p><h2 id="clients-title">Su confianza.<br/><em>Nuestro compromiso.</em></h2><p className="section-description">Equipos a los que hemos acompañado fuera de la cancha.</p></div>
        <a className="client-card" href="#experiencias" aria-label="Conocer nuestra experiencia con Montevideo City Torque"><div className="client-monogram" aria-hidden="true">MCT</div><div><span className="client-label">EQUIPO DE FÚTBOL · URUGUAY</span><h3>Montevideo<br/>City Torque</h3><span className="client-link">Ver la experiencia <ArrowUpRight size={18}/></span></div></a>
      </section>

      <section id="experiencias" className="case-section" aria-labelledby="case-title"><div className="section-wrap case-layout">
        <div><p className="section-label">04 / UNA EXPERIENCIA EN EQUIPO</p><span className="case-tag">MONTEVIDEO CITY TORQUE EN PERÚ</span><h2 id="case-title">Mucho antes del partido.<br/><em>Hasta el regreso a casa.</em></h2><p>Apoyamos a Montevideo City Torque en la logística de su visita al Perú para el encuentro ante Cienciano en Cusco.</p><p>Nuestro acompañamiento comenzó con su llegada al país, continuó en el trayecto Lima–Cusco y en el regreso Cusco–Lima, hasta su retorno a Uruguay.</p><dl className="case-facts"><div><dt>Cliente</dt><dd>Montevideo City Torque</dd></div><div><dt>Encuentro</dt><dd>Ante Cienciano</dd></div><div><dt>Sede</dt><dd>Cusco, Perú</dd></div><div><dt>Apoyo</dt><dd>Logística de la delegación</dd></div></dl></div>
        <div className="route-card" aria-label="Itinerario: llegada al Perú, Lima a Cusco para el encuentro y regreso de Cusco a Lima hacia Uruguay"><p className="route-kicker">UNA VISITA. CADA ETAPA COORDINADA.</p><ol className="route-list"><li><span className="route-dot"/><div><span>01 · LLEGADA AL PERÚ</span><h3>Lima</h3><p>Inicio del acompañamiento logístico.</p></div></li><li><span className="route-dot"/><div><span>02 · EL ENCUENTRO</span><h3>Cusco</h3><p>Visita para el partido ante Cienciano.</p></div></li><li><span className="route-dot"/><div><span>03 · REGRESO</span><h3>Lima</h3><p>Coordinación del retorno desde Cusco.</p></div></li><li><span className="route-dot last-dot"/><div><span>04 · VUELTA A CASA</span><h3>Uruguay</h3><p>Retorno de la delegación a su país.</p></div></li></ol><span className="route-footer">LIM → CUS → LIM → URUGUAY</span></div>
      </div></section>

      <section id="galeria" className="section-wrap gallery-section" aria-labelledby="gallery-title"><div className="section-heading"><div><p className="section-label">05 / GALERÍA DE CLIENTES</p><h2 id="gallery-title">Lo que se vive<br/><em>fuera de los noventa minutos.</em></h2></div><p>Las delegaciones, los encuentros y el trabajo que ocurre detrás de cada visita.</p></div>
        {galleryPhotos.length ? <><div className="gallery-filters" aria-label="Filtrar fotografías">{['Todas', ...new Set(galleryPhotos.map(item => item.category))].map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="gallery-grid">{visible.map(item => <button key={item.src} className="gallery-item" onClick={() => setPhoto(galleryPhotos.indexOf(item))} aria-label={`Ampliar: ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy" width="800" height="600"/><span>{item.caption}<Plus size={18}/></span></button>)}</div></> : <div className="gallery-empty"><div className="camera-badge"><Camera size={30} strokeWidth={1}/></div><div><span className="section-label">MONTEVIDEO CITY TORQUE · LIMA Y CUSCO</span><h3>Una experiencia para recordar.</h3><p>Pronto compartiremos las fotografías de esta visita.</p></div><a href="#experiencias" className="text-link">Conoce el recorrido <ArrowUpRight size={18}/></a></div>}
      </section>

      <section id="proceso" className="process-section"><div className="section-wrap"><div className="section-heading"><div><p className="section-label">06 / CÓMO TRABAJAMOS</p><h2>De la primera conversación<br/><em>al último tramo del viaje.</em></h2></div><button className="button" onClick={onContact}>Planifiquemos tu visita <ArrowUpRight size={18}/></button></div><ol className="process-grid">{[
        ['Escuchamos al equipo', 'Nos compartes la fecha, el destino, la delegación y lo que necesitas coordinar.'],
        ['Acordamos el plan', 'Definimos contigo el itinerario, las prioridades y el alcance del apoyo logístico.'],
        ['Coordinamos la visita', 'Acompañamos la operación según lo acordado y mantenemos la comunicación con el equipo.'],
        ['Organizamos el retorno', 'Damos continuidad a la coordinación hasta completar las etapas previstas del regreso.'],
      ].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

      <section id="guia" className="section-wrap guide-section"><div><p className="section-label">07 / ANTES DE VIAJAR</p><h2>Un buen encuentro<br/><em>empieza con un buen plan.</em></h2><p className="section-description">Para organizar la logística de un equipo de fútbol, conviene reunir la información de toda la visita, además del horario del partido.</p><button className="text-link" onClick={onContact}>Conversemos sobre tu itinerario <ArrowRight size={18}/></button></div><div className="guide-checklist">{[
        ['El encuentro', 'Ciudad, sede, fecha y horario previsto del partido.'],
        ['La delegación', 'Cantidad de jugadores, cuerpo técnico y acompañantes.'],
        ['El recorrido', 'Fechas de llegada y salida, vuelos y ciudades de paso.'],
        ['Las prioridades', 'Apoyos que necesita el equipo y una persona de contacto para coordinar.'],
      ].map(([title, text]) => <div key={title}><Check size={18}/><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>

      <section id="preguntas" className="faq-section"><div className="section-wrap faq-layout"><div><p className="section-label">08 / PREGUNTAS FRECUENTES</p><h2>Antes del<br/><em>primer pase.</em></h2><p className="section-description">Resolvemos las primeras dudas sobre la coordinación de tu equipo.</p></div><div className="faq-list">{faqs.map(item => <details key={item.question}><summary>{item.question}<Plus size={19} aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></div></section>

      <section id="contacto" className="section-wrap contact-section"><p className="section-label">EL SIGUIENTE ENCUENTRO PUEDE SER EL TUYO</p><h2>Tu equipo tiene un destino.<br/><em>Hagamos que todo esté listo.</em></h2><p>Cuéntanos cuándo llegan, dónde juegan y qué necesitan.<br/>Empecemos a coordinar la visita.</p><button className="button" onClick={onContact}>Hablemos por WhatsApp <ArrowUpRight size={20}/></button><a className="phone-link" href="tel:+51954708174"><Phone size={15}/> +51 954 708 174</a></section>
    </main>
    <footer className="site-footer"><div className="section-wrap footer-top"><a className="brand" href="#inicio" aria-label="TÁCTICA 11, volver al inicio"><img src="/brand-reference.png" alt="TÁCTICA 11 · Logística deportiva"/></a><p>El equipo detrás del equipo.</p><nav aria-label="Navegación al pie"><a href="#servicios">Servicios</a><a href="#clientes">Clientes</a><a href="#galeria">Galería</a><a href="#contacto">Contacto</a></nav></div><div className="section-wrap footer-bottom"><span>TÁCTICA 11 · Logística deportiva</span><span>Fútbol. Coordinación. Equipo.</span><a href="#inicio">Volver arriba ↑</a></div></footer>
    <dialog className="gallery-lightbox" ref={lightbox} aria-label="Fotografía de la experiencia" onCancel={() => setPhoto(null)} onClick={event => { if (event.target === lightbox.current) setPhoto(null); }}><button className="close-dialog" onClick={() => setPhoto(null)} aria-label="Cerrar fotografía"><X/></button>{photo !== null && galleryPhotos[photo] && <figure><img src={galleryPhotos[photo].src} alt={galleryPhotos[photo].alt}/><figcaption>{galleryPhotos[photo].caption}</figcaption></figure>}</dialog>
  </>;
}
