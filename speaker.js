var osc, fft,test;
var freqq = 1;
var amp = 0.5;
var x = 0;
var offset = 20;
var freqUp0=0;
var freqDo0=0;
var freqUp1=0;
var freqDo1=0;
var freqUp2=0;
var freqDo2=0;

function setup(){
  createCanvas(700, 500);
  chooseWave("sqr");
}


function keyTyped() {
  if (key === 'r') {
    amp += 0.1;
  }
  if (key === 'f') {
    amp -= 0.1;
  }
  if (key === 'q') {
    freqDo0 = 1;
    freqUp0 = 0;
  }
  if (key === 'w') {
    freqUp0 = 1;
    freqDo0 = 0;
  }
  if (key === 'e') {
    freqUp0 = 0;
    freqDo0 = 0;
  }
  if (key === 'a') {
    freqDo1 = 1;
    freqUp1 = 0;
  }
  if (key === 's') {
    freqUp1 = 1;
    freqDo1 = 0;
  }
  if (key === 'd') {
    freqUp1 = 0;
    freqDo1 = 0;
  }
  if (key === 'z') {
    freqDo2 = 1;
    freqUp2 = 0;
  }
  if (key === 'x') {
    freqUp2 = 1;
    freqDo2 = 0;
  }
  if (key === 'c') {
    freqUp2 = 0;
    freqDo2 = 0;
  } 
  if (key === 't') {
    amp = 0;
  }
  if (key === 'v') {
    amp=0.5;
    freqq=1;
    freqUp0 = 0;
    freqDo0 = 0;
    freqUp1 = 0;
    freqDo1 = 0;
    freqUp2 = 0;
    freqDo2 = 0;
  }
    if (key === 'b') {
    amp=0.5;
    freqq=240;
    freqUp0 = 0;
    freqDo0 = 0;
    freqUp1 = 0;
    freqDo1 = 0;
    freqUp2 = 0;
    freqDo2 = 0;
  }
    if (key === 'n') {
    amp=0.5;
    freqq=480;
    freqUp0 = 0;
    freqDo0 = 0;
    freqUp1 = 0;
    freqDo1 = 0;
    freqUp2 = 0;
    freqDo2 = 0;
  }   
  if (key === '1') {
    osc.stop();
    chooseWave("sqr");
  }
  if (key === '2') {
    osc.stop();
    chooseWave("tri");
  }
  if (key === '3') {
    osc.stop();
    chooseWave("sin");
  }
}

function chooseWave(waveType){
    
    if (waveType === "sqr"){
      osc = new p5.SqrOsc();
    }
    if (waveType === "tri"){
      osc = new p5.TriOsc();
    }
    if (waveType === "sin"){
      osc = new p5.SinOsc();
    }
    osc.freq(freqq);
    osc.amp(amp);
    fft = new p5.FFT();
    osc.start();

}


function drawStereo(y){
  translate(width*7/8, height*0.7);
  textSize(12);
  text("Frequency: "+ parseFloat(Math.round(freqq * 100) / 100).toFixed(2) + " Hz",-140,-230);
  rotate(PI);
  fill(128);
  stroke(128);
  rect(0,0,100,200,0,20,20,0);  //body
  line(0,0,-30,-50);
  line(0,200,-30,250);
  line(-30,250,-30,-50);
  //inner cone
  line(y,200-offset,-30,250-offset); //bottom
  line(y,offset,-30,-50+offset); //top
  line(y,offset,y,200-offset); //vertical
  
  fill(255,0,0);
  rect(0,100-60,40,120);  //magnet
  
  stroke(255,215,0); //coil
  fill(0,0,255);  
  rect(y,100-25,70,50);
  line(y,100-25,y+10,125);
  for (var i = 0; i <7; i++)  //wiring
  {
    line(y+i*10,100-25,y+i*10+10,125);
  }
  line(y+70,80,150,80);
  line(y+70,120,150,120);
  stroke(0);
  fill(0); //text
  textSize(25);
  text('+',160,130);
  text('-',163,85);

}

function draw(){
  background(255);
  var waveform = fft.waveform();  // analyze the waveform
  push();
  strokeWeight(5);
  var test = height/2+height*amp*0.35;  // axes
  if (test>height-3){test = height-3;}
  line(50,test,50+width/2+20,test);
  var test2 = 180-120*amp;
  if (test2 < 5){ test2 = 5;}
  line(50,test,50,test2);
  
  line(50,test2,50-5,test2+10); // Y arrows
  line(50,test2,50+5,test2+10);
  
  line(50+width/2+20,test,50+width/2+20-5-10,test-5);// X arrows
  line(50+width/2+20,test,50+width/2+20-5-10,test+5);
  strokeWeight(2);
  fill(0); //text
  textSize(30);
  text('v',25,test2+40);
  text('t',width/2+40,test+35);
  pop();
  
  push();
  translate(50,0);
  beginShape();
  strokeWeight(2);
  stroke(0);
  fill(255);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width/2);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
  pop();
  drawStereo(-offset+ y/30);
  
  if (freqUp0){
    freqq += 0.01;
  }
    if (freqDo0){
    freqq -= 0.01;
  }
  if (freqUp1){
    freqq += 0.1;
  }
    if (freqDo1){
    freqq -= 0.1;
  }
  if (freqUp2){
    freqq += 1;
  }
    if (freqDo2){
    freqq -= 1;
  }  
  osc.freq(freqq);
  osc.amp(amp);
}
