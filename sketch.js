// variabili

var mySong;
var analyzer;

var siglaSante;
var gf;

var cerchio = 200;
var rotazione;
var frequenza = 0.00001;
var raggio;
var limite;

var colore;
var aumenta;
var aumenta2;

var ruoto = 0;

function preload(){
   mySong = loadSound("./assets/forum_sigla.mp3");
   siglaSante = loadSound('assets/grande_fratello_sigla.mp3');
   rita = loadImage("./assets/rita_dalla_chiesa.png");
   sante = loadImage("./assets/sante_licheri.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude(0.9);
  analyzer.setInput(mySong);
  mySong.loop();
  gf = new Gf(width/2, height/2, 64);
}

function draw() {
  //usa i radianti
  ellipseMode(RADIUS);

  var volume = 0;
  var volume2 = 0;
  ruoto = ruoto + 0.05;

  // stringhe di codice per le sigle
  if (mouseIsPressed == false) {
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
    volume = analyzer.getLevel();
    volume = map(volume,0,1,0,height/10);
    siglaSante.stop();
  } else {
    mySong.stop();

    if (gf.contains(mouseX, mouseY)) {
    if (siglaSante.isPlaying() == false) {
      siglaSante.play();
    }
    volume2 = analyzer.getLevel();
    volume2 = map(volume2,0,1,0,height/10);
  }
  }

  // background iniziale
  background('#996600');


  // centrato
  translate(width/2, height/2);
  rotate(radians(rotazione));


  //  valori che servono per definire i cerchi e/o colori di secondo background
  limite=map(volume,0, 0.5, 0, 20);
  aumenta=map(volume,0, 1, 3.5, 5);
  aumenta2=map(volume2,0, 1, 3.5, 50);


  //rite interne
  for (var i=0; i<limite; i ++) {
      cerchio = width/(5+(aumenta/5)) + 30*sin(millis()*frequenza*i);
      raggio = map(cerchio,150,250,15,35);
      image(rita, cerchio*sin(i), cerchio*cos(i),raggio*(volume/10),raggio*(volume/10));
      rotazione = rotazione+0.00005;
      }

// rite esterne
  for (var i=0; i<limite; i ++) {
      cerchio = width/2.5 + 100*sin(millis()*frequenza*i);
      raggio=map(cerchio,150,250,10,20);
      image(rita,cerchio*cos(i), cerchio*sin(i),raggio*(volume/10),raggio*(volume/10));
      }

    // titolo 1
    var testo = 'ONLY SANTE LICHERI';
    textFont('Anton');
    textAlign(CENTER);
    textSize(26);
    fill(210);
    text(testo, 5, -290);

    //titolo 2
    var testo = 'CAN JUDGE ME!';
    textFont('Anton');
    text(testo, 5, -250);

    // sottotitolo
    textSize(12);
    var testo = 'Resize the canvas to see Rita smaller or bigger or keep pressing on the face of Sante to listen to his fav show soundtrack';
    text(testo, 5, -220);


    // colore del background premuto sante
    colore=map(volume,1, 0, 50, 150);
    
    // una volta premuto sante lui ruota e cambia colore lo sfondo
    push();
    if (mouseIsPressed == true) {
      scale(aumenta2);
      rotate(ruoto);
      background(0, colore+20, colore+200);
      }
    gf.display(mouseX, mouseY);
    image(sante, -93, -93, 193, 193);
    pop();

}

// oggetti e metodi per far partire il suono se sante poi viene cliccato
var Gf = function(x_, y_, r_) {
  var x = x_;
  var y = y_;
  var r = r_;


  this.contains = function(mx, my) {
    if (dist(mx, my, x, y) < r) {
      return true;
    } else {
      return false;
    }
  };

  this.display = function(mx, my) {
    noStroke();
    noFill();
    ellipse(x, y, r, r);
  };
};

// se si diminuisce o si aumenta il canvas occupa tutto lo schermo e non viene tagliato nulla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
