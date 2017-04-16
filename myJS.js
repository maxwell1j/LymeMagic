
$('#myModalSettings').on('hidden.bs.modal', function (e) {
    console.log("ModalClose");
 });

var textRoute =" Finding the start:<br> Click on the Get Me to Start button and you will get directions from your current location<br>\
Parking: <br> Walkers park on Shrigley road in the lay by next to the start of this walk.<br><br>\
-----------------------------------------------<br>\
0.1 km	section <br>	From the layby, pass through a kissing gate to follow a path through woods.	<br><br>\
0.2 km	section <br>	The path soon meets a driveway. Turn left up the driveway, passing a house named West Parkgate.	<br><br>\
0.7 km	section <br>	Continue up the driveway, as it bears left, across a cattle grid. The driveway now levels out. Follow the driveway to Green Farm.	<br><br>\
0.1 km	section <br>	At Green Farm, where the driveway forks, follow the driveway to the right, to pass behind farm buildings. Take a narrow footpath to the right, which soon emerges at a ladder stile.	<br><br>\
0.4 km	section <br>	Cross the ladder stile. You are now in Lyme Park. Follow the grassy path which leads diagonally uphill.	<br><br>\
0.2 km	section <br>	Where the grassy path meets a driveway, bear left. Very soon after, follow the narrow grassy path down to the left, away from the driveway. You should be heading directly across an open field towards a ladder stile in the high stone wall opposite, about 100 yards away.	<br><br>\
0.7 km	section <br>	The narrow grassy path heads down into a damp gully, then up again, to emerge at the ladder stile. Cross the ladder stile, and follow the path (signposted as “NCW”, the North Cheshire Way) along the top right hand edge of the field, with a high stone wall to your right.	<br><br>\
1.2 km	section <br>	After crossing a few stiles, the path (still following the wall to the right) goes downhill. Upon reaching a driveway at the bottom of the hill, turn right.	<br><br>\
0.0 km	section <br>	Follow the driveway to Elmerhurst Cottage. Bear right through a gate. A sign indicates that you are entering Lyme Park.	<br><br>\
0.7 km	section <br>	Soon, cross a ladder stile to the right into woodland. This is the beginning of the Interest Trail which leads through woodland.	<br><br>\
0.6 km	section <br>	Eventually the Interest Trail follows to the right of a driveway, with the Cage on a hill up to the left.	<br><br>\
0.2 km	section <br>	The Interest Trail soon leads down steps to a ladder stile. This is the start of Crow Wood. Cross the stile and continue to follow the trail.	<br><br>\
0.2 km	section <br>	Upon meeting a junction of paths, bear left.	<br><br>\
0.3 km	section <br>	The trail soon emerges behind The Timber Yard. Walk around the left hand edge of the mill pond.	<br><br>\
0.6 km	section <br>	Pass to the right of the main car park. At a fork in the driveway, bear right, to follow a driveway across a cattle grid and uphill.	<br><br>\
1.2 km	section	<br>	Soon a further car park is reached, at the entrance to Hase Bank Wood. Go through a gate, and follow the driveway down through Hase Bank Wood.	<br><br>\
0.2 km	section	<br>	Upon reaching the house at West Parkgate, pass through a gate and turn left down the driveway, and footpath to return to the starting point.	<br><br>";

myAlert = function () {alert("myAlert");}

function hideElement (elementID)
{
var myElement;
myElement = document.getElementById(elementID);
if( myElement.style.display == 'none'){myElement.style.display = 'block';}
    else
    {myElement.style.display = 'none';}
}


function storeName (strName) 
{
    sessionStorage.userName = strName;
}

