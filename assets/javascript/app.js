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
    var ftFrequency = 0;
    var firstTime = "";

    // Create Button Click:

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        trainName = $("#train-name").val().trim();
        console.log(trainName);
        destination = $("#destination").val().trim();
        console.log(destination);
        firstTime = $("#first-train").val().trim();
        console.log(firstTime);
        ftFrequency = $("#frequency").val().trim();
        console.log(ftFrequency)


        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTime: firstTime,
          ftFrequency: ftFrequency,
          // dateAdded: firebase.database.ServerValue.TIMESTAMP 
        }); 

        // Clear user form
        $("#add-train").val('');
    });


    database.ref().on("child_added", function(childSnapshot) {

      var childSnapshot = childSnapshot.val();

      var firstTimeConverted = moment(childSnapshot.firstTime, "hh:mm").subtract(1, "years");
      // Current Time
      var currentTime = moment();
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // Time apart (remainder)
      var tRemainder = diffTime % childSnapshot.ftFrequency;
      // Minute Until Train
      var tMinutesTillTrain = childSnapshot.ftFrequency - tRemainder;
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var trainArrival = moment(nextTrain).format("hh:mm");

      $("#body").append("<tr><td>" + childSnapshot.trainName + "</td><td>" + childSnapshot.destination + "</td><td>" + childSnapshot.firstTime +
        "</td><td>" + childSnapshot.ftFrequency + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  	})
