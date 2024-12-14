let treeContainer = document.querySelector(".recursion-tree");
let svg = document.getElementById("connections");
let data = [];
// let logs = {}
async function startApp() {
  data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  // data = [1, 3, 45, 10, 89, 90, 80, 17, 108, 1909, 121, 19]
  await eel.merge_sort(data)((ans_data) => {
    console.log(ans_data)
  });
  await eel.get_unsolved_all()((unsolvedObject) => {
    console.log(unsolvedObject)
    Object.entries(unsolvedObject).forEach(
      (value, index) => {
        const [key, subvarsListTemp] = value
        addBlob(subvarsList = subvarsListTemp, depth = key)
      }
    )
  })

}

function drawConnections(currentNode, parentID) {
  const graphRect = treeContainer.getBoundingClientRect();
  // To iterate through node object
  let depth = parseInt(currentNode.dataset.depth, 10)
  //only create connections if depth is more than 0
  if (depth != 0) {
    previousNodes = document.getElementsByClassName(`depth-${depth - 1}`)[0].childNodes
    previousNodes.forEach((previousNode, index) => {
      if (previousNode.dataset.currID == parentID) {
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
    })
  }
}
function addBlob(subvars_list = [], depth = 0) {
  try {
    let levelEL = document.querySelector(`.depth-${depth}`);
    if (!levelEL) {
      levelEL = document.createElement("div");
      levelEL.classList.add("level-container");
      levelEL.classList.add(`depth-${depth}`);
    }
    subvars_list.forEach(([parentID, currID, currentValues], index) => {
      const blobEl = document.createElement("div");
      blobEl.classList.add("blob");
      blobEl.innerHTML = currentValues;
      blobEl.dataset.depth = depth
      blobEl.dataset.currID = currID
      blobEl.style.opacity = "0"
      blobEl.style.translate = "0px 4px"
      blobEl.style.transitionDuration = "0.5s"
      setTimeout(() => {
        blobEl.style.opacity = "100"
        blobEl.style.translate = "0px 0px"
        drawConnections(currentNode = blobEl, parentID = parentID)
      }, 500 * depth)
      levelEL.appendChild(blobEl);
      treeContainer.appendChild(levelEL);
    });


  } catch (error) {
    console.log("Error occurred:", error);
  }
}

function solveBlob(subvarsList = [], depth = 0) {
  try {
    let levelEL = document.querySelector(`.depth-${depth}`);
    while (levelEL.hasChildNodes()) {
      levelEL.removeChild(levelEL.firstChild)
    }
    levelEL.childNodes.forEach((node, index) => console.log(node))

    subvarsList.forEach((value, index) => {
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

startApp();
