import { paintOptions } from "./Paints.js";
import { interiorOptions } from "./Interiors.js";
import { technologyOptions } from "./Technologies.js";
import { wheelOptions } from "./Wheels.js";

const mainContainer = document.querySelector("#container");

const renderOptions = async () => {
    const paintsHTML = await paintOptions();
    const interiorsHTML = await interiorOptions();
    const technologiesHTML = await technologyOptions();
    const wheelsHTML = await wheelOptions();

    mainContainer.innerHTML = `
        <h1>Cars R Us</h1>
        <section>
            <h2>Paint Options</h2>
            ${paintsHTML}
        </section>
        <section>
            <h2>Interior Options</h2>
            ${interiorsHTML}
        </section>
        <section>
            <h2>Technology Options</h2>
            ${technologiesHTML}
        </section>
        <section>
            <h2>Wheel Options</h2>
            ${wheelsHTML}
        </section>
    `;
};

renderOptions();
