if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/service-worker.js', {scope: '/service-worker-test/'})
    .then(reg => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }) .catch(error => {
        console.log('Registration failed with ' + error);
    });
}
  
console.log('Service Worker: Registered');