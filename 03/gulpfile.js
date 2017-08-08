const gulp = require('gulp')

const less = require('gulp-less')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync')
const reload = browserSync.reload

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

//监听src文件变化，并重新编译/压缩
gulp.task('watch', function () {
    gulp.watch('src/less/*', ['less'])
})


//监听编译/压缩后的文件，并刷新页面
gulp.task('changed', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    })

    gulp.watch("dist/css/*").on("change", browserSync.reload)
})




gulp.task('default', ['less', 'imagemin', 'watch', 'changed'])