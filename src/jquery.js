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




  $("#get-weather").click(function() {
    var city = $("#city").val();
    url = "http://api.openweathermap.org/data/2.5/weather?q=";
    apiKey = "&appid=44db6a862fba0b067b1930da0d769e98&units=metric";
    $.getJSON( url + city + apiKey, function( data ) {
    updateMap(data.coord.lon, data.coord.lat);
    console.log(data);

    $("#city-weather").html(data.name + "'s " + data.weather[0].description);
    $("#weather-icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon +".png");
    });
  });

  function updatetemp () {
    fontsize = 10 + 4 * thermostat.getCurrentTemperature();
    color = thermostat.energyUsage();
    $("#temperature").html(thermostat.getCurrentTemperature());
    $("#temperature").css({"font-size": fontsize + "px"});
    $("#tempbox").css({"background-color": color});

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
//2643743
// $("#powersaving-on").click(function() {
//   thermostat.switchPowerSavingModeOn();
//   for(var i = thermostat.getCurrentTemperature(); i>25; i--) {
//     // setInterval(delayed, 1000);
//     thermostat.down();
//     updatetemp();
//   }
//
//   // function delayed () {
//     // thermostat.down();
//     // updatetemp();
//   // }
//
//   $("#power-saving-status").html("ON");
// });
//
// $("#powersaving-off").click(function() {
//   thermostat.switchPowerSavingModeOff();
//   updatetemp();
//   $("#power-saving-status").html("OFF");
// });
