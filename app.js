var car   = require('./car');
var stdin = process.openStdin();

var isSwarnEnabled = false;

var listenCommands = function() {

  stdin.addListener("data", function(d) {

      switch(d.toString().trim()) {

          case "start":
            car.start();
            break;

          case "stop":
            car.stop();
            break;

          case "left":
            car.left();
            break;

          case "right":
            car.right();
            break;

          case "reverse":
            car.reverse();
            break;

      }
  });

};

console.log("STARTING CAR");

listenCommands();
