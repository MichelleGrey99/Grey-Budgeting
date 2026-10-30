// Bump V on every release so phones pick up the new version.
const V='v46';
const SHELL=['./','index.html','manifest.webmanifest','firebase-config.js','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){}const x=d.data||d;
 e.waitUntil(self.registration.showNotification(x.title||'Did this class take place?',{body:x.body||'',tag:x.tag,data:x,icon:'icon-192.png',actions:[{action:'yes',title:'Yes'},{action:'no',title:'No'}]}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const d=e.notification.data||{};
 const url='./?cid='+encodeURIComponent(d.cid||'')+'&d='+encodeURIComponent(d.date||'')+'&r='+(e.action==='yes'?'yes':'no');
 e.waitUntil(clients.matchAll({type:'window'}).then(l=>{for(const c of l){if('focus' in c){c.navigate(url);return c.focus()}}return clients.openWindow(url)}))});
