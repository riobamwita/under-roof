document.addEventListener("DOMContentLoaded", () => {

    // ================= NAV MENU =================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuToggle.textContent =
                navMenu.classList.contains("active")
                    ? "✕"
                    : "☰";
        });

        document.querySelectorAll("#navMenu a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";

            });

        });

    }

    // ================= HERO SEARCH =================

    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            const propertyType =
                document.getElementById("propertyType")?.value;

            const location =
                document.getElementById("location")?.value;

            const dealType =
                document.getElementById("dealType")?.value;

            const priceRange =
                document.getElementById("priceRange")?.value;

            console.log({
                propertyType,
                location,
                dealType,
                priceRange
            });

            document
                .getElementById("properties")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });

    }

    // ================= PROPERTY TABS =================

    const tabButtons =
        document.querySelectorAll(".tab-btn");

    const tabContents =
        document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetTab =
                button.dataset.tab;

            tabButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            tabContents.forEach(tab =>
                tab.classList.remove("active")
            );

            button.classList.add("active");

            document
                .getElementById(targetTab)
                ?.classList.add("active");

        });

    });

    // ================= OFFERS SECTION =================

    const offersToggle =
        document.getElementById("offersToggle");

    const offersContainer =
        document.getElementById("offersContainer");

    const offerCards =
        document.querySelectorAll(".offer-card");

    if (offersToggle && offersContainer) {

        offersToggle.addEventListener("click", () => {

            offersContainer.classList.toggle("active");

            if (offersContainer.classList.contains("active")) {

                offersToggle.textContent =
                    "Hide Offers";

                offerCards.forEach(card =>
                    card.classList.remove("show")
                );

                offerCards.forEach((card, index) => {

                    setTimeout(() => {

                        card.classList.add("show");

                    }, index * 700);

                });

            } else {

                offersToggle.textContent =
                    "View Offers";

                offerCards.forEach(card =>
                    card.classList.remove("show")
                );

            }

        });

    }

    // ================= HERO SLIDESHOW =================

    const slides =
        document.querySelectorAll(".slideshow img");

    if (slides.length) {

        let currentSlide = 0;

        slides[currentSlide].classList.add("active");

        setInterval(() => {

            slides[currentSlide]
                .classList.remove("active");

            currentSlide =
                (currentSlide + 1) % slides.length;

            slides[currentSlide]
                .classList.add("active");

        }, 5000);

    }

});

function setupViewMore(sectionId) {
    const section = document.getElementById(sectionId);
    const cards = section.querySelectorAll(".property-card");
    const btn = document.querySelector(`.view-more-btn[data-target="${sectionId}"]`);

    let expanded = false;

    function getLimit() {
        return window.innerWidth <= 768 ? 2 : 3;
    }

    function updateView() {
        const limit = getLimit();

        cards.forEach((card, index) => {
            if (!expanded && index >= limit) {
                card.classList.add("hidden");
            } else {
                card.classList.remove("hidden");
            }
        });

        btn.textContent = expanded ? "View Less" : "View More";
    }

    btn.addEventListener("click", () => {
        expanded = !expanded;
        updateView();
    });

    window.addEventListener("resize", updateView);

    updateView();
}

// initialize all sections
setupViewMore("apartments");
setupViewMore("land");
setupViewMore("warehouses");



