var gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default;

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app",
    },
    notify: false,
    // online: false, // Work offline without internet connection
    // tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
  });
});
function bsReload(done) {
  browserSync.reload();
  done();
}

gulp.task("styles", function () {
  return gulp
    .src("sass/**/*.sass")
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: require("bourbon").includePaths,
      }).on("error", sass.logError)
    )
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(
      autoprefixer({
        // grid: true, // Optional. Enable CSS Grid
        overrideBrowserslist: ["last 10 versions"],
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task("code", function () {
  return gulp.src("app/**/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", function () {
  gulp.watch("sass/**/*.sass", gulp.parallel("styles"));
  gulp.watch("app/*.html", gulp.parallel("code"));
});

gulp.task("default", gulp.parallel("styles", "browser-sync", "watch"));