function showElement(elementID)
{
    
var pages = ["text-carousel-intro-section","route","play","instructions","settings","score","about","footer"];
var pageCount = pages.length;
        for (i=0;i<pageCount;i++) 
        {
            console.log (pages[i])
            myElement = document.getElementById(pages[i]);  
            if(pages[i]==elementID) 
            {
                myElement.style.display = 'block';
                google.maps.event.trigger(mapHere,'resize');
                mapHere.panTo(latlngWizard);
                google.maps.event.trigger(mapTrail,'resize');
                mapTrail.panTo(markerStart.position);
            }
            else
            {
                myElement.style.display = 'none';
            }
        }  
        //show or hide nav bar dependent on page selected
            if (elementID=="play"||elementID=="route")
            {
                var myNav = document.getElementById("main-navbar");
                myNav.style.display = 'none';
                //Prompt for settings on play screen if not already given
                if(elementID=="play" && sessionStorage.userName == undefined)
                {
                    console.log("ShowModal");
                    messageModal ('#myModalSettings');
                }
                offLineCheck();//Set Map type to local tiles if offline
            }
            else
            {
                var myNav = document.getElementById("main-navbar");
                myNav.style.display = 'block';
            }
}

myTest = function () {addPoints(100);}
    
function getSessionId ()
{
    //Unique Session ID stored, created by millseconds of the day with padded random number between 1 and 100
    if (sessionStorage.mySessionID)    
    {
        return Number(sessionStorage.mySessionID);
    }
else 
    {  
        var myDate = new Date();
        var myDay = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDay());
        var mySession;
        mySession = myDate.getTime();
        mySession -= myDay.getTime();
        mySession =  mySession.toString() +  ("000" + Math.floor((Math.random() * 100) + 1).toString().slice(-3));
        sessionStorage.mySessionID = mySession;
        return Number(mySession);
    }
 }

function urlCreation(urlType,urlOpen)
{
    if(urlType == undefined){urlType="Default"};
    if(urlOpen == undefined){urlOpen = true};
    var urlText = "";
    if (urlType = "googleDirectionStart")
    { 
        urlText = "https://www.google.com/maps/dir/Current+Location/"
        urlText = urlText + markerStart.getPosition().lat().toString() +"," + markerStart.getPosition().lng().toString() ;
        if(urlOpen = true){window.open(urlText);}
    }
    return urlText;    
}
    
                     
 function audioInitiate()
{
    //Play sound files to give authorisation to play as required during game     
   if (audioInitaited == false) 
   {
        playAudioLink("audiomusic",0,true);
        playAudioLink ("audioswoosh",0,true);
        playAudioLink ("audiomagicClose",0,true);
        playAudioLink ("audiomagicCollision",0,true);
        playAudioLink ("audiomagicEggs",0,true);
        playAudioLink ("audiopromotion",0,true);
        playAudioLink ("audioencourage",0,true);
        console.log("audio initiated");
   }
    audioInitaited = true;
}
  
 function  messageModal(messageId,messageText,messageTitle)
{
    console.log(messageText);
    if(messageText==undefined)
    {
        console.log("ShowModal");
        $(messageId).modal('show');
    }
else
    {
        $(messageId).find('p').html('<span ">'+messageText+'</span>'); 
        $(messageId).find('h4').html('<span ">'+messageTitle+'</span>'); 
        $(messageId).modal({backdrop: false});
        $(messageId).modal('show');
    }
}

 
 function playAudioLink (linkId,vol,iosStopper) 
{
    if(linkId == undefined){linkId="audiomagicClose"};
    if(vol == undefined){vol=messageVol};
    if(iosStopper == undefined){iosStopper = false};
    console.log("play: " + linkId.toString());
    var myAudio = document.getElementById(linkId);
    myAudio.volume = vol;
     // myAudio.play ();//Comment out to make 
    if (iOS()==true  && iosStopper == true)  {}//Can not easily adjust volume on ios
}     
 
var loadMap = function () 
{
    console.log ("loadMap Called") ;   
	// Check to see if the browser supports the GeoLocation API.
	if (navigator.geolocation) 
    {
		// Montor location
        var geo_options = 
        {
        enableHighAccuracy: true, 
        maximumAge        : 10, 
        timeout           : 60000
        };
        //Watch for movement
        watchId = navigator.geolocation.watchPosition(moveWizard, geolocationError, geo_options);
    } 
    else {
		// Print out a message to the user that they can use site.
		document.write('Your browser does not support GeoLocation take this opportunity to upgade your browser for all round better internet browsing');
	}

}

