import { setPaint } from "./TransientState.js"

export const paintOptions = async () => {
    const response = await fetch("http://localhost:8088/paints")
    const paints = await response.json()
    let optionsHTML = '<select name="paint" id="paint">'
    optionsHTML += `<option value="">---------</option>`
    optionsHTML += paints.map(paint => {
        return `<option value="${paint.id}">${paint.color} ($${paint.price.toFixed(2)})</option>`
    }).join("")
    optionsHTML += '</select>'
    return optionsHTML
}

document.addEventListener("change", (event) => {
    if (event.target.id === "paint") {
        setPaint(event.target.value)
    }
})