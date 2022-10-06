var timeBlockContainer = $('.row-slots')
var currentTimeHour = parseInt(moment().format('HH'))
var timeSlots = $('.container')
var locallyStoredDays = JSON.parse(localStorage.getItem("dayTasks"))
var currentDayEl = $('#currentDay')
var currentDay = moment().format('dddd, MMMM Do YYYY')

var hourColumnContainer = $('<div>').attr('class', 'col-2')
var hourCard = $('<a>').addClass('card h-100 p-3 my-3 hour')
var textColumnContainer = $('<div>').attr('class', 'col-8')
var textCard = $('<a>').addClass('card h-100 p-3 my-3 text')
var textInput = $('<input>').attr({ type: 'text', class: 'textarea', placeholder: 'Enter task here (for multiple tasks seperate with a comma)', name: 'task-input'})
var saveButtonColumnContainer = $('<div>').attr('class', 'col-2')
var saveButtonCard = $('<button>').attr({class: 'card h-100 p-3 my-3 saveBtn', id: 'saveBtn'})
var slotContainer = $('<div>').attr({ class: 'row no-gutters my-4'})

currentDayEl.text(currentDay)
timeBlockContainer.append(slotContainer)
slotContainer.append(hourColumnContainer)
slotContainer.append(textColumnContainer)
slotContainer.append(saveButtonColumnContainer)
hourColumnContainer.append(hourCard)
textColumnContainer.append(textCard)
saveButtonColumnContainer.append(saveButtonCard)
saveButtonCard.append('<i class="fa-solid fa-floppy-disk mx-4"></i>')
textCard.append(textInput)
if (locallyStoredDays !== null && locallyStoredDays[0] !== undefined) {
  textInput.val(locallyStoredDays[0].join(','))
}

hourCard.text(0)

for (let i = 1; i < 24; i++) {
  slotContainer.before(slotContainer.clone())
  slotContainer.append(hourColumnContainer)
  slotContainer.append(textColumnContainer)
  slotContainer.append(saveButtonColumnContainer)
  hourColumnContainer.append(hourCard)
  textColumnContainer.append(textCard)
  saveButtonColumnContainer.append(saveButtonCard)
  textCard.append(textInput)
  if (locallyStoredDays !== null && locallyStoredDays[i] !== undefined) {
    textInput.val(locallyStoredDays[i].join(','))
  } else {
    textInput.val('')
  }
  
  hourCard.text(`${i}`)
}

var hourCards = $('.hour')

hourCards.each(hour => {
  var currentCardHours = hourCards[hour].text

  if (currentTimeHour > parseInt(currentCardHours)) {
    $(hourCards[hour]).parent().siblings().find('.text').addClass('past')
  } else if (currentTimeHour < parseInt(currentCardHours)) {
    $(hourCards[hour]).parent().siblings().find('.text').addClass('future')
  } else if (currentTimeHour === parseInt(currentCardHours)) {
    $(hourCards[hour]).parent().siblings().find('.text').addClass('present')
  }
})

timeBlockContainer.bind('click', function(e) {
  e.preventDefault()
  if (e.target.id === 'saveBtn') {
    var taskHour = $(e.target).parent().siblings()[0].childNodes[0].textContent
    var taskText = $(e.target).parent().siblings()[1].childNodes[0].childNodes[0].value
    var dayTasks = JSON.parse(localStorage.getItem("dayTasks")) || {}

    dayTasks[taskHour] = taskText.split(',')

    localStorage.setItem("dayTasks", JSON.stringify(dayTasks))
  }
})