////////////////////////////////////////////////////////////////////
///Google Maps
////////////////////////////////////
                          
var mapHere;
var mapTrail;
var markerWizard;
var markerMagic;
var markerStart;
var latlngWizard;
var latlngMagic;
var latlngMagicCentre;
var circleAngleMagic = 1;
var lat;
var lng;
var newlat;
var newlng;
var watchID;
var sprites = [];
var alertClose = true; //true to avoid move straight to map on load of page
var magicLevel = 0;
var alertMagicLevel = false;
var gpsAttempts = 0;
var audioInitaited = false;                
var trailID = 4;
//Settings
var encouragmentInterval = 10; //minutes between encouragement messages
var moveInterval = 200// number of millseconds between sprite moves
var pointsMagic = 10000;
var pointsMove = 1;
var collisionDistance = 0.0045;
var closeDistance = 0.035;
var messageVol = 1; //1 gives 100 percent volume use decimals
var userIcon = "img/wizardIcon.png";             
var accuracyThreshold = 10; //accucy in meters that count as accurate.  

                     
                     
function showIHereTrail ()
{
    markerWizardTrail.position = latlngWizard
    markerWizardTrail.setMap(mapTrail);
    mapTrail.panTo(latlngWizard);
}

function showStartTrail ()
{ 
    mapTrail.panTo( markerStart.position);
}


function showWizardTrail ()
{
    if ( document.getElementById("buttonTrail").innerHTML == "Show Start")
    {
        mapTrail.panTo( markerStart.position);
       document.getElementById("buttonTrail").innerHTML = "Where am I?"; 
    }
    else
    {
        markerWizardTrail.position = latlngWizard
        markerWizardTrail.setMap(mapTrail);
        mapTrail.panTo(latlngWizard);
        document.getElementById("buttonTrail").innerHTML = "Show Start";
    }
}
                     
function moveWizard (position) 
{
    
    var inital;
    if (sessionStorage.userName == undefined)
    {
        console.log("no name Moving Wizard")
    }
    if (lat == undefined)
    {inital = true;}
    else
    {inital = false;} //Check if first location find of user
    
    lat = position.coords.latitude;
    lng = position.coords.longitude;
           
    if (inital == true)
    {
        console.log ("intial Wizard Find and map setup: accuracy is within " + position.coords.accuracy.toString());
        showMap(lat, lng);
        addPoints(0);//ensure that we have a value in the sessionstorage that can be logged
        logLocation  (getSessionId (),lat,lng,sessionStorage.scorePoints,trailID,sessionStorage.userName) ;
        return;
    } //intial setup
     
     var newLatLng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude );
     var distance = getDistance (newLatLng,latlngWizard);
     var distanceScore = 0;
     
    gpsAttempts = gpsAttempts + 1;
        
    console.log (gpsAttempts.toString() +  " new gps accuracy is within " + position.coords.accuracy.toString() + "and threshold   is " + accuracyThreshold.toString());
    console.log (distance.toString() + " distance");           
     
    if(distance > 0 && distance < 0.003){distanceScore = Math.round(distance*1000);}
        
    if  ( position.coords.accuracy > accuracyThreshold && gpsAttempts < 3 )  
            {
       console.log("gps Attempt inaccurate") ;
       return;
            } 
        
    if (distance > 0)
    {
        // only move if gps is accurate or number of attempts have been made
        console.log("gps OK") ;
        console.log ("moveWizard a distance of: " + distance.toString());
        addPoints(distanceScore);
       latlngWizard = newLatLng;
       gpsAttempts = 0
       if (session.userName != undefined){ moveMarker(markerWizard,latlngWizard);}
       moveMarker(markerWizardTrail,latlngWizard);
       offLineCheck();//Set Map type to local tiles if offline
       mapHere.panTo(latlngWizard); //to be moved to the moveMarker function with option
       logLocation  (getSessionId (),lat,lng,sessionStorage.scorePoints,trailID,sessionStorage.userName) ;
    }
}
   

