import { update } from "./main.js"

function addDragListener(canvas, controlSettings)
{
    canvas.addEventListener("mousedown", (event) => {
        let startX = event.clientX
        let startY = event.clientY

        controlSettings.startX = startX
        controlSettings.startY = startY

        controlSettings.deltaX = 0
        controlSettings.deltaY = 0

        controlSettings.changeX = 0
        controlSettings.changeY = 0

        controlSettings.drawing = true
    
        let mouseMove = (event) => {
    
            let deltaX = event.clientX - startX
            let deltaY = event.clientY - startY
    
            startX = event.clientX
            startY = event.clientY

            controlSettings.deltaX = deltaX
            controlSettings.deltaY = deltaY
            
            controlSettings.changeX += deltaX
            controlSettings.changeY += deltaY
    
            
    
            update()
        }
    
        let mouseUp = (event) => {
            canvas.style.cursor = "default"

            controlSettings.drawing = false
    
            canvas.removeEventListener("mousemove", mouseMove)
            canvas.removeEventListener("mouseup", mouseUp)

            update()
        }
    
        canvas.addEventListener("mousemove", mouseMove)
        canvas.addEventListener("mouseup", mouseUp)
    })
}

export { addDragListener }
