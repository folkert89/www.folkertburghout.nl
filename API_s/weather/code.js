var unit="metric",
tempUnit="C";

function getLocation ()	{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			console.log(lat, lon);
			createUrl(lat, lon);
		});
	}  else { 
	alert("Geolocation is not available in your browser");
	console.log("geo blocked");}
}

function createUrl(lat,lon){
	var website = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units="+unit+"&APPID=8b1dd8a4cef065b4228b99b99dcdf813";
	console.log(website);
	displayWeather(website);
}

function displayWeather(website) {
	$.getJSON(website, function (json){
		var description = json.weather[0].description;
		var weatherUrl = "http://openweathermap.org/img/w/"+json.weather[0].icon+".png";
		$(".city").text(json.name);
		$(".country").text(", "+json.sys.country);
		$("#description").text(description);
		$("#temp").text(Math.round(json.main.temp)+String.fromCharCode(176));
		console.log(tempUnit);
		$("#unitTemp").text(tempUnit);

		
		//document.getElementById("city").textContent = json.name;  volgens mij laadt deze niet in html page.. komt dat door dubbele linking twee js files?
		console.log(description);
		console.log(weatherUrl);
		weatherIcon(description, weatherUrl);
	});
}
window.onload = function(){// omdat anders de html nog niet helemaal klaar is geladen.. door volgorde header...
var theBtn = document.getElementById("myBtn");
theBtn.addEventListener("click", function(){

	if (window.unit=="metric") {
		window.unit="imperial";
		console.log(unit);
		window.tempUnit ="F";
		theBtn.innerHTML ="Change to Celcius";
		getLocation();
	} else {
		window.unit="metric";
		console.log(unit);
		window.tempUnit ="C";
		theBtn.innerHTML ="Change to Fahrenheit";
		getLocation();
		/*document.getElementById("unitTemp").innerHTML = "C";*/
	} //je moet met globale variabelen anders bereik je gesloten functies niet. nathan doet met parameters. WAt is beste manier?

/*	var currentUnit = $("#unitTemp").text();
	var newUnit = (currentUnit == "C") ? "F" : "C";
	$("#unitTemp").text(newUnit);
	if (newUnit=="F"){
		$(".btn").text("Change to Celcius");
		var fahrtemp = Math.round(parseInt($("#temp").text())* 9 / 5 + 32);
		$("#temp").text(fahrtemp+String.fromCharCode(176));
		} else {
		$(".btn").text("Change to Fahrenheit");
		$("#temp").text(currentTemp+String.fromCharCode(176));
	console.log("1"+newUnit);
		}*/
});
};
function weatherIcon (description, weatherUrl){
	//https://openweathermap.org/weather-conditions
	var urlIcon;
	switch(description) {
		case "clear sky":
			urlIcon = "clear-day";
			break;
		case "few clouds":
			urlIcon = "partly-cloudy-day";
			break;
		case "scattered clouds":
			urlIcon = "cloudy";
			break;
		case "broken clouds":
			urlIcon = "cloudy";
			break;	
		case "shower rain":
			urlIcon = "rain";
			break;
		case "thunderstorm":
			urlIcon = "wind";
			break;
		case "snow":
			urlIcon = "snow";
			break;
		case "mist":
			urlIcon = "fog";
			break;
		case "rain":
			urlIcon = "sleet";			
			break;
		default:
			urlIcon = "niks";			
	}
	console.log(urlIcon);
	console.log(weatherUrl);
	if (urlIcon!=="niks") {
		$("canvas").attr("id",urlIcon);
		} else {
		$(".icons").replaceWith("<img src="+weatherUrl+">");//ik ben nog steeds API aan het terughalen.. ik kan namelijk geen alt toevoegen zelf dan gaat het mis. hoe kan ik bij de API get call de waarde eenmalig opslaan en vervolgens niet meer oproepen via api maar gewoon eigen waarde..	https://www.youtube.com/watch?v=NQ8WS396i3o
		}
	getSkycon(urlIcon);
}
function getSkycon(urlIcon){
	var icons = new Skycons(),
	  list  = [
	    "clear-day", "clear-night", "partly-cloudy-day",
	    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
	    "fog"
	  ],
	  i;

	for(i = list.length; i--; )
	icons.set(list[i], list[i]);
	console.log(urlIcon);
	icons.play();
}
getLocation();

//api key 8b1dd8a4cef065b4228b99b99dcdf813
// variabele sharen tussen functies https://stackoverflow.com/questions/407048/accessing-variables-from-other-functions-without-using-global-variables
