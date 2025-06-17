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

export const getTransientState = () => ({ ...transientState });

export const resetTransientState = () => {
    transientState.paintId = ""
    transientState.interiorId = ""
    transientState.technologyId = ""
    transientState.wheelId = ""
}

// Function to convert transient state to permanent state (place order)
export const placeOrder = async () => {
    const orderToSend = { ...transientState };

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderToSend)
    }

    const response = await fetch("http://localhost:8088/orders", postOptions)
    const newOrder = await response.json()

    // Reset transient state and dispatch event after order is placed
    resetTransientState();
    document.dispatchEvent(new CustomEvent("neworderCreated"));
    return newOrder;
}