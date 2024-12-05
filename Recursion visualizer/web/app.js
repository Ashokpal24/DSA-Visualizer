let treeContainer = document.querySelector(".recursion-tree");
let data = [];
// let logs = {}
async function startApp() {
  data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  await eel.merge_sort(data)((ans_data) => {
    console.log(ans_data)
  });
  await eel.get_unsolved()(() => eel.get_solved())
}

function addBlob(subvars_list = [], depth = 0) {
  try {
    let levelEL = document.querySelector(`.depth-${depth}`);
    if (!levelEL) {
      levelEL = document.createElement("div");
      levelEL.classList.add("level-container");
      levelEL.classList.add(`depth-${depth}`);
    }
    subvars_list.forEach((value, index) => {
      const blobEl = document.createElement("div");
      blobEl.classList.add("blob");
      blobEl.innerHTML = value;
      levelEL.appendChild(blobEl);
    });
    treeContainer.appendChild(levelEL);
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function solveBlob(subvars_list = [], depth = 0) {
  try {
    let levelEL = document.querySelector(`.depth-${depth}`);
    while (levelEL.hasChildNodes()) {
      levelEL.removeChild(levelEL.firstChild)
    }
    levelEL.childNodes.forEach((node, index) => console.log(node))

    subvars_list.forEach((value, index) => {
      const blobEl = document.createElement("div");
      blobEl.classList.add("blob");
      blobEl.classList.add("b-highlighted");
      blobEl.innerHTML = value;
      levelEL.appendChild(blobEl);
    });
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

eel.expose(addBlob);
eel.expose(solveBlob);

startApp();
