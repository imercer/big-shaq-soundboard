var soundsArray = ["bigshaq","boom","2plus2","minus1thats3","1234","mandobigmafs","eforexcellent","eldickhead","hisdadsadinnerlady","holdtightasznee","putmenexttothesun","ivegotthesauce","mandontstartbiff","mansgotblueeyes","thesunshotterthanme","mansnothot","mansnotdumb","mybrudda","ilikemyfantawithnohaice","noketchup","mansgotsauce","youdontforcethesauce","askanegghowdoyouhaveyouryolk","papakakaka","quackquackquack","youmanwereducking","quickmafs","manknowsalgebra","pythagoroustheorem","rawsauce","skidipipapa","skrrrrrra","skyaaa","put-put-put-boom","poompoom","tu-tu-tu-qum-poom-boom","lookatyournose","thetinggoesfull","takeoffyourjacket","thatgirlisauckers","thetinggoes","whosdat","yadunknow","youdickhead","yourequitescintilating","givemeyournumber","idonttakeoffmyjacket","yougetme","squadededup","theowlgoesprrttt","youknowlikethat","mansgotbars","asznee","mybrothers","intillectualisilyintelligent","thesundidnotshine","makeanep","sufficishent","englishlesson","itcomesvertic","hoptscotchting","youregivingmeamigrane","butterflywasp","mansnothotboxing","linkup","cmonbruv","englishlanguage","islandrecords","ileland","mandontmakemelooklikeidontknowenglish","bigenglish","englishidnotreallymystrongestsubject","mansready","amplificication","youreprotecteded","causetheconspic","donttrytoincriminateme","checkthestatistics","persperationting","lynxeffect","imnothot","ossnaa","ratnum","scootnum","mansinmancachester","skrrrpopop","theforceiswithyou","theprintermadeanerror","everythingsdeadimalive","howmuchwoodwouldawoodchuckchuck","howcanyoubefromapepper","thestatistacsismad","buymeatwix","yobabes","fireinthebooth","mancanneverbehot","dadis44","noselonglikegardenhose","mansonthsblock","smoketrees","quickmathsfull","condensationcon","getthelate","indadequate","justsaucenoketchup","yeahyeah","youdontknoweverything","youwanttostartbiff","cutherecording","bigman","hahaha","hedgehogsong","illbeequaltotheequator","itsnotamathematicalsong","manknowstrigonometry","manknowstrigonometryalgebrageography","wheresyourgrammaticalgrammars","youtwit","youresayingitlikeaturkishdon","whydidntyouinformme","babesmansnothotfull","dformaths","aintern","baabaablacksheep","beeninsomepredictaments","bigmanyourecrap","crayolastory","dickheadyouth","gabrieljesus","getbetteratyourcarrer","haters","ifyouseethemouse","lockoffthecamera","mansinternationalnow","manspeaksastrinomicalenglish","smokingtoomuchtrees","thebursmentscomingthrough","tinggoespow","xmasfreestyle","yourefired"];
var displayAds;

var soundsplayed = 0;

function notifyonDeviceReady() {
	document.getElementById('body').style.display = 'block';
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#28292b");
    }
    cordova.plugins.firebase.analytics.setEnabled(true);
    var uuid = device.uuid;
    //sounds.forEach(loadSounds);
    cordova.plugins.firebase.analytics.setUserId(uuid);
    cordova.plugins.firebase.analytics.setCurrentScreen("Home");
    cordova.getAppVersion.getVersionCode(function (version) {
                cordova.plugins.firebase.analytics.setUserProperty("build_number", version);
        });
	finaliseRows();
	loadFavourites();
	StatusBar.show();
	var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, permissionSuccess, permissionError);
    function permissionError() {
      console.warn('external storage permission is not turned on');
    }

    function permissionSuccess( status ) {
      if( !status.hasPermission ) error();
    }

/* IAP Restore/Validation Code */
var adsIAPpurchased = localStorage.getItem("hideAdsPurchased");
var displayAds = "yes";
if (adsIAPpurchased) {
    displayAds = "no";
    inAppPurchase
      .restorePurchases()
      .then(function (data) {
        console.log(data);
        data.forEach(function(result) {
            console.log(result.productId);
            console.log("state " + result.state);
            cordova.plugins.firebase.analytics.setUserProperty("IAP_TransactionID", data.transactionId);
            if (!data.state) {
                displayAds = "no";
            } else {
                displayAds = result.state;
                localStorage.removeItem("hideAdsPurchased");
                cordova.plugins.firebase.analytics.logEvent("IAPPurchaseInvalid", {state: data.state});
            }
          })
      })
      .catch(function (err) {
        console.log(err);
      });
};

