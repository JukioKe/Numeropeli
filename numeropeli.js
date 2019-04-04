'use strict'

// arvotaan arvattava numero väliltä 0-100, 0 ja sata myös mahdollisia
var arvattava = Math.floor(Math.random() * (100 + 1));

/* muuttuja pelaajan nykyistä arvausta varten. Alkuarvo on undefined,
jotta erotetaan, onko tehty yhtään arvausta vai ei*/
var arvaus = undefined;
var arvauksia = 0;
var parasAlin = -1;
var parasYlin = 101;
var arvausTaulukko = [];

// DOM-elementit muuttujissa
var vihjeElem = document.getElementById('vihje')
var parasAlinElem = document.getElementById('alempi')
var parasYlinElem = document.getElementById('ylempi')
var lopetusTekstiElem = document.getElementById('lopetusteksti')
var lowerbar = document.getElementById('lower-bar')
var middlebar = document.getElementById('middle-bar')
var upperbar = document.getElementById('upper-bar')
var lowerBarNumber = document.getElementById('lowerbarnumber')
var middleBarNumber = document.getElementById('middlebarnumber')
var upperBarNumber = document.getElementById('upperbarnumber')

// Event-käsittelijä lomakkeelle
function arvausTehty() {
  // haetaan käyttäjän syöttämä arvo ja tulkitaan se numeroksi
  var syote = document.getElementById('luku').value;
  arvaus = Number(syote);
  arvausTaulukko.push(arvaus);

  arvauksia++;

  // tyhjennetään lomake uutta arvausta varten
  document.getElementById('lomake').reset();

  // jos arvauksia > 0 ei näytetä wrapperia
  if (arvauksia > 0) {
    document.getElementById('wrapper').style.display = 'none';
  }

  // Päivitetään tilanne viimeisimmän arvauksen mukaan
  if (arvattava > arvaus) {
    if (parasAlin == undefined || parasAlin < arvaus) {
      parasAlin = arvaus;
      parasAlinElem.innerHTML = "Paras alin arvaus: " + parasAlin;
      vihjeElem.innerHTML = "Arvattava luku on suurempi kuin " + arvaus;
      paivitaLowerBar(arvaus);
    }
  } else if (arvattava < arvaus) {
    if (parasYlin == undefined || parasYlin > arvaus) {
      parasYlin = arvaus;
      parasYlinElem.innerHTML = "Paras ylin arvaus: " + parasYlin;
      vihjeElem.innerHTML = "Arvattava luku on pienempi kuin " + arvaus;
      paivitaUpperBar(arvaus);
    }
  } else {
    parasAlinElem.innerHTML = "";
    parasYlinElem.innerHTML = "";
    vihjeElem.innerHTML = "Hienoa, " + arvaus + " oli oikein! Arvauksia: " + arvauksia;

    // jos arvauksia vähemmän kuin 8, näytetään voittoteksti ja ilotulitus
    if (arvauksia < 8) {
      naytaVoittoPopup()
      document.getElementById('ilotulitus').style.display = 'inline';
      document.gete
    }

    naytaLopetusTeksti();
    document.getElementById("bar-chart").style.display = "none";
  }
  paivitaMiddleBar();

  /*onsubmit-käsittelijä palauttaa false, jotta lomaketta ei oikeasti lähetettäisi
  lähetys lataisi sivun uudelleen ja nollaisi koko pelin*/
  return false;
}

function naytaLopetusTeksti() {
  document.getElementById("lopetusteksti").style.display = "block";
  var teksti = document.getElementById("lopetusteksti").innerHTML + "<br /><br />";
  var i;
  for (i = 0; i < arvausTaulukko.length; i++) {
    teksti += arvausTaulukko[i] + "<br /><br />";
  }
  lopetusTekstiElem.innerHTML = teksti;
}

function naytaVoittoPopup() {
  var popup = document.getElementById("voittoPopup");
  popup.classList.toggle("show");
}

function paivitaLowerBar(arvaus) {
  lowerbar.style.width = "" + arvaus + "%";
  lowerBarNumber.innerHTML = "" + arvaus + "%";
}

function paivitaUpperBar(arvaus) {
  upperbar.style.width = "" + (100 - arvaus) + "%";
  upperBarNumber.innerHTML = "" + (100 - arvaus) + "%";
}

function paivitaMiddleBar() {
  var lower = parseInt(lowerBarNumber.innerHTML)
  var upper = parseInt(upperBarNumber.innerHTML)

  if (isNaN(lower)) {
    lower = 0;
  } else if (isNaN(upper)) {
    upper = 0;
  }

  if (lower >= 0 || upper >= 0) {
    middlebar.style.width = "" + (100 - lower - upper) + "%";
    middleBarNumber.innerHTML = "" + (100 - lower - upper) + "%";
  }
}

// asetetaan tapahtumankäsittelijä lomakkeelle, siis määritellään,
// mitä funktiota kutsutaan, kun lomake lähetetään
document.getElementById('lomake').onsubmit = arvausTehty;