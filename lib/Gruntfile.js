module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      '../dist/app.js': ['../js/songs.js']
    },

    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/music_history.scss'
        }
      }
    },

    jshint: {
      options: {
        predef: [ "document", "console" ],
        asi: true,
        esnext: true,
        globalstrict: true,
        globals: {"CarLot": true},
        browserify: true
      },
      files: ['../js/**/*.js']
    },

    watch: {
      javascripts: {
        files: ['../js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass:{
        files: ['../sass/**/*.sass'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['sass', 'browserify', 'jshint', 'watch']);
};