/* Advertising Code */
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
if(displayAds == "no") {
    console.log("Not showing ads");
} else {
    console.log("Showing ads");
    if(AdMob)
        AdMob.createBanner( {

            adId:admobid.banner,
            position:AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow:true}
    	);

    	AdMob.prepareInterstitial({
        	adId: admobid.interstitial,
        	autoShow: false
        });
    }
}

var storedfavourites = JSON.parse(localStorage.getItem("favourites"));
var displayshareprompt = localStorage.getItem("shareprompt");
var displayprompt = localStorage.getItem("favprompt");
var favlabel;
function loadFavourites() {
if (!displayshareprompt) {
    if (!storedfavourites) {
        storedfavourites = [];
    }
} else if (storedfavourites) {
    var favbody = "<div class=\"container\"><div class=\"row\">";
    storedfavourites.forEach(function(favourite) {
          console.log(favourite);
          favlabel = document.getElementById(favourite + 'label').innerHTML;
          favbody += "<div class=\"col\" onclick=\"playSound('favourites','" + favourite + "');\"ontouchstart=\"touchStartRem('"+ favourite +"');\" ontouchmove=\"clearTimeout(pressTimer);\" ontouchcancel=\"clearTimeout(pressTimer);\"> <button class=\"mdl-button mdl-js-button mdl-button--fab mdl-button--primary\"><i class=\"material-icons\">audiotrack</i></button><span class=\"soundboard-label\"><br>" + favlabel + "</span> </div>";
      });
    favbody += "</div></div>";
  document.getElementById('favbody').innerHTML = favbody;
  document.getElementById('favbody').style.display = "block";
} else if (displayprompt) {
    storedfavourites = [];
    document.getElementById('favbody').style.display = "none";
} else {
    storedfavourites = [];
    document.getElementById('favprompt').style.display = "none";
  }

};

function hidePrompt(type) {
    console.log('hiding type ' + type);
    if (type == "favourites") {
        console.log('favourites prompt is being hidden');
        document.getElementById('favprompt').style.display = "none";
        localStorage.setItem('favprompt', 'hidden');
        displayprompt = "hidden";
    } else if (type == "share") {
        console.log('sharing prompt is being hidden');
        document.getElementById('shareprompt').style.display = "none";
        localStorage.setItem('shareprompt', 'hidden');
        displayshareprompt = "hidden";
    }
    loadFavourites();
}

var pressTimer;

function touchStart(sound) {
 pressTimer = setTimeout(function() { console.log("showing dialog for sound:" + sound + "addonly"); launchDialog(sound,'add'); },1000);
}

function touchStartRem(sound) {
 pressTimer = setTimeout(function() { console.log("showing dialog for sound:" + sound + "remonly"); launchDialog(sound, 'remove'); },1000);
}

function touchCancel() {
   clearTimeout(pressTimer);
}


function addSound(sound) {
   $( "#dialog" ).dialog( "close" );
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
   $( "#dialog" ).dialog( "close" );
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
};

function launchDialog(sound,option) {
    if (option == "add") {
        var dialogtxt = "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"addSound('" + sound + "')\">Add to Favourites</button>";
    } else if (option == "remove") {
        var dialogtxt = "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"removeSound('" + sound + "')\">Remove from Favourites</button>";
    } else {
        var dialogtxt = "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"addSound('" + sound + "')\">Add to Favourites</button><br><br><br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"removeSound('" + sound + "')\">Remove from Favourites</button>";
    };
    dialogtxt += "<br><br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"shareSound('" + sound + "')\">Share Sound</button>";
    dialogtxt += "<br><br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"ringtoneSet('" + sound + "','ringtone')\">Create Ringtone</button>";
    dialogtxt += "<br><br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"ringtoneSet('" + sound + "','notification')\">Create Notification Tone</button>";
    dialogtxt += "<br><br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" onclick=\"ringtoneSet('" + sound + "','alarm')\">Create Alarm Tone</button>";
    dialogtxt += "<br><br><br><br<br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"closeDialog()\">Close</button>";
   document.getElementById("dialog").innerHTML = dialogtxt;
   $( "#dialog" ).dialog( "open" );
};

function closeDialog() {
   $( "#dialog" ).dialog( "close" );
};

