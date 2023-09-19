function approach(val, target, max_move) {
    if (val > target) {
        return Math.max(val - max_move, target)
    } else {
        return Math.min(val + max_move, target)
    }
}

const background = document.getElementById("background")

const resetOffsetButton = document.getElementById("resetOffset")

const sliderSizeX = document.getElementById("sliderSizeX")
const sliderSizeY = document.getElementById("sliderSizeY")

let offsetX = 0
let offsetY = 0

let sizeX = 64
let sizeY = 64

resetOffsetButton.addEventListener("click", (event) => {
    offsetX = 0;
    offsetY = 0;

    drawGrid(background, offsetX, offsetY, sizeX, sizeY)
})

sliderSizeX.addEventListener("input", (event) => {
    sizeX = parseInt(event.target.value)
    drawGrid(background, offsetX, offsetY, sizeX, sizeY)
})

sliderSizeY.addEventListener("input", (event) => {
    sizeY = parseInt(event.target.value)
    drawGrid(background, offsetX, offsetY, sizeX, sizeY)
})

drawGrid(background, offsetX, offsetY, sizeX, sizeY)

// call drawGrid when window is resized
window.addEventListener("resize", (event) => {
    drawGrid(background, offsetX, offsetY, sizeX, sizeY)
})

// Add event listener to window that detects clicking and dragging
background.addEventListener("mousedown", (event) => {
    let startX = event.clientX
    let startY = event.clientY

    let mouseMove = (event) => {
        background.style.cursor = "grabbing"

        let deltaX = event.clientX - startX
        let deltaY = event.clientY - startY

        offsetX += deltaX
        offsetY += deltaY

        startX = event.clientX
        startY = event.clientY

        drawGrid(background, offsetX, offsetY, sizeX, sizeY)
    }

    let mouseUp = (event) => {
        background.style.cursor = "default"

        background.removeEventListener("mousemove", mouseMove)
        background.removeEventListener("mouseup", mouseUp)
    }

    background.addEventListener("mousemove", mouseMove)
    background.addEventListener("mouseup", mouseUp)
})

function drawGrid(gridContainer, offsetX, offsetY, sizeX, sizeY)
{
    // clear window
    gridContainer.innerHTML = ""

    let width = gridContainer.clientWidth
    let height = gridContainer.clientHeight

    width = Math.floor(width / sizeX) * sizeX + sizeX
    height = Math.floor(height / sizeY) * sizeY + sizeY

    for (let x = 0; x < width; x += sizeX)
    {        
        let xPosition = (x + offsetX + width) % width
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        path.setAttribute("d", `M ${xPosition} 0 V ${(height * 2 + offsetY)}`)
        path.setAttribute("stroke", "rgb(32, 32, 32)")
        path.setAttribute("stroke-width", "1")
        path.setAttribute("fill", "none")
        gridContainer.appendChild(path)
    }

    for (let y = 0; y < height; y += sizeY)
    {
        let yPosition = (y + offsetY + height) % height
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        path.setAttribute("d", `M 0 ${yPosition} H ${width * 2 + offsetX}`)
        path.setAttribute("stroke", "rgb(32, 32, 32)")
        path.setAttribute("stroke-width", "1")
        path.setAttribute("fill", "none")
        gridContainer.appendChild(path)
    }
}

