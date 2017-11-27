# NativeSettings plugin for Cordova (6/7)

The plugin allows you to open OS settings on iOS 8/9/10 and Android, via cordova-based app. For example, it will allow you to open the keyboard settings, Wifi, bluetooth etc (full list below).

## Adding/Removing the Plugin
It will be saved to the config.xml file

Ionic Framework:

```bash
ionic cordova plugin (add|rm) cordova-open-native-settings
```

Cordova:

```bash
cordova plugin (add|rm) cordova-open-native-settings --save
```

or via npm (It will be saved to the package.json file)

```bash
npm (install|rm) cordova-open-native-settings --save
```

## Using the plugin (opens Location Settings in Android and Application Settings in iOS)

```
cordova.plugins.settings.open(setting_constant, success_callback, failure_callback);
```

### Example for iOS and Android - open Wifi settings

```js
if (window.cordova && window.cordova.plugins.settings) {
    console.log('openNativeSettingsTest is active');
    window.cordova.plugins.settings.open("wifi", function() {
            console.log('opened settings');
        },
        function () {
            console.log('failed to open settings');
        }
    );
} else {
    console.log('openNativeSettingsTest is not active!');
}
```

In Android, by default it is opened in the same application as a new activity, the hardware back button will bring the user back to the previous activity (the app). In order to open settings as a new application (two applications will appear in "recent/opened" apps list) the following code can be used:
`window.cordova.plugins.settings.open(["wifi", true], function() {}, function() {}); ....`

## Settings Options
You can use any constant from the following list:
* I tried to map Android and iOS together, however, they are not always the same.

```
    "about", // ios
    "accessibility", // ios, android
    "account", // ios, android
    "airplane_mode", // ios, android
    "apn", // android
    "application_details", // ios, android
    "application_development", // android
    "application", // android
    "autolock", // ios
    "battery_optimization", // android
    "bluetooth", // ios, android
    "castle", // ios
    "captioning", // android
    "cast", // android
    "cellular_usage", // ios
    "configuration_list", // ios
    "data_roaming", // android
    "date", // ios, android
    "display", // ios, android
    "dream", // android
    "facetime", // ios
    "home", // android
    "keyboard", // ios, android
    "keyboard_subtype", // android
    "locale", // ios, android
    "location", // ios, android
    "manage_all_applications", // android
    "manage_applications", // android
    "memory_card", // android
    "music", // ios
    "music_equalizer", // ios
    "music_volume", // ios
    "network", // ios, android
    "nike_ipod", // ios
    "nfcsharing", // android
    "nfc_payment", // android
    "nfc_settings", // android
    "notes", // ios
    "notification_id", // ios
    "passbook", // ios
    "phone", // ios
    "photos", // ios
    "print", // android
    "privacy", // android
    "quick_launch", // android
    "reset", // ios
    "ringtone", // ios
    "browser", // ios
    "search", // ios, android
    "security", // android
    "settings", // ios, android
    "show_regulatory_info",
    "sound", // ios, android
    "software_update", // ios
    "storage", // ios, android
    "store", // ios, android
    "sync", // android
    "tethering", // ios
    "twitter", // ios
    "usage", // ios, android
    "user_dictionary", // android
    "video", // ios
    "voice_input", // android
    "vpn", // ios
    "wallpaper", // ios
    "wifi_ip", // android
    "wifi", // ios, android
    "wireless" // android
```

## Notes
* Android plugin based on the following information: https://developer.android.com/reference/android/provider/Settings.html#ACTION_DREAM_SETTINGS
* iOS plugin based on the following information: https://gist.github.com/phynet/471089a51b8f940f0fb4
* In iOS, this plugin generates a URL scheme for the *-Info.plist configurations file.
* The plugin for Android is based on the forked repository and was refactored. The iOS part was built from skretch.

## License
```
The MIT License

Copyright (c) 2016 Guy Rombaut

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
