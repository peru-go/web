(() => {
 const elements=[...document.querySelectorAll('[data-en]')];elements.forEach(el=>el.dataset.es=el.innerHTML);
 function apply(lang){document.documentElement.lang=lang;elements.forEach(el=>el.innerHTML=el.dataset[lang]);document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));try{localStorage.setItem('perugo-lang',lang)}catch(e){}}
 document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.lang)));
 let lang='es';try{lang=localStorage.getItem('perugo-lang')==='en'?'en':'es'}catch(e){}apply(lang);
 const button=document.querySelector('#menu-btn'),links=document.querySelector('.nav-links');button.addEventListener('click',()=>{const open=links.classList.toggle('open');button.classList.toggle('on',open);button.setAttribute('aria-expanded',String(open))});
})();
document.addEventListener('click',e=>{document.querySelectorAll('.destination-menu[open]').forEach(menu=>{if(!menu.contains(e.target))menu.open=false})});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.destination-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})});
