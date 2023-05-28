let taskList = [];
let hours = 0;
let badHours = 0;
let totalRemainingHours = 168;
const audioFile = new Audio("./wah.mp3");
const audioFile1 = new Audio("./beep.mp3");
const swipe = new Audio("./swipe.mp3");
var t = document.getElementById("task");
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const totalHours = document.getElementById("total");
const remainingHours = document.getElementById("remaining");
const hoursToSave = document.getElementById("hoursToSave");
const totalHoursPerWeek = 24 * 7;

// capture the data from the form on form submit
// console.log(document.getElementById("myForm").innerText);

const handleOnSubmit = (e) => {
  let displayString = "";
  let displayStringHours = "";

  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");
  const type = formDt.get("type");
  hours = hours + hr;
  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type,
  };

  console.log("initial hours check " + hours);

  if (hours > totalHoursPerWeek) {
    // audioFile.play();
    // alert("total maximum hour reached");
    const leftHours = hr - totalRemainingHours;
    console.log(totalRemainingHours);
    console.log(leftHours);
    //if input hours is greater than
    // left hours value of hours is reduced
    // because it is added before the function
    if (leftHours > 0) hours = hours - hr;

    return;
  }

  console.log(hours);

  totalRemainingHours = totalRemainingHours - parseFloat(hr);
  // calculationg number of hours

  taskList.push(taskObj);
  displayTask();
  console.log(taskList);
  displayString += hours;
  displayStringHours += totalRemainingHours;
  totalHours.innerHTML = displayString;
  remainingHours.innerHTML = displayStringHours;

  audioFile1.play();

  // store that data in array as obj
};

// displying data in the browser
const displayTask = () => {
  const entryList = taskList.filter((item) => item.type === "entry");

  let displayString = "";
  entryList.map((item, i) => {
    displayString += `

<tr>
<td>${item.task}</td>
<td>${item.id}</td>

<td>${item.hr} hours</td>
<td>
  <button class="btn btn-danger btn-sm" onclick="deleteTask('${item.id}','${item.hr}')">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button class="btn btn-success btn-sm"
  onclick="switchTask('${item.id}', 'bad' )"
  >
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</td>
</tr>`;
  });
  entryElm.innerHTML = displayString;
  displayBadTask();
};
// displying data in the browser
const displayBadTask = () => {
  const badList = taskList.filter((item) => item.type === "bad");
  let displayString = "";
  badList.map((item, i) => {
    console.log("this is item hours", item.hr);
    badHours = badHours + item.hr;
    console.log("total bad hrs", badHours);

    displayString += `
<tr>
<td>${item.task}</td>
<td>${item.hr} hours</td>
<td>

<button class="btn btn-warning btn-sm"
  onclick="switchTask('${item.id}', 'entry' )"
  >
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button class="btn btn-danger btn-sm" onclick="deleteTask('${item.id}','${item.hr}')">
    <i class="fa-solid fa-trash"></i>
  </button>
  
</td>
</tr>`;
  });

  badElm.innerHTML = displayString;

  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);

  hoursToSave.innerHTML = "You Could Have Saved " + badHrs + "hrs";
};

// create unique id

const randomGenerator = (lenght = 6) => {
  const collection = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDAZXCVBNM";

  let displayString = "";
  for (let i = 0; i < lenght; i++) {
    const ranNum = Math.round(Math.random() * collection.length - 1);
    displayString += collection[ranNum];
  }

  return displayString;
};

// delete item from array based on given id

const deleteTask = (x, h) => {
  let displayString = "";
  let displayStringHours = "";
  console.log("the hour to be removed is" + h);
  console.log(hours);
  if (window.confirm("Are you sure you want to delte this?")) {
    taskList = taskList.filter((item) => item.id !== x);
    hours = hours - parseFloat(h);
    totalRemainingHours = totalRemainingHours + parseFloat(h);

    displayString += hours;
    displayStringHours += totalRemainingHours;
    totalHours.innerHTML = displayString;
    remainingHours.innerHTML = displayStringHours;
    displayTask();
    console.log("hours reduced" + parseInt(h));
  }

  console.log(`the number of entry left in the list is: ${taskList.length}`);
};

// switch task from entry to bad type or vv
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    swipe.play();
    return item;
  });

  displayTask();
};
