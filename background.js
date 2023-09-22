
function approach(val, target, max_move) {
    if (val > target) {
        return Math.max(val - max_move, target)
    } else {
        return Math.min(val + max_move, target)
    }
}

function drawGrid(gridContainer, gridSettings)
{
    // clear window
    gridContainer.innerHTML = ""

    let sizeX = gridSettings.sizeX
    let sizeY = gridSettings.sizeY

    let offsetX = gridSettings.offsetX
    let offsetY = gridSettings.offsetY

    let width = gridContainer.clientWidth
    let height = gridContainer.clientHeight

    let numLinesX = Math.floor(width / sizeX)
    let numLinesY = Math.floor(height / sizeY)

    width = Math.floor(width / sizeX) * sizeX + sizeX
    height = Math.floor(height / sizeY) * sizeY + sizeY

    for (let x = -1; x < numLinesX + 1; x ++)
    {        
        let xPosition = (x * sizeX) + (offsetX % sizeX) + sizeX
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        path.setAttribute("d", `M ${xPosition} 0 V ${(height)}`)
        path.setAttribute("stroke", "rgb(32, 32, 32)")
        path.setAttribute("stroke-width", "1")
        path.setAttribute("fill", "none")
        gridContainer.appendChild(path)
    }

    for (let y = -1; y < numLinesY + 1; y ++)
    {
        let yPosition = (y * sizeY) + (offsetY % sizeY) + sizeY
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        path.setAttribute("d", `M 0 ${yPosition} H ${width}`)
        path.setAttribute("stroke", "rgb(32, 32, 32)")
        path.setAttribute("stroke-width", "1")
        path.setAttribute("fill", "none")
        gridContainer.appendChild(path)
    }

    return 
}

export { drawGrid }

