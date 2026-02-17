import { restaurants } from "../data/eateries.mjs";

const container = document.querySelector("#cards");

restaurants.forEach(restaurant => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${restaurant.name}</h2>
        <figure>
            <img src="${restaurant.image}" alt="${restaurant.name}" loading="lazy">
        </figure>
        <address>${restaurant.address}</address>
        <p>${restaurant.description}</p>
        <button>Learn More</button>
    `;

    container.appendChild(card);
});

const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (days < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);