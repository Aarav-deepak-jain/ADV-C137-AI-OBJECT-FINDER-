video = "";
objects = [];
var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload() {
    video = createCapture(VIDEO);
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 400);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("number_of_objects").innerHTML = "Number of Objects :"+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y ,objects[i].width ,objects[i].height);
            input = document.getElementById("input").value
            if(objects[i].label == input){
                document.getElementById("status").innerHTML = "Status = object found";
                speak();
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting objects";
    input = document.getElementById("input").value
}

function modelLoaded() {
    console.log("model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = input;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}