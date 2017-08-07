self.addEventListener('message', function (e) {
    // let len = e.data
    let len = 30
    let obj = {length: len}
    let arr = Array.from(obj)
    let arr2 = arr.map((item) => {
        return Math.floor(Math.random() * 200)
    })
    for (let i = 0; i < len; i++) {
		for (let j = 0; j < i; j++) {
			if (arr2[i] < arr2[j]) {
				let tmp = arr2[i];
				arr2[i] = arr2[j];
				arr2[j] = tmp;
			}
		}
    }
    postMessage(arr2)
})