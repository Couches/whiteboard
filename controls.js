import { update } from "./main.js"

function addDragListener(canvas, controlSettings)
{
    canvas.addEventListener("mousedown", (event) => {
        let startX = event.clientX
        let startY = event.clientY

        controlSettings.deltaX = 0
        controlSettings.deltaY = 0

        controlSettings.changeX = 0
        controlSettings.changeY = 0
    
        let mouseMove = (event) => {
            canvas.style.cursor = "grabbing"
    
            let deltaX = event.clientX - startX
            let deltaY = event.clientY - startY
    
            controlSettings.deltaX = deltaX
            controlSettings.deltaY = deltaY
            
            controlSettings.changeX += deltaX
            controlSettings.changeY += deltaY
    
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
