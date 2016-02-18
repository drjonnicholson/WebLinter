module.exports = function( grunt ) {

	var _pkg = grunt.file.readJSON( "package.json" );
	grunt.log.subhead( "Processing files found in:" );
	grunt.log.ok( "\"" + _pkg.site + "\"" );
	require( "time-grunt" )( grunt );
	require( "logfile-grunt" )( grunt,
	{
		filePath: "./output/grunt.log",
		clearLogFile: true,
		keepColors: false
	} );

	grunt.initConfig( {
		pkg: _pkg,

		// Task to run validate HTML files
		// https://github.com/jzaefferer/grunt-html
		htmllint: {
			options: {
				force: true
			},
			all: [
				"<%= pkg.site %>/**/*.html",					// Your code
				"!<%= pkg.site %>/**/*jquery*/**/*.html",		// Ignore JQuery, if used
				"!<%= pkg.site %>/**/node_modules/**/*.html",	// Ignore files in "node_modules"
				"!<%= pkg.site %>/**/jsdoc/**/*.html"			// Ignore files in "jsdoc"
			]
		},

		// Task to check the quality of CSS files
		// https://github.com/gruntjs/grunt-contrib-csslint
		csslint: {
			options: {
				force: true,
				csslintrc: ".csslintrc"
			},
			all: {
				src: [
					"<%= pkg.site %>/**/*.css",
					"!<%= pkg.site %>/**/*jquery*/**/*.css",
					"!<%= pkg.site %>/**/node_modules/**/*.css",
					"!<%= pkg.site %>/**/jsdoc/**/*.css"
				]
			}
		},

		// Task to check the quality of JavaScript files
		// http://jshint.com/docs/options/
		jshint: {
			options: {
				jshintrc: true,
				force: true
			},
			all: {
				src: [
					"gruntfile.js",
					"<%= pkg.site %>/**/*.js",
					"!<%= pkg.site %>/**/*jquery*/**/*.js",
					"!<%= pkg.site %>/**/node_modules/**/*.js",
					"!<%= pkg.site %>/**/jsdoc/**/*.js"
				]
			}
		},

		// Task to check coding style of JavaScript documents
		// https://github.com/jscs-dev/grunt-jscs
		// Uses JQuery conventions by default, change this in .jscsrc
		jscs: {
			options: {
				force: true,
				config: ".jscsrc",
				verbose: true
			},
			src: [
				"<%= pkg.site %>/**/*.js",
				"!<%= pkg.site %>/**/*jquery*/**/*.js",
				"!<%= pkg.site %>/**/node_modules/**/*.js",
				"!<%= pkg.site %>/**/jsdoc/**/*.js"
			]
		},

		// Task to generate JavaScript documentation from JSDoc
		// https://github.com/krampstudio/grunt-jsdoc
		jsdoc: {
			options: {
				template: "node_modules/ink-docstrap/template",
				configure: ".jsdocrc"
			},
			all: {
				src: [
					"<%= pkg.site %>/**/*.js",
					"!<%= pkg.site %>/**/*jquery*/**/*.js",
					"!<%= pkg.site %>/**/node_modules/**/*.js",
					"!<%= pkg.site %>/**/jsdoc/**/*.js"
				],
				dest: "output/jsdoc"
			}
		},

		// Task to lint JSON files
		// https://www.npmjs.com/package/grunt-jsonlint
		jsonlint: {
			all: {
				src: [
					"package.json",
					".csslintrc",
					".jscsrc",
					".jsdocrc",
					".jshintrc",
					"<%= pkg.site %>/**/*.json",
					"!<%= pkg.site %>/**/*jquery*/**/*.json",
					"!<%= pkg.site %>/**/node_modules/**/*.json",
					"!<%= pkg.site %>/**/jsdoc/**/*.json"
				]
			}
		}
	} );

	// Load plugin that provide tasks
	grunt.loadNpmTasks( "grunt-html" );
	grunt.loadNpmTasks( "grunt-contrib-csslint" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-jsdoc" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-jsonlint" );

	// Set the grunt force option to make it report errors but continue anyway
	grunt.option( "force", true );

	// Define some composite tasks
	grunt.registerTask( "default", [ "html", "css", "js", "json" ] );
	grunt.registerTask( "html", [ "htmllint" ] );
	grunt.registerTask( "css", [ "csslint" ] );
	grunt.registerTask( "js", [ "jshint", "jscs", "jsdoc" ] );
	grunt.registerTask( "json", [ "jsonlint" ] );
};
