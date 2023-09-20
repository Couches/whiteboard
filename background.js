import { addDragListener } from "./controls.js"

function approach(val, target, max_move) {
    if (val > target) {
        return Math.max(val - max_move, target)
    } else {
        return Math.min(val + max_move, target)
    }
}

const canvas = document.getElementById("grid-container")

const resetOffsetButton = document.getElementById("resetOffset")

const sliderSizeX = document.getElementById("sliderSizeX")
const sliderSizeY = document.getElementById("sliderSizeY")

const checkboxDragging = document.getElementById("dragging")

let offsetX = 0.0
let offsetY = 0.0

let sizeX = 96
let sizeY = 96

let toolObject = {
    tool: "drag"
}

resetOffsetButton.addEventListener("click", (event) => {
    offsetX = 0.0;
    offsetY = 0.0;

    drawGrid(canvas, offsetX, offsetY, sizeX, sizeY)
})

sliderSizeX.addEventListener("input", (event) => {
    sizeX = parseInt(event.target.value)
    drawGrid(canvas, offsetX, offsetY, sizeX, sizeY)
})

sliderSizeY.addEventListener("input", (event) => {
    sizeY = parseInt(event.target.value)
    drawGrid(canvas, offsetX, offsetY, sizeX, sizeY)
})

checkboxDragging.addEventListener("change", (event) => {
    toolObject.tool = event.target.checked ? "drag" : "none"
})

addDragListener(canvas, toolObject)

function drawGrid(gridContainer, gridSettings)
{
    gridContainer.innerHTML = ""

    let width = gridContainer.clientWidth
    let height = gridContainer.clientHeight

    let numLinesX = Math.floor(width / gridSettings.sizeX)
    let numLinesY = Math.floor(height / gridSettings.sizeY)

    width = Math.floor(width / gridSettings.sizeX) * gridSettings.sizeX + gridSettings.sizeX
    height = Math.floor(height / gridSettings.sizeY) * gridSettings.sizeY + gridSettings.sizeY

    for (let x = -1; x < numLinesX + 1; x ++)
    {        
        let xPosition = (x * gridSettings.sizeX) + (gridSettings.offsetX % gridSettings.sizeX) + gridSettings.sizeX
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        path.setAttribute("d", `M ${xPosition} 0 V ${(height)}`)
        path.setAttribute("stroke", "rgb(32, 32, 32)")
        path.setAttribute("stroke-width", "1")
        path.setAttribute("fill", "none")
        gridContainer.appendChild(path)
    }

    for (let y = -1; y < numLinesY + 1; y ++)
    {
        let yPosition = (y * gridSettings.sizeY) + (gridSettings.offsetY % gridSettings.sizeY) + gridSettings.sizeY
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        path.setAttribute("d", `M 0 ${yPosition} H ${width}`)
        path.setAttribute("stroke", "rgb(32, 32, 32)")
        path.setAttribute("stroke-width", "1")
        path.setAttribute("fill", "none")
        gridContainer.appendChild(path)
    }
}

export { drawGrid }

