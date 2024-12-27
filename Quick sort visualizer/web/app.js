const treeContainerSolved = document.querySelector(".recursion-tree-solved")
const svg = document.querySelector(".connections");
let dispositionValueX = 30

async function startApp() {
    let data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    await eel.sorting(data)((ans) => console.log(ans))
    await eel.solved_data()((solvedObject) => {
        let maxDepth = Math.max(...Object.keys(solvedObject).map(Number))
        Object.entries(solvedObject).forEach(
            ([key, data], index) => {
                addBlob(elements = data, depth = parseInt(key, 10), maxDepth = maxDepth)
            }
        )
    })
    setInterval(() => eel.keep_alive(), 5000)
}
function addBlob(elements = [], depth = 0, maxDepth) {
    try {
        let depthClass = `.depth-${depth}`
        let levelEL = document.querySelector(depthClass)
        if (!levelEL) {
            levelEL = document.createElement("div");
            levelEL.classList.add("level-container");
            levelEL.classList.add(depthClass);
        }
        elements.forEach(({
            parent_id: parentId,
            self_id: selfId,
            unsolved_arr: unsolvedArr,
            partial_arr: partialSolvedArr,
            solved_arr: solvedArr,
            pivot_index: pivotIndex
        }, index) => {
            // console.log(parentId, selfId, unsolvedArr, solvedArr, pivotIndex)
            const blobEl = document.createElement("div");
            blobEl.classList.add("blob");
            blobEl.dataset.depth = depth
            blobEl.dataset.maxDepth = maxDepth
            blobEl.dataset.selfId = selfId
            blobEl.style.opacity = "0"
            blobEl.style.translate = "0px 4px"
            blobEl.style.transitionDuration = "0.5s"
            levelEL.appendChild(blobEl);
            treeContainerSolved.appendChild(levelEL)

            if (unsolvedArr.length <= 1) {
                blobEl.innerHTML = currentValues;
            }
            else {
                unsolvedArr.forEach((value, index) => {
                    const blobBarEL = document.createElement("span");
                    blobBarEL.style.position = "absolute"
                    blobBarEL.style.transitionDuration = "0.5s"
                    blobBarEL.style.transform = `translateX(${index * dispositionValueX}px)`
                    blobBarEL.style.transition = "transform 0.3s ease"
                    blobBarEL.innerHTML = unsolvedArr.length - 1 == index ? `${value}` : `${value},`
                    blobEl.appendChild(blobBarEL)
                    if (index == unsolvedArr.length - 1) {
                        blobBarEL.style.backgroundColor = "blue"
                    }
                })
                blobEl.style.width = `${(unsolvedArr.length * dispositionValueX)}px`
            }
            let duration = 500 * depth
            setTimeout(() => {
                blobEl.style.opacity = "100"
                blobEl.style.translate = "0px 0px"
                drawConnections(currNode = blobEl, parentId = parentId)
            }, duration)
            if (unsolvedArr.length > 1)
                setTimeout(() => {
                    duration = 500 * (maxDepth - depth)
                    let childNodes = Array.from(blobEl.children)
                    animateSwap(currNode = blobEl, childNodes, solvedArr, unsolvedArr, partialSolvedArr)
                }, duration)

        })

    }
    catch (error) {
        console.log("Error occurred:", error);
    }
}

async function animateSwap(currNode, childNodes, solvedArr, unsolvedArr, partialSolvedArr) {
    let unsolvedArrTemp = [...unsolvedArr]
    currNode.style.backgroundColor = "lawngreen"
    solvedArr.forEach((value, index) => {
        let targetIndex = unsolvedArrTemp.indexOf(value)
        unsolvedArrTemp[targetIndex] = null
        childNodes[targetIndex].innerHTML = solvedArr.length - 1 == index ? `${value}` : `${value},`
        childNodes[targetIndex].style.transform = `translateX(${index * dispositionValueX}px)`
    })
    await new Promise(resolve => {
        return setTimeout(resolve, 3000)
    })

    currNode.style.backgroundColor = "lightcoral"
    unsolvedArr.forEach((value, index) => {
        childNodes[index].innerHTML = unsolvedArr.length - 1 == index ? `${value}` : `${value},`
        childNodes[index].style.transform = `translateX(${index * dispositionValueX}px)`
    })
    await new Promise(resolve => {
        return setTimeout(resolve, 3000)
    })

    unsolvedArrTemp = [...unsolvedArr]
    currNode.style.backgroundColor = "yellow"
    partialSolvedArr.forEach((value, index) => {
        let targetIndex = unsolvedArrTemp.indexOf(value)
        unsolvedArrTemp[targetIndex] = null
        childNodes[targetIndex].innerHTML = solvedArr.length - 1 == index ? `${value}` : `${value},`
        childNodes[targetIndex].style.transform = `translateX(${index * dispositionValueX}px)`
    })


    setTimeout(() => animateSwap(currNode, childNodes, solvedArr, unsolvedArr, partialSolvedArr), 3000)
}
function drawConnections(currNode, parentId) {

    let depth = parseInt(currNode.dataset.depth, 10)
    //only create connections if depth is more than 0
    if (depth != 0) {
        let className = `.depth-${depth - 1}`
        previousNodes = document.getElementsByClassName(className)[0].childNodes

        previousNodes.forEach((previousNode, index) => {
            if (previousNode.dataset.selfId == parentId) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                const startX = previousNode.getBoundingClientRect().left + previousNode.offsetWidth / 2
                const startY = previousNode.getBoundingClientRect().top + previousNode.offsetHeight / 2
                const endX = currNode.getBoundingClientRect().left + currNode.offsetWidth / 2
                const endY = currNode.getBoundingClientRect().top + currNode.offsetHeight / 2

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