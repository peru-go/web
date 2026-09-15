/* ============================================================
   PERUGO.PE — Propuesta o7
   Movimiento con JS nativo: sin librerías, sin dependencias.
   El planificador solo arma un mensaje de WhatsApp.
   ============================================================ */

/* ============================================================
   0 · RED DE SEGURIDAD  (se ejecuta antes que nada)
   - El preloader desaparece sí o sí a los 3 s, aunque algo falle.
   - Toda foto que no cargue se reemplaza por un fondo generado
     con el nombre del destino: nunca se ve un icono roto.
   - Si el navegador no soporta IntersectionObserver, el contenido
     aparece igual a los 2 s.
   ============================================================ */
(function net(){
  setTimeout(function(){
    document.body.classList.add('ready');
    var l = document.getElementById('loader');
    if (l) { l.classList.add('gone'); setTimeout(function(){ l.remove(); }, 1000); }
  }, 3000);

  var PH = function(label){
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#1A2560"/><stop offset="1" stop-color="#070C22"/>' +
      '</linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/>' +
      '<text x="600" y="420" text-anchor="middle" font-family="Georgia,serif" font-size="60" fill="#C6FF4F">' +
      String(label || 'Perú').replace(/[<>&]/g, '') + '</text>' +
      '<text x="600" y="466" text-anchor="middle" font-family="sans-serif" font-size="23" fill="#8E97C9">' +
      'fotografía pendiente del cliente</text></svg>');
  };
  var fix = function(im){
    if (im.dataset.ph) return;
    im.dataset.ph = '1';
    im.classList.add('ph-fail');
    im.src = PH(im.alt);
  };
  var wire = function(){
    var list = document.querySelectorAll('img');
    for (var i = 0; i < list.length; i++) {
      var im = list[i];
      if (im.dataset.ph || im.dataset.wired) continue;
      im.dataset.wired = '1';
      if (im.complete && im.naturalWidth === 0) { fix(im); continue; }
      im.addEventListener('error', (function(el){ return function(){ fix(el); }; })(im), { once:true });
    }
  };
  wire();
  [300, 1200, 3000].forEach(function(t){ setTimeout(wire, t); });

  if (!('IntersectionObserver' in window)) {
    setTimeout(function(){
      var r = document.querySelectorAll('.rev');
      for (var i = 0; i < r.length; i++) r[i].classList.add('in');
    }, 600);
  }
})();

const WA = '51954708174';
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- fotografías ---------------- */
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

/* ============================================================
   1 · PRELOADER
   ============================================================ */
(function loader(){
  const el = $('#loader'), num = $('#l-num'), bar = $('#l-bar');
  let p = 0;
  const finish = () => {
    document.body.classList.add('ready');
    el.classList.add('gone');
    setTimeout(() => el.remove(), 1100);
  };
  if (REDUCED) { finish(); return; }
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 14 + 6);
    num.textContent = String(Math.round(p)).padStart(2, '0');
    bar.style.width = p + '%';
    if (p >= 100) { clearInterval(tick); setTimeout(finish, 280); }
  }, 110);
})();

/* ============================================================
   2 · CURSOR
   ============================================================ */
(function cursor(){
  const c = $('.cursor');
  if (!c || matchMedia('(hover:none)').matches) return;
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
  (function loop(){
    cx += (x - cx) * .18; cy += (y - cy) * .18;
    c.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    c.classList.toggle('big', !!e.target.closest('[data-hov],a,button'));
  });
})();

/* ============================================================
   3 · NAV · MENÚ · RELOJ
   ============================================================ */
const nav = $('#nav'), ovl = $('#overlay'), mBtn = $('#menu-btn');
addEventListener('scroll', () => nav.classList.toggle('small', scrollY > 80), { passive:true });

mBtn.onclick = () => {
  const on = ovl.classList.toggle('on');
  mBtn.classList.toggle('on', on);
  mBtn.setAttribute('aria-expanded', on);
  document.body.style.overflow = on ? 'hidden' : '';
};
ovl.addEventListener('click', e => {
  if (e.target.tagName === 'A') { ovl.classList.remove('on'); mBtn.classList.remove('on'); document.body.style.overflow = ''; }
});

