let properties = [];

document.addEventListener("DOMContentLoaded", async () => {

    const hash = window.location.hash;

    if (hash === "#land") {

        setTimeout(() => {

            document
                .querySelector('[data-tab="land"]')
                ?.click();

        }, 100);

    }

    if (hash === "#apartments") {

        setTimeout(() => {

            document
                .querySelector('[data-tab="apartments"]')
                ?.click();

        }, 100);

    }

    setupTabs();
    setupOffers();
    setupSlideshow();

    await loadProperties();

    setupHeroSearch();
    setupApartmentSearch();
    setupLandSearch();

});


// =====================================
// LOAD DATA
// =====================================

async function loadProperties() {

try {

    const response = await fetch("properties.json");
    properties = await response.json();

    populateFilters();
    renderProperties();

    setupViewMore("apartments");
    setupViewMore("land");

} catch (error) {

    console.error("Error loading properties:", error);

}

}

// =====================================
// RENDER PROPERTIES
// =====================================

function renderProperties() {

const apartmentsGrid =
    document.getElementById("apartmentsGrid");

const landGrid =
    document.getElementById("landGrid");

apartmentsGrid.innerHTML = "";
landGrid.innerHTML = "";

properties.forEach(property => {

    const card = document.createElement("a");

    card.href = `property.html?id=${property.id}`;
    card.className = "property-card";

    card.addEventListener("click", () => {

    const section =
        property.type === "Apartment"
            ? "apartments"
            : "land";

    sessionStorage.setItem(
        "returnSection",
        section
    );

});

    card.dataset.id = String(property.id);
    card.dataset.type = property.type;
    card.dataset.location = property.location;
    card.dataset.deal = property.deal || "";
    card.dataset.bedrooms = property.bedrooms || "";
    card.dataset.size = property.size || "";

    card.innerHTML = `
        <img src="${property.thumbnail}" alt="${property.title}">
        <div class="property-info">
            <h3>${property.shortTitle}</h3>
            <p>${property.location}</p>
            <span>${property.formattedPrice}</span>
        </div>
    `;

    if (property.type === "Apartment") {
        apartmentsGrid.appendChild(card);
    } else if (property.type === "Land") {
        landGrid.appendChild(card);
    }

});

}

// =====================================
// FILTERS
// =====================================

function populateFilters() {

const types =
    [...new Set(properties.map(p => p.type))];

const locations =
    [...new Set(properties.map(p => p.location))];

const deals =
    [...new Set(properties.map(p => p.deal))];

const apartmentLocations =
    [...new Set(
        properties
            .filter(p => p.type === "Apartment")
            .map(p => p.location)
    )];

const apartmentBedrooms =
    [...new Set(
        properties
            .filter(p => p.bedrooms)
            .map(p => p.bedrooms)
    )];

const landLocations =
    [...new Set(
        properties
            .filter(p => p.type === "Land")
            .map(p => p.location)
    )];

const landSizes =
    [...new Set(
        properties
            .filter(p => p.size)
            .map(p => p.size)
    )];

fillSelect("propertyType", types);
fillSelect("location", locations);
fillSelect("dealType", deals);

fillSelect("apartmentLocation", apartmentLocations);
fillSelect("apartmentBedrooms", apartmentBedrooms);
fillSelect("apartmentDeal", deals);

fillSelect("landLocation", landLocations);
fillSelect("landSize", landSizes);

}

function fillSelect(id, values) {

const select = document.getElementById(id);

if (!select) return;

values.forEach(value => {

    const option = document.createElement("option");

    option.value = value;
    option.textContent = value;

    select.appendChild(option);

});

}

// =====================================
// RESET
// =====================================

function resetCards() {

document
    .querySelectorAll(".property-card")
    .forEach(card => {

        card.style.display = "";

    });

}

function clearHeroFilters() {

document.getElementById("propertyType").value = "";
document.getElementById("location").value = "";
document.getElementById("dealType").value = "";
document.getElementById("priceRange").value = "";

resetCards();

toggleNoResults(true);

document.getElementById("searchBtn").style.display = "";
document.getElementById("clearBtn").style.display = "none";

}

// =====================================
// HERO SEARCH
// =====================================