let currentImageIndex = 0;
let galleryImages = [];

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // PROPERTY DATA
    // =========================

    const properties = {
        kenol: {
            title: "Luxury Family Home - Kenol",
            price: "KES 18,500,000",
            location: "Kenol",
            bedrooms: "4 Bedrooms",
            type: "House",
            hero: "assets/kenolhouse.jpg",
            gallery: [
                "assets/living1.jpg",
                "assets/kitchen1.jpg",
                "assets/bedroom1.jpg",
                "assets/bathroom1.jpg",
                "assets/balcony1.jpg",
                "assets/fireplace2.jpg"
            ],
            description:
                "Modern family home located in Kenol featuring spacious living areas, premium finishes, secure compound and easy access to major roads.",
            features: [
                "4 Spacious Bedrooms",
                "3 Bathrooms",
                "Modern Kitchen",
                "Private Balcony",
                "Parking for 3 Cars",
                "Secure Compound"
            ]
        },

        diani: {
            title: "Beachfront Villa - Diani",
            price: "KES 42,000,000",
            location: "Diani",
            bedrooms: "5 Bedrooms",
            type: "Villa",
            hero: "assets/dianihouse.jpg",
            gallery: [
                "assets/living2.jpg",
                "assets/kitchen2.jpg",
                "assets/bedroom2.jpg",
                "assets/bathroom2.jpg",
                "assets/balcony2.jpg",
                "assets/dining2.jpg"
            ],
            description:
                "Beautiful beachfront villa located in Diani. Perfect for luxury living, holiday rentals and long-term investment.",
            features: [
                "Beach Access",
                "Swimming Pool",
                "5 Bedrooms",
                "Large Garden",
                "Ocean View",
                "Staff Quarters"
            ]
        },
        nairobihouse: {
            title: "Luxury Family Home - Nairobi",
            price: "KES 35,000,000",
            location: "Nairobi",
            bedrooms: "5 Bedrooms",
            type: "House",
            hero: "assets/nairobi house.jpg",
            gallery: [
        "assets/living3.jpg",
        "assets/kitchen3.jpg",
        "assets/dining3.jpg",
        "assets/bedroom3.jpg",
        "assets/sbedroom3.jpg",
        "assets/bathroom3.jpg",
        "assets/balcony3.jpg",
        "assets/fireplace3.jpg"
            ],
    description:
        "Elegant luxury residence located in Nairobi featuring spacious living spaces, modern interiors, premium finishes, multiple entertainment areas, and excellent access to key amenities. Ideal for families seeking comfort, security, and prestige.",
    features: [
        "5 Spacious Bedrooms",
        "4 Modern Bathrooms",
        "Luxury Kitchen",
        "Dining Area",
        "Private Balcony",
        "Fireplace Lounge",
        "Secure Compound",
        "Ample Parking"
    ]
},
        dianiland: {
    title: "Prime Beachside Land - Diani",
    price: "KES 8,500,000",
    location: "Diani",
    size: "1/2 Acre",
    type: "Land",
    hero: "assets/dianiland.jpeg",
    gallery: [
        "assets/dianiland.jpeg"
    ],
    description:
        "Prime parcel of land located in Diani, suitable for residential development, holiday villas, apartments, or investment projects. Positioned in a rapidly growing area with excellent access roads and nearby amenities.",
    features: [
        "1/2 Acre",
        "Ready Title Deed",
        "Road Access",
        "Electricity Available",
        "Water Available",
        "Investment Opportunity"
    ]
},

        matuu: {
            title: "Prime Land - Matuu",
            price: "KES 2,500,000",
            location: "Matuu",
            size: "1 Acre",
            type: "Land",
            hero: "assets/matuuland.jpeg",
            gallery: [
                "assets/matuuland.jpeg",
                "assets/matuuad.jpg",
                "assets/matuuad2.jpg"
            ],
            description:
                "Prime land suitable for residential or commercial development. Located near major roads and growing infrastructure.",
            features: [
                "1 Acre",
                "Ready Title",
                "Road Access",
                "Electricity Nearby",
                "Water Available",
                "Fast Growing Area"
            ]
        }
    };

    // =========================
    // LOAD PROPERTY
    // =========================

    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get("id") || "kenol";
    const property = properties[propertyId];

    if (property) {

        document.getElementById("propertyTitle").textContent =
            property.title;

        document.getElementById("propertyPrice").textContent =
            property.price;

        const meta = document.getElementById("heroMeta");

        meta.innerHTML = "";

        if (property.location) {
            meta.innerHTML += `<span>📍 ${property.location}</span>`;
        }

        if (property.bedrooms) {
            meta.innerHTML += `<span>🛏 ${property.bedrooms}</span>`;
        }

        if (property.size) {
            meta.innerHTML += `<span>📐 ${property.size}</span>`;
        }

        meta.innerHTML += `<span>🏠 ${property.type}</span>`;

        document.getElementById("description").textContent =
            property.description;

        const gallery = document.getElementById("gallery");

        gallery.innerHTML = "";

        galleryImages = [
            property.hero,
            ...property.gallery
        ];

        galleryImages.forEach((image, index) => {

            const img = document.createElement("img");

            img.src = image;
            img.loading = "lazy";
            img.decoding = "async";

            img.addEventListener("click", () => {
                currentImageIndex = index;
                openLightbox(index);
            });

            gallery.appendChild(img);
        });

        const features = document.getElementById("features");

        features.innerHTML = "";

        property.features.forEach(feature => {

            const li = document.createElement("li");
            li.textContent = feature;

            features.appendChild(li);
        });
    }

    // =========================
    // BACK BUTTON
    // =========================

    const backBtn = document.getElementById("backBtn");

    if (backBtn) {

        backBtn.addEventListener("click", () => {

            const returnUrl =
                sessionStorage.getItem("returnUrl");

            if (returnUrl) {
                window.location.href = returnUrl;
            } else {
                window.history.back();
            }
        });
    }

    // =========================
    // LIGHTBOX CLOSE ON BACKDROP
    // =========================

    const lightbox = document.getElementById("lightbox");

    if (lightbox) {

        lightbox.addEventListener("click", e => {

            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});


// =========================
// LIGHTBOX
// =========================

function openLightbox(startIndex = 0) {

    const lightbox = document.getElementById("lightbox");

    if (!lightbox) return;

    lightbox.innerHTML = `
        <button class="lightbox-arrow lightbox-prev">
            ❮
        </button>

        <div class="lightbox-track">
            ${galleryImages.map(img => `
                <img
                    src="${img}"
                    alt=""
                    draggable="false"
                >
            `).join("")}
        </div>

        <button class="lightbox-arrow lightbox-next">
            ❯
        </button>

        <span class="close-lightbox">
            &times;
        </span>

        <div class="lightbox-counter">
            ${startIndex + 1} / ${galleryImages.length}
        </div>
    `;

    lightbox.style.display = "block";

    const track =
        lightbox.querySelector(".lightbox-track");

    const images =
        track.querySelectorAll("img");

    const counter =
        lightbox.querySelector(".lightbox-counter");

    let current = startIndex;

    images[current].scrollIntoView({
        behavior: "auto",
        inline: "center"
    });

    function updateCounter() {
        counter.textContent =
            `${current + 1} / ${galleryImages.length}`;
    }

    function showImage(index) {

        current = index;

        images[current].scrollIntoView({
            behavior: "smooth",
            inline: "center"
        });

        updateCounter();
    }

    lightbox
        .querySelector(".close-lightbox")
        .addEventListener("click", closeLightbox);

    lightbox
        .querySelector(".lightbox-next")
        .addEventListener("click", () => {

            showImage(
                (current + 1) % galleryImages.length
            );
        });

    lightbox
        .querySelector(".lightbox-prev")
        .addEventListener("click", () => {

            showImage(
                current === 0
                    ? galleryImages.length - 1
                    : current - 1
            );
        });

    images.forEach(img => {

        img.addEventListener("click", e => {

            e.stopPropagation();

            images.forEach(i =>
                i.classList.remove("zoomed")
            );

            img.classList.toggle("zoomed");
        });
    });

    document.onkeydown = e => {

        if (lightbox.style.display !== "block")
            return;

        if (e.key === "Escape")
            closeLightbox();

        if (e.key === "ArrowRight")
            showImage(
                (current + 1) % galleryImages.length
            );

        if (e.key === "ArrowLeft")
            showImage(
                current === 0
                    ? galleryImages.length - 1
                    : current - 1
            );
    };
}

function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) return;

    lightbox.style.display = "none";
    lightbox.innerHTML = "";

    document.onkeydown = null;
}