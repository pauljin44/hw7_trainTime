// 1. link to Firebase

var trainData = new Firebase("https://dazzling-heat-9981.firebaseio.com/");

// 2. Button for adding Trains

$("#addTrainBtn").on("click", function(){

	// user input
	var tranName = $("#trainNameInput").val().trim();
	var tranDestination = $("#destinationInput").val().trim();
	var tranFirstTime = moment($("#firstTimeInput")).val().trim().format('LT');
	var tranFrequency = $("#trainFrequencyInput").val().trim();

	// creates local "temporary" object for holding Train Time

	var newTran = {
		name: tranName,
		destination: tranDestination,
		firstTime: tranFirstTime,
		frequency: tranFrequency
	}

	// uploads train time log/info to the database

	trainData.push(newTran);

	// logs everyting to console
	console.log(newTran.name);
	console.log(newTran.Destination);
	console.log(newTran.FirstTime);
	console.log(newTran.Frequency);

	// Alert
	alert("Train time sucessfully uploaded!")

	// Clears all of the text-boxes

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTimeInput").val("");
	$("#trainFrequencyInput").val("");
	// prevents moving to new page

	return false;

});

// 3. Create Firebase event for adding train time log to the database and a row in the html when a user enters an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

	// store everyting into a variable.
	var tranName = childSnapshot.val().name;
	var tranDestination = childSnapshot.val().Destination;
	var tranFirstTime = childSnapshot.val().FirstTime;
	var tranFrequency = childSnapshot.val().trainFrequency;

	// train info
	console.log(tranName);
	console.log(tranDestination);
	console.log(tranFirstTime);
	console.log(tranFrequency);

	// prettify the first train time
	var tranFirstTimePretty = moment().unix(tranFirstTime).format('LT');
	// Calculate the new arrival time
	// to calculate the new arrival time
	var tanNewArrival = moment().add(moment.unix(tranFirstTime, 'X'), "NewArrival")

	// add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + tranName + "</td><td>" + tranDestination + "</td><td>" + tranFirstTimePretty + "</td><td>" + tranFrequency + "</td><td>" + tanNewArrival + "</td><td>");


});