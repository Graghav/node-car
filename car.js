// Motor driver for R8

var Motor = require('pi-motor');
var gpio = require("gpio");

// Configure motor pins
var a = new Motor(16,18);
var b = new Motor(24,26);
var c = new Motor(11,13);
var d = new Motor(19,21);

var sensor1 = gpio.export(21, {
   direction: "in"
});

var sensor2 = gpio.export(20, {
   direction: "in"
});

var isStopped = false;

var direction = "FORWARD";

var runVehicleForward = function() {
   console.log("MOVING VEHICLE : FORWARD");
   a.counterclockwise();
   b.counterclockwise();
   c.counterclockwise();
   d.counterclockwise();
   direction = "FORWARD";
   isStopped = false;

};

var runVehicleReverse = function() {
   console.log("MOVING VEHICLE: REVERSE");
   a.clockwise();
   b.clockwise();
   c.clockwise();
   d.clockwise();
   direction = "REVERSE";
   isStopped = false;

};

var runVehicleLeft = function() {
    console.log("MOVING VEHICLE: LEFT");
    b.counterclockwise();
    c.counterclockwise();
    a.stop();
    d.stop();
}

var runVehicleRight = function() {
    console.log("MOVING VEHICLE: RIGHT");
    a.counterclockwise();
    d.counterclockwise();
    c.stop();
    b.stop();
}

var stopVehicle = function() {
    isStopped = true;
    a.stop();
    b.stop();
    c.stop();
    d.stop();
}

var startVehicle = function() {

    if(direction == "FORWARD")
         runVehicleForward();
    else
         runVehicleReverse();

}

var startAutoMode = function() {
    console.log("STARTING AUTO MODE");
    startVehicle();
}

sensor1.on("change", function(val) {
   // value will report either 1 or 0 (number) when the value changes
     if(val) {
        console.log("OBSTACLE DETECTED ON FRONT SENSOR")
        stopVehicle();
     }
     else {
        console.log("NO OBSTACLE");
        startVehicle();
     }

});

sensor2.on("change", function(val){

    if(val) {
       console.log("OBSTACLE DETECTED ON REAR SENSOR");
       stopVehicle();
    }
    else {
      console.log("NO OBSTACLE");
      startVehicle();
    }

});

isStopped = true;

module.exports = {
  start  : startVehicle,
  stop   : stopVehicle,
  left   : runVehicleLeft,
  right  : runVehicleRight,
  reverse: runVehicleReverse,
  forward: runVehicleForward,
  auto   : startAutoMode
}
