function notifyonDeviceReady() {
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#ad3127");
    }
	document.getElementById('body').style.display = 'block';
	StatusBar.show();
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
};

function displayElement(element) {
    console.log("Showing element " + element);
    $('.english').hide();
    $('.maths').hide();
    $('.song').hide();
    $('.sayings').hide();
    $('.' + element + '').show();
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

function displayAll() {
    $('.english').show();
    $('.maths').show();
    $('.song').show();
    $('.sayings').show();
    document.getElementById('app').MaterialLayout.toggleDrawer();
}

document.addEventListener("deviceready", notifyonDeviceReady, false);


