var images = document.querySelectorAll(".photo img")
images.forEach(function(image){
    image.onload = function() {
        this.style.opacity = 1
        this.parentElement.previousElementSibling.remove()
    }
})

var cur = 1
var assets = document.querySelectorAll(".asset")
var photos = document.querySelectorAll(".photo")
var H = window.innerHeight

assets[0].style.top = "0px"
assets[1].style.top = H+"px"
photos[0].style.top = "0px"
photos[1].style.top = -H+"px"

window.onmousewheel = function(e) {
    var top = parseInt(assets[cur].style.top)
    if (e.deltaY > 0) { // 上滑
        if(top - e.deltaY <= 0) {
            assets[cur].style.top = "0px"
            photos[cur].style.top = "0px"
            if(cur != assets.length-1) {
                cur++
                assets[cur].style.top = H+"px"
                photos[cur].style.top = -H+"px"
            }
        } else {
            assets[cur].style.top = (top - e.deltaY) + "px"
            photos[cur].style.top = (e.deltaY - top)+"px"
        }
    } else {
        if(top + e.deltaY >= H) {
            assets[cur].style.top = H+"px"
            photos[cur].style.top = -H+"px"
            if(cur > 1) {
                cur--
                assets[cur].style.top = "0px"
                photos[cur].style.top = "0px"
            }
        } else {
            assets[cur].style.top = (top - e.deltaY) + "px"
            photos[cur].style.top = (e.deltaY - top)+"px"
        }
    }
}