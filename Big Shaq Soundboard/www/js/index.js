function notifyonDeviceReady() {
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#d84b29");
    }
    cordova.plugins.firebase.analytics.setEnabled(true);
    var uuid = device.uuid;
    cordova.plugins.firebase.analytics.setUserProperty("build_number", "value1");
    var sounds = ["bigshaq","boom","2plus2","minus1thats3","1234","mandobigmafs","eforexcellent","eldickhead","hisdadsadinnerlady","holdtightasznee","putmenexttothesun","ivegotthesauce","mandontstartbiff","mansgotblueeyes","thesunshotterthanme","mansnothot","mansnotdumb","mybrudda","ilikemyfantawithnohaice","noketchup","mansgotsauce","youdontforcethesauce","askanegghowdoyouhaveyouryolk","papakakaka","quackquackquack","youmanwereducking","quickmafs","manknowsalgebra","pythagoroustheorem","rawsauce","skidipipapa","skrrrrrra","skyaaa","put-put-put-boom","poompoom","tu-tu-tu-qum-poom-boom","lookatyournose","thetinggoesfull","takeoffyourjacket","thatgirlisauckers","thetinggoes","whosdat","yadunknow","youdickhead","yourequitescintilating","givemeyournumber","idonttakeoffmyjacket","yougetme","squadededup","theowlgoesprrttt","youknowlikethat","mansgotbars","asznee","mybrothers","intillectualisilyintelligent","thesundidnotshine","makeanep","sufficishent","englishlesson","itcomesvertic","hoptscotchting","youregivingmeamigrane","butterflywasp","mansnothotboxing","linkup","cmonbruv","englishlanguage","islandrecords","ileland","mandontmakemelooklikeidontknowenglish","bigenglish","englishidnotreallymystrongestsubject","mansready","amplificication","youreprotecteded","causetheconspic","donttrytoincriminateme","checkthestatistics","persperationting","lynxeffect"];
    sounds.forEach(loadSounds);
    cordova.plugins.firebase.analytics.setUserId(uuid);
    cordova.plugins.firebase.analytics.setCurrentScreen("Home");
    cordova.getAppVersion.getVersionCode(function (version) {
                cordova.plugins.firebase.analytics.setUserProperty("build_number", version);
        });
	document.getElementById('body').style.display = 'block';
	loadFavourites();
	StatusBar.show();

    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
      admobid = {
        banner: 'ca-app-pub-5354491797983322/5706099041', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-5354491797983322/6572334447'
      };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
      admobid = {
        banner: 'ca-app-pub-5354491797983322/5706099041', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-5354491797983322/6572334447'
      };
    } else { // for windows phone
      admobid = {
        banner: 'ca-app-pub-5354491797983322/5706099041', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-5354491797983322/6572334447'
      };
    }

    var defaultOptions = {
    	adSize: 'SMART_BANNER',
    	width: 360, // valid when set adSize 'CUSTOM'
    	height: 90, // valid when set adSize 'CUSTOM'
    	position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	x: 0,		// valid when set position to POS_XY
    	y: 0,		// valid when set position to POS_XY
    	isTesting: false,
    	autoShow: true
    };
    AdMob.setOptions( defaultOptions );

    if(AdMob)
        AdMob.createBanner( {

            adId:admobid.banner,
            position:AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow:true}
    	);

    	/*AdMob.prepareInterstitial({
        	adId: admobid.interstitial,
        	autoShow: false
        });*/


}

var storedfavourites = JSON.parse(localStorage.getItem("favourites"));
var displayprompt = localStorage.getItem("favprompt");

function loadSounds(item,index) {
    window.plugins.NativeAudio.preloadSimple(item, 'audio/' + item + '.mp3', function(){console.log('loaded sound' + item + ' successfully');},function(msg){console.log( 'loadSound () error: loading sound' + item + msg );});
}
var favlabel;
function loadFavourites() {
  if (storedfavourites) {
    var favbody = "<div class=\"container\"><div class=\"row\">";
    storedfavourites.forEach(function(favourite) {
          console.log(favourite);
          favlabel = document.getElementById(favourite + 'label').innerHTML;
          favbody += "<div class=\"col\" onclick=\"playSound('favourites','" + favourite + "');\"ontouchstart=\"touchStartRem('"+ favourite +"');\" ontouchmove=\"clearTimeout(pressTimer);\" ontouchcancel=\"clearTimeout(pressTimer);\"> <button class=\"mdl-button mdl-js-button mdl-button--fab mdl-button--primary\"><i class=\"material-icons\">audiotrack</i></button><span class=\"soundboard-label\"><br>" + favlabel + "</span> </div>";
      });
    favbody += "</div></div>";
  document.getElementById('favbody').innerHTML = favbody;
  } else if (displayprompt) {
    storedfavourites = [];
    document.getElementById('favbody').style.display = "none";
  } else {
    storedfavourites = [];
    document.getElementById('favprompt').style.display = "block";
  }

};

