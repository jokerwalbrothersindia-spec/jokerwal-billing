const CACHE = 'jb-billing-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e)=>{
  if(e.request.method!=='GET') return;
  // Never intercept Firebase/Firestore/Google network calls — cloud data must always go live.
  const url = e.request.url;
  if(url.includes('googleapis.com') || url.includes('firebaseio.com') || url.includes('firebaseapp.com') || url.includes('gstatic.com')) return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const fetchPromise = fetch(e.request).then(resp=>{
        if(resp && resp.status===200){ const clone = resp.clone(); caches.open(CACHE).then(c=>c.put(e.request, clone)); }
        return resp;
      }).catch(()=>cached);
      return cached || fetchPromise;
    })
  );
});