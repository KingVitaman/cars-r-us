const transientState = {
    interiorId: "",
    wheelId: "",
    technologyId: "",
    paintId: ""
}

export const setPaint = (paintChoice) => {
    transientState.paintId = paintChoice
}

export const setInterior = (interiorChoice) => {
    transientState.interiorId = interiorChoice
}

export const setWheel = (wheelChoice) => {
    transientState.wheelId = wheelChoice
}

export const setTechnology = (technologyChoice) => {
    transientState.technologyId = technologyChoice
}

export const placeOrder = async () => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }

    await fetch("http://localhost:8088/main", postOptions)

    // Dispatch a custom event when the order is complete
    const customEvent = new CustomEvent("neworderCreated")
    document.dispatchEvent(customEvent)
}
