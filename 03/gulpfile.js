const gulp = require('gulp')

const less = require('gulp-less')
const imagemin = require('gulp-imagemin')

//编译less
gulp.task('less', function () {
    gulp.src('src/less/*')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
})


//压缩图片
gulp.task('imagemin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
})





gulp.task('default', ['less', 'imagemin'])