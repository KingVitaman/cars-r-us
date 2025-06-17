import { paintOptions } from "./Paints.js";
import { interiorOptions } from "./Interiors.js";
import { technologyOptions } from "./Technologies.js";
import { wheelOptions } from "./Wheels.js";
import { placeOrder, getTransientState } from "./TransientState.js";
import { Orders, clearAllOrders } from "./Orders.js";

const mainContainer = document.querySelector("#container");

const renderOptions = async () => {
    const paintsHTML = await paintOptions();
    const interiorsHTML = await interiorOptions();
    const technologiesHTML = await technologyOptions();
    const wheelsHTML = await wheelOptions();
    const ordersHTML = await Orders();

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

        <article class="orderButton">
            <button id="placeOrder">Place Car Order</button>
            <button id="clearOrders">Clear All Orders</button>
        </article>

        <section class="customOrders">
            ${ordersHTML}
        </section>
    `;
};

document.addEventListener("click", async (clickEvent) => {
    if (clickEvent.target.id === "placeOrder") {
        await placeOrder();
    } else if (clickEvent.target.id === "clearOrders") {
        // WARNING: This is client-side validation and NOT secure for production.
        // Real authentication requires a backend.
        const correctPassword = "password123";
        const correctAccount = "admin";

        const password = prompt("Please enter the password:");
        if (password !== correctPassword) {
            alert("Incorrect password. Orders will not be cleared.");
            return;
        }

        const account = prompt("Please enter the account name:");
        if (account !== correctAccount) {
            alert("Incorrect account name. Orders will not be cleared.");
            return;
        }

        await clearAllOrders();
    }
});

document.addEventListener("neworderCreated", renderOptions);

renderOptions();

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('strobe');
    setTimeout(() => {
        const flashbang = document.getElementById('flashbang');
        if (flashbang) flashbang.remove();
    }, 1500);

    // Try to autoplay the glittercore audio
    const audio = document.getElementById('glittercore-audio');
    if (audio) {
        audio.volume = 1.0;
        audio.currentTime = 0;
        audio.play().catch((e) => {
            // Autoplay might be blocked by the browser
            console.warn('Autoplay was blocked:', e);
        });
    }
});

document.getElementById('logo-play-btn')?.addEventListener('click', () => {
    const audio = document.getElementById('glittercore-audio');
    if (audio) {
        audio.volume = 1.0;
        audio.play();
    }
    // Optionally disable the button after playing
    document.getElementById('logo-play-btn').disabled = true;
});

document.getElementById('stop-glittercore')?.addEventListener('click', () => {
    const audio = document.getElementById('glittercore-audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
});
