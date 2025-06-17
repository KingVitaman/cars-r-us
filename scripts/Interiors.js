import { setInterior } from "./TransientState.js"

export const interiorOptions = async () => {
    const response = await fetch("http://localhost:8088/interiors")
    const interiors = await response.json()
    let optionsHTML = '<select name="interior" id="interior">'
    optionsHTML += `<option value="">---------</option>`
    optionsHTML += interiors.map(interior => {
        return `<option value="${interior.id}">${interior.type}</option>`
    }).join("")
    optionsHTML += '</select>'
    return optionsHTML
}

document.addEventListener("change", (event) => {
    if (event.target.id === "interior") {
        setInterior(event.target.value)
    }
})