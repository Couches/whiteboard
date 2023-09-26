let drawing = false

let paths = []
let points = []
let pathString = ""

const penContainer = document.getElementById("pen-container")



function drawLine(canvas, cs, gs)
{
    if (cs.drawing != drawing)
    {
        drawing = cs.drawing

        if (drawing)
        {
            // Pen down
            points.push(new Point(cs.startX - gs.offsetX, cs.startY - gs.offsetY))
        }
        else
        {
            // Pen up
            paths.push(points)
            points = []
            pathString = ""
        }
    }

    if (drawing)
    {
        // Pen down
        let x = cs.startX + cs.changeX - gs.offsetX
        let y = cs.startY + cs.changeY - gs.offsetY

        let point = new Point(x, y)

        if (points[points.length - 1].distance(point) > 5)
        {
            points.push(point)
            renderLine(points, gs)
        }
    }
}

function renderAllLines(gs)
{
    penContainer.innerHTML = ""

    for (let i = 0; i < paths.length; i ++)
    {
        let path = paths[i]
        renderLine(path, gs)
    }
}

function renderLine(points, gs)
{
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathString = getPathString(points, gs)

    path.setAttribute("d", pathString)
    path.setAttribute("stroke-width", "2")
    path.setAttribute("stroke", "black")
    path.setAttribute("fill", "none")
    path.setAttribute("stroke-linecap", "round")
    path.id = "path" + paths.length

    penContainer.appendChild(path)
}

function getPathString(points, gs)
{
    let pathString = ""

    for (let i = 0; i < points.length; i ++)
    {
        let point = points[i]

        if (i == 0) {
            pathString += "M "
        }
        else
        {
            pathString += "L "
        }

        pathString += (point.x + gs.offsetX) + " " + (point.y + gs.offsetY) + " "

        // create a bezier curve from the last point to the current point
        // the control point is the last point + the current point / 2
        
    }

    return pathString
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    distance(otherPoint) {
        const deltaX = this.x - otherPoint.x;
        const deltaY = this.y - otherPoint.y;
        return Math.sqrt(deltaX ** 2 + deltaY ** 2);
    }
}

export { drawLine, renderAllLines }
