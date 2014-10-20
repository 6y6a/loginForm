var gulp = require('gulp'),                                     // Gulp JS
    stripDebug = require('gulp-strip-debug'),                   // Console.log and debugger striper
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Strip console.log and debugger from main.js
module.exports = function(buildOptions) {
    
    return gulp.task('strip-debug', function(buildOptions) {
        return gulp.src('./builds/build' + buildOptions.buildVersion + '/static/js/main.js')
            .pipe(stripDebug())
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/static/js/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'JS is ready for minify \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};   