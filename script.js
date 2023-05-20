let taskList = [];
let hrs = 0;
let leftHrs = 168;
const audioFile = new Audio("./wah.mp3");
const audioFile1 = new Audio("./beep.mp3");
const swipe = new Audio("./swipe.mp3");
var t = document.getElementById("task");
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const totalHrs = document.getElementById("total");
const remainingHrs = document.getElementById("remaining");
const totalHoursPerWeek = 24 * 7;

// capture the data from the form on form submit
// console.log(document.getElementById("myForm").innerText);

const handleOnSubmit = (e) => {
  let str = "";
  let strHours = "";

  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");
  const type = formDt.get("type");

  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type,
  };

  console.log("initial hours check" + hrs);
  if (hrs > totalHoursPerWeek) {
    audioFile.play();
    alert("total maximum hour reached");
  } else {
    console.log(hrs);
    hrs = hrs + hr;
    leftHrs = leftHrs - parseFloat(hr);
    // calculationg number of hours
    if (hrs < totalHoursPerWeek) {
      taskList.push(taskObj);
      displayTask();
      console.log(taskList);
      str += hrs;
      strHours += leftHrs;
      totalHrs.innerHTML = str;
      remainingHrs.innerHTML = strHours;
    }
    audioFile1.play();
    return hrs;
  }

  // store that data in array as obj
};

// displying data in the browser
const displayTask = () => {
  const entryList = taskList.filter((item) => item.type === "entry");

  let str = "";
  entryList.map((item, i) => {
    str += `

<tr>
<td>${item.task}</td>
<td>${item.id}</td>

<td>${item.hr} hrs</td>
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
  entryElm.innerHTML = str;
  displayBadTask();
};
// displying data in the browser
const displayBadTask = () => {
  const badList = taskList.filter((item) => item.type === "bad");

  let str = "";
  badList.map((item, i) => {
    str += `
<tr>
<td>${item.task}</td>
<td>${item.hr} hrs</td>
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
  badElm.innerHTML = str;
};

// create unique id

const randomGenerator = (lenght = 6) => {
  const collection = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDAZXCVBNM";

  let str = "";
  for (let i = 0; i < lenght; i++) {
    const ranNum = Math.round(Math.random() * collection.length - 1);
    str += collection[ranNum];
  }

  return str;
};

// delete item from array based on given id

const deleteTask = (x, h) => {
  let str = "";
  let strHours = "";
  console.log("the hour to be removed is" + h);
  console.log(hrs);
  if (window.confirm("Are you sure you want to delte this?")) {
    taskList = taskList.filter((item) => item.id !== x);
    hrs = hrs - parseFloat(h);
    leftHrs = leftHrs + parseFloat(h);

    str += hrs;
    strHours += leftHrs;
    totalHrs.innerHTML = str;
    remainingHrs.innerHTML = strHours;
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
