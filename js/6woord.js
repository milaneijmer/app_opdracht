const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
let lijst = document.querySelector('.mdc-list');  
let hamburger = document.querySelector('#hamburger');
let alertBox = document.querySelector(".alert")
let letterTeller = 0;
let counter = 1;
let inputWoord = ""

let rij1 = document.querySelector('.rij1');
let rij2 = document.querySelector('.rij2');
let rij3 = document.querySelector('.rij3');
let rij4 = document.querySelector('.rij4');
let rij5 = document.querySelector('.rij5');
let rij6 = document.querySelector('.rij6');

let random = Math.floor(Math.random() *473)

import jsonFile from "../json/app.json"  with { type: 'json' };;

let woord = jsonFile[`6woorden`][random]['woord'];

let woordArray = woord.split("");

console.log(woord)

window.addEventListener("load", () => {
  if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("js/service-worker.js");
  }
      // disabled alle rijen behalve de 1e
      ['rij2', 'rij3', 'rij4', 'rij5', 'rij6'].forEach(rij => {
      document.querySelectorAll(`.${rij} input`).forEach(input => {
        input.disabled = true;
      });
    });
});

$('input').on('keyup', function(e) {
      // als je een symbool of een cijfer typt, wordt het verwijdert
    this.value=this.value.replace(/[^a-zA-Z]/, '')
    if (e.key.match(/^[a-zA-Z]$/)) {
            // gaat naar volgende input element
        $(this).next('input').focus(); 
        }  
        // checkt of je op backspace drukt om naar het vorige input element te gaan
          if (e.key.match('Backspace')) {
            $(this).prev('input').focus();
        }
    
          // checkt of je op enter drukt en je in het laatste element van de rij staat
        if (e.key.match('Enter'))
          { 
          if ($(this).index() != 5)
          { 
            alertBox.textContent ="niet genoeg letters";
            alertBox.classList.remove("hidden");
            setTimeout(function(){
              alertBox.classList.add("hidden");
            }, 3000);
            return
          } 
          else if ($(this).index() == 5)
            {
                //disabled de vorige rij en enabled de volgende
            document.querySelectorAll(`.rij${counter} input`).forEach(input => {
              let woordLetter = input.value
              if(input.value == "")
                {
                  alertBox.textContent ="niet genoeg letters";
                  alertBox.classList.remove("hidden");
                  setTimeout(function(){
                    alertBox.classList.add("hidden");
                  }, 3000);
                  return
                }    
              input.style.backgroundColor = "red";
              let woordCount = 0;
              while(woordCount < 6)
                {
              if(woordLetter == woordArray[woordCount])
                { 
                  input.style.backgroundColor = "yellow";
                  console.log("geel")
                }
                woordCount++;
              }
              if (woordLetter == woordArray[letterTeller])
              {
                input.style.backgroundColor = "green";
                console.log('groen')
              } 
              inputWoord += woordLetter;
              letterTeller++;
              input.disabled = true;
            });
            letterTeller = 0;
            counter++;
            console.log(inputWoord)
            if(counter == 7 && inputWoord != woord)
              {
                alertBox.textContent ="Helaas, het woord was " + woord;
                alertBox.classList.remove("hidden");
              }
            if(inputWoord == woord)
              {
                alertBox.textContent ="Goed geraden";
                  alertBox.classList.remove("hidden");
                  setTimeout(function(){
                      location.href = "./succes.html"
                  }, 1000);
                  return
              }
            document.querySelectorAll(`.rij${counter} input`).forEach(input => {
              input.disabled = false;
            });
            document.querySelectorAll(`.rij${counter} input`)[0].focus();
            }
            inputWoord = "";
          }

  })

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
