import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

//minify css
gulp.task('minify-css', () => {
  return gulp.src('src/css/style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css/minified'));
});



// Move the javascript files into our /src/js folder
gulp.task('js', () => {
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () => {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);