const clock = $('#clock');
const tickClock = () => {
  const t = new Date().toLocaleTimeString('es-PE', { hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'America/Lima' });
  clock.textContent = t;
};
tickClock(); setInterval(tickClock, 20000);

/* ============================================================
   4 · MARQUEE
   ============================================================ */
const MQ = ['Machu Picchu','Cusco','Valle Sagrado','Huacachina','Paracas','Nazca','Tambopata','Lima','Arequipa','Colca'];
const mqHtml = MQ.map(d => `<span>${d}<b>·</b></span>`).join('');
$('#mq').innerHTML = mqHtml + mqHtml;

/* ============================================================
   5 · MANIFIESTO · palabra por palabra
   ============================================================ */
(function words(){
  const h = $('#mani');
  h.innerHTML = h.textContent.trim().split(/\s+/).map(w => `<w>${w}</w>`).join(' ');
  const ws = [...h.querySelectorAll('w')];
  const paint = () => {
    const r = h.getBoundingClientRect();
    const start = innerHeight * .88, end = innerHeight * .28;
    const prog = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * .55)));
    const n = Math.round(prog * ws.length);
    ws.forEach((w, i) => w.classList.toggle('on', i < n));
  };
  paint();
  addEventListener('scroll', paint, { passive:true });
  addEventListener('resize', paint);
})();

/* ============================================================
   6 · CAPÍTULOS · scroll horizontal
   ============================================================ */
const CAPS = [
  { n:'Capítulo 01', t:'Los Andes', p:'Cusco, el Valle Sagrado y la ciudadela que viniste a ver.', img:IMG.machu, tall:true },
  { n:'Capítulo 02', t:'El color', p:'Montañas teñidas y caminos altos que no salen en las postales.', img:IMG.vinicunca },
  { n:'Capítulo 03', t:'El desierto', p:'Dunas, oasis y una luz que cambia cada media hora.', img:IMG.dunas, tall:true },
  { n:'Capítulo 04', t:'El océano', p:'Paracas, Ballestas y la vida que trae la corriente fría.', img:IMG.ballestas },
  { n:'Capítulo 05', t:'La selva', p:'Tambopata: el río, el lodge y el silencio de la madrugada.', img:IMG.selva, tall:true },
  { n:'Capítulo 06', t:'La mesa', p:'Porque un país también se entiende sentado a comer.', img:IMG.ceviche }
];
const track = $('#ch-track');
track.innerHTML = CAPS.map(c => `
  <article class="chap${c.tall ? ' tall' : ''}">
    <img src="${c.img}" alt="${c.t}" loading="lazy">
    <div class="chap-meta"><em>${c.n}</em><h4>${c.t}</h4><p>${c.p}</p></div>
  </article>`).join('');

