import {readFile,writeFile,cp,readdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url), dist=new URL('../dist/',import.meta.url);
const names=[];for(const e of await readdir(dist,{withFileTypes:true}))if(e.isFile()&&!/\.(html|js|css)$/.test(e.name))names.push(e.name);
const fix=(s,prefix='./')=>{for(const n of names)s=s.replaceAll('"/'+n+'"','"'+prefix+n+'"').replaceAll("'/"+n+"'","'"+prefix+n+"'").replaceAll('url(/'+n+')','url('+prefix+n+')');return s};
for(const e of await readdir(dist,{withFileTypes:true}))if(e.name!=='index.source.html')await cp(new URL(e.name,dist),new URL(e.name,root),{recursive:true});
let html=fix(await readFile(new URL('index.html',dist),'utf8')).replaceAll('src="/assets/','src="./assets/').replaceAll('href="/assets/','href="./assets/').replaceAll('type="module" crossorigin','defer').replaceAll('rel="stylesheet" crossorigin','rel="stylesheet"');
await writeFile(new URL('index.html',root),html);
for(const n of await readdir(new URL('assets/',root)))if(/\.(js|css)$/.test(n)){const f=new URL('assets/'+n,root);await writeFile(f,fix(await readFile(f,'utf8'),n.endsWith('.css')?'../':'./'));}
console.log('Versión portable exportada a index.html');
