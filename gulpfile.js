const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const reload = browserSync.reload

//Tüm dosyalardaki değişiklikleri takip edeceğiz
gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./templates/**/*.pug', ['html'])
  gulp.watch('./*.html').on('change', reload)
  gulp.watch('./sass/**/*.scss', ['css'])
  gulp.watch('./js/**/*.js', reload)
})

// Sass klasörü altındaki stil.scss dosyasını ana dizine stil.css adı ile çıkaracağız
gulp.task('css', () => {
  return gulp.src('./sass/stil.scss') 
  .pipe(plumber([{ errorHandler: false }]))
  .pipe(sass())
  .pipe(prefix())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream())
})

// Templates klasörünün içindeki tüm *.pug dosyalarını aynı isimle ana dizine çıkartacağız
gulp.task('html', () => {
  return gulp.src('./templates/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .on('end', reload)
})


gulp.task('default', ['browser-sync', 'html', 'css'])