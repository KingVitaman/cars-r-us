import { setTechnology } from "./TransientState.js"

export const technologyOptions = async () => {
    const response = await fetch("http://localhost:8088/technologies")
    const technologies = await response.json()
    let optionsHTML = '<select name="technology" id="technology">'
    optionsHTML += `<option value="">---------</option>`
    optionsHTML += technologies.map(technology => {
        return `<option value="${technology.id}">${technology.package} ($${technology.price.toFixed(2)})</option>`
    }).join("")
    optionsHTML += '</select>'
    return optionsHTML
}

document.addEventListener("change", (event) => {
    if (event.target.id === "technology") {
        setTechnology(event.target.value)
    }
})