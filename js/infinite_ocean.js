//Program written by Tom Paulson

//This program will return a game onto the html and CSS template.
//The game is more of a maze that changes certain attributes based off the number of times each room is visited
//I put a lot of work into the program and getting it into the text box on the main html screen.

// I couldn't get the fuctionality of what I wanted in my program, so I reached out to a programmer friend of mine
// and he provided a quick list that I made use of after looking into what each section meant and was able to implement
// certain functionality into my program such as event handlers and object elements.  This project took weeks and 
// many hours to get what I wanted out of it.  Now that my initial framework is done, I can continue to add more
// functionality to it and grow this into what I want it to be into the future!

//I would have liked to figure out how to do multiple different alternate texts for various room visits
//I could only figure out how to get it to do one visit, each time I tried to do it made my code go wonky

//Below are the learning refrences I used:
// guide that my friend wrote to assist me --> https://jsfiddle.net/rdq2jxyg/23/
// guide that helped me learn more about objects which are used in the script --> https://javascript.info/object
// youtube tutorial that didn't end up helping at all with what I needed --> https://www.youtube.com/watch?v=R1S_NhKkvGA
// I'm sure there are some questions I googled, but I don't believe anything was relevent enough to add.



//------------------------------------------------------



//variables
var roomElement;
var roomNameElement;
var roomTextElement;
var roomOptionsElement;

//contains rooms and calls for the data contained within each room
var gameRooms = {
	
  "Exit": {name: "Patio", visits:0, text:"You have left the Infinite Ocean Complex, thank you for visiting.", options: [
  ] ,
  GetText: function(){
    if(this.visits >= 1){
      return this.text;
    }
  }
},
  
  "room 1": {name: "Entrance Hall", visits:0, text:"After descending down a flight of stairs you find yourself in a large room with a huge glass dome above you, allowing you to see the ocean above." + "\n" + 
  "You hear a booming voice resonate around the room 'Hello " + input + ", welcome to the Infinite Ocean'.  " +
   "In front of you is a door that has text above it that reads 'Enter if you dare'", options: [
  			{roomKey: "Exit", roomOptionText: "Turn Back"},
        {roomKey: "room 2", roomOptionText: "Proceed to Next Room"}
  ],
  GetText: function(){
    if(this.visits < 2){
      return this.text;
    }
    else {
      return "Nothing seems to have changed in the Entrance Hall.  You'll have to keep looking around"
    }
  }
},

	"room 2": {name: "Museum Hallway", visits:0, text:"You enter go through the doorway marked Museum hallway.  It is a long hallway and you see a door at the end and two doors on the other walls.  You feel like the Library might be a good place to start.", options: [
  			{roomKey: "room 1", roomOptionText: "Return to Entrance Hall"},
        {roomKey: "room 3", roomOptionText: "Continue straight into the Museum"},
        {roomKey: "room 4", roomOptionText: "Enter the Library"},
        {roomKey: "room 5", roomOptionText: "Go to the Kitchen"}
  ],
  GetText: function(){
    if(this.visits < 2){
      return this.text;
    }
    else {
      return "Nothing seems different around the Museum Hallway, it may be a good idea to check some of the other rooms"
    }
  }
},
  
  "room 3": {name: "Museum",visits:0, text:"You find yourself in a very large room, with lots of strange exibits scattered around.  After looking around a little, there doesn't seem to be anything else to do here", options: [
  			{roomKey: "room 2", roomOptionText: "Return to the Museum Hallway"},
  ],
  GetText: function(){
    if(this.visits < 2){
      return this.text;
    }
    else {
      return "The exhibits are still in place, nothing has moved in this room for many years"
    }
  }
},
  
  "room 4": {name: "Library", visits:0, text:"You enter a large room filled with hundreds of books.  There is nothing to do here, but you get the feeling you might find something interesting here later on.", options: [
  			{roomKey: "room 2", roomOptionText: "Return to the Museum Hallway"},
        {roomKey: "secret room", roomOptionText: "Go down", isValid : function(){
          return (gameRooms["room 4"].visits >= 5);
        }},
  ],
  GetText: function(){
    if(this.visits < 2){
      return this.text;
    }
    else {
      return "Nothing seems to have changed in the Library.  Maybe Check back later Or look around a bit?"
    }
  }
},


  "room 5": {name: "Kitchen", visits:0, text:"You're met with many strange smells, though this area is impeccably clean like it had been scrubbed recently", options: [
  			{roomKey: "room 2", roomOptionText: "Return to the museum hallway"},
  ],
  GetText: function(){
    if(this.visits < 2){
      return this.text;
    }
    else {
      return "The smells of the Kitchen are gone.  Is someone else around here?"
    }
  }
},

  "secret room": {name: "Secret room", visits:0, text:"Congrats, you solved the maze.  Thank you for playing the first game.", options: [
  ],
  GetText: function(){return this.text;} },
}


//delete existing room options
function deleteRoomOptions (){
  while (roomOptionsElement.firstChild) {
    roomOptionsElement.removeChild(roomOptionsElement.firstChild);
  }
}

//tells each room what text to use with an IF statement based on amount of times visited
function UpdateGameElements (newRoom){
  roomTextElement.textContent = newRoom.GetText();
  CreateRoomOptions(newRoom);
}

//updates room visit counter
function VisitRoom (room){
  room.visits ++;
  UpdateGameElements (room);
}

//moves room forward upon clicking one of the buttons
function RoomOptionClickHandler(event){
  var optionElementClicked = event.target;
  var nextRoomName = optionElementClicked.value;
  var nextRoom = gameRooms[nextRoomName];
  VisitRoom(nextRoom);
}

 // reset room options after being deleted
function CreateRoomOptions (room){
  deleteRoomOptions();
  //nested if loop checking array for length and adding to them
  for (var i = 0; i < room.options.length; i++){
    if(room.options[i].hasOwnProperty("isValid")){
      if (room.options[i].isValid() == false) {
        continue;
      }
    }

//looks for the click from the click handler and furthers the program
    var optElement = document.createElement('button');
    optElement.value = room.options[i].roomKey;
    optElement.textContent = room.options[i].roomOptionText;
    optElement.addEventListener('click', RoomOptionClickHandler);
    roomOptionsElement.appendChild(optElement);
  }
}

//start game function - calls for each function to work together
function StartGame (){
	roomElement = document.getElementById("room");
  roomNameElement = document.getElementById("room-name");
  roomTextElement = document.getElementById("room-text");
  roomOptionsElement = document.getElementById("room-options");
  var startingRoom = gameRooms["room 1"];
  VisitRoom(startingRoom);
}

//DOM event telling the program to start
document.addEventListener('DOMContentLoaded', StartGame, false);