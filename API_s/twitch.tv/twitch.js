


function getUrl (){
	var regularStreamers= ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	regularStreamers.forEach(function(name){
	var url = "https://wind-bow.glitch.me/twitch-api/streams/"+name;
	console.log(url);
	console.log(name);
	fetchAPI(url, name);
	});
}

//display the requested queries in the listing below

function fetchAPI (url, name) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = "json";
    request.send();
    request.onload = function() {
    var json = request.response;
    console.log(json);
    console.log(name);
    displayStreams(json, name);
};
}

function displayStreams (json, name) {
	var li = document.createElement("li");
	var a = document.createElement('a');
	a.textContent = name;
	a.setAttribute("href", 'https://www.twitch.tv/'+name);
	li.appendChild(a);

	
	if (json.stream !== null) {
	console.log(json.stream.game);
	var ul = document.getElementById("online");
	ul.appendChild(li);

    } else {
	console.log(name+ " is not online"); 
	var ul2 = document.getElementById("offline");
	ul2.appendChild(li);
    }
}

getUrl();
