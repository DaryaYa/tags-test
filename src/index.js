import "./index.css";

const button = document.querySelector(".add"),
  input = document.querySelector(".input"),
  tags = document.querySelector(".tags"),
  readOnly = document.querySelector(".freeze"),
  freeze = document.querySelector(".label-freeze"),
  save = document.querySelector(".save"),
  get = document.querySelector(".get");

const mapArray = (array) => {
  array.map((el) => {
    let tag = document.createElement('div');
    let cross = document.createElement("button");
    tag.classList.add('tag')
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

const addValue = (e) => {
  e.preventDefault();
  const tagValues = (input.value).split(",");
  console.log(tagValues)
  mapArray(tagValues);
  input.value = null;
};

button.addEventListener("click", addValue);

readOnly.addEventListener("change", () => {
  const crossList = document.querySelectorAll(".cross");
  if (readOnly.checked) {
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
});

const saveList = () => {
  const tagList = document.querySelectorAll(".tag");
  let arr =[];
  for (let i = 0; i < tagList.length; i++) {
    let item = tagList[i].innerText.slice(0, -1);
    console.log(item)
    arr.push(item);
  }
  console.log(arr);
  localStorage.setItem('tagList', arr);
}

const getList = () => {
 tags.innerHTML = null;
  input.value = localStorage.getItem('tagList');
  const tagValues = (input.value).split(",");
  mapArray(tagValues);
  if (readOnly.checked) {
    const crossList = document.querySelectorAll(".cross");
    crossList.forEach((el) => (el.disabled = true));
  }
  input.value = null;
}

save.addEventListener("click", saveList);
get.addEventListener("click", getList);
