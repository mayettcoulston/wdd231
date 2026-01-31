const spotlightSection = document.querySelector(".spotlights");
const membersURL = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) throw new Error("Failed to load member data");

        const members = await response.json();
        displaySpotlights(members);

    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const qualifiedMembers = members.filter(member =>
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );

    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // Select 2 or 3 members
    const spotlightCount = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = shuffled.slice(0, spotlightCount);

    selectedMembers.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p><strong>Membership:</strong> ${member.membershipLevel}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightSection.appendChild(card);
    });
}

getSpotlights();