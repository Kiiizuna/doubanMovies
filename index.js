

// 给底下的 Tab 绑定点击变色以及切换 section 的事件
var bindTab = function() {
    var divs = es('footer>div')
    bindAll('footer>div', 'click', function(event) {
        removeClassAll('active')
        removeClassAll('sec-active')
        var target = event.target
        log('event.target', target)
        if (target.nodeName == "SPAN") {
            let name = target.parentElement.className
            let sections = es(".sec")
            log('sections', sections)
            for (let i = 0; i < sections.length; i++) {
                const element = sections[i]
                if (element.dataset.sec === name) {
                    element.classList.add('sec-active')
                }    
            }
            target.parentElement.classList.add('active')
        } else {
            let name = target.className
            let sections = es(".sec")
            for (let i = 0; i < sections.length; i++) {
                const element = sections[i]
                if (element.dataset.sec === name) {
                    element.classList.add('sec-active')
                }    
            }
            target.classList.add('active')
        }
    })
}

bindTab()


// var num = {
//     start: 0,
//     count: 20,
// }

// var data1 = JSON.stringify(num)

// log(data1)

// ajax 函数
var ajax = function(method, path, headers, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式, 必须在 open 之后, send 之前
    r.setRequestHeader('Content-Type', '')
    r.responseType = 'json'
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}


// ajax('GET', 'http://api.douban.com/v2/movie/top250', null, data1, function(r){
//     console.log(r.status, r.response)
// })


var responseHandler; // 定义一个全局作用域的函数

function getJSONP(url, callback) {
  if (url.indexOf('?') === -1) {
    url += '?callback=responseHandler';
  } else {
    url += '&callback=responseHandler';
  }

  // 创建script 标签
  var script = document.createElement('script')

  // 在函数内部实现包裹函数，因为要用到 callback
  responseHandler = function(json) {
    try {
      jsonpRes = callback(json)
    } finally {
      // 函数调用之后不管发生什么都要移除对应的标签，留着也没用
      script.parentNode.removeChild(script);
    }
  }
  script.setAttribute('src', url)
  document.body.appendChild(script)

}


getJSONP('http://api.douban.com/v2/movie/top250',function(e) {
    console.log('repsonse data is',e)
    var movieArr = e.subjects
    log('arr is', movieArr)
    insertItems(movieArr)
})


// 拼接字符串
var movieTemplate = function(movie) {
    var movieName = movie.title
    var imgUrl = movie.images.medium
    var score = movie.rating.average
    var director0 = movie.directors[0].name
    var cast0 = movie.casts[0].name
    var cast1 = movie.casts[1].name
    var cast2 = movie.casts[2].name
    var year = movie.year
    var genre0 = movie.genres[0]
    var genre1 = movie.genres[1]
    var alt = movie.alt
    var genre 
    var genreLen = movie.genres.length
    if (genreLen === 1) {
        genre = `
        <div class="extra">${year} / ${genre0}</div>
        `
    } else if (genreLen === 1){
        genre = `
        <div class="extra">${year} / ${genre0}、${genre1}</div>
        `        
    } else {
        genre = `
        <div class="extra">${year} / ${genre0}、${genre0}、${genre1}</div>
        `        
    }

    var t = `
    <div class="item">
                <a href="${alt}">
                <div class="cover">
                    <img src=${imgUrl} alt="">
                </div>
                <div class="detail">
                    <h2>${movieName}</h2>
                    <div class="extra"><span class="score">${score}分</span></div>
                    `
                    + genre + 
                    `
                    <div class="extra">导演: ${director0}</div>
                    <div class="extra">主演: ${cast0}、${cast1}、${cast2}</div>
                </div>
                </a>
            </div>   
        `
    return t 
}

// var appendHTML = function(element, html) {
// 	element.insertAdjacentHTML('beforeend', html)
// }


// key function to insert different items
var insertItems = function(movieList) {
	var top250Wraper = e('.top250-wrapper')
	// top250Wraper.innerHTML = '' 	
	for (var i = 0; i < movieList.length; i++) {
		var movie = movieList[i]
		var t = movieTemplate(movie)
		appendHTML(top250Wraper, t)
	}
}

var bindEvent = function(element, eventName, callback) {
	element.addEventListener(eventName, callback)
}

var wrapperMain = e('.wrapper-main')
var index = 0
bindEvent(wrapperMain, 'scroll', function() {
    if (e('.top250-wrapper').offsetHeight === -17 + e('.wrapper-main').offsetHeight + e('.wrapper-main').scrollTop) {
        log('到底啦')
        index = index + 20
        var url = 'http://api.douban.com/v2/movie/top250' + '?start=' + index + '&count=20'
        getJSONP(url,function(e) {
            console.log('repsonse data is',e)
            var movieArr = e.subjects
            log('arr is', movieArr)
            insertItems(movieArr)
        })
    }
    
})