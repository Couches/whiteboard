import { drawGrid } from "./background.js"
import { addDragListener } from "./controls.js"

const controlCanvas = document.getElementById("control-canvas")
const gridContainer = document.getElementById("grid-container")

const resetOffsetButton = document.getElementById("resetOffset")

const sliderSizeX = document.getElementById("sliderSizeX")
const sliderSizeY = document.getElementById("sliderSizeY")

const checkboxDragging = document.getElementById("dragging")

let gridSettings = {
    offsetX: 0,
    offsetY: 0,

    sizeX: 96,
    sizeY: 96
}

let controlSettings = {
    changeX: 0,
    changeY: 0,

    deltaX: 0,
    deltaY: 0,

    tool: "drag"
}

resetOffsetButton.addEventListener("click", (event) => {
    gridSettings.offsetX = 0;
    gridSettings.offsetY = 0;

    update()
})

sliderSizeX.addEventListener("input", (event) => {
    gridSettings.sizeX = parseInt(event.target.value)
    
    drawGrid(gridContainer, gridSettings)
})

sliderSizeY.addEventListener("input", (event) => {
    gridSettings.sizeY = parseInt(event.target.value)
    
    drawGrid(gridContainer, gridSettings)
})

checkboxDragging.addEventListener("change", (event) => {
    controlSettings.tool = event.target.checked ? "drag" : "none"
})

addDragListener(controlCanvas, controlSettings)

drawGrid(gridContainer, gridSettings)

function update()
{   
    drawGrid(gridContainer, gridSettings)

    if (controlSettings.tool == "drag")
    {
        gridSettings.offsetX += controlSettings.deltaX
        gridSettings.offsetY += controlSettings.deltaY
    }
}

export { update }
