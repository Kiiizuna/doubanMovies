

var bindTab = function() {
// 给底下的 Tab 绑定点击变色以及切换 section 的事件
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
            // 点击在 div 上时
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

    // 下拉刷新 250 页面
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


var responseHandler // 定义一个全局作用域的函数
// var isLoading = false 
function getJSONP(url, callback) {
    // if(isLoading) return 
    // isLoading = true
    if (url.indexOf('?') === -1) {
        url += '?callback=responseHandler';
    } else {
        url += '&callback=responseHandler';
  }
    // e('.loading').classList.add('show')
  // 创建script 标签
    var script = document.createElement('script')

  // 在函数内部实现包裹函数，因为要用到 callback
    responseHandler = function(json) {
        try {
            jsonpRes = callback(json)
        } finally {
        // 函数调用之后不管发生什么都要移除对应的标签，留着也没用
            script.parentNode.removeChild(script)
            // 请求完毕需要去除 show
            e('.loading').classList.remove('show')
        }
    }
    script.setAttribute('src', url)
    document.body.appendChild(script)
    // 请求的时候加上 show
    e('.loading').classList.add('show')
}


getJSONP('http://api.douban.com/v2/movie/top250',function(e) {
    console.log('repsonse data is',e)
    var movieArr = e.subjects
    log('arr is', movieArr)
    insertItems(movieArr)
})


var iconUS = e('.icon-us')
// 点击了再发送 US 热门的请求
bindEvent(iconUS, 'click', function() {
        getJSONP('http://api.douban.com/v2/movie/us_box',function(e) {
        console.log('us is',e)
        var movieArr = e.subjects
        insertNorthAmerica(movieArr)
    })
})



// getJSONP('http://api.douban.com/v2/movie/us_box',function(e) {
//     console.log('us is',e)
// })

// 拼接字符串 top250 模板
var movieTemplate = function(movie) {
    var movieName = movie.title
    var imgUrl = movie.images.small
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

// 北美地区电影模板
var movieTemplateUS = function(movie) {
    var movieName = movie.subject.title
    var imgUrl = movie.subject.images.small
    var score = movie.subject.rating.average
    var director0 = movie.subject.directors[0].name
    var cast0 = movie.subject.casts[0].name
    var cast1 = movie.subject.casts[1].name
    var cast2 = movie.subject.casts[2].name
    var year = movie.subject.year
    var genre0 = movie.subject.genres[0]
    var genre1 = movie.subject.genres[1]
    var alt = movie.subject.alt
    var genre 
    var genreLen = movie.subject.genres.length
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

var insertNorthAmerica = function(movieList) {
    var usWrapper = e('.us-wrapper')
    for (var i = 0; i < movieList.length; i++) {
		var movie = movieList[i]
		var t = movieTemplateUS(movie)
		appendHTML(usWrapper, t)
	}
}

var insertSearchItems = function(movieList) {
	var searchWraper = e('.search-area')
	// top250Wraper.innerHTML = '' 	
	for (var i = 0; i < movieList.length; i++) {
		var movie = movieList[i]
		var t = movieTemplate(movie)
		appendHTML(searchWraper, t)
	}
}


// var bindEvent = function(element, eventName, callback) {
// 	element.addEventListener(eventName, callback)
// }



var input = e('.search-input')
var searchBtn = e('.button')
bindEvent(searchBtn, 'click', function() {
    var val = input.value
    log('input val ', val)
    var url = 'http://api.douban.com/v2/movie/search'
    var searchUrl = url + '?' + 'q=' + val 
        getJSONP(searchUrl,function(e) {
        console.log('search list',e)
        var movieArr = e.subjects
        insertSearchItems(movieArr)

    })
})