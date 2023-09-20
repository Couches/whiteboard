import { drawGrid } from "./background.js"
import { addDragListener } from "./controls.js"

const controlCanvas = document.getElementById("control-canvas")
const gridContainer = document.getElementById("grid-container")

const resetOffsetButton = document.getElementById("resetOffset")

const sliderSizeX = document.getElementById("sliderSizeX")
const sliderSizeY = document.getElementById("sliderSizeY")

const checkboxDragging = document.getElementById("dragging")

let grid = {
    offsetX: 0,
    offsetY: 0,

    sizeX: 96,
    sizeY: 96
}

let controls = {
    deltaX: 0,
    deltaY: 0,

    tool: "drag"
}

resetOffsetButton.addEventListener("click", (event) => {
    grid.offsetX = 0.0;
    grid.offsetY = 0.0;

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



addDragListener(controlCanvas, controls)

function update()
{
    drawGrid(gridContainer, grid.offsetX, grid.offsetY, grid.sizeX, grid.sizeY)
}

export { update }