// Show the user's position on a Google map.
function showMap(lat, lon) 
{
	// Create a LatLng object with the GPS coordinates.
	latlngWizard = new google.maps.LatLng(lat, lon);
    latlngMagicCentre =  new google.maps.LatLng(lat ,  lon ); //temp hard coding
    latlngMagic = latlngMagicCentre;
    var trailLatLng = new google.maps.LatLng(53.338110,-2.054967); //temp hard coding
    
	// Create the Map Options
    var mapOptionsYou = 
        {
            zoom: 18,
            center: latlngWizard,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
              disableDefaultUI: true,
              draggable: false,
              rotateControl: true
        };
    
    var mapOptionsTrail = 
     {
        zoom: 15,
        center: trailLatLng,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
         draggable: true,
         disableDefaultUI: false,
          rotateControl: true,
         zoomControlOptions: { style:google.maps.ZoomControlStyle.LARGE}
    };
    
        // Generate the Map(
      mapHere = new google.maps.Map(document.getElementById('googleMapHere'), mapOptionsYou);
      mapTrail = new google.maps.Map(document.getElementById('googleMapTrail'), mapOptionsTrail);

    
     //Define OSM map type pointing at the OpenStreetMap tile server
    mapTrail.mapTypes.set("OSM", new google.maps.ImageMapType(
    {
     getTileUrl: function(coord, zoom) 
        {
                    // "Wrap" x (logitude) at 180th meridian properly
                    // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib 
                    var tilesPerGlobe = 1 << zoom;
                    var x = coord.x % tilesPerGlobe;
                    if (x < 0) {
                        x = tilesPerGlobe+x;
                    }
                    // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
                    //openStreetURL = "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
                    openStreetURL = "./img/map/" + zoom + "/" + x + "/" + coord.y + ".png";
                    //console.log ('myList.Add("' + openStreetURL + '");' );
                    return openStreetURL;                    
        },
                    tileSize: new google.maps.Size(256, 256),
                    name: "OpenStreetMap",
                    maxZoom: 18
    }));
    
    //mapTrail.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    //mapTrail.setMapTypeId("OSM");

    
    
    
    
//Global Class for magic sprite   
  spriteMagic = function  (latLng)
                {
                    var  spriteMarker = new google.maps.Marker(
                    {
                    position: latLng,
                    title: 'Magic',
                    icon: 'img/greenPotion.png'
                    });


                    this.marker = spriteMarker;
                    this.centerLatLng = latLng;
                    this.points = 200;
                    this.status = "new";
                    this.speed = 1;
                    this.moveType = "circle";
                    this.circleDiameter = 0.005;
                    this.iconMain = "img/greenPotion.png";
                    this.iconAnimate = "img/easterBunnyIcon.png";
                    this.iconEnd = "img/explosionIcon.png";
                    this.soundClose = "audioswoosh";
                    this.messageClose = "";
                    this.soundCollision="audiomagicCollision";
                    this.messageCollision = "";
                    this.name = "Magic";
                    this.move = function (newLat,newLng){};
                    this.collide = function ()
                    {
                        this.marker.setIcon(this.iconEnd);
                        this.moveType = "stop";
                        addPoints(this.points);
                        messageNotify ("Well Done",this.soundCollision);
                    };
                }
    
    markerWizard = new google.maps.Marker(
                                            {
                                              position: latlngWizard,
                                              title: 'You',
                                              animation: google.maps.Animation.DROP,
                                              icon: userIcon
                                            });
    
    markerWizardTrail =  new google.maps.Marker(
                        {
                        position: latlngWizard,
                        title: 'You',
                        animation: google.maps.Animation.DROP,
                        icon: ''
                        });

    latlngMagic = new google.maps.LatLng(latlngMagic.lat () +  (Math.random () * 0.0001), latlngMagic.lng () + (Math.random () * 0.0001));
    
    //Start with a sprite close to user to spark interest
    var firstSprite = new spriteMagic (latlngMagic);
    firstSprite.circleDiameter = 0.03;
    firstSprite.points = 5;
    firstSprite.marker.setPosition    (setCircleLocation(firstSprite.marker.getPosition().lat(),firstSprite.marker.getPosition().lng(),firstSprite.circleDiameter ,circleAngleMagic));
    firstSprite.marker.setMap(mapHere);
    
    //Second sprite at close random point
    latlngMagic = new google.maps.LatLng(latlngMagic.lat () +  (Math.random () * 0.0001), latlngMagic.lng () + (Math.random () * 0.0001));
    var secondSprite = new spriteMagic (latlngMagic);
    secondSprite.circleDiameter = 0.015;
    secondSprite.marker.setPosition ( setCircleLocation (secondSprite.centerLatLng.lat(),secondSprite.centerLatLng.lng(),secondSprite.circleDiameter,circleAngleMagic));
    secondSprite.marker.setMap(mapHere);
    secondSprite.points = 10;
    
    
    sprites.push(firstSprite);
    sprites.push(secondSprite);
    
    //Show markers on map
    markerWizard.setMap(mapHere);
    
    //Show Trail on map
    showTrail (mapTrail,"img/trailLyme.xml");//ajax request using gpx file   
    //CreateSprites from points on gpx file
    createSprites  (mapHere,"img/trailLyme.xml");//ajax request using gpx file   
    
    //move Magic, currently in cricles
    setInterval (moveMagic,moveInterval); 
    //Offer encouragement every so often
    setInterval (audioEncourage, (60000 * encouragmentInterval));   
}

