/* PERUGO.PE — Propuesta o6 · lógica de la maqueta
   Nada se envía a un servidor: el planificador arma un mensaje de WhatsApp. */

const WA = '51954708174';
const wa = (txt) => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;

/* ---------------- iconos ---------------- */
const ICONS = {
  shield:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
  chat:'<path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.4L3 21l1.6-4.3A8.5 8.5 0 1 1 21 11.5Z"/>',
  car:'<path d="M4 16v3h3v-3M17 16v3h3v-3"/><path d="M3 16v-4l2-5h14l2 5v4H3Z"/><circle cx="7.5" cy="13.5" r="1.2"/><circle cx="16.5" cy="13.5" r="1.2"/>',
  route:'<path d="M6 4v9a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v1"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="20" r="2"/>',
  pin:'<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  guide:'<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  star:'<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 9.7l5.4-.8Z"/>'
};
const drawIcons = (root = document) => root.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[el.dataset.icon] || ''}</svg>`;
});

/* ---------------- fotografías (referencia) ---------------- */
const IMG = {
  machu:'https://www.muchbetteradventures.com/magazine/content/images/2023/10/machu-picchu-2.jpg',
  andes:'https://vt-web-bucket-1.s3.amazonaws.com/uploads/2023/02/01/machu-picchu-mountain-conts_8.jpg',
  vinicunca:'https://vt-web-bucket-1.s3.amazonaws.com/uploads/2022/10/26/10d-ausangate-vinicunca-y-mapi-contenido_5.jpg',
  dunas:'https://backiee.com/static/wallpapers/1920x1080/267116.jpg',
  paracas:'https://www.travel-to-nature.de/fileadmin/_processed_/8/f/csm_suedamerika-peru-paracas-kueste_b656e58546.jpg',
  ballestas:'https://upload.wikimedia.org/wikipedia/commons/2/28/Humboldt_Penguins_on_the_Ballestas_Islands_%286990567902%29.jpg',
  nazca:'https://www.worldhistory.org/img/r/p/1500x1500/2366.jpg',
  lima:'https://machupicchu.center/images/lima-cathedral.webp',
  ceviche:'https://viajesaperu.pe/web/121730f/tours-gastronomico-ceviche.jpg',
  selva:'https://www.ytuqueplanes.com/imagenes/fotos/novedades/vista-aerea-tambopata.jpg',
  mercado:'https://blogs.smithsonianmag.com/adventure/files/2013/01/PeruMarketOffLimitsBIG.jpg',
  costa:'https://cdn.getyourguide.com/img/location/5cd404718fff1.jpeg/99.jpg'
};

/* ---------------- destinos ---------------- */
const DESTINOS = [
  { n:'Machu Picchu', r:'Cusco · Los Andes', img:IMG.machu },
  { n:'Huacachina', r:'Ica · El desierto', img:IMG.dunas },
  { n:'Islas Ballestas', r:'Paracas · El océano', img:IMG.ballestas }
];
document.getElementById('dest-cards').innerHTML = DESTINOS.map(d => `
  <a class="dcard rv" href="#planificar">
    <img src="${d.img}" alt="${d.n}" loading="lazy">
    <span class="meta"><span><small>${d.r}</small><b>${d.n}</b></span><span class="go">→</span></span>
  </a>`).join('');

/* ---------------- rutas ---------------- */
const RUTAS = [
  { d:'4 días · 3 noches', t:'Cusco Esencial', img:IMG.machu,
    p:'Cusco, Valle Sagrado y Machu Picchu con los tiempos bien medidos.',
    tags:['Traslados','Guía local','Entradas'] },
  { d:'8 días · 7 noches', t:'Perú Clásico', img:IMG.andes,
    p:'Lima, Cusco y Machu Picchu: la primera vez en el Perú, bien hecha.',
    tags:['Vuelos internos','Hoteles','Guía local'] },
  { d:'3 días · 2 noches', t:'Desierto y Océano', img:IMG.dunas,
    p:'Paracas, Huacachina y sobrevuelo opcional de las Líneas de Nazca.',
    tags:['Transporte privado','Ballestas','Buggies'] },
  { d:'4 días · 3 noches', t:'Amazonía Viva', img:IMG.selva,
    p:'Tambopata: lodge en la selva, caminatas guiadas y fauna del río.',
    tags:['Lodge','Guía naturalista','Pensión completa'] }
];
document.getElementById('ruta-cards').innerHTML = RUTAS.map(r => `
  <article class="rcard rv">
    <div class="ph"><img src="${r.img}" alt="${r.t}" loading="lazy"></div>
    <div class="bd">
      <span class="days">${r.d}</span>
      <h3>${r.t}</h3>
      <p>${r.p}</p>
      <div class="tags">${r.tags.map(t => `<b>${t}</b>`).join('')}</div>
    </div>
    <div class="ft">
      <span>Cotizar esta ruta</span>
      <a href="${wa('Hola PERUGO, me interesa la ruta "' + r.t + '" (' + r.d + '). ¿Me pueden cotizar?')}" target="_blank" rel="noopener" aria-label="Cotizar ${r.t}">→</a>
    </div>
  </article>`).join('');

/* ---------------- guías ---------------- */
const GUIAS = [
  { c:'Consejos', t:'10 cosas que conviene saber antes de tu primer viaje al Perú', f:'12 de mayo, 2026', img:IMG.andes },
  { c:'Destinos', t:'Cuándo visitar Machu Picchu según el clima y la afluencia', f:'8 de mayo, 2026', img:IMG.vinicunca },
  { c:'Sabores', t:'Comer en Lima: del mercado de barrio a la mesa del mediodía', f:'3 de mayo, 2026', img:IMG.ceviche }
];
document.getElementById('guia-cards').innerHTML = GUIAS.map(g => `
  <article class="gcard rv">
    <div class="ph"><img src="${g.img}" alt="${g.c}" loading="lazy"><span class="cat">${g.c}</span></div>
    <div class="bd">
      <span class="date">${g.f}</span>
      <h3>${g.t}</h3>
      <span class="more">Leer más →</span>
    </div>
  </article>`).join('');

/* ---------------- testimonios ---------------- */
const TESTIS = [
  { q:'Llegamos de madrugada y ya había alguien esperándonos con nuestro nombre. A partir de ahí todo el viaje se sintió resuelto.', n:'Sabrina R.', l:'Viaje de luna de miel' },
  { q:'Veníamos solo por Machu Picchu. Terminamos recorriendo el desierto y la costa, y fue la mejor decisión del viaje.', n:'Laura & Mike', l:'14 días por Perú' },
  { q:'Cambiamos las fechas dos veces y siempre nos respondieron el mismo día. Esa tranquilidad vale mucho cuando viajas lejos.', n:'Carlos y familia', l:'Viaje en familia' }
];
let ti = 0;
const card = document.getElementById('testi-card');
const dots = document.getElementById('testi-dots');
function paintTesti(i){
  const t = TESTIS[i];
  card.innerHTML = `<q>${t.q}</q>
    <div class="testi-who">
      <span class="ti" data-icon="guide" style="position:static;width:52px;height:52px"></span>
      <div><b>${t.n}</b><small>${t.l}</small><div class="stars" aria-label="5 estrellas de muestra">★★★★★</div></div>
    </div>`;
  drawIcons(card);
  [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
}
dots.innerHTML = TESTIS.map((_, i) => `<button aria-label="Testimonio ${i + 1}"></button>`).join('');
[...dots.children].forEach((d, i) => d.onclick = () => { ti = i; paintTesti(ti); });
document.getElementById('t-next').onclick = () => { ti = (ti + 1) % TESTIS.length; paintTesti(ti); };
document.getElementById('t-prev').onclick = () => { ti = (ti - 1 + TESTIS.length) % TESTIS.length; paintTesti(ti); };
paintTesti(0);

/* ---------------- intereses del planificador ---------------- */
const INTERESES = ['Machu Picchu','Cusco y Valle Sagrado','Desierto y dunas','Océano y Ballestas','Amazonía','Gastronomía','Trekking','Viaje sin prisa'];
const chips = document.getElementById('p-chips');
chips.innerHTML = INTERESES.map(i => `<button type="button">${i}</button>`).join('');
chips.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') e.target.classList.toggle('on');
});

/* ---------------- formularios ---------------- */
document.getElementById('quick-form').addEventListener('submit', e => {
  e.preventDefault();
  const d = document.getElementById('q-destino').value.trim();
  const i = document.getElementById('q-in').value;
  const o = document.getElementById('q-out').value;
  const p = document.getElementById('q-pax').value;
  const partes = ['Hola PERUGO, quiero planificar un viaje al Perú.'];
  if (d) partes.push(`Destino de interés: ${d}.`);
  if (i || o) partes.push(`Fechas: ${i || 'por definir'} a ${o || 'por definir'}.`);
  partes.push(`Somos ${p}.`);
  window.open(wa(partes.join(' ')), '_blank', 'noopener');
});

document.getElementById('plan-form').addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const sel = [...chips.querySelectorAll('.on')].map(b => b.textContent);
  const msg = [
    `Hola PERUGO, soy ${v('p-nombre')}.`,
    `Contacto: ${v('p-contacto')}.`,
    v('p-fecha') ? `Viajo en: ${v('p-fecha')}.` : '',
    v('p-pax') ? `Somos: ${v('p-pax')}.` : '',
    sel.length ? `Me interesa: ${sel.join(', ')}.` : '',
    v('p-notas') ? `Notas: ${v('p-notas')}` : ''
  ].filter(Boolean).join('\n');
  window.open(wa(msg), '_blank', 'noopener');
});

document.getElementById('news-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.innerHTML = '¡Gracias! ✓';
  setTimeout(() => { btn.innerHTML = 'Suscribirme <span>→</span>'; e.target.reset(); }, 2600);
});

/* ---------------- tabs del buscador ---------------- */
const TAB_HINT = {
  destinos:'Machu Picchu, Cusco, Paracas…',
  experiencias:'Trekking, gastronomía, fotografía…',
  rutas:'Perú Clásico, Cusco Esencial…',
  ideas:'Cuéntanos qué te gustaría sentir'
};
document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
  t.classList.add('on');
  document.getElementById('q-destino').placeholder = TAB_HINT[t.dataset.tab];
});

/* ---------------- header, menú, video ---------------- */
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

const burger = document.getElementById('burger'), nav = document.getElementById('nav');
burger.onclick = () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
};
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

const frame = document.getElementById('hero-video');
const post = (method, value) => {
  if (!frame.contentWindow) return;
  frame.contentWindow.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), '*');
};
let muted = true, playing = true;
document.getElementById('sound').onclick = e => {
  muted = !muted;
  post('setVolume', muted ? 0 : 0.6);
  e.target.textContent = muted ? 'Sonido apagado' : 'Sonido encendido';
};
document.getElementById('pause').onclick = e => {
  playing = !playing;
  post(playing ? 'play' : 'pause');
  e.target.textContent = playing ? '❙❙' : '▶';
};

/* ---------------- modal del video ---------------- */
const modal = document.getElementById('modal'), body = document.getElementById('modal-body');
document.querySelectorAll('[data-film]').forEach(b => b.onclick = () => {
  body.innerHTML = '<iframe src="https://player.vimeo.com/video/797801183?autoplay=1" title="Video de PERUGO" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  modal.showModal();
});
document.querySelector('.modal-x').onclick = () => modal.close();
modal.addEventListener('close', () => body.innerHTML = '');

/* ---------------- reveal + nav activo ---------------- */
drawIcons();
document.querySelectorAll('section > .wrap > *, .rv, .trust-grid > div, .sec-head, .dest-copy, .why-copy, .polaroids, .collage')
  .forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold:.12, rootMargin:'0px 0px -40px' });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

const links = [...document.querySelectorAll('#nav a')];
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) {
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
  }
}), { threshold:.4 });
['top','destinos','rutas','nosotros','guias','contacto'].forEach(id => {
  const el = document.getElementById(id); if (el) spy.observe(el);
});

/* ============================================================
   RED DE SEGURIDAD
   Si una foto externa no carga, se sustituye por un fondo
   generado con el nombre del destino: nunca se ve un icono roto.
   Y si el navegador no soporta IntersectionObserver, todo se
   muestra igual a los 1,5 s.
   ============================================================ */
(function safety(){
  const PH = (label) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">' +
    '<rect width="1200" height="800" fill="#E9E1D5"/>' +
    '<rect x="36" y="36" width="1128" height="728" fill="none" stroke="#CFC4B4"/>' +
    '<text x="600" y="400" text-anchor="middle" font-family="Georgia,serif" font-size="52" fill="#8A7F72">' +
    String(label || 'Perú').replace(/[<>&]/g, '') + '</text>' +
    '<text x="600" y="446" text-anchor="middle" font-family="sans-serif" font-size="21" fill="#A2978A">' +
    'fotografía pendiente del cliente</text></svg>');

  const fix = im => {
    if (im.dataset.ph) return;
    im.dataset.ph = '1';
    im.classList.add('ph-fail');
    im.src = PH(im.alt);
  };
  const wire = () => document.querySelectorAll('img').forEach(im => {
    if (im.dataset.ph || im.dataset.wired) return;
    im.dataset.wired = '1';
    if (im.complete && im.naturalWidth === 0) { fix(im); return; }
    im.addEventListener('error', () => fix(im), { once:true });
  });
  wire();
  setTimeout(wire, 400);
  setTimeout(wire, 2500);

  if (!('IntersectionObserver' in window)) {
    setTimeout(() => document.querySelectorAll('.rv').forEach(el => el.classList.add('in')), 600);
  }
})();
