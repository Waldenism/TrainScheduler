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

    // Create Button Click:

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        trainName = $("#train-name").val().trim();
        // console.log(trainName);
        destination = $("#destination").val().trim();
        // console.log(destination);
        firstTrain= $("#first-train").val().trim();
        // console.log(firstTime);
        freq = $("#frequency").val().trim();
        // console.log(ftFrequency)


        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          freq: freq,
        }); 

        // Clear user form
        $("#train-name").val("");
    	$("#destination").val("");
    	$("#first-train").val("");
    	$("#frequency").val("");
    });


    database.ref().on("child_added", function(childSnapshot) {

      var tMinutesTillTrain;
      var tRemainder;

      var childSnapshot = childSnapshot.val();

      var firstTrainCon = moment(childSnapshot.firstTrain, "hh:mm");
      
      var currentTime = moment();

      //TO DO fix the case when the first train is in the future
      var diffTime = moment().diff(moment(firstTrainCon), "minutes");
      console.log(diffTime);
      if (diffTime < 0) {

      }
      // Time apart (remainder)
      tRemainder = diffTime % childSnapshot.freq;
      // Minute Until Train
      tMinutesTillTrain = childSnapshot.freq - tRemainder;
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var trainArrival = moment(nextTrain).format("hh:mm A");

      $("#body").append("<tr><td>" + childSnapshot.trainName + "</td><td>" + childSnapshot.destination + "</td><td>" + childSnapshot.firstTrain +
        "</td><td>" + childSnapshot.freq + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  	})
