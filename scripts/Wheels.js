import { setWheel } from "./TransientState.js"

export const wheelOptions = async () => {
    const response = await fetch("http://localhost:8088/wheels")
    const wheels = await response.json()
    let optionsHTML = '<select name="wheel" id="wheel">'
    optionsHTML += `<option value="">---------</option>`
    optionsHTML += wheels.map(wheel => {
        return `<option value="${wheel.id}">${wheel.style}</option>`
    }).join("")
    optionsHTML += '</select>'
    return optionsHTML
}

document.addEventListener("change", (event) => {
    if (event.target.id === "wheel") {
        setWheel(event.target.value)
    }
})