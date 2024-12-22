const treeContainerUnsolved = document.querySelector(".recursion-tree-unsolved")
const treeContainerSolved = document.querySelector(".recursion-tree-solved")
const animBtn = document.querySelector(".anim-btn")
animBtn.dataset.play = "True"
animBtn.addEventListener("click", startAnim)
let svg = document.querySelector(".connections");
let solvedData = null
let dispostionValueX = 30


async function startApp() {
    let data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
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
        solvedData = solvedObject
        console.log(solvedData)
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
            blobEl.dataset.maxDepth = maxDepth
            blobEl.dataset.currID = currID
            blobEl.style.opacity = "0"
            blobEl.style.translate = "0px 4px"
            blobEl.style.transitionDuration = "0.5s"
            levelEL.appendChild(blobEl);

            if (type == "unsolved") {
                treeContainerUnsolved.appendChild(levelEL)

                blobEl.innerHTML = currentValues;
            }
            else {
                treeContainerSolved.appendChild(levelEL)
                let maxWidth = 0
                let unsortValues = getParentArrays(depth, currID, maxDepth)
                blobEl.classList.add("highlighted");
                blobEl.dataset.sortedData = currentValues
                blobEl.dataset.unsortedData = unsortValues
                if (unsortValues.length <= 1) {
                    blobEl.innerHTML = currentValues;
                }
                else {
                    unsortValues.forEach((value, index) => {
                        const blobBarEL = document.createElement("span");
                        blobBarEL.style.position = "absolute"
                        blobBarEL.style.transitionDuration = "0.5s"
                        blobBarEL.style.transform = `translateX(${index * dispostionValueX}px)`
                        blobBarEL.style.transition = "transform 0.3s ease"
                        blobBarEL.style.textAlign = "center"
                        blobBarEL.innerHTML = unsortValues.length - 1 == index ? `${value}` : `${value},`
                        // blobBarEL.style.backgroundColor = "blue"
                        blobEl.appendChild(blobBarEL)
                        maxWidth = blobBarEL.offsetWidth + blobBarEL.offsetLeft + (index * dispostionValueX)
                    })
                    blobEl.style.width = `${maxWidth}px`
                }
            }
            let duration = type == "solved" ? 500 * (maxDepth - depth) : 500 * depth
            setTimeout(() => {
                blobEl.style.opacity = "100"
                blobEl.style.translate = "0px 0px"
                drawConnections(currentNode = blobEl, parentID = parentID, type = type)

                if (type == "solved") {
                    let childNodes = Array.from(currentNode.children)
                    let solvedArr = currentNode.dataset.sortedData.split(",").map(Number)
                    let unsolvedArr = currentNode.dataset.unsortedData.split(",").map(Number)
                    if (solvedArr.length > 1)
                        animateSwap(currentNode, childNodes, solvedArr, unsolvedArr)
                }
            }, duration)
        });
    } catch (error) {
        console.log("Error occurred:", error);
    }
}

function getParentArrays(depth, currID, maxDepth, type = "solved") {
    let childArr = []
    let childDepth = parseInt(depth, 10) + 1
    if (childDepth <= maxDepth) {
        let [key, childObj] = Object.entries(solvedData)[childDepth]
        childObj.forEach(([parentID, selfID, currentValues], index) => {
            if (currID == parentID) {
                childArr = childArr.concat(currentValues)
            }
        })
    }
    return childArr
}
function startAnim() {
    if (animBtn.dataset.play == "True") {
        animBtn.dataset.play = "False"
        animBtn.innerHTML = "start animation"
    }
    else {
        animBtn.dataset.play = "True"
        animBtn.innerHTML = "stop animation"
        let childNodes = Array.from(treeContainerSolved.children)
        childNodes.forEach((levelNode) => {
            Array.from(levelNode.children).forEach((currentNode) => {
                let maxDepth = parseInt(currentNode.dataset.maxDepth, 10)
                let depth = parseInt(currentNode.dataset.depth, 10)
                let duration = 500 * (maxDepth - depth)
                setTimeout(() => {
                    let childNodes = Array.from(currentNode.children)
                    let solvedArr = currentNode.dataset.sortedData.split(",").map(Number)
                    let unsolvedArr = currentNode.dataset.unsortedData.split(",").map(Number)
                    if (solvedArr.length > 1)
                        animateSwap(currentNode, childNodes, solvedArr, unsolvedArr)
                }, duration)
            })

        })
    }
}

async function animateSwap(currentNode, childNodes, solvedArr, unsolvedArr) {
    if (animBtn.dataset.play == "True") {
        let unsolvedArrTemp = [...unsolvedArr]
        currentNode.style.backgroundColor = "lightcoral"
        solvedArr.forEach((value, index) => {
            let targetIndex = unsolvedArrTemp.indexOf(value)
            unsolvedArrTemp[targetIndex] = null
            childNodes[targetIndex].innerHTML = solvedArr.length - 1 == index ? `${value}` : `${value},`
            childNodes[targetIndex].style.transform = `translateX(${index * dispostionValueX}px)`
        })
        await new Promise(resolve => {
            return setTimeout(resolve, 2000)
        })
        currentNode.style.backgroundColor = "lawngreen"
        unsolvedArr.forEach((value, index) => {
            childNodes[index].innerHTML = unsolvedArr.length - 1 == index ? `${value}` : `${value},`
            childNodes[index].style.transform = `translateX(${index * dispostionValueX}px)`
        })

        setTimeout(() => animateSwap(currentNode, childNodes, solvedArr, unsolvedArr), 3000)
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