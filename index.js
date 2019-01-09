

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


var num = {
    start: 0,
    count: 20,
}

var data1 = JSON.stringify(num)

log(data1)

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



ajax('GET', 'http://api.douban.com/v2/movie/top250', null, data1, function(r){
    console.log(r.status, r.response)
})
