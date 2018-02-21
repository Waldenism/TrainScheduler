
//configure firebase
var config = {
  apiKey: "AIzaSyD0SgqD_K5dcn1xYtU1ifVZ7fpEBXYUKP0",
  authDomain: "trainscheduler-d8dba.firebaseapp.com",
  databaseURL: "https://trainscheduler-d8dba.firebaseio.com",
  projectId: "trainscheduler-d8dba",
  storageBucket: "",
  messagingSenderId: "929900818562"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var freq = 0;
var firstTrain = "";


//click events  
$("#add-train").on("click", function(event) {
  event.preventDefault();
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain= $("#first-train").val().trim();
  freq = $("#frequency").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    freq: freq,
  }); 

  $("#train-name").val("");
	$("#destination").val("");
	$("#first-train").val("");
	$("#frequency").val("");
});

//train logic with moment js
database.ref().on("child_added", function(childSnapshot) {
  var childSnapshot = childSnapshot.val();

  var firstTrainCon = moment(childSnapshot.firstTrain, "hh:mm");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTrainCon), "minutes");
  console.log(diffTime);

  var tMinutesTillTrain;
  var tRemainder;
  var nextTrain;
  var trainArrival;

  if (diffTime < 0) {
    tMinutesTillTrain = diffTime * -1;
    trainArrival = moment(firstTrainCon).format("hh:mm A");
  } else {
    tRemainder = diffTime % childSnapshot.freq;
    tMinutesTillTrain = childSnapshot.freq - tRemainder;
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    trainArrival = moment(nextTrain).format("hh:mm A");
  }
  $("#body").append("<tr><td>" + childSnapshot.trainName + 
    "</td><td>" + childSnapshot.destination + 
    "</td><td>" + childSnapshot.firstTrain +
    "</td><td>" + childSnapshot.freq + 
    "</td><td>" + trainArrival + 
    "</td><td>" + /*nextTrain*/ tMinutesTillTrain + 
    "</td></tr>");
}); 