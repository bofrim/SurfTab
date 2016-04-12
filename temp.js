






windStr = "--";
setData = function(spot, spotList){

  // $.ajax({
  //   url : "http://api.wunderground.com/api/e51624d0233fab59/geolookup/q/pws:KHIHALEI7.json",
  //   dataType : "jsonp",
  //   success : function(parsed_json) {
  //     var location = parsed_json['location']['city'];
  //     var temp_f = parsed_json['current_observation']['temp_f'];
  //     alert("Current temperature in " + location + " is: " + temp_f);
  //   }
  // });

  //Sets the data in the circles
  "https://query.yahooapis.com/v1/public/yql?q=select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text='chicago, il')&format=json&callback=callbackFunction"
  //Wind
  URL = "http://weather.yahooapis.com/forecastrss?w="+spotList[spot].spotID
  data = $.get(URL,function(data,status,xhr){
    var wind = data.getElementsByTagName('wind')[0];
    var speed = wind.getAttribute('speed');
    var direction = wind.getAttribute('direction');
    windStr = speed+"kts "+direction+"deg";
    $('#windVal').html(windStr);
  })
  //Waves
  //Temporary hard coded fix until I get access to an api
}

//When document loads
$(document).ready(function(){

//Constructor for creating the spots
//Temporary fix for wave height until I get access to an api
  function location(name, linkID, pageLink, spotID, wave){
    this.name = name;
    this.linkID = linkID;
    this.pageLink = pageLink;
    this.spotID = spotID;
    //Temporary fix until I get access to an api
    this.wave = wave;
  }

  //List to hold the spots
  //These are currently hard coded but could be dynamically added and removed
  var spotList = new Array();
  spotList[0] = new location("Pipeline", "4750", "pipeline-oahu_4750/", 2469713, "5-6ft");//KHIHALEI7
  spotList[1] = new location("Huntington Beach Pier South", "4874", "hb-pier-northside-southern-california_4223/", 2425873, "3-5ft");//286
  spotList[2] = new location("Huntington Beach Pier North", "4223", "hb-pier-southside-southern-california_4874/"), 2425873, "3-5ft";//286
  spotList[3] = new location("Venice", "4211", "venice-beach-southern-california_4211/", 91561125, "1.5-3ft");//2611

  //Set up variables
  var spot = 0
  $stream = $('#stream');
  $button = $('#cam_button');
  $dataCircle = $('.dataCircle');


  setData(spot, spotList);
  //Temporary fix until I get access to an api
  $('#heightVal').html(spotList[spot].wave);
  //Load text
  $('#buttontext').html(spotList[spot].name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp Next spot: &nbsp"+spotList[((spot+1)%(spotList.length))].name);

  $button.click(function(){
    //control what happens when the top bar is clicked
    //Set the source of the stream to the next one in the list
    spot = (spot+1)%(spotList.length)
    //Update the link
    $stream.attr('src',"http://e.cdn-surfline.com/syndication/embed/v1/player.html?id="+spotList[spot].linkID);
    //Update data
    setData(spot, spotList);
    //Temporary fix until I get access to an api
    $('#heightVal').html(spotList[spot].wave);
    //Update text
    $('#buttontext').html(spotList[spot].name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp Next spot: &nbsp"+spotList[((spot+1)%(spotList.length))].name);
  })
  $dataCircle.click(function(){
    //Link to surfline when the data circles are clicked
    window.location.href = "http://www.surfline.com/surf-report/"+spotList[spot].pageLink
  })
})
