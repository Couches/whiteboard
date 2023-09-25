let drawing = false

let points = []

function drawLine(canvas, cs)
{
    if (cs.drawing != drawing)
    {
        drawing = cs.drawing

        
    }

    if (!drawing)
    {
        // Pen up
        console.log("up")
    }

    if (drawing)
    {
        // Pen down
        let x = cs.startX + cs.changeX
        let y = cs.startY + cs.changeY

        let point = new Point(x, y)

        if (points.length == 0) points.push(point)
        else if (points[points.length - 1].distance(point) > 15)
        {
            points.push(point)
            console.log("down", points)
        }

        
    }
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

export { drawLine }