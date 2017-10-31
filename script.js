window.onload = function() {
  var instructions = [];
  currentInstruction = 0;  // index of the current speaking instruction
  started = false; // check if they started talking
  var synth = window.speechSynthesis;


  /*
  Load the instructions into the array instructions by splitting
  the string by new lines

  @param fullStr the full instructions string
  @return nothing
  */
  function checkPossible(arr, current, incremention) {
      var nextIncrement = current + incremention
      if ((nextIncrement < arr.length) && (nextIncrement >= 0)) {
          currentInstruction = nextIncrement
      } else {
          currentInstruction = current
      }
  }
  function speak(index) {
      var toSpeak = new SpeechSynthesisUtterance(instructions[index]);
  }
  function loadInstructions(fullStr) {
      splitted = fullStr.split("\n");
      instructions = splitted;
  }
  // dummy data
  loadInstructions(`Butterfly turkey breast and with a heavy mallet or rolling pin pound to an even thickness of about 1/2-inch.
  Similarly pound duck and chicken breasts.
  Cover turkey breast with a layer of rice dressing.
  Lay duck breast on top and cover with cornbread stuffing.
  Top with chicken breast and cover with rice dressing.
  Roll up tightly, jelly-roll style.
  Wrap bacon slices around roll and secure with toothpicks.
  Place in a browning bag and then in a roasting pan.
  Bake at 350 degrees for about 1 and 1/2 hours.
  Remove from oven and let rest 20 minutes. Remove toothpicks before serving.`);
  // put instructions to screen
  // taken from https://www.w3schools.com/jsref/met_node_appendchild.asp
  var allInstructions = document.getElementById("instructionsFull");

  for (i = 0; i < instructions.length; i++) {
      instructionNumber = i + 1
      var node = document.createElement("P");
      var textnode = document.createTextNode(String(instructionNumber) + ". " + instructions[i]);
      node.appendChild(textnode);
      allInstructions.appendChild(node); 
  }
  if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'read the recipes': function() {
      speak(0);
    },
    "next instruction": function() {
      checkPossible(instructions, currentInstruction, 1)
    },
    "previous instruction": function() {
      checkPossible(instructions, currentInstruction, 1)
    },
    "next instruction": function() {
      checkPossible(instructions, currentInstruction, 1)
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
}