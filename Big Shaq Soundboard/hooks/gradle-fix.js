#!/usr/bin/env node

// Define hook in your config <hook src="scripts/cordova-google-services-version-gradle-fix.js" type="before_prepare" />

var sourceDir = '';
var platformDir = 'platforms/android';

var fs = require('fs');
var path = require('path');
var readline = require("readline");

module.exports = function(ctx) {

    console.log('-----------------------------');
    console.log('Gradle Fix');

    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    var Q = ctx.requireCordovaModule('q');
    var deferred = Q.defer();

    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    var gradle = path.join(platformRoot, 'project.properties');
    console.log(gradle);
    fs.readFile(gradle, 'utf8', function (err,data) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        }
        var result = data.replace(/play-services-auth:.*/g, 'play-services-auth:9.8.0')
            .replace(/play-services-identity:.*/g, 'play-services-identity:9.8.0');

        fs.writeFile(gradle, result, 'utf8', function (err) {
            if (err) {
                console.log('error');
                console.log('-----------------------------');
                deferred.reject(err);
            }
            console.log('complete');
            console.log('-----------------------------');
            deferred.resolve();
        });
    });



    return deferred.promise;
};

