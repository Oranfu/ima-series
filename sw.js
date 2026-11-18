var C = 'series-v1';
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(C).then(function(c){ return c.addAll(['./index.html','./manifest.json','./icon-180.png']); }));
  self.skipWaiting();
});
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function(r){
    var copy = r.clone(); caches.open(C).then(function(c){ c.put(e.request, copy); }); return r;
  }).catch(function(){ return caches.match(e.request).then(function(m){ return m || caches.match('./index.html'); }); }));
});