(function horizontal(){
  const sec = $('.chapters'), bar = $('#ch-bar'), now = $('#ch-now');
  let raf = null;
  const run = () => {
    raf = null;
    if (innerWidth <= 980) { track.style.transform = ''; return; }
    const r = sec.getBoundingClientRect();
    const total = sec.offsetHeight - innerHeight;
    const prog = Math.min(1, Math.max(0, -r.top / total));
    const dist = Math.max(0, track.scrollWidth - innerWidth + 64);
    track.style.transform = `translate3d(${-prog * dist}px,0,0)`;
    bar.style.width = (prog * 100) + '%';
    now.textContent = String(Math.min(CAPS.length, Math.floor(prog * CAPS.length) + 1)).padStart(2, '0');
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
  addEventListener('scroll', onScroll, { passive:true });
  addEventListener('resize', onScroll);
  run();
})();

/* ============================================================
   7 · RUTAS · lista editorial con imagen flotante
   ============================================================ */
const RUTAS = [
  { t:'Perú Clásico', d:'8 a 10 días', p:'Lima, Cusco, Valle Sagrado y Machu Picchu. La primera vez, bien resuelta.', img:IMG.machu },
  { t:'Andes Profundos', d:'6 a 8 días', p:'Cusco con altura: Ausangate, montañas de color y comunidades del camino.', img:IMG.vinicunca },
  { t:'Desierto y Océano', d:'3 a 5 días', p:'Paracas, Ballestas, Huacachina y el sobrevuelo de Nazca.', img:IMG.dunas },
  { t:'Amazonía Viva', d:'4 a 5 días', p:'Tambopata: lodge en el río, caminatas guiadas y fauna al amanecer.', img:IMG.selva },
  { t:'Perú de Mesa', d:'4 a 6 días', p:'Lima y Cusco a través de sus mercados, sus cocinas y sus barrios.', img:IMG.ceviche },
  { t:'A tu medida', d:'Los días que tengas', p:'Cuéntanos qué te mueve y armamos la ruta desde cero.', img:IMG.paracas }
];
$('#rt-list').innerHTML = RUTAS.map((r, i) => `
  <a class="rt-row" data-hov data-img="${r.img}" href="${wa('Hola PERUGO, me interesa la ruta "' + r.t + '". ¿Me ayudan a armarla?')}" target="_blank" rel="noopener">
    <span class="rt-n">0${i + 1}</span>
    <span class="rt-t">${r.t}<small>${r.p}</small></span>
    <span class="rt-d">${r.d}</span>
    <span class="rt-go">↗</span>
  </a>`).join('');

(function floatImg(){
  const box = $('#rt-float'), img = box.querySelector('img');
  let x = 0, y = 0, cx = 0, cy = 0, on = false;
  $$('.rt-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      img.src = row.dataset.img; box.classList.add('on'); on = true;
    });
    row.addEventListener('mouseleave', () => { box.classList.remove('on'); on = false; });
  });
  addEventListener('mousemove', e => { x = e.clientX + 170; y = e.clientY; });
  (function loop(){
    if (on) {
      cx += (x - cx) * .12; cy += (y - cy) * .12;
      box.style.left = cx + 'px'; box.style.top = cy + 'px';
    } else { cx = x; cy = y; }
    requestAnimationFrame(loop);
  })();
})();

/* ============================================================
   8 · MÉTODO
   ============================================================ */
const PASOS = [
  { t:'Nos cuentas', p:'Fechas, días disponibles, con quién viajas y qué te gustaría vivir. Una conversación, no un formulario.' },
  { t:'Diseñamos la ruta', p:'Armamos el recorrido completo con tiempos reales de traslado, para que ningún día se te vaya en la carretera.' },
  { t:'Ajustamos contigo', p:'Cambias lo que quieras: un día más en Cusco, menos caminata, otro hotel. Hasta que la ruta sea tuya.' },
  { t:'Te recogemos', p:'Aterrizas y alguien está esperándote con tu nombre. A partir de ahí, solo te toca disfrutar.' }
];
$('#mt-steps').innerHTML = PASOS.map((s, i) => `
  <li class="rev"><b>0${i + 1}</b><div><h4>${s.t}</h4><p>${s.p}</p></div></li>`).join('');

/* ============================================================
   9 · VOCES
   ============================================================ */
const VOCES = [
  { q:'Llegamos de madrugada y ya había alguien esperándonos con nuestro nombre. Todo el viaje se sintió así de resuelto.', c:'Sabrina R. · luna de miel' },
  { q:'Veníamos solo por Machu Picchu. Nos fuimos habiendo visto el desierto, el océano y una selva que no esperábamos.', c:'Laura & Mike · 14 días' },
  { q:'Cambiamos las fechas dos veces y siempre nos respondieron el mismo día. Esa tranquilidad vale mucho desde tan lejos.', c:'Carlos y familia · viaje familiar' }
];
const stage = $('#voice-stage'), vdots = $('#voice-dots');
stage.innerHTML = VOCES.map((v, i) => `<div class="voice${i ? '' : ' on'}"><q>${v.q}</q><cite>${v.c}</cite></div>`).join('');
vdots.innerHTML = VOCES.map((_, i) => `<button aria-label="Testimonio ${i + 1}" class="${i ? '' : 'on'}"></button>`).join('');
let vi = 0;
const showVoice = i => {
  vi = i;
  $$('.voice').forEach((v, k) => v.classList.toggle('on', k === i));
  [...vdots.children].forEach((d, k) => d.classList.toggle('on', k === i));
};
[...vdots.children].forEach((d, i) => d.onclick = () => showVoice(i));
setInterval(() => showVoice((vi + 1) % VOCES.length), 7000);

