import { resetTransientState } from "./TransientState.js";

// Function to send a new order to the API
export const addOrder = async (order) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }

    const response = await fetch("http://localhost:8088/orders", postOptions)
    const newOrder = await response.json()

    // Reset transient state and dispatch event after order is placed
    resetTransientState();
    document.dispatchEvent(new CustomEvent("neworderCreated"))
    return newOrder
}

// Function to fetch and display existing orders
export const Orders = async () => {
    const response = await fetch("http://localhost:8088/orders?_expand=paint&_expand=interior&_expand=technology&_expand=wheel")
    const orders = await response.json()

    let ordersHTML = "<h2>Custom Car Orders</h2><ul>"
    const orderItems = orders.map(order => {
        const orderPrice = order.paint.price + order.interior.price + order.technology.price + order.wheel.price
        return `
                <section class="order-container">
                    <h2>Order ${order.id}</h2>
                    <p>Paint: ${order.paint.color}</p>
                    <p>Interior: ${order.interior.type}</p>
                    <p>Technology: ${order.technology.package}</p>
                    <p>Wheels: ${order.wheel.style}</p>
                    <p>Total Price: $${orderPrice.toFixed(2)}</p>
                </section>
            `
    })

    ordersHTML += orderItems.join("")
    ordersHTML += "</ul>"

    return ordersHTML
}

// Function to clear all existing orders
export const clearAllOrders = async () => {
    const response = await fetch("http://localhost:8088/orders");
    const orders = await response.json();

    const deletePromises = orders.map(async (order) => {
        await fetch(`http://localhost:8088/orders/${order.id}`, {
            method: "DELETE"
        });
    });

    await Promise.all(deletePromises);

    // Dispatch a custom event after all orders are cleared
    document.dispatchEvent(new CustomEvent("neworderCreated"));
};
