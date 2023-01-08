function upload() {
    let input = document.getElementById("upload")
    var freader = new FileReader()

    freader.readAsDataURL(input.files[0])

    freader.onload = function () {
        document.getElementById("video").src = freader.result;
    }
}