function audioPlayer(audio) {
    console.log("playing" + audio);
    if(cordova.platformId == 'android') {
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
        my_media.play();
}
function playSound(origin,audio) {
    clearTimeout(pressTimer);
    /*window.plugins.NativeAudio.play(audio,function(){console.log('playing' + audio);},function(msg){console.log('error playing back' + audio + msg);},function(){console.log('completed playing back' + audio);});


    soundsplayed = soundsplayed + 1;
    if (soundsplayed == 10) {
        document.getElementById("waitalert").style.display = "block";
        unloadAll();
        loadAll();
        setTimeout(function(){
                 document.getElementById("waitalert").style.display = "none";
        }, 5000);
        soundsplayed = 0;
    }*/
    audioPlayer(audio);
    cordova.plugins.firebase.analytics.logEvent("sound_played", {sound: audio, origin: origin});
};

function playRandomSound() {
    var rand = soundsArray[Math.floor(Math.random() * soundsArray.length)];
    var randomsoundstring = rand.toString()
    console.log("playing random sound" + randomsoundstring);
    audioPlayer(randomsoundstring);
    cordova.plugins.firebase.analytics.logEvent("random_sound_played", {sound: randomsoundstring});

};

function displayElement(element) {
    console.log("Showing element " + element);
    document.getElementById('all').style.display = "block";
    document.getElementById('favbody').style.display = "none";
    $('.english').hide();
    $('.maths').hide();
    $('.song').hide();
    $('.sayings').hide();
	$('.divider').hide();
	document.getElementById('homelists').style.display = "none";
    document.getElementById('selection').style.display = "block";
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
	$('.divider').show();
	document.getElementById('homelists').style.display = "block";
    document.getElementById('selection').style.display = "none";
    document.getElementById('hideadsscreen').style.display = "none";
	cordova.plugins.firebase.analytics.setCurrentScreen("Home");
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

function displayHideAds() {
    document.getElementById('all').style.display = "none";
    document.getElementById('favbody').style.display = "none";
    document.getElementById('IAPFetchError').style.display = "none";
    document.getElementById('hideadsscreen').style.display = "block";
    document.getElementById('app').MaterialLayout.toggleDrawer();
    inAppPurchase
      .getProducts(['nz.isaacmercer.bigshaq.noads'])
      .then(function (products) {
        console.log(products);
        document.getElementById('currencyString').innerHTML = products[0].currency;
        document.getElementById('priceindecimalString').innerHTML = products[0].price;
        document.getElementById('description').innerHTML = products[0].description;
      })
      .catch(function (err) {
        console.log(err);
        document.getElementById('IAPFetchError').style.display = "block";
      });
    cordova.plugins.firebase.analytics.setCurrentScreen("HideAdsScreen");
}

function purchaseHideAds() {
    cordova.plugins.firebase.analytics.logEvent("IAPPurchaseRequested");
    inAppPurchase
      .buy('nz.isaacmercer.bigshaq.noads')
      .then(function (data) {
        console.log(data);
           displayAds = "no";
           AdMob.removeBanner();
            cordova.plugins.firebase.analytics.logEvent("IAPPurchaseSuccess");
          localStorage.setItem('hideAdsPurchased', data.transactionId);
          var IAPsuccessdialogtxt = "<h5>All Done!</h5>You've successfully purchased the Hide Ads add-on for Big Shaq Soundboard. You may need to restart the app for the changes to be made and all the ads to stop displaying. Thank you for your support.";
          IAPsuccessdialogtxt += "<br><br><br><br<br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"closeDialog()\">Close</button>";
          document.getElementById('dialog').innerHTML = IAPsuccessdialogtxt;
          cordova.plugins.firebase.analytics.setUserProperty("IAP_TransactionID", data.transactionId);
          $( "#dialog" ).dialog( "open" );
      })
      .catch(function (err) {
        console.log(err);
        var IAPerrordialogtxt = "<h5>Whoops, Something went wrong!</h5>Unfortunately we couldn't process your purchase. You could try again, but at this stage you haven't been charged. The error we got from Google Play was:<br>";
        IAPerrordialogtxt += "<b>" + err.message + "</b>";
        IAPerrordialogtxt += "<br><br><br><br<br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"closeDialog()\">Close</button>";
       document.getElementById('dialog').innerHTML = IAPerrordialogtxt;
       $( "#dialog" ).dialog( "open" );
      });
}

function restoreIAPPurchases() {
    cordova.plugins.firebase.analytics.logEvent("IAPRestorePurchases");
    inAppPurchase
      .restorePurchases()
      .then(function (data) {
        console.log(data);
        data.forEach(function(data) {
            console.log(data.productId);
            console.log("state" + data.state);
            if (!data.state) {
                displayAds = "no";
                AdMob.removeBanner();
                cordova.plugins.firebase.analytics.logEvent("IAPRestorePurchaseSuccess");
                cordova.plugins.firebase.analytics.setUserProperty("IAP_TransactionID", data.transactionId);
                localStorage.setItem('hideAdsPurchased', data.transactionId);
                var IAPrestoredialogtxt = "<h5>All Done!</h5>Your purchase has successfully been restored. You may need to restart the app for the changes to be made and all the ads to stop displaying. Thank you for your support."
                 IAPrestoredialogtxt += "<br><br><br><br<br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"closeDialog()\">Close</button>";
                 document.getElementById('dialog').innerHTML = IAPrestoredialogtxt;
                $( "#dialog" ).dialog( "open" );
            } else {
                displayAds = data.state;
                localStorage.removeItem("hideAdsPurchased");
                cordova.plugins.firebase.analytics.logEvent("IAPPurchaseInvalid", {state: data.state});
            }
          })
      })
      .catch(function (err) {
        console.log(err);
      });
}

function menudisplayFavourites() {
    document.getElementById('all').style.display = "none";
    document.getElementById('hideadsscreen').style.display = "none";
    document.getElementById('favbody').style.display = "block";
    cordova.plugins.firebase.analytics.setCurrentScreen("favourites");
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

var allbuttons = "<div class=\"row\">";
function finaliseRows() {
	allbuttons += document.getElementById('mansnothot').innerHTML;
	allbuttons += document.getElementById('fireinthebooth').innerHTML;
	allbuttons += document.getElementById('genius').innerHTML;
	allbuttons += document.getElementById('capitalextra').innerHTML;
	allbuttons += document.getElementById('swil').innerHTML;
	allbuttons += document.getElementById('breakfast').innerHTML;
	allbuttons += document.getElementById('instagram').innerHTML;
	allbuttons += document.getElementById('remaining').innerHTML;
	allbuttons += "</div>"
  	document.getElementById('selection').innerHTML = allbuttons;
	document.getElementById('selection').style.display = "none";

}

function shareSound(sound) {
   $( "#dialog" ).dialog( "close" );
    window.plugins.socialsharing.share(null, null, 'www/audio/' + sound + '.mp3', null);
    cordova.plugins.firebase.analytics.logEvent("sound_shared", {sound: sound});
}


function ringtoneSet(sound,setting) {
    cordova.plugins.firebase.analytics.logEvent("ringtone_set", {sound: sound, type: setting});
    if(displayAds == "no") {
        console.log("Not showing ads");
    } else {
        AdMob.showInterstitial();
        AdMob.prepareInterstitial({
                adId: 'ca-app-pub-5354491797983322/6572334447',
                autoShow: false
            });
    };
    var fileTransfer = new FileTransfer();
    var uri = encodeURI("file:///android_asset/www/audio/"+sound+".mp3");
    var ringtoneDir = cordova.file.externalRootDirectory + "Ringtones/" + sound + ".mp3";
    var notificationDir = cordova.file.externalRootDirectory + "Notifications/" + sound + ".mp3";
    var alarmDir = cordova.file.externalRootDirectory + "Alarms/" + sound + ".mp3";
    if (setting == "ringtone") {
        var fileURL = ringtoneDir;
    } else if (setting == "notification") {
        var fileURL = notificationDir;
    } else if (setting == "alarm") {
        var fileURL = alarmDir;
    };
    fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
            console.log("download complete: " + entry.toURL());
            var successdialogtxt = "<h5>Ringtone now available</h5><p>You can now set this sound as your " + setting + " tone. This is usually done within the Settings app, under sound, and by clicking the " + setting + " tone option and selecting the sound " + sound + ". This process may vary on some devices and you may have to restart your device for the sound to appear in the list.";
            //successdialogtxt += "<br><br><br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"cordova.plugins.settings.open(\"sound\");\">Open Settings</button>";
            successdialogtxt += "<br><br><br><br<br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"closeDialog()\">Close</button>";
            document.getElementById('dialog').innerHTML = successdialogtxt;
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
            console.log(error);
            var errordialogtxt = "<h5>Something went wrong!</h5>Unfortunately we were unable copy the ringtone on your device. This could be because you haven't given us permission to modify files, or something else happened. You could try again, or it might be worth checking settings for any permission you may've turned off. <br>If you've just installed the app and given it permission there's a bug on some phones where you may have to restart the app for the permission to become available, so that could also be the case."
            errordialogtxt += "<br><br><br><br<br><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\"closeDialog()\">Close</button>";
             document.getElementById('dialog').innerHTML = errordialogtxt;
        },
        false,
        {
            headers: {
            }
        }
    );
}

document.addEventListener("deviceready", notifyonDeviceReady, false);

