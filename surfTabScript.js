
setData = function(spot, spotList){
  //Sets the data in the circles
  URL = "http://magicseaweed.com/api/849d92449ca7e191762f75a9fb910733/forecast/?spot_id="+spotList[spot].spotID
  data = $.get(URL,function(data,status,xhr){
    data = data[0]

    //Get and set wind
    var wind = data['wind'];
    var speed = wind['speed'];
    var direction = wind['compassDirection'];
    var windUnit = wind['unit'];
    var windStr = speed+windUnit+' '+direction;
    $('#windVal').html(windStr);

    //Get and set temp
    var temp = data['condition'];
    var tempVal = temp['temperature'];
    var tempUnit = temp['unit'];
    var tempStr = tempVal+tempUnit;
    $('#currTemp').html(tempStr);

    //Get and set height
    var swell = data['swell'];
    var minHeight = swell['minBreakingHeight'];
    var maxHeight = swell['maxBreakingHeight'];
    var swellUnit = swell['unit'];
    var swellStr = minHeight+'-'+maxHeight+swellUnit;
    $('#heightVal').html(swellStr);
  })
}

updateFrame = function(spot, spotList){
  //Update the video source

  //Update the link
  $stream.attr('src',"http://e.cdn-surfline.com/syndication/embed/v1/player.html?id="+spotList[spot].linkID);
  //Update data
  setData(spot, spotList);

  //Update text
  $('#buttontext').html("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Current spot: "+spotList[spot].name+"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp Next spot: &nbsp"+spotList[((spot+1)%(spotList.length))].name);
  return spot
}

//When document loads
$(document).ready(function(){

//Constructor for creating the spots
  function location(name, linkID, pageLink, spotID){
    this.name = name;
    this.linkID = linkID;
    this.pageLink = pageLink;
    this.spotID = spotID;
  }

  //List to hold the spots
  var spotList = new Array();
  spotList[0] = new location("Pipeline", "4750", "pipeline-oahu_4750/", 616);
  spotList[1] = new location("Huntington Beach Pier South", "4874", "hb-pier-northside-southern-california_4223/", 286);
  spotList[2] = new location("Huntington Beach Pier North", "4223", "hb-pier-southside-southern-california_4874/", 286);
  spotList[3] = new location("Venice Beach", "4211", "venice-beach-southern-california_4211/", 2611);

  //Set up variables
  var spot = 0
  $stream = $('#stream');
  $button = $('#cam_button');
  $dataCircle = $('.dataCircle');


  setData(spot, spotList);

  //Load text
  $('#buttontext').html("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Current spot: "+spotList[spot].name+"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp Next spot: &nbsp"+spotList[((spot+1)%(spotList.length))].name);

  $button.click(function(){
    //control what happens when the top bar is clicked
    spot = (spot+1)%(spotList.length);
    spot = updateFrame(spot, (spotList));
  })

  setInterval(function(){spot = updateFrame(spot, (spotList))},30000);


  $dataCircle.click(function(){
    //Link to surfline when the data circles are clicked
    window.location.href = "http://www.surfline.com/surf-report/"+spotList[spot].pageLink
  })
})
