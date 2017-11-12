function notifyonDeviceReady() {
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#ad3127");
    }
    cordova.plugins.firebase.analytics.setEnabled(true);
    var uuid = device.uuid;
    cordova.plugins.firebase.analytics.setUserId(uuid);
    cordova.plugins.firebase.analytics.setCurrentScreen("Home");
	document.getElementById('body').style.display = 'block';
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


function playSound(audio) {
    console.log('loading sound' + audio);
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
        cordova.plugins.firebase.analytics.logEvent("sound_played", {sound: audio});
};

function displayElement(element) {
    console.log("Showing element " + element);
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
    $('.english').show();
    $('.maths').show();
    $('.song').show();
    $('.sayings').show();
    cordova.plugins.firebase.analytics.setCurrentScreen("Home");
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

document.addEventListener("deviceready", notifyonDeviceReady, false);


