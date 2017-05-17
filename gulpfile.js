"use strict";

var gulp = require("gulp"),
    babel = require("gulp-babel"),
    run = require("run-sequence"),
    del = require("del");

gulp.task("clean", function() {
  return del("practical-task-2/build");
});

gulp.task("copy", function() {
  return gulp.src([
      "practical-task-2/src/**/*.html",
      "practical-task-2/src/**/*.css",
    ], {
      base: "./practical-task-2/src/"
    })
    .pipe(gulp.dest("practical-task-2/build"));
});

gulp.task("script", function() {
  return gulp.src('./practical-task-2/src/script.js')
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest("./practical-task-2/build"));
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "script",
    fn
  );
});