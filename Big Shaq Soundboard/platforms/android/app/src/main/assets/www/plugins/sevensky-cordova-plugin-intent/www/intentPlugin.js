cordova.define("sevensky-cordova-plugin-intent.intentPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

function IntentPlugin() {

}

IntentPlugin.prototype.startActivity = function (packageName,activitiName,bundle) {
    exec(function (res) { }, function (err) { }, "IntentPlugin", "startActivity", [packageName,activitiName,bundle]);
}

module.exports = new IntentPlugin();
});
