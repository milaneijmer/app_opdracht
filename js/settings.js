const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
let lijst = document.querySelector('.mdc-list');  
let hamburger = document.querySelector('#hamburger');

window.addEventListener("load", () => {
    if("serviceWorker" in navigator) {
      navigator.serviceWorker.register("js/service-worker.js");
    }
  });

  for (const el of document.querySelectorAll('.mdc-switch')) {
    const switchControl = new MDCSwitch(el);
  }

  hamburger.addEventListener('click', (event) => {
    drawer.open =true
    if (drawer.open)
    {
    drawer.open = false;
    }
    else
    {
    drawer.open = true;
    }
    });
    
    lijst.addEventListener('click', (event) => {
    if (drawer.open= true){
      drawer.open = false;
    }
    });