function logLocation (SessionID,LngCurrent,LatCurrent,ScoreCurrent,TrailID,Name)   
{
    console.log ("loglocation");
    var baseURL = "../servicetreasurehunt/Service1.svc/sessionlog?";
    var paramURL = "SessionID=" + SessionID.toString();
    paramURL = paramURL + "&LngCurrent=" + LngCurrent;
    paramURL = paramURL + "&LatCurrent=" + LatCurrent;
    paramURL = paramURL + "&ScoreCurrent=" + ScoreCurrent;
    paramURL = paramURL + "&TrailID=" + TrailID;
    paramURL = paramURL + "&Name=" + Name;
    var wcfURL = baseURL + paramURL;
    console.log(wcfURL.toString());
    
        
   $.ajax({
  type: "GET",
  url: wcfURL,
  dataType: "xml",
  success: function(xml) {console.log("ajax sessionlog success");},              
    error: function(){console.log("ajax sessionlog error");}
                        });
}

 function createSprites (map,gpxFileURL){
   $.ajax({
  type: "GET",
  url: gpxFileURL,
  dataType: "xml",
  success: function(xml) {     
    //var startLat;
	var bounds = new google.maps.LatLngBounds ();
	$(xml).find("trkpt").each(function() {
	  var lat = $(this).attr("lat");
	  var lon = $(this).attr("lon");
	  var p = new google.maps.LatLng(lat, lon);
      var sprite = new spriteMagic(p);
	  sprites.push(sprite);
        
	}
    //Sprites collected
     
                           );
      for (index = 2; index < sprites.length; index++)
                           {
                               if (index % 3 == 0){
                                   console.log ("a bunny is born");
                                   /*
                                   sprites[index].marker.icon = "img/easterBunnyIcon.png";
                                   sprites[index].iconEnd = "img/eggIcon.png";
                                   sprites[index].soundCollision = "audiomagicEggs"
                                   */
                                   sprites[index].points = (sprites[index].points * 3);
                               }
                             sprites[index].marker.setMap(map);
                           }
      
     },
error: function(){console.log("ajax error");}
 })
     
 }
 
                      
                     
