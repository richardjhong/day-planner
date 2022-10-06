var timeBlockContainer = $('.row-slots')
var currentTimeHour = parseInt(moment().format('HH'))
var timeSlots = $('.container')
var locallyStoredDays = JSON.parse(localStorage.getItem("dayEvents"))
var currentDayEl = $('#currentDay')
var currentDay = moment().format('dddd, MMMM Do YYYY')

var hourColumnContainer = $('<div>').attr('class', 'col-2')
var hourCard = $('<a>').addClass('card h-100 p-3 my-3 hour')
var textColumnContainer = $('<div>').attr('class', 'col-8')
var textCard = $('<a>').addClass('card h-100 p-3 my-3 text')
var textInput = $('<input>').attr({ type: 'text', class: 'textarea', placeholder: 'Enter event here (for multiple events seperate with a comma)', name: 'event-input'})
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
// this checks if there is a locallyStoredDays object within localStorage and 
// if the key value pair of 0 key exists
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

// this checks if there is a locallyStoredDays object within localStorage and 
// if the key value pair of i key exists
  if (locallyStoredDays !== null && locallyStoredDays[i] !== undefined) {
    textInput.val(locallyStoredDays[i].join(','))
  } else {
    textInput.val('')
  }
  
  hourCard.text(`${i}`)
}

var hourCards = $('.hour')

// hourCards's parent is a sibling to the grandparent of the input element 
// that needs to be affected. Since there is only one element with div text
// jQuery's find alleviates having to access chaining looking for the child
// of the child of input's grandparent.
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

// This was a rather contrived solution since chaining vanilla JavaScript and jQuery lead to mistmatch of compatible data used for respective methods. Ultimately both eventHour and eventText use only jQuery methods to access the relevant data based on the relationship between the saveButtonCard's (also alias of saveBtn id) parent and the parents/grandparent of hourCard and textCard
timeBlockContainer.bind('click', function(e) {
  e.preventDefault()
  if (e.target.id === 'saveBtn') {
    var eventHour = $(e.target).parent().siblings()[0].childNodes[0].textContent
    var eventText = $(e.target).parent().siblings()[1].childNodes[0].childNodes[0].value
    var dayEvents = JSON.parse(localStorage.getItem("dayEvents")) || {}

    dayEvents[eventHour] = eventText.split(',')

    localStorage.setItem("dayEvents", JSON.stringify(dayEvents))
  }
})
