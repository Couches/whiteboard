import { update } from "./main.js"

function addDragListener(canvas, controls)
{
    canvas.addEventListener("mousedown", (event) => {
        let startX = event.clientX
        let startY = event.clientY
    
        let mouseMove = (event) => {
            canvas.style.cursor = "grabbing"
    
            let deltaX = event.clientX - startX
            let deltaY = event.clientY - startY
    
            if (controls.tool == "drag")
            {
                controls.deltaX += deltaX
                controls.deltaY += deltaY
            }
    
            startX = event.clientX
            startY = event.clientY
    
            update()
        }
    
        let mouseUp = (event) => {
            canvas.style.cursor = "default"
    
            canvas.removeEventListener("mousemove", mouseMove)
            canvas.removeEventListener("mouseup", mouseUp)
        }
    
        canvas.addEventListener("mousemove", mouseMove)
        canvas.addEventListener("mouseup", mouseUp)
    })
}



export { addDragListener }
