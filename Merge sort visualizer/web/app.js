const treeContainerUnsolved = document.querySelector(".recursion-tree-unsolved")
const treeContainerSolved = document.querySelector(".recursion-tree-solved")

let svg = document.querySelector(".connections");

async function startApp() {
    let data = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
    await eel.sorting(data)((ans) => console.log(ans))
    await eel.unsolved_data()((unsolvedObject) => {
        console.log(unsolvedObject)
        Object.entries(unsolvedObject).forEach(
            (value, index) => {
                const [key, subvarsListTemp] = value
                addBlob(subvarsList = subvarsListTemp, depth = key)
            }
        )
    })
    await eel.solved_data()((solvedObject) => {
        console.log(solvedObject)
        let maxDepth = Math.max(...Object.keys(solvedObject).map(Number))
        setTimeout(() => {
            Object.entries(solvedObject).reverse().forEach(
                (value, index) => {
                    const [key, subvarsListTemp] = value
                    addBlob(subvarsList = subvarsListTemp, depth = key, maxDepth = maxDepth, type = "solved")
                }
            )
        }, (500 * maxDepth));
    })
}

function addBlob(subvars_list = [], depth = 0, maxDepth = -1, type = "unsolved") {
    try {
        let depthClass = type == "solved" ? `.solved-depth-${depth}` : `.unsolved-depth-${depth}`
        let levelEL = document.querySelector(depthClass);
        if (!levelEL) {
            levelEL = document.createElement("div");
            levelEL.classList.add("level-container");
            levelEL.classList.add(depthClass);
        }
        subvars_list.forEach(([parentID, currID, currentValues], index) => {
            const blobEl = document.createElement("div");
            blobEl.classList.add("blob");
            blobEl.dataset.depth = depth
            blobEl.dataset.currID = currID
            blobEl.style.opacity = "0"
            blobEl.style.translate = "0px 4px"
            blobEl.style.transitionDuration = "0.5s"
            blobEl.innerHTML = currentValues;
            levelEL.appendChild(blobEl);
            if (type == "solved") {
                blobEl.classList.add("highlighted");
                treeContainerSolved.appendChild(levelEL);
            }
            else {
                treeContainerUnsolved.appendChild(levelEL)
            }
            let duration = type == "solved" ? 500 * (maxDepth - depth) : 500 * depth
            setTimeout(() => {
                blobEl.style.opacity = "100"
                blobEl.style.translate = "0px 0px"
                drawConnections(currentNode = blobEl, parentID = parentID, type = type)
            }, duration)
        });
    } catch (error) {
        console.log("Error occurred:", error);
    }
}

function drawConnections(currentNode, parentID, type = "unsolved") {

    let depth = parseInt(currentNode.dataset.depth, 10)
    //only create connections if depth is more than 0
    if (depth != 0) {
        let className = type == "solved" ? `.solved-depth-${depth - 1}` : `.unsolved-depth-${depth - 1}`

        previousNodes = document.getElementsByClassName(className)[0].childNodes

        previousNodes.forEach((previousNode, index) => {
            if (previousNode.dataset.currID == parentID) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                const startX = previousNode.getBoundingClientRect().left + previousNode.offsetWidth / 2
                const startY = previousNode.getBoundingClientRect().top + previousNode.offsetHeight / 2
                const endX = currentNode.getBoundingClientRect().left + currentNode.offsetWidth / 2
                const endY = currentNode.getBoundingClientRect().top + currentNode.offsetHeight / 2

                line.setAttribute("x1", startX);
                line.setAttribute("y1", startY);
                line.setAttribute("x2", endX);
                line.setAttribute("y2", endY);
                line.setAttribute("stroke", "black");
                line.setAttribute("stroke-width", "2");
                svg.appendChild(line);
            }
        })
    }
}
startApp();