//

$(document).ready(function () {
    console.log("ready!");

    //  FIREBASE
    var config = {
        apiKey: "AIzaSyAnDM-eTdj3aAmvLVFvwZdtpe6VE9-VH0I",
        authDomain: "fir-8b610.firebaseapp.com",
        databaseURL: "https://fir-8b610.firebaseio.com",
        projectId: "fir-8b610",
        storageBucket: "fir-8b610.appspot.com",
        messagingSenderId: "1034882303687"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    //GET TRAIN INFO WHEN SUBMIT BUTTON CLICKED
    $("#btn").on("click ", function () {
        event.preventDefault();
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
        var departure = $("#depa").val().trim();
        var frequency = $("#freq").val().trim();
        // console.log(trainName);
        // console.log(destination);
        // console.log(departure);
        // console.log(frequency);


        var nextTrain = {
            trainName: trainName,
            destination: destination,
            departure: departure,
            frequency: frequency
        }
        //  });
        //PUSH CLICK DATA TO FIREBASE
        database.ref().push(nextTrain);
 

        // console.log(nextTrain.trainName);
        // console.log(nextTrain.destination);
        // console.log(nextTrain.departure);
        // console.log(nextTrain.frequency);

        //CLEAR FORM INPUTS
        $("#name").val("");
        $("#dest").val("");
        $("#depa").val("");
        $("#freq").val("");
        //
    });
    //PHASE 2
   // database.ref().remove(KEY - LFA9OuqRLu4N5qWZKit);
//    var newPostKey = firebase.database().ref().child('posts').push().key;
//    console.log("KEY " + newPostKey);
    database.ref().on("child_added", function (childSnapshot) {

     //   console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var departure = childSnapshot.val().departure;
        var frequency = childSnapshot.val().frequency;
        // var key = childSnapshot.val().key;
        // console.log("KEY" + key);
        // console.log(trainName);
        // console.log(destination);
        // console.log(departure);
        // console.log(frequency);

        //THE MATH   

        var depajs = moment(departure, "HH:mm")
        //in class, one year subtracted from time.  ASK ABOUT IT
        console.log(depajs);
        var now = moment();
        console.log(moment(now).format("hh:mm"));

        var elap = moment().diff(moment(depajs), "minutes");
        console.log(elap);

        var modu = elap % frequency;
        console.log(modu);

        var wait = frequency - modu;
        console.log("wait output " + wait);
        var minute;
        if (wait < 2) {
            minute = "minute";
        } else {
            minute = "minutes";
        }

        var nextTrain = moment().add(wait, "minutes").format("hh:mm a");
        console.log("nextTrain" + moment(nextTrain));

        $("#tableData").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
            departure + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + wait + " " + minute + "</td></tr>");
    });

    function clock() {
        $('#clock').html(moment().format("dddd, MMMM Do YYYY H:mm:ss"));
    }
    setInterval(clock, 1000);

});


