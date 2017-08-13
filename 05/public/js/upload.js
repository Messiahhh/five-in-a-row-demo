


let noImage = document.querySelector('.noImage');

//input框
let file = document.querySelector('.file');

//预览图
let image = document.querySelector('.image');
let img = document.querySelector('.img');

//按钮
let submit = document.querySelector('.submit');
let again = document.querySelector('.again');
//进度条
let progress = document.querySelector('.uploadprogress');

//拖拽
function dropEnd(element) {
    element.ondragover = function () {  return false; };
	element.ondragend = function () {  return false; };
	element.ondrop = function (event) {
		event.preventDefault();
		//拖拽改变file.files
		file.files = event.dataTransfer.files;
　　　};
}

dropEnd(noImage)
dropEnd(image)






submit.addEventListener('click', () => {

    if (file.files[0]) {
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                alert('上传成功');
            }
        }

        xhr.upload.onprogress = function (event) {
            

    　　　　if (event.lengthComputable) {
    　　　　　　var complete = (event.loaded / event.total * 100 | 0);
    　　　　　　progress.value = complete;
	　　　　}
			
    　　};
        xhr.open('post','/upload', true);
        xhr.setRequestHeader("Content-type",'multipart/form-data, boundary=AaB03x');
        xhr.send(file.files[0]);
    }
});



file.addEventListener('change', () => {
	progress.value = 0
    noImage.style.display = 'none';
    image.style.display = 'block';
    let reader = new FileReader();
    reader.onload = (event) => {
        img.src = event.target.result;
    }
    reader.readAsDataURL(file.files[0]);
})

again.addEventListener('click', () => {
    file.value = '';
    img.src = '';
    image.style.display = 'none';
	noImage.style.display = 'block';
	progress.value = 0
})