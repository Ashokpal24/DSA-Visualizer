let treeContainer = document.querySelector(".recursion-tree");
let svg = document.getElementById("connections");
let data = [];
// let logs = {}
async function startApp() {
  // data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  data = [1, 3, 45, 10, 89, 90, 80, 17, 108, 1909, 121, 19]
  await eel.merge_sort(data)((ans_data) => {
    console.log(ans_data)
  });
  await eel.get_unsolved()(() => drawConnections())
  // (() => eel.get_solved())
}

function drawConnections() {
  nodes = document.getElementsByClassName("blob")
  const graphRect = treeContainer.getBoundingClientRect();
  Array.prototype.forEach.call(nodes, (currentNode) => {
    let depth = parseInt(currentNode.dataset.depth, 10)
    let currentValues = currentNode.dataset.nodeData.split(',')
    if (depth != 0) {
      previousNodes = document.getElementsByClassName(`depth-${depth - 1}`)[0].childNodes
      previousNodes.forEach((previousNode, index) => {
        previousValues = previousNode.dataset.nodeData.split(',')
        if (previousValues.some(value => currentValues.includes(value))) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          const startX = previousNode.getBoundingClientRect().left + previousNode.offsetWidth / 2
          const startY = previousNode.getBoundingClientRect().top + previousNode.offsetHeight / 2
          const endX = currentNode.getBoundingClientRect().left + currentNode.offsetWidth / 2
          const endY = currentNode.getBoundingClientRect().top + currentNode.offsetHeight / 2

          line.setAttribute("x1", startX - graphRect.left);
          line.setAttribute("y1", startY - graphRect.top);
          line.setAttribute("x2", endX - graphRect.left);
          line.setAttribute("y2", endY - graphRect.top);
          line.setAttribute("stroke", "black");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
        // console.log(previousValues, currentValues, previousValues.some(v => currentValues.includes(parseInt(v, 10))))
      })
    }
  })
}
function addBlob(subvars_list = [], depth = 0) {
  try {
    let levelEL = document.querySelector(`.depth-${depth}`);
    if (!levelEL) {
      levelEL = document.createElement("div");
      levelEL.classList.add("level-container");
      levelEL.classList.add(`depth-${depth}`);
    }
    subvars_list.forEach((currentValues, index) => {
      const blobEl = document.createElement("div");
      blobEl.classList.add("blob");
      blobEl.innerHTML = currentValues;
      blobEl.dataset.nodeData = currentValues
      blobEl.dataset.depth = depth
      levelEL.appendChild(blobEl);
      treeContainer.appendChild(levelEL);
    });


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
