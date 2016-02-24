$(document).ready(function() {
  var thermostat = new Thermostat();

  updatetemp();

  // $("#temperature").html(thermostat.getCurrentTemperature());
  // $("#temperature").css({"color": "green", "font-size": fontsize + "px"});

  $("#temperature-up").click(function() {
    thermostat.up();
    updatetemp();
  });

  $("#temperature-down").click(function() {
    thermostat.down();
    updatetemp();
  });

  $("#temperature-reset").click(function() {
    thermostat.resetTemperature();
    updatetemp();
  });

  $("#powersaving").click(function() {
    thermostat.switchPowerSavingMode();
    updatetemp();
    // if (thermostat.powerSavingMode) {
    //   for(var i = thermostat.getCurrentTemperature(); i>25; i--) { thermostat.down(); }
    //   updatetemp();
    //   $("#powersaving").css("background-color", "green");
    //   $("#powersaving").html("PSM ON");
    // }
    // else {
    //   $("#powersaving").css("background-color", "red");
    //   $("#powersaving").html("PSM OFF");
    // }
  });

  $("#get-location").click(function() {
    var city = $("#city").val();
    url = "http://api.ipinfodb.com/v3/ip-city/?";
    apiKey = "key=&9bbc6089046815aeb5fe72d09ec0d9ea0807dcb7d82121d681d6&ip=185.53.227.70";
    $.getJSON( url + apiKey, function( data ) {
    console.log(data);
    });
  });


  $("#select-city").submit(function() {
    event.preventDefault();
    var city = $("#city").val();
    url = "http://api.openweathermap.org/data/2.5/weather?q=";
    apiKey = "&appid=44db6a862fba0b067b1930da0d769e98&units=metric";
    $.getJSON( url + city + apiKey, function( data ) {
    updateMap(data.coord.lon, data.coord.lat);

    console.log(data);

    $("#city-weather").html(data.name + "'s " + data.weather[0].description);
    $("#city-temp").html(data.main.temp);
    $("#weather-icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon +".png");
    });
  });

  function updatetemp () {
    fontsize = 10 + 4 * thermostat.getCurrentTemperature();
    color = thermostat.energyUsage();
    // $("#temperature").hide("slide", { direction: "down" }, 100);
    $("#temperature").hide();
    $("#temperature").css({"font-size": fontsize + "px"});
    $("#tempbox").css({"background-color": color});
    // $("#temperature").slideDown(200);
    $("#temperature").show("slide", { direction: "up" }, 150);
    $("#temperature").html(thermostat.getCurrentTemperature());


    if (thermostat.powerSavingMode) {
      for(var i = thermostat.getCurrentTemperature(); i>25; i--) { thermostat.down(); }
      // updatetemp();
      $("#powersaving").css("background-color", "green");
      $("#powersaving").html("PSM ON");
    }
    else {
      $("#powersaving").css("background-color", "red");
      $("#powersaving").html("PSM OFF");
    }
  }
  var map;

  function updateMap(coordlon, coordlat) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: coordlat, lng: coordlon},
      zoom: 12
    });
  }

});


// var varCounter = 0;
// var varName = function(){
//      if(varCounter <= 10) {
//           varCounter++;
//           /* your code goes here */
//      } else {
//           clearInterval(varName);
//      }
// };
//
// $(document).ready(function(){
//      setInterval(varName, 10000);
// });