/* ============================================================
   10 · PLANIFICADOR
   ============================================================ */
const INTERES = ['Machu Picchu','Cusco y Valle Sagrado','Montañas y trekking','Desierto y dunas','Océano y fauna','Amazonía','Gastronomía','Historia y museos','Viajar sin prisa','Fotografía'];
const pick = $('#f-pick');
pick.innerHTML = INTERES.map(i => `<button type="button" data-hov>${i}</button>`).join('');
pick.addEventListener('click', e => { if (e.target.tagName === 'BUTTON') e.target.classList.toggle('on'); });

let step = 1;
const steps = $$('.pl-step'), labels = $$('.pl-steps span');
const back = $('#pl-back'), next = $('#pl-next'), plBar = $('#pl-bar');
const paintStep = () => {
  steps.forEach(s => s.classList.toggle('on', +s.dataset.step === step));
  labels.forEach((l, i) => l.classList.toggle('on', i === step - 1));
  back.classList.toggle('on', step > 1);
  plBar.style.width = (step / 3 * 100) + '%';
  next.querySelector('span').textContent = step === 3 ? 'Enviar por WhatsApp' : 'Siguiente';
};
back.onclick = () => { if (step > 1) { step--; paintStep(); } };
$('#pl-form').addEventListener('submit', e => {
  e.preventDefault();
  if (step < 3) { step++; paintStep(); return; }
  const v = id => ($(id).value || '').trim();
  const sel = [...pick.querySelectorAll('.on')].map(b => b.textContent);
  const msg = [
    `Hola PERUGO, soy ${v('#f-nombre') || '(nombre)'}${v('#f-pais') ? ', escribo desde ' + v('#f-pais') : ''}.`,
    `Contacto: ${v('#f-contacto') || '(por confirmar)'}.`,
    `Viaje: ${v('#f-cuando') || 'fechas por definir'} · ${$('#f-dias').value} · ${$('#f-quien').value}.`,
    sel.length ? `Me interesa: ${sel.join(', ')}.` : '',
    v('#f-notas') ? `Notas: ${v('#f-notas')}` : ''
  ].filter(Boolean).join('\n');
  window.open(wa(msg), '_blank', 'noopener');
});
paintStep();

/* ============================================================
   11 · VIDEO
   ============================================================ */
const frame = $('#hero-video');
const post = (method, value) => frame.contentWindow &&
  frame.contentWindow.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), '*');
let muted = true, playing = true;
$('#sound').onclick = e => {
  muted = !muted; post('setVolume', muted ? 0 : .6);
  e.currentTarget.textContent = muted ? 'Sonido apagado' : 'Sonido encendido';
};
$('#pause').onclick = e => {
  playing = !playing; post(playing ? 'play' : 'pause');
  e.currentTarget.textContent = playing ? '❙❙' : '▶';
};

const film = $('#film'), fbody = $('#film-body');
$$('[data-film]').forEach(b => b.onclick = () => {
  fbody.innerHTML = '<iframe src="https://player.vimeo.com/video/797801183?autoplay=1" title="Perú en movimiento" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  film.showModal();
});
$('.film-x').onclick = () => film.close();
film.addEventListener('close', () => fbody.innerHTML = '');

/* ============================================================
   12 · PARALLAX + REVEAL
   ============================================================ */
(function parallax(){
  const els = $$('[data-parallax]');
  if (!els.length || REDUCED) return;
  let raf = null;
  const run = () => {
    raf = null;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const off = (r.top + r.height / 2 - innerHeight / 2) * -parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
    });
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(run); }, { passive:true });
  run();
})();

$$('.shell > *:not(.sec-num), .rev, .pr-media, .rt-row').forEach(el => el.classList.add('rev'));
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold:.1, rootMargin:'0px 0px -60px' });
$$('.rev').forEach(el => io.observe(el));
