import { drawGrid } from "./background.js"
import { addDragListener } from "./controls.js"
import { drawLine, renderAllLines } from "./pen.js"

const controlCanvas = document.getElementById("control-canvas")
const gridContainer = document.getElementById("grid-container")
const penContainer = document.getElementById("pen-container")

const resetOffsetButton = document.getElementById("resetOffset")

const sliderSizeX = document.getElementById("sliderSizeX")
const sliderSizeY = document.getElementById("sliderSizeY")

const toolText = document.getElementById("toolText")
const buttonDragging = document.getElementById("buttonDrag")
const buttonDrawing = document.getElementById("buttonDraw")
// const buttonErasing = document.getElementById("buttonErase")

let gridSettings = {
    offsetX: 0,
    offsetY: 0,

    sizeX: 96,
    sizeY: 96
}

let controlSettings = {
    startX: 0,
    startY: 0,

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

// Buttons
buttonDragging.addEventListener("click", (event) => {
    swapTool("drag")
})

buttonDrawing.addEventListener("click", (event) => {
    swapTool("draw")
})

// buttonErasing.addEventListener("click", (event) => {
//     swapTool("erase")
// })

addDragListener(controlCanvas, controlSettings)

swapTool("drag")
drawGrid(gridContainer, gridSettings)

function swapTool(tool)
{
    buttonDragging.classList.remove("selected")
    buttonDrawing.classList.remove("selected")
    // buttonErasing.classList.remove("selected")

    switch (tool)
    {
        case "drag":
            buttonDragging.classList.add("selected")
            break;
        case "draw":
            buttonDrawing.classList.add("selected")
            break;
        // case "erase":
        //     buttonErasing.classList.add("selected")
        //     break;
    }

    controlSettings.tool = tool
    // toolText.innerText = tool
}

function update()
{   
    drawGrid(gridContainer, gridSettings)
    

    

    if (controlSettings.tool == "draw")
    {
        //console.log(controlSettings.drawing, controlSettings.startX, controlSettings.startY, controlSettings.changeX, controlSettings.changeY)
        drawLine(penContainer, controlSettings, gridSettings)
    }

    if (controlSettings.tool == "drag")
    {
        gridSettings.offsetX += controlSettings.deltaX
        gridSettings.offsetY += controlSettings.deltaY

        renderAllLines(gridSettings)
    }
}

export { update }
