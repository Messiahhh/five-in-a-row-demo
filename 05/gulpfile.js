const gulp = require('gulp');
//编译less=>css
//gulp-less
const less = require('gulp-less');
//编译es6=>es5
//gulp-babel，babel-preset-es2015
const babel = require('gulp-babel');

gulp.task('less', () => {
    gulp.src('public/src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/src/css/'))
});



gulp.task('default',['less'], () => {
    gulp.watch(['public/src/less/*.less'], () => {
        gulp.run('less')
    })
})