function setupHeroSearch() {

document
    .getElementById("searchBtn")
    .addEventListener("click", () => {

        resetCards();

        const type =
            document.getElementById("propertyType").value;

        const location =
            document.getElementById("location").value;

        const deal =
            document.getElementById("dealType").value;

        const priceRange =
            document.getElementById("priceRange").value;

        let found = false;

        document
            .querySelectorAll(".property-card")
            .forEach(card => {

                let show = true;

                if (type &&
                    card.dataset.type !== type)
                    show = false;

                if (location &&
                    card.dataset.location !== location)
                    show = false;

                if (deal &&
                    card.dataset.deal !== deal)
                    show = false;

                if (priceRange) {

                    const property =
                        properties.find(
                            p => p.id === card.dataset.id
                        );

                    const price =
                        property.price;

                    if (
                        priceRange === "0-5000000" &&
                        price > 5000000
                    )
                        show = false;

                    if (
                        priceRange === "5000000-10000000" &&
                        (price < 5000000 ||
                            price > 10000000)
                    )
                        show = false;

                    if (
                        priceRange === "10000000-20000000" &&
                        (price < 10000000 ||
                            price > 20000000)
                    )
                        show = false;

                    if (
                        priceRange === "20000000-50000000" &&
                        (price < 20000000 ||
                            price > 50000000)
                    )
                        show = false;

                    if (
                        priceRange === "50000000+" &&
                        price < 50000000
                    )
                        show = false;

                }

                card.style.display =
                    show ? "" : "none";

                if (show)
                    found = true;

            });

        toggleNoResults(found);

        document.getElementById("searchBtn").style.display = "none";
        document.getElementById("clearBtn").style.display = "";

        document
            .getElementById("properties")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

document
    .getElementById("clearBtn")
    .addEventListener(
        "click",
        clearHeroFilters
    );

}

// =====================================
// APARTMENT SEARCH
// =====================================

function setupApartmentSearch() {

document
    .getElementById("apartmentSearchBtn")
    .addEventListener("click", () => {

        const cards =
            document.querySelectorAll(
                "#apartments .property-card"
            );

        cards.forEach(card => {
            card.style.display = "";
        });

        const location =
            document.getElementById("apartmentLocation").value;

        const bedrooms =
            document.getElementById("apartmentBedrooms").value;

        const deal =
            document.getElementById("apartmentDeal").value;

        let found = false;

        cards.forEach(card => {

            let show = true;

            if (location &&
                card.dataset.location !== location)
                show = false;

            if (bedrooms &&
                card.dataset.bedrooms !== bedrooms)
                show = false;

            if (deal &&
                card.dataset.deal !== deal)
                show = false;

            card.style.display =
                show ? "" : "none";

            if (show)
                found = true;

        });

        toggleNoResults(found);

    });

}

// =====================================
// LAND SEARCH
// =====================================

function setupLandSearch() {

document
    .getElementById("landSearchBtn")
    .addEventListener("click", () => {

        const cards =
            document.querySelectorAll(
                "#land .property-card"
            );

        cards.forEach(card => {
            card.style.display = "";
        });

        const location =
            document.getElementById("landLocation").value;

        const size =
            document.getElementById("landSize").value;

        let found = false;

        cards.forEach(card => {

            let show = true;

            if (location &&
                card.dataset.location !== location)
                show = false;

            if (size &&
                card.dataset.size !== size)
                show = false;

            card.style.display =
                show ? "" : "none";

            if (show)
                found = true;

        });

        toggleNoResults(found);

    });

}

// =====================================
// NO RESULTS
// =====================================

function toggleNoResults(found) {

const box =
    document.getElementById("noResults");

if (!box) return;

box.style.display =
    found ? "none" : "block";

}

// =====================================
// TABS
// =====================================

function setupTabs() {

document
    .querySelectorAll(".tab-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            document
                .querySelectorAll(".tab-btn")
                .forEach(b =>
                    b.classList.remove("active")
                );

            document
                .querySelectorAll(".tab-content")
                .forEach(tab =>
                    tab.classList.remove("active")
                );

            btn.classList.add("active");

            document
                .getElementById(btn.dataset.tab)
                .classList.add("active");

            document
                .getElementById("noResults")
                .style.display = "none";

        });

    });

}

// =====================================
// OFFERS
// =====================================

function setupOffers() {

const btn =
    document.getElementById("offersToggle");

const container =
    document.getElementById("offersContainer");

const cards =
    document.querySelectorAll(".offer-card");

btn.addEventListener("click", () => {

    const opening =
        !container.classList.contains("active");

    container.classList.toggle("active");

    btn.textContent =
        container.classList.contains("active")
            ? "Hide Offers"
            : "View Offers";

    if (opening) {

        cards.forEach((card, index) => {

            card.classList.remove("show");

            setTimeout(() => {
                card.classList.add("show");
            }, index * 300);

        });

    }

});

}

// =====================================
// SLIDESHOW
// =====================================

function setupSlideshow() {

const slides =
    document.querySelectorAll(".slideshow img");

let current = 0;

setInterval(() => {

    slides[current]
        .classList.remove("active");

    current =
        (current + 1) % slides.length;

    slides[current]
        .classList.add("active");

}, 5000);

}

// =====================================
// VIEW MORE
// =====================================

function setupViewMore(sectionId) {

    const section = document.getElementById(sectionId);
    if (!section) return;

    const cards = section.querySelectorAll(".property-card");
    const btn = document.querySelector(
        `.view-more-btn[data-target="${sectionId}"]`
    );

    if (!btn) return;

    let expanded = false;

    function getLimit() {
        return window.innerWidth <= 768 ? 2 : 3;
    }

    function update() {

        const limit = getLimit();

        cards.forEach((card, index) => {
            card.classList.toggle(
                "hidden",
                !expanded && index >= limit
            );
        });

        btn.textContent = expanded ? "View Less" : "View More";
    }

    btn.addEventListener("click", () => {

        expanded = !expanded;
        update();

        if (expanded) {
            btn.style.display = "none";
        }
    });

    update();

    window.addEventListener("resize", update);
}