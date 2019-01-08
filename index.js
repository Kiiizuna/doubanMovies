

var bindTab = function() {
    var divs = es('footer>div')
    bindAll('footer>div', 'click', function(event) {
        removeClassAll('active')
        var target = event.target
        log(target)
        if (target.nodeName == "SPAN") {
            target.parentElement.classList.add('active')
        } else {
            target.classList.add('active')
        }
    })
}


bindTab()


// var bindAll = function(selector, eventName, callback) {
// 	var elements = document.querySelectorAll(selector)
// 	for (var i = 0; i < elements.length; i++) {
// 		var e = elements[i]
// 		bindEvent(e, eventName, callback)
// 	};
// }