function moveMagic() {
    var alerted = false;
    circleAngleMagic = circleAngleMagic + 0.1 ;         
    
 //Move all sprites in Circle   
   for (index = 0; index < sprites.length; index++)
       {  
           
        if (sprites[index].moveType != 'stop')
                {   
                //Check distance of sprite from user and collide if close   
               var distance = getDistance (sprites[index].marker.position,latlngWizard);
                if (distance < collisionDistance) { sprites[index].collide ();}
                    //Test if close
                     if (distance < closeDistance ) { alerted = true;  } //one of the sprites is close
                    //Move sprite in circle   
                    sprites[index].marker.setPosition ( setCircleLocation (sprites[index].centerLatLng.lat(),sprites[index].centerLatLng.lng(),sprites[index].circleDiameter,circleAngleMagic));
                                    }

                }
    //Move to map if the closeAlert is not already going off. Stops being moved back to map when user has moved off
    if(alerted == true && alertClose == false){
                                            alertClose = true; 
                                            messageNotify ("I smell that magic is close","audiomagicClose");
                                            document.getElementById('aPlay').click(); //Show Map
                                            }
    if(alerted == false ){alertClose == false;}
    
        }


function audioEncourage (){
    playAudioLink("audioencourage");
    
}


function getDistance(c1, c2, opt) {
  var lat1 = rad(c1.lat()), lat2 = rad(c2.lat());
  var lng1 = rad(c1.lng()), lng2 = rad(c2.lng());
  var dLng = (lng2-lng1), dLat = (lat2-lat1);
  var R = 6371/1.6;
  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
    Math.sin(dLng/2) * Math.sin(dLng/2) * 
    Math.cos(lat1) *  Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
     
  return (R * c);
}
 
function rad(degrees) {
  return degrees * Math.PI/180;
}


function geolocationError (){
    console.log ("GeoError");
    messageNotify("Haveing trouble with GPS");
     document.getElementById("floatingScore").innerHTML = "GPS Fault";
}   
    

function displayScore(points)
{
    
    
    
}

