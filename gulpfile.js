"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "docs/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml())
  .pipe(gulp.dest("docs"));
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js", {base: "source"})
  .pipe(gulp.dest("docs"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/css/**/*.*",
    "source/js/**/*.*",
    "source/img/*.*",
    "source/fonts/**/*.{woff,woff2}"
    ], {base: "source"})
    .pipe(gulp.dest("docs"));
});

gulp.task("del", function () {
  return del("docs");
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("docs/img"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("server"));
gulp.task("build", gulp.series("del", "copy", "css", "html"));
