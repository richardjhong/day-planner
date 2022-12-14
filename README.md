# Day Planner

![day-planner.gif](./assets/images/screen_recording.gif)

## Technologies
This project uses [Bootstrap](https://getbootstrap.com/) for the frontend toolkit, [jQuery](https://jquery.com/) for manipulating the HTML document, and the [moment.js](https://momentjs.com/) library for time formatting. 

## Purpose
This project was made with the technologies listed above to create familiarity with the different libraries that can be used with vanilla JavaScript for more robust code implementation.

## Description
The app allows a user to view the current day and enter events to plan his or her day. Middle columns where events are stored are color coded according to if the time hour has already passed, is ongoing, or is in the future. Clicking the floppy disk icon or the surrounding button card will save the information which persists even if the user refreshes the page. 


## Architecture
Most of the project html was built dynamically via appending divs (some with Bootstrap attributes) to the div row-slots within index.html. In particular, the jQuery methods were used for creation of divs and setting of attributes. 

To get the foundation for the project, I used moment.js to grab the current time hours and also the current time with day, month, and year to display on the page. The time hours will be used again later on.

The block of code prior to the for loop creates the first row which corresponds to the 00th/24th hour i.e. midnight. In particular there is an hourColumnContainer, a textColumnContainer, and a saveButtonColumnContainer, with ratios of 2:8:2 respectively. Divs are appended to parents sequentially. The if statement within line 27-29 of script.js checks if there is/are any event(s) corresponding with the 12AM - 1 AM time slot; If so the textColumn will be prefilled with the previously stored events. 

From there, a loop is used to create 23 more time rows with divs in their respective parents' containers. Line 34 in particular uses the jQuery before method to prepend to a clone of the slotContainer made for the 00th hour slot. An if statement checks to see if there is/are any event(s) corresponding to respective time hours or resets the value to an empty string to not accidentally copy a previous time slot's events to a "free" time slot later on.

Essentially if this were to be coded within HTML, it would resemble the following:

```
...
<div class="container time-block>
  <div class="row-slots">
    <div class="row no-gutters my-4">
      <div class="col-2">
        <a class="card h-100 p-3 my-3 hour">0</a> 
      </div>
      <div class="col-8">
        <a class="card h-100 p-3 my-3 text past">
          <input type="text" ... >
        </a>
      </div>
      <div class="col-2">
        <button class= "card h-100 p-3 my-3 saveBtn">
          <i class="fa-solid fa-floppy-disk mx-4"></i>
        </button>
      </div>
    </div>

   <div class="row no-gutters my-4">
      <div class="col-2">
        <a class="card h-100 p-3 my-3 hour">1</a> 
      </div>
      ...
  </div>
</div>
```

Next, each slotContainer checks each time slot and compares against the current time; if it's prior to the current time, then a grey background is used for the textContainer. If it's the current time hour, then the background is red, and finally future time slots are color coded as green.

Finally, using the bind method within jQuery for event delegation, the program listens for clicks on saveButton. Here, localStorage is used to grab prior events, merge with any new events, and store the combination for future use. Ultimately this leads to persistent data even if the user refreshes the page (so long as he/she clicks the save button).

## Screenshot
![screenshot](./assets/images/screenshot.png)

## Livesite
[Deployed on Github page](https://richardjhong.github.io/day-planner/)

## Thoughts on improvement
While Bootstrap is great for responsive design, I didn't focus on doing so for this project. This would be one improvement to make for the future. Another limitation is that there is no way to interact with the app directly to clear the localStorage. If this were an actual app to ship, I'd look into doing so. Lastly, the user has to individually save each event by clicking the save button within the same row as the edited event text e.g. if the user inputs events in 10 but then inputs in 12 and clicks the 12 save button, the app will save information for 12 but not 10. Most likely users expect clicking on any save button will save all information rather than the individual row information. 
