

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


// getJSONP('http://api.douban.com/v2/movie/top250',function(e) {
//     console.log(e)
// })

var jsonpRes
getJSONP('http://api.douban.com/v2/movie/top250',function(e) {
    console.log('repsonse data is',e)
    return e 
})

log('jsonpRes is ', jsonpRes)

// 拼接字符串
var itemTemplate = function() {
    var t = `
    <div class="item">
                <a href="#">
                <div class="cover">
                    <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="detail">
                    <h2>霸王别姬</h2>
                    <div class="extra"><span class="score">9.3分</span> / 1000收藏</div>
                    <div class="extra">1994 / 剧情、爱情</div>
                    <div class="extra">导演: 张艺谋</div>
                    <div class="extra">主演: 张艺谋、张艺谋、张艺谋</div>
                </div>
                </a>
            </div>
    `
    return t 
}

var appendHTML = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}


var main = e('.wrapper-main')
// appendHTML(main, t)




