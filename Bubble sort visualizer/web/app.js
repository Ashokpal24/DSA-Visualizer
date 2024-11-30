showArray = document.querySelector(".show-array");
ogArray = document.querySelector(".og-array");
submitBtn = document.querySelector(".sorting-btn");
resetBtn = document.querySelector(".reset-btn");
stepContainer = document.querySelector(".step-container");

let array = [];
let spanMap = new Map();

async function get_data() {
  try {
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    ogArray.innerHTML = `<strong>Original</strong> : [${array}]`;
    stepContainer.innerHTML = "";
    array.forEach((value, index) => {
      const spanContainerEL = document.createElement("div");
      spanContainerEL;
      const spanEL = document.createElement("div");
      const indexEL = document.createElement("div");
      spanEL.innerHTML = `${value}`;
      indexEL.innerHTML = `${index}`;
      spanEL.style.height = `${value + 30}px`;
      indexEL.style.height = "30px";
      spanEL.className = "bar";
      indexEL.className = "index-bar";
      spanContainerEL.appendChild(spanEL);
      spanContainerEL.appendChild(indexEL);
      spanContainerEL.id = index;
      spanMap.set(index, spanContainerEL);
      stepContainer.appendChild(spanContainerEL);
    });
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function show_step(data, highlight = []) {
  data.forEach((value, index) => {
    let tempEl = spanMap.get(index).childNodes[0];
    tempEl.style.height = `${value + 30}px`;
    tempEl.innerHTML = value;
    if (highlight.includes(index)) {
      tempEl.classList.add("highlighted");
    } else if (tempEl.classList.contains("highlighted")) {
      tempEl.classList.remove("highlighted");
    }
  });
}

submitBtn.addEventListener("click", async () => {
  console.log("clicked !", array);
  try {
    await eel.bubble_sort(array)((data) => {
      array = data;
      showArray.innerHTML = `<strong>Answer</strong> : [${data}]`;
    });
  } catch (error) {
    console.log("Error occurred:", error);
  }
});

resetBtn.addEventListener("click", () => {
  try {
    get_data();
  } catch (error) {
    console.log("Error occurred:", error);
  }
});
get_data();
eel.expose(show_step);
