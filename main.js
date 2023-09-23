import { drawGrid } from "./background.js"
import { addDragListener } from "./controls.js"

const controlCanvas = document.getElementById("control-canvas")
const gridContainer = document.getElementById("grid-container")

const resetOffsetButton = document.getElementById("resetOffset")

const sliderSizeX = document.getElementById("sliderSizeX")
const sliderSizeY = document.getElementById("sliderSizeY")

const toolText = document.getElementById("toolText")
const buttonDragging = document.getElementById("buttonDrag")
const buttonDrawing = document.getElementById("buttonDraw")
const buttonErasing = document.getElementById("buttonErase")

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

window.addEventListener("resize", (event) => {
    drawGrid(gridContainer, gridSettings)
})

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

// Buttons
buttonDragging.addEventListener("click", (event) => {
    swapTool("drag")
})

buttonDrawing.addEventListener("click", (event) => {
    swapTool("draw")
})

buttonErasing.addEventListener("click", (event) => {
    swapTool("erase")
})

addDragListener(controlCanvas, controlSettings)

swapTool("drag")
drawGrid(gridContainer, gridSettings)

function swapTool(tool)
{
    controlSettings.tool = tool
    toolText.innerText = tool
}

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
