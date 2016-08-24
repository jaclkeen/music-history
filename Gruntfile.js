module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
        src: ['./js/hbars.js', './js/songs.js'],
        dest: 'dist/app.js'
      },
      options: {
        transform: ['hbsfy']
      }
    },

    sass: {
      dist: {
        files: {
          '../css/main.css': './sass/music_history.scss'
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
      files: ['js/**/*.js']
    },

    watch: {
      javascripts: {
        files: ['../js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass:{
        files: ['../sass/**/*.sass'],
        tasks: ['sass']
      },
      hbs:{
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['sass', 'browserify', 'jshint', 'watch']);
};
