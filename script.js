const input = document.querySelector(".input");
const list = document.querySelector(".list");
const arr = [];
let comAll = false;
let taskCount = 0;

//add task
const addTask = function (text) {
  if (!text) return;
  const task = {
    text: text,
    done: false,
    id: Date.now().toString(),
  };
  arr.push(task);
  updateUI(arr);
};

const handleInputKeypress = function (input) {
  if (input.key === "Enter") {
    const text = input.target.value;
    addTask(text);
    input.target.value = "";
  }
};

//update list
const getCount = function (arr) {
  let c = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].done) c++;
  }
  taskCount = c;
};
const updateUI = function (arr) {
  list.innerHTML = "";
  if (arr.length == 0) document.querySelector(".task-no").innerText = 0;
  arr.forEach((element) => {
    const html = `<li class="item">
    <input class="check-box" type="checkbox" ${
      element.done ? "checked" : ""
    } id="${element.id}" />
    <label class="text">
      ${element.text}
    </label>
    <button class="btn" >
      <ion-icon class="delete" data-id="${
        element.id
      }" name="close-circle-outline"></ion-icon>
    </button>
  </li>`;
    list.insertAdjacentHTML("afterbegin", html);
    getCount(arr);
    document.querySelector(".task-no").innerText = taskCount;
  });
};

//marks tasks as complete
function markTaskAsComplete(taskId) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === taskId) {
      arr[i].done = !arr[i].done;
    }
  }
  getCount(arr);
  document.querySelector(".task-no").innerText = taskCount;
}
//delete tasks
function deleteTask(taskId) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === taskId) arr.splice(i, 1);
  }
  updateUI(arr);
}

//clear all complete
const clear = function (arr) {
  const com = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].done) {
      com.push(arr[i]);
    }
  }
  for (let i = 0; i < com.length; i++) {
    deleteTask(com[i].id);
  }
};

//complete all
const completeAll = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].done = !comAll;
  }
  comAll = !comAll;
  updateUI(arr);
};

//display(filter list)
const filterList = function (arr, para) {
  const com = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].done == para) com.push(arr[i]);
  }
  return com;
};

//event delegation

const handleClick = function (e) {
  const target = e.target;
  if (target.className === "check-box") {
    markTaskAsComplete(target.id);
  } else if (target.className === "delete md hydrated") {
    deleteTask(target.dataset.id);
  } else if (target.className === "add-btn md hydrated") {
    addTask(input.value);
  } else if (target.className === "all") {
    updateUI(arr);
  } else if (target.className === "completed") {
    const com = filterList(arr, true);
    updateUI(com);
  } else if (target.className === "incomplete") {
    const incom = filterList(arr, false);
    updateUI(incom);
  } else if (target.className === "clear") {
    clear(arr);
  } else if (target.className === "complete-all") {
    completeAll(arr);
  }
};
input.addEventListener("keyup", handleInputKeypress); //detect keyboard enter press

document.addEventListener("click", handleClick); //any click on the screen
