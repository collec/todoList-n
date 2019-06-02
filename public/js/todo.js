var log = function() {
  console.log.apply(console, arguments)
}

var e = function(selector) {
  return document.querySelector(selector)
}

var templateTodo = function(status, content) {
  var className = ''
  if (status) {
    className = 'task-item-done'
  }
  var t = `
    <div class="task-item ${className}">
      <span class="task-content" onselectstart="return false">${content}</span>
      <span class='task-done' onselectstart="return false">完成</span>
      <span class='task-delete' onselectstart="return false">删除</span>
    </div>
  `
  return t
}

var checkLength = function(text, maxLength) {
  var count = 0
  var checkRule = /[\u4e00-\u9fa5]/
  for (var i = 0; i < text.length; i++) {
    var element = text[i]
    var flag = checkRule.test(element)
    if (flag) {
      count += 3
    } else {
      count++
    }
    if (count > maxLength) {
      text = text.substr(0, i)
    }
  }
  return text
}

var toggleClass = function(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

var save = function(array) {
  var s = JSON.stringify(array)
  localStorage.taskList = s
}
var load = function() {
  var s = localStorage.taskList
  return JSON.parse(s)
}

var saveItems = function() {
  // 选出 content 内容标签
  // 保存到 数组之中 数组每个元素 是一个 对象 对象包括 class content
  var taskItems = document.querySelectorAll('.task-item')
  var items = []
  for (var i = 0; i < taskItems.length; i++) {
    var c = taskItems[i]
    var status = c.classList.contains('task-item-done')
    var content = c.querySelector('.task-content').innerHTML
    var taskItem = {
      status: status,
      content: content,
    }
    items.push(taskItem)
  }
  // 保存到 stringify
  save(items)
}
//
var addButton = e("#id-button-add")

addButton.addEventListener('click', function(event) {
  log('event', event)
  var todoInput = e('#id-input-add')
  var value = todoInput.value
  var checkedValue = checkLength(value, 65)
  insertItem(false, checkedValue)
  // saveItems
  saveItems()
})
addButton.addEventListener('keydown', function(event) {
  var k = event.key
  if(k == 'enter'){
    log('event', event)
    var todoInput = e('#id-input-add')
    var value = todoInput.value
    var checkedValue = checkLength(value, 65)
    insertItem(false, checkedValue)
    // saveItems
    saveItems()
  }
})

var todoList = e('#id-div-list')
todoList.addEventListener('click', function(event) {
  var target = event.target
  if (target.classList.contains('task-delete')) {
    var todoDiv = target.parentElement
    todoDiv.remove()
  } else if (target.classList.contains('on-off-detail')) {
    log('detail')
  } else if (target.classList.contains('task-done')) {
    var todoDiv = target.parentElement
    toggleClass(todoDiv, 'task-item-done')
  }
  // 改变状态之后 保存 taskItem
  saveItems()
})
var insertItem = function(className, content) {
  var t = templateTodo(className, content)
  var todoList = e('#id-div-list')
  todoList.insertAdjacentHTML('beforeend', t)
}
var loadTaskItem = function() {
  var items = load()
  // 添加到页面之中
  for (var i = 0; i < items.length; i++) {
    var item = items[i]
    insertItem(item.status, item.content)
  }
}



var __main = function() {
  loadTaskItem()
}

__main()
