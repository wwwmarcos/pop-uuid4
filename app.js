'use strict'

var contextData = []

function setContextData(data) {
  contextData = data
}

function getContextData() {
  return contextData
}

function deleteFromContextData(index) {
  return contextData.splice(index, 1)
}

function createTable(rows) {

  var container = element("#tableContainer")
  var table = document.createElement('table')
  var thead = document.createElement('thead')
  var tbody = document.createElement('tbody')
  var row, cell

  setContextData(rows)
  addStyles(table)

  rows.forEach(function (content, index) {
    var row = tbody.insertRow(index)
    var cell = row.insertCell(0)
    cell.innerHTML = content
    cell.id = index
  })

  table.appendChild(thead)
  table.appendChild(tbody)
  container.appendChild(table)
}

function addStyles(table) {
  table.classList.add('table')
  table.classList.add('text-center')
}

function deleteOldTable() {
  element('#tableContainer').innerHTML = '&nbsp;'
}

function requestUiidData(callBack, quantity) {

  var request = new XMLHttpRequest()
  var url = 'https://cors-anywhere.herokuapp.com/www.uuidgenerator.net/api/version4/' + quantity

  request.open('GET', url, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = String(request.responseText).split(/\n/)
      var index = data.indexOf(' ')
      data.splice(index, 1)
      callBack(data)
    } else {
      throw new Error('Request fail')
    }
  }
  request.onerror = function (err) {
    throw err
  }
  request.send()
}

function getQuantity() {
  return element('#quantity').value
}

function copy(text) {
  var input = document.createElement('input')
  input.style.position = 'fixed'
  input.style.opacity = 0
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
}

function deleteTdById(id) {
  var element = document.getElementById(id)
  if (element) {
    element.outerHTML = '&nbsp;'
  }
}

function disableInput(id) {
  element(id).disabled = true
}

function enableInput(id) {
  element(id).disabled = false
}

function element(selector) {
  return document.querySelector(selector)
}

document.addEventListener("DOMContentLoaded", function (event) {

  element('#pop').addEventListener('click', function () {
    enableInput('#copyOne')
    deleteOldTable()
    requestUiidData(createTable, getQuantity())
  })

  element('#copyOne').addEventListener('click', function () {

    var contextData = getContextData()
    var index = contextData.length - 1
    console.log('index {}', index);
    if (index >= 0) {
      copy(contextData[index])
      deleteTdById(index)
      deleteFromContextData(index)
    }

    if (index == 0) {
      disableInput('#copyOne')
    }
  })

})

