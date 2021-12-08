module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      build: {
        options: {
          archive: 'build.zip'
        },
        files: [
          {expand: true, cwd: './build', src: ['**'], dest: 'build'}
        ]
      }
    },
    run: {
      clean: {
        cmd: 'rm',
        args: ['-rf', './build']
      },
      mkdir: {
        cmd: 'mkdir',
        args: ['./build']
      },
      copyManifest: {
        cmd: 'cp',
        args: ['-f', './extension/manifest.prod.json', './build/manifest.json']
      },
      copyFiles: {
        cmd: 'cp',
        args: ['-rf', './extension/_locales', './extension/images', './build/']
      },
      buildBg: {
        cmd: 'npm',
        args: [
          'run',
          'build',
          '--prefix',
          './background/'
        ]
      },
      buildPopup: {
        cmd: 'npm',
        args: [
          'run',
          'build',
          '--prefix',
          './popup/'
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('clean', ['run:clean', 'run:mkdir']);
  grunt.registerTask('zip', ['compress:build']);
  grunt.registerTask('build', ['clean', 'run:copyManifest', 'run:copyFiles', 'run:buildBg', 'run:buildPopup', 'zip']);
};