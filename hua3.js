var log = function() {
	console.log.apply(console, arguments)
}

var e = function(selector) {
	return document.querySelector(selector)
}

var es = function(selector) {
	return document.querySelectorAll(selector)
}

var bindEvent = function(element, eventName, callback) {
	element.addEventListener(eventName, callback)
}

// 这是简化版的bindAll, 遍历给每个元素都绑上
var bindAll = function(selector, eventName, callback) {
	var elements = document.querySelectorAll(selector)
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i]
		bindEvent(e, eventName, callback)
	};
}


var toggleClass = function(className, element) {
	if (element.classList.contains(className)) {
		element.classList.remove(className)
	} else {
		element.classList.add(className)
	}
}

var appendHTML = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var findElement = function(element, selector) {
	return element.querySelector(selector)
}


var removeClassAll = function(className) {
	var selector = '.' + className
	var elements = document.querySelectorAll(selector)
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i]
		e.classList.remove(className)
	}
}