function hideFavouritesPrompt() {
    localStorage.setItem('favprompt', 'hidden');
    displayprompt = localStorage.getItem("favprompt");
    document.getElementById('favprompt').style.display = "none";
    loadFavourites();
}

var pressTimer;

function touchStart(sound) {
 pressTimer = setTimeout(function() { console.log("adding sound:" + sound); addSound(sound); },1000);
}

function touchStartRem(sound) {
 pressTimer = setTimeout(function() { console.log("removing sound:" + sound); removeSound(sound); },1000);
}

function touchCancel() {
   clearTimeout(pressTimer);
}

function addSound(sound) {
    storedfavourites.push(sound);
    localStorage.setItem("favourites", JSON.stringify(storedfavourites));
    document.getElementById("successalert").innerHTML = "This sound has been added to your favourites!"
    document.getElementById("successalert").style.display = "block";
    cordova.plugins.firebase.analytics.logEvent("favourite_added", {sound: sound});
    setTimeout(function(){
         document.getElementById("successalert").style.display = "none";
     }, 5000);
    storedfavourites = JSON.parse(localStorage.getItem("favourites"));
    loadFavourites();
};

function removeSound(sound) {
    storedfavourites = JSON.parse(localStorage.getItem("favourites"));
    var index = storedfavourites.indexOf(sound);
    if (index > -1) {
        storedfavourites.splice(index, 1);
    }
    localStorage.setItem("favourites", JSON.stringify(storedfavourites));
    document.getElementById("successalert").innerHTML = "This sound has been removed from your favourites!"
    document.getElementById("successalert").style.display = "block";
    cordova.plugins.firebase.analytics.logEvent("favourite_removed", {sound: sound});
        setTimeout(function(){
             document.getElementById("successalert").style.display = "none";
         }, 5000);
    storedfavourites = JSON.parse(localStorage.getItem("favourites"));
    loadFavourites();
}

function playSound(origin,audio) {
    clearTimeout(pressTimer);
    window.plugins.NativeAudio.play(audio,function(){console.log('playing' + audio);},function(msg){console.log('error playing back' + audio + msg);},function(){console.log('completed playing back' + audio);});

cordova.plugins.firebase.analytics.logEvent("sound_played", {sound: audio, origin: origin});

   /* if(cordova.platformId == 'android') {
        // Play the audio file at url
                var my_media = new Media('/android_asset/www/audio/' + audio + '.mp3',
                    // success callback
                    function () {
                        console.log("playAudio():Audio Success");
                        my_media.release();
                    },
                    // error callback
                    function (err) {
                        console.log("playAudio():Audio Error: " + err);
                    }
                );
    } else {
                var my_media = new Media('audio/' + audio + '.mp3',
                    // success callback
                    function () {
                        console.log("playAudio():Audio Success");
                        my_media.release();
                    },
                    // error callback
                    function (err) {
                        console.log("playAudio():Audio Error: " + err);
                    }
                );
    }
        // Play audio
        my_media.play();*/
};

function displayElement(element) {
    console.log("Showing element " + element);
    document.getElementById('all').style.display = "block";
    document.getElementById('favbody').style.display = "none";
    $('.english').hide();
    $('.maths').hide();
    $('.song').hide();
    $('.sayings').hide();
    $('.' + element + '').show();
    cordova.plugins.firebase.analytics.setCurrentScreen(element);
    document.getElementById('app').MaterialLayout.toggleDrawer();
    /*AdMob.showInterstitial();
    AdMob.prepareInterstitial({
        adId: 'ca-app-pub-5354491797983322/6572334447',
        autoShow: false
    });*/
}

function displayAll() {
    document.getElementById('all').style.display = "block";
    document.getElementById('favbody').style.display = "block";
    $('.english').show();
    $('.maths').show();
    $('.song').show();
    $('.sayings').show();
    cordova.plugins.firebase.analytics.setCurrentScreen("Home");
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

function menudisplayFavourites() {
    document.getElementById('all').style.display = "none";
    document.getElementById('favbody').style.display = "block";
    cordova.plugins.firebase.analytics.setCurrentScreen("favourites");
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

document.addEventListener("deviceready", notifyonDeviceReady, false);


