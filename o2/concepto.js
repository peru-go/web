'use strict';
const places=[
{id:'machu',name:'Machu Picchu',region:'CUSCO · LOS ANDES',category:'Cultura',line:'Ese momento en que la foto se convierte en tu recuerdo.',image:'https://www.muchbetteradventures.com/magazine/content/images/2023/10/machu-picchu-2.jpg'},
{id:'dunas',name:'Huacachina',region:'ICA · EL DESIERTO',category:'Aventura',line:'Bajar el ritmo. Subir una duna. Mirar cómo cambia la luz.',image:'https://backiee.com/static/wallpapers/1920x1080/267116.jpg'},
{id:'lima',name:'Lima histórica',region:'LIMA · LA CIUDAD',category:'Cultura',line:'Balcones, plazas e historias que se descubren caminando.',image:'https://machupicchu.center/images/lima-cathedral.webp'},
{id:'ballestas',name:'Islas Ballestas',region:'PARACAS · EL OCÉANO',category:'Naturaleza',line:'Salir al mar y encontrarte con la vida de la costa peruana.',image:'https://upload.wikimedia.org/wikipedia/commons/2/28/Humboldt_Penguins_on_the_Ballestas_Islands_%286990567902%29.jpg'},
{id:'sabores',name:'El sabor de Lima',region:'LIMA · A LA MESA',category:'Sabores',line:'Conocer un país también es sentarse a su mesa.',image:'https://viajesaperu.pe/web/121730f/tours-gastronomico-ceviche.jpg'},
{id:'nazca',name:'Líneas de Nazca',region:'NAZCA · EL MISTERIO',category:'Cultura',line:'Otra perspectiva de un paisaje que guarda preguntas.',image:'https://www.worldhistory.org/img/r/p/1500x1500/2366.jpg'}
];
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const selected=new Set();
let filter='Todo';
const state={step:0,travelers:'',start:'',end:'',flexible:false,budget:'',name:'',email:'',notes:''};
const listDialog=$('#list-dialog'),plannerDialog=$('#planner-dialog'),mediaDialog=$('#media-dialog');
function showDialog(dialog){$$('dialog[open]').forEach(d=>d.close());dialog.showModal()}
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}));
function renderPlaces(){
 const visible=places.filter(p=>filter==='Todo'||p.category===filter);
 $('#destinations').classList.toggle('filtered',filter!=='Todo');
 $('#destinations').innerHTML=visible.map(p=>{const chosen=selected.has(p.id);return '<article class="destination '+(chosen?'selected':'')+'"><div class="destination-photo"><img src="'+p.image+'" alt="'+p.name+'" loading="lazy"><span class="photo-label">'+p.region+'</span><button class="add-place" data-add="'+p.id+'" aria-pressed="'+chosen+'" aria-label="'+(chosen?'Quitar ':'Añadir ')+p.name+(chosen?' de mi Perú':' a mi Perú')+'">'+(chosen?'✓':'＋')+'</button></div><div class="destination-info"><div><h3>'+p.name+'</h3><p>'+p.line+'</p></div><span class="destination-number">0'+(places.indexOf(p)+1)+'</span></div></article>'}).join('');
}
function sync(){
 $$('[data-count]').forEach(el=>el.textContent=selected.size);
 $('.floating-list').setAttribute('aria-label','Abrir mi lista: '+selected.size+(selected.size===1?' lugar':' lugares'));
 const chosen=places.filter(p=>selected.has(p.id));
 $('#route-preview').innerHTML=chosen.length?chosen.map((p,i)=>'<div class="route-stop"><span><img src="'+p.image+'" alt=""></span><div><strong>'+p.name+'</strong><small>'+p.region+'</small></div><button class="route-remove" data-route-remove="'+p.id+'" aria-label="Quitar '+p.name+' de mi lista">×</button></div>').join(''):'<div class="route-empty"><strong>Aquí empieza<br>lo que viene.</strong><p>Tu lista está en blanco.<br>Llénala de lugares que te emocionen.</p><a href="#descubrir">Elegir mi primer lugar ↗</a></div>';
 $('#wishlist-items').innerHTML=chosen.length?chosen.map(p=>'<div class="wish-item"><img src="'+p.image+'" alt=""><div><strong>'+p.name+'</strong><small>'+p.category+'</small></div><button data-remove="'+p.id+'" aria-label="Quitar '+p.name+'">−</button></div>').join(''):'<div class="empty-list">Tu viaje todavía es una página en blanco.<br>Empieza por ese lugar que siempre has querido conocer.<br><button id="explore-from-list">Descubrir lugares ↗</button></div>';
}
function togglePlace(id){if(selected.has(id))selected.delete(id);else selected.add(id);renderPlaces();sync()}
$('#destinations').addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(!btn)return;const id=btn.dataset.add;togglePlace(id);$('#destinations [data-add="'+id+'"]')?.focus({preventScroll:true})});
$('#wishlist-items').addEventListener('click',e=>{const btn=e.target.closest('[data-remove]');if(btn){const id=btn.dataset.remove;const buttons=$$('[data-remove]');const index=buttons.indexOf(btn);togglePlace(id);const remaining=$$('[data-remove]');(remaining[Math.min(index,remaining.length-1)]||listDialog.querySelector('[data-plan]')).focus()}if(e.target.closest('#explore-from-list')){listDialog.close();$('#descubrir').scrollIntoView()}});
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;$$('[data-filter]').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});renderPlaces()}));
$$('[data-open-list]').forEach(btn=>btn.addEventListener('click',()=>{sync();showDialog(listDialog)}));
const menu=$('.menu');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.textContent=open?'✕':'☰';$('#mobile-nav').hidden=!open});
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');menu.textContent='☰';$('#mobile-nav').hidden=true}
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
let muted=true,paused=false;
const video=$('#hero-video');
function videoCommand(method,value){video.contentWindow?.postMessage({method,value},'https://player.vimeo.com')}
function syncVideo(){ $('#sound').textContent=muted?'Sonido apagado':'Sonido activado';$('#sound').setAttribute('aria-label',muted?'Activar sonido':'Silenciar video');$('#pause').textContent=paused?'▷':'Ⅱ';$('#pause').setAttribute('aria-label',paused?'Reproducir video':'Pausar video')}
$('#sound').addEventListener('click',()=>{muted=!muted;videoCommand('setVolume',muted?0:1);syncVideo()});
$('#pause').addEventListener('click',()=>{paused=!paused;videoCommand(paused?'pause':'play');syncVideo()});
if(matchMedia('(prefers-reduced-motion: reduce)').matches||navigator.connection?.saveData){paused=true;video.removeAttribute('src');video.style.display='none';$('#pause').hidden=true;$('#sound').hidden=true;syncVideo()}
$('#watch').addEventListener('click',()=>{videoCommand('pause');paused=true;syncVideo();$('#media-content').innerHTML='<iframe src="https://player.vimeo.com/video/797801183?autoplay=1" title="Viaje por Perú" allow="autoplay; fullscreen" allowfullscreen></iframe><p>Video de destino conservado de la web anterior. <a href="https://vimeo.com/797801183" target="_blank" rel="noopener">Ver fuente en Vimeo ↗</a></p>';showDialog(mediaDialog)});
mediaDialog.addEventListener('close',()=>$('#media-content').innerHTML='');
$('#credits').addEventListener('click',()=>{$('#media-content').innerHTML='<h2>Tu propio Perú.</h2><p>Nueva propuesta de concepto para PERUGO.PE: descubrimiento editorial, lista de deseos y un viaje diseñado contigo. La identidad combina una llama viajera con colores vivos y motivos geométricos inspirados en tejidos andinos. La ilustración de la llama fue creada con ImageGen.</p><p>Se conserva el video de <a href="https://vimeo.com/797801183" target="_blank" rel="noopener">Vimeo</a> de la propuesta anterior. Fotografías de referencia de Much Better Adventures, Backiee, Machupicchu.center, Wikimedia Commons, Viajes a Perú, World History Encyclopedia y Valencia Travel Cusco.</p><p>Esta es una propuesta local. Antes de publicar se deben validar los derechos de los medios, el número de WhatsApp y las experiencias que opera el equipo. No se muestran testimonios inventados. El planificador prepara un resumen y permite compartirlo por WhatsApp; no confirma reservas ni guarda solicitudes en un servidor.</p>';showDialog(mediaDialog)});
function option(value,title,note,checked,type='radio',name='choice'){return '<label class="option"><input type="'+type+'" name="'+name+'" value="'+escapeHtml(value)+'" '+(checked?'checked':'')+'><span><strong>'+title+'</strong><small>'+note+'</small></span></label>'}
function todayLocal(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function renderStep(focus=true){
 $('#form-error').textContent='';$('#summary').hidden=true;$('#planner-form').hidden=false;
 const names=['CON QUIÉN','TUS LUGARES','CUÁNDO','TU IDEA DE VIAJE','CÓMO TE LLAMAS'];
 $('#step-label').textContent='0'+(state.step+1)+' / 05 — '+names[state.step];
 $('#progress-track').setAttribute('aria-valuenow',state.step+1);$('#progress-track>span').style.width=((state.step+1)*20)+'%';
 $('#previous').style.visibility=state.step===0?'hidden':'visible';
 $('#next').textContent=state.step===4?'Ver mi viaje ↗':'Continuar ↗';
 let html='';
 if(state.step===0)html='<h2 class="step-question" tabindex="-1">Lo primero:<br><em>¿con quién vienes?</em></h2><p class="step-caption">La compañía también le da forma al viaje.</p><div class="options">'+[['Solo','A mi propio ritmo'],['En pareja','Un viaje para dos'],['En familia','Recuerdos compartidos'],['Con amigos','Nuestra próxima historia']].map(([v,n])=>option(v,v,n,state.travelers===v)).join('')+'</div>';
 if(state.step===1)html='<h2 class="step-question" tabindex="-1">Este es el Perú<br><em>que te llama.</em></h2><p class="step-caption">Tus lugares guardados ya están seleccionados. Puedes añadir o quitar los que quieras.</p><div class="options">'+places.map(p=>option(p.id,p.name,p.category,selected.has(p.id),'checkbox','place')).join('')+'</div>';
 if(state.step===2)html='<h2 class="step-question" tabindex="-1">¿Cuándo empieza<br><em>tu aventura?</em></h2><p class="step-caption">Unas fechas aproximadas nos ayudan a darle forma.</p><div class="form-fields"><label class="field">Llegada a Perú<input type="date" name="start" min="'+todayLocal()+'" value="'+state.start+'" '+(state.flexible?'disabled':'')+'></label><label class="field">Salida de Perú<input type="date" name="end" min="'+(state.start||todayLocal())+'" value="'+state.end+'" '+(state.flexible?'disabled':'')+'></label></div><label class="check-line"><input type="checkbox" name="flexible" '+(state.flexible?'checked':'')+'>Todavía no lo sé. Tengo flexibilidad.</label>';
 if(state.step===3)html='<h2 class="step-question" tabindex="-1">Hablemos de<br><em>lo que tienes en mente.</em></h2><p class="step-caption">Presupuesto aproximado por persona, sin vuelos internacionales. Nos orienta para diseñar tu propuesta.</p><div class="options">'+['Hasta USD 500','USD 500–1.500','Más de USD 1.500','Prefiero conversarlo'].map(v=>option(v,v,v==='Prefiero conversarlo'?'Lo definimos juntos':'Por persona',state.budget===v)).join('')+'</div>';
 if(state.step===4)html='<h2 class="step-question" tabindex="-1">Ya casi estamos.<br><em>¿Cómo te llamas?</em></h2><p class="step-caption">Revisarás tu resumen antes de compartirlo. Hasta entonces, tus datos se quedan en esta página.</p><div class="form-fields"><label class="field">Tu nombre<input name="name" autocomplete="given-name" required maxlength="80" value="'+escapeHtml(state.name)+'"></label><label class="field">Correo (opcional)<input type="email" name="email" autocomplete="email" maxlength="120" value="'+escapeHtml(state.email)+'"></label><label class="field wide">Algo más que te gustaría contarnos (opcional)<textarea name="notes" maxlength="1000" placeholder="Tu ritmo, una celebración, algo que no quieres perderte…">'+escapeHtml(state.notes)+'</textarea></label></div>';
 $('#step-body').innerHTML=html;
 if(state.step===2){$('#step-body [name=flexible]').addEventListener('change',e=>$$('#step-body [type=date]').forEach(input=>input.disabled=e.target.checked));$('#step-body [name=start]').addEventListener('change',e=>$('#step-body [name=end]').min=e.target.value||todayLocal())}
 if(focus)$('.step-question').focus();
}
function capture(){
 const data=new FormData($('#planner-form'));
 if(state.step===0)state.travelers=data.get('choice')||'';
 if(state.step===1){selected.clear();data.getAll('place').forEach(id=>selected.add(id));renderPlaces();sync()}
 if(state.step===2){state.flexible=data.get('flexible')==='on';state.start=data.get('start')||'';state.end=data.get('end')||''}
 if(state.step===3)state.budget=data.get('choice')||'';
 if(state.step===4){state.name=(data.get('name')||'').trim();state.email=(data.get('email')||'').trim();state.notes=(data.get('notes')||'').trim()}
}
function validate(){
 if(state.step===0&&!state.travelers)return 'Elige con quién te gustaría viajar.';
 if(state.step===1&&!selected.size)return 'Elige al menos un lugar para empezar.';
 if(state.step===2&&!state.flexible){if(!state.start||!state.end)return 'Indica tus fechas o elige la opción flexible.';if(state.start<todayLocal())return 'La llegada debe ser hoy o una fecha futura.';if(state.end<state.start)return 'La salida debe ser igual o posterior a la llegada.'}
 if(state.step===3&&!state.budget)return 'Elige una opción o «Prefiero conversarlo».';
 if(state.step===4&&!state.name)return 'Cuéntanos tu nombre.';
 return '';
}
function summaryText(){return 'Hola PERUGO, quiero diseñar mi viaje.\n\nSoy '+state.name+'.\nViajo: '+state.travelers+'.\nMi Perú: '+places.filter(p=>selected.has(p.id)).map(p=>p.name).join(', ')+'.\nFechas: '+(state.flexible?'Por definir; tengo flexibilidad':state.start+' al '+state.end)+'.\nPresupuesto por persona: '+state.budget+'.'+(state.email?'\nCorreo: '+state.email:'')+(state.notes?'\nMe gustaría contarles: '+state.notes:'')+'\n\n¿Podemos conversar sobre una ruta y su disponibilidad?'}
function finish(){
 const text=summaryText();$('#planner-form').hidden=true;$('#summary').hidden=false;
 $('#summary').innerHTML='<h2 tabindex="-1">De aquí sale<br><em>un gran viaje.</em></h2><p class="muted">Este es el comienzo. Compártelo con nosotros y conversemos sobre cómo hacerlo realidad.</p><div class="summary-text">'+escapeHtml(text)+'</div><div class="summary-actions"><a class="pill coral" href="https://wa.me/51954708174?text='+encodeURIComponent(text)+'" target="_blank" rel="noopener">Conversar por WhatsApp ↗</a><button class="pill" id="save-summary">Guardar resumen ↓</button><button class="pill" id="edit-summary">Editar</button></div><p class="small">Al abrir WhatsApp podrás revisar y enviar el mensaje. Este paso no confirma una reserva.</p>';
 $('#summary h2').focus();
 $('#edit-summary').addEventListener('click',()=>renderStep());
 $('#save-summary').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Mi-Peru-PERUGO.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
}
$('#planner-form').addEventListener('submit',e=>{e.preventDefault();capture();const error=validate();if(error){$('#form-error').textContent=error;return}if(state.step<4){state.step++;renderStep()}else finish()});
$('#previous').addEventListener('click',()=>{capture();state.step=Math.max(0,state.step-1);renderStep()});
$('#planner-form').addEventListener('change',()=>{if(state.step===1)capture()});
plannerDialog.addEventListener('close',()=>{if(!$('#planner-form').hidden)capture()});
$$('[data-plan]').forEach(button=>button.addEventListener('click',()=>{renderStep(false);showDialog(plannerDialog);$('.step-question').focus()}));
renderPlaces();sync();

$('#route-preview').addEventListener('click',e=>{const b=e.target.closest('[data-route-remove]');if(b){togglePlace(b.dataset.routeRemove);const next=$('#route-preview [data-route-remove]');(next||$('.trip-paper [data-plan]')).focus()}});
