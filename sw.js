/* v2: network-first. The old (v1) service worker was cache-first, which
   meant once the app was opened once, the phone kept showing that cached
   copy forever, even after new files were uploaded to GitHub. This version
   always tries the network first (so a redeploy is picked up immediately)
   and only falls back to the cached copy if the device is truly offline. */
const CACHE = 'jb-billing-v2';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (e)=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', (e)=>{
  if(e.request.method!=='GET') return;
  // Never intercept Firebase/Firestore/Google network calls — cloud data must always go live.
  const url = e.request.url;
  if(url.includes('googleapis.com') || url.includes('firebaseio.com') || url.includes('firebaseapp.com') || url.includes('gstatic.com')) return;
  e.respondWith(
    fetch(e.request).then(resp=>{
      if(resp && resp.status===200){ const clone = resp.clone(); caches.open(CACHE).then(c=>c.put(e.request, clone)); }
      return resp;
    }).catch(()=> caches.match(e.request))
  );
});
