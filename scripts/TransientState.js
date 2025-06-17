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