function addPoints (points)  {
         //Add points to existing total
         if (sessionStorage.scorePoints) {
                    sessionStorage.scorePoints = Number(sessionStorage.scorePoints) + points;
                } else {
                    sessionStorage.scorePoints = points;
                }
    
    document.getElementById("floatingScore").innerHTML = "Magic: " + Number(sessionStorage.scorePoints).toLocaleString();
    
   //Display Score on Play float 
if(points > 0){
    setTimeout(function() { document.getElementById("floatingScore").innerHTML =  Number(points).toLocaleString() + " points"; }, 5);
    setTimeout(function() { document.getElementById("floatingScore").style.backgroundColor = "rgba(255, 0, 0, 0.5)"; }, 100);
    setTimeout(function() { document.getElementById("floatingScore").style.backgroundColor = "rgba(255, 0, 0, 0.75)"; }, 1000);
    setTimeout(function() { document.getElementById("floatingScore").style.backgroundColor = "rgba(255, 0, 0, 1)"; }, 2000);
    setTimeout(function() { document.getElementById("floatingScore").style.backgroundColor = "rgba(255, 0, 0, 0.75)"; }, 5000);
    setTimeout(function() { document.getElementById("floatingScore").style.backgroundColor = "rgba(255, 0, 0, 0.2)"; }, 10000);
    setTimeout(function() { document.getElementById("floatingScore").innerHTML = "Magic: " + Number(sessionStorage.scorePoints).toLocaleString(); }, 10000);
}
    
          
          
         
         
          document.getElementById("magicScore").innerHTML = "You have earned " + Number(sessionStorage.scorePoints).toLocaleString() + " Magic points." ;
        
           document.getElementById("magicLevel").innerHTML = "Well Done.";
         
         if(sessionStorage.magicLevel) {magicLevel = sessionStorage.magicLevel;}
         
         if(Number(sessionStorage.scorePoints) < Number(499))
            {document.getElementById("magicCert").innerHTML = "This means you are a certified apprentice";
            magicLevel = 1;
            }
           
          if(Number(sessionStorage.scorePoints) > 500 && Number(sessionStorage.scorePoints) < 2000)
            {document.getElementById("magicCert").innerHTML = "This means you are a junior spell caster (Long hours without much appreciation)";
            if (magicLevel < 2) {magicLevel = 2;
                                 setTimeout (function(){messageNotify("You've been promoted. Check out your score.","audiopromotion");},15000);}
            }
          if(Number(sessionStorage.scorePoints) > 1999 && Number(sessionStorage.scorePoints) < 3000)
            {document.getElementById("magicCert").innerHTML = "This means you are a senior spell caster (Magic is easy now that your junior days are behind you.)";
            if (magicLevel < 3) {magicLevel = 3;
                                setTimeout (function(){messageNotify("You've been promoted. Check out your score.","audiopromotion");},15000);}
            }
        if (Number(sessionStorage.scorePoints) > 2999 && Number(sessionStorage.scorePoints) < 4000)
             {document.getElementById("magicCert").innerHTML = "This means you are a master spell caster. (Remember with great power comes great responsibility)";
             if (magicLevel < 4) {magicLevel = 4;
                                 setTimeout (function(){messageNotify("You've been promoted. Check out your score.","audiopromotion");},15000);}}         
         
          if (Number(sessionStorage.scorePoints) > 3999 && Number(sessionStorage.scorePoints) < 5000)
             {document.getElementById("magicCert").innerHTML = "This means you are a professor of magic, who teaches spell casters. You have risen to the high levels of magic.";
             if (magicLevel < 5) {magicLevel = 5;
                                 setTimeout (function(){messageNotify("You've been promoted. Check out your score.","audiopromotion");},15000);}}    
         
         
         if (Number(sessionStorage.scorePoints) > 4999 && Number(sessionStorage.scorePoints) < 6000)
             {document.getElementById("magicCert").innerHTML = "This means you are a senior professor of magic, who teaches spell casters. You have risen to the high levels of magic.";
             if (magicLevel < 6) {magicLevel = 6;
                                 setTimeout (function(){messageNotify("You've been promoted. Check out your score.","audiopromotion");},15000);}}   
         
         if (Number(sessionStorage.scorePoints) > 5999 )
             {document.getElementById("magicCert").innerHTML = "This means you are a Head Proffessor of Magic, You are now a member of the magic counsel and advise on how to avoid magical mistakes like the Easter explosion in Lyme Hall many years ago. Well done!";
             if (magicLevel < 7) {magicLevel = 7;
                                 setTimeout (function(){messageNotify("You've been promoted. Check out your score.","audiopromotion");},15000);}}  
        
         sessionStorage.magicLevel = magicLevel;
         logLocation  (getSessionId (),lat,lng,sessionStorage.scorePoints,trailID,sessionStorage.userName) ;
                     
     }
                     
                     
     function setPoints (points) {}//todo
                     
            function sendNotification (title, options) {
  // Memoize based on feature detection.
  if ("Notification" in window) {
    sendNotification = function (title, options) {
      return new Notification(title, options);
    };
  } else if ("mozNotification" in navigator) {
    sendNotification = function (title, options) {
      // Gecko < 22
      return navigator.mozNotification
               .createNotification(title, options.body, options.icon)
               .show();
    };
  } else {
    sendNotification = function (title, options) {
      alert(title + ": " + options.body);
    };
  }
  return sendNotification(title, options);
};
                     
                     
function iOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}                 

 function messageNotify (strMessage ,audioFile  )                        
 {
     if (strMessage == undefined) {strMessage = "I smell magic";}
     if (audioFile == undefined){audioFile = "audioswoosh";}
     
// Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    //alert(strMessage);
      playAudioLink (audioFile,messageVol);
       window.navigator.vibrate([300,100,300]);
   
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    //
      window.navigator.vibrate([300,100,300]);
   playAudioLink (audioFile,messageVol);

     // var audio = new Audio(audioFile);
     // audio.play();
      var notification = new Notification("Magic Message",{body:strMessage, icon:userIcon});
      
      
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") { // 
                                    window.navigator.vibrate([300,100,300]);
                                    playAudioLink (audioFile,messageVol);
                                    var notification = new Notification ("Magic Message",{body:strMessage, icon:userIcon});
                                    }
    });
  }
 }

  
                   
                                  
                
                     
function moveMarker (marker,markerLngLat, iconURL)
                     {
                        //Move marker passed to function, currently using a circle motion
                       
                        marker.setPosition(markerLngLat);
                         if (iconURL != undefined){ marker.setIcon(iconURL); }
                                             
                        
                     }
                     

function setCircleLocation (lat1,lng1,d,tc)   
                     {
                         
                        //Give point on circle d distance from lat1\lat to on a beari   ng tc
                        var lng2;
                         var lat2;
                        var R = 6378.1; //#Radius of the Earth
lat1 = lat1 * (Math.PI/180); //Current lat point converted to radians
lng1 = lng1 * (Math.PI/180) ; //#Current long point converted to radians

lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(tc));

lng2 = lng1 + Math.atan2(Math.sin(tc)*Math.sin(d/R)*Math.cos(lat1),
             Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));

lat2 = (lat2 * (180/Math.PI) - 0.00005); //Slight manual correction seem to put markers circling original co-ord
lng2 = (lng2 * (180/Math.PI) - 0.0001); //Slight manual correction seem to put markers circling original co-ord

      return new google.maps.LatLng(lat2,lng2);
     
                     }
     
    
/////////////////////////
//Google Maps Async
////////////////////////////
  
 function showTrail (map,gpxFileURL){
   $.ajax({
  type: "GET",
  url: gpxFileURL,
  dataType: "xml",
  success: function(xml) {
	var points = [];
     
      var startLat;
	var bounds = new google.maps.LatLngBounds ();
	$(xml).find("trkpt").each(function() {
	  var lat = $(this).attr("lat");
	  var lon = $(this).attr("lon");
	  var p = new google.maps.LatLng(lat, lon);
	  points.push(p);
	  bounds.extend(p);  
        
    //log openstreet url for trail point    
      //  myURL = openStreetURLText (p.x,10);
        
     
	});
     var  start = $(xml).find("trkpt").first();
      
    var startLat = start.attr("lat");
     var startLon = start.attr("lon");
    var startLatLng = new google.maps.LatLng(startLat, startLon);
  
     console.log("xmlend"); 
      
      var poly = new google.maps.Polyline({
	  // use your own style here
	  path: points,
	  strokeColor: "#FF00AA",
	  strokeOpacity: .7,
	  strokeWeight: 4
	   });
	
       markerStart = new google.maps.Marker({
      position: startLatLng,
      title: 'Start',
        icon: 'img/carIcon2.png',
      animation: google.maps.Animation.DROP
        } );
      
	poly.setMap(mapTrail);
      markerStart.setMap(mapTrail);
	mapTrail.setZoom = 10;
      mapTrail.setCenter(startLatLng);   
  },
error: function(){console.log("ajax error")}
})
  
    
}
                          
                          
                          
       function offLineCheck () {
           
           if(navigator.onLine)
           {console.log("Online");
               mapTrail.setMapTypeId(google.maps.MapTypeId.ROADMAP); 
            mapHere.setMapTypeId(google.maps.MapTypeId.TERRAIN);}
           else
          {console.log("Offline");
              mapTrail.setMapTypeId("OSM"); 
           }
                      
       }











     function openStreetURLText (OSMLat,OSMLng, zoom) {
                    // "Wrap" x (logitude) at 180th meridian properly
                    // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib 
                    var tilesPerGlobe = 1 << zoom;
                    var x = coord.x % tilesPerGlobe;
                    if (x < 0) {
                        x = tilesPerGlobe+x;
                    }
                    // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
                    openStreetURL = "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
                    console.log (openStreetURL);
                    return openStreetURL;
                    //http://tile.openstreetmap.org/5/53.354140296578407/-2.05643892288208.png
                };
          