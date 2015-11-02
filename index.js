var vfs = require('vinyl-fs');
var converter = require('sass-convert');
var rename = require('gulp-rename');
var glob = require('glob');
var fs = require('fs');


glob('./css/*.css', function(er, files){
	convertCss(files);
});


function convertCss(files){
	var sassLog = "";
	var errorCount = 0;
	for(var i=0; i < files.length; i++){

		console.log("###\n\nCONVERTING: " + files[i] + "###\n\n");
		sassLog += "###\n\nCONVERTING: " + files[i] + "###\n\n";
		vfs.src(files[i])
		  .pipe(converter({
		    from: 'css',
		    to: 'scss',
		  })).on('error', function(err){
		  	console.log(err);
		  	errorCount++;
		  	sassLog += ("\n\n########ERROR #" + errorCount + ":\n\n" + JSON.stringify(err) + "\n\n#######");
		  })
		  .pipe(rename(function (path) {
		    path.extname = ".scss"
		  }))
		  .pipe(vfs.dest('./sass'))
		  .on('finish', function(msg){
		  	writeToLog(sassLog);
		  });
	}
};

function writeToLog(msg){
	var stream = fs.createWriteStream("sassErrorLog.txt");
	stream.once('open', function(fd) {
	  stream.write(msg);
	  stream.end();
	});
}


// var converter = require('sass-convert');
// var fs = require('fs');
// var vfs = require('vinyl-fs');
// var source = require('vinyl-source-stream');
// var rename = require('gulp-rename');

// fs.createReadStream(oldCss)
//   .pipe(source('1.css'))
//   .pipe(converter({
//     from: 'css',
//     to: 'scss',
//   }))
//   .pipe(rename(function (path) {
//     path.extname = ".scss"
//   }))
//   .pipe(vfs.dest('./'));