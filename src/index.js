import "./index.css";

const button = document.querySelector(".add"),
  input = document.querySelector(".input"),
  tags = document.querySelector(".tags"),
  readOnly = document.querySelector(".freeze"),
  freeze = document.querySelector(".label-freeze"),
  save = document.querySelector(".save"),
  get = document.querySelector(".get");             

const mapArray = (array) => { // render a list of tags from an array
  array.map((el) => {
    let tag = document.createElement("div");
    let cross = document.createElement("button");
    tag.classList.add("tag");
    cross.classList.add("cross");
    cross.textContent = "x";
    cross.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.closest("div").remove();
    });
    tag.append(el);
    tag.append(cross);
    tags.append(tag);
  });
};

const switchMode = (boolean) => {
  const crossList = document.querySelectorAll(".cross");
   if (boolean) {
    button.disabled = true;
    crossList.forEach((el) => (el.disabled = true));
    freeze.style.color = "darkred";
    freeze.style.border = "3px solid darkred";
  } else {
    button.disabled = false;
    crossList.forEach((el) => (el.disabled = false));
    freeze.style.color = "black";
    freeze.style.border = "none";
  }
}

const addValue = (e) => {
  e.preventDefault();
  const tagValues = input.value.split(",");
  mapArray(tagValues);
  input.value = null;
};

readOnly.addEventListener("change", () => { // readOnly mode switcher 
  switchMode(readOnly.checked);
});

const saveList = () => {
  const tagList = document.querySelectorAll(".tag");
  let arr = [];
  for (let i = 0; i < tagList.length; i++) {
    let item = tagList[i].innerText.slice(0, -1);
    arr.push(item);
  }
  localStorage.setItem("tagList", arr);
};

const getList = () => {
  tags.innerHTML = null;
  input.value = localStorage.getItem("tagList");
  const tagValues = input.value.split(",");
  mapArray(tagValues);
  if (readOnly.checked) {
    const crossList = document.querySelectorAll(".cross");
    crossList.forEach((el) => (el.disabled = true));
  }
  input.value = null;
};

let allTags = {

  get savedTags() {
    return localStorage.getItem("tagList");
  },

  set tagsToStorage(array) {
    return localStorage.setItem("tagList", array);
  },

  addTag(value) {
   return mapArray(value);
  },

  readOnlyMode(boolean) {
    switchMode(boolean);
  }, 
  
}; 

button.addEventListener("click", addValue);
save.addEventListener("click", saveList);
get.addEventListener("click", getList);

// console.log(allTags.savedTags);
// console.log(allTags.tagsToStorage = 'day, was, nice');
// allTags.addTag(['hello!', 'my', 'dear', 'friend']);
// allTags.readOnlyMode